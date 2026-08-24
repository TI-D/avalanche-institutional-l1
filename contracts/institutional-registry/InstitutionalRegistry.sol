// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ITeleporterMessenger, TeleporterMessageInput, TeleporterFeeInfo} from "../icm-demo/ITeleporterMessenger.sol";

/// @title InstitutionalRegistry
/// @notice Permissioned asset-approval registry on the Northstar L1.
///         Approvals are local state and, optionally, an ICM message to Settlement.
contract InstitutionalRegistry {
    error NotAdmin();
    error UnknownAsset();

    event AssetRegistered(uint256 indexed assetId, string symbol);
    event AssetApproved(uint256 indexed assetId, bool approved, bytes32 messageId);

    ITeleporterMessenger public immutable teleporter;
    bytes32 public immutable settlementBlockchainID;
    address public immutable settlementReceiver;
    address public admin;

    mapping(uint256 => bool) public exists;
    mapping(uint256 => bool) public approved;
    mapping(uint256 => string) public symbolOf;

    constructor(
        address teleporterAddress,
        bytes32 settlementBlockchainID_,
        address settlementReceiver_,
        address admin_
    ) {
        teleporter = ITeleporterMessenger(teleporterAddress);
        settlementBlockchainID = settlementBlockchainID_;
        settlementReceiver = settlementReceiver_;
        admin = admin_;
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

        messageId = teleporter.sendCrossChainMessage(
            TeleporterMessageInput({
                destinationBlockchainID: settlementBlockchainID,
                destinationAddress: settlementReceiver,
                feeInfo: TeleporterFeeInfo({feeTokenAddress: address(0), amount: 0}),
                requiredGasLimit: 300_000,
                allowedRelayerAddresses: new address[](0),
                message: abi.encode(assetId, isApproved, block.chainid)
            })
        );

        emit AssetApproved(assetId, isApproved, messageId);
    }
}
