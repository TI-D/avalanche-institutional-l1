// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ITeleporterMessenger, TeleporterMessageInput, TeleporterFeeInfo} from "./interfaces/ITeleporterMessenger.sol";

/// @title InstitutionalRegistry
/// @notice Permissioned asset-approval registry on the Northstar L1.
///         Relayer policy is explicit:
///         - address(0): Teleporter-layer delivery is permissionless.
///           Restrict that at the network, and say so.
///         - non-zero: populate allowedRelayerAddresses with that one address.
contract InstitutionalRegistry {
    error NotAdmin();
    error UnknownAsset();
    error ZeroAddress();
    error ZeroBlockchainID();

    event AssetRegistered(uint256 indexed assetId, string symbol);
    event AssetApproved(uint256 indexed assetId, bool approved, bytes32 messageId);

    ITeleporterMessenger public immutable teleporter;
    bytes32 public immutable settlementBlockchainID;
    address public immutable settlementReceiver;
    address public immutable allowedRelayer;
    address public admin;

    mapping(uint256 => bool) public exists;
    mapping(uint256 => bool) public approved;
    mapping(uint256 => string) public symbolOf;

    constructor(
        address teleporterAddress,
        bytes32 settlementBlockchainID_,
        address settlementReceiver_,
        address admin_,
        address allowedRelayer_
    ) {
        if (teleporterAddress == address(0) || settlementReceiver_ == address(0) || admin_ == address(0)) {
            revert ZeroAddress();
        }
        if (settlementBlockchainID_ == bytes32(0)) revert ZeroBlockchainID();
        teleporter = ITeleporterMessenger(teleporterAddress);
        settlementBlockchainID = settlementBlockchainID_;
        settlementReceiver = settlementReceiver_;
        admin = admin_;
        allowedRelayer = allowedRelayer_;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    function registerAsset(uint256 assetId, string calldata symbol) external onlyAdmin {
        exists[assetId] = true;
        symbolOf[assetId] = symbol;
        emit AssetRegistered(assetId, symbol);
    }

    function setApproval(uint256 assetId, bool isApproved) external onlyAdmin returns (bytes32 messageId) {
        if (!exists[assetId]) revert UnknownAsset();
        approved[assetId] = isApproved;

        address[] memory relayers;
        if (allowedRelayer != address(0)) {
            relayers = new address[](1);
            relayers[0] = allowedRelayer;
        }

        messageId = teleporter.sendCrossChainMessage(
            TeleporterMessageInput({
                destinationBlockchainID: settlementBlockchainID,
                destinationAddress: settlementReceiver,
                feeInfo: TeleporterFeeInfo({feeTokenAddress: address(0), amount: 0}),
                requiredGasLimit: 300_000,
                allowedRelayerAddresses: relayers,
                message: abi.encode(assetId, isApproved)
            })
        );

        emit AssetApproved(assetId, isApproved, messageId);
    }
}
