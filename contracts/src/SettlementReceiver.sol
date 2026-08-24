// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ITeleporterReceiver} from "./interfaces/ITeleporterReceiver.sol";

/// @title SettlementReceiver
/// @notice Destination application on Settlement L1.
///         Teleporter authenticates that a message came from some origin.
///         This contract pins which origin is allowed and namespaces
///         approvals so two chains cannot collide on the same assetId.
contract SettlementReceiver is ITeleporterReceiver {
    error UnauthorizedMessenger();
    error UnauthorizedOrigin();
    error UnauthorizedSender();
    error ZeroAddress();
    error ZeroBlockchainID();

    event ApprovalReceived(
        bytes32 indexed sourceBlockchainID,
        address indexed originSender,
        uint256 indexed assetId,
        bool approved
    );

    address public immutable teleporter;
    bytes32 public immutable expectedSourceBlockchainID;
    address public immutable expectedOriginRegistry;

    mapping(bytes32 => bool) public approved;

    constructor(address teleporterAddress, bytes32 expectedSourceBlockchainID_, address expectedOriginRegistry_) {
        if (teleporterAddress == address(0) || expectedOriginRegistry_ == address(0)) revert ZeroAddress();
        if (expectedSourceBlockchainID_ == bytes32(0)) revert ZeroBlockchainID();
        teleporter = teleporterAddress;
        expectedSourceBlockchainID = expectedSourceBlockchainID_;
        expectedOriginRegistry = expectedOriginRegistry_;
    }

    function approvalKey(bytes32 sourceBlockchainID, address originSender, uint256 assetId) public pure returns (bytes32) {
        return keccak256(abi.encode(sourceBlockchainID, originSender, assetId));
    }

    function isApproved(bytes32 sourceBlockchainID, address originSender, uint256 assetId) external view returns (bool) {
        return approved[approvalKey(sourceBlockchainID, originSender, assetId)];
    }

    function receiveTeleporterMessage(
        bytes32 sourceBlockchainID,
        address originSenderAddress,
        bytes calldata message
    ) external {
        if (msg.sender != teleporter) revert UnauthorizedMessenger();
        if (sourceBlockchainID != expectedSourceBlockchainID) revert UnauthorizedOrigin();
        if (originSenderAddress != expectedOriginRegistry) revert UnauthorizedSender();

        (uint256 assetId, bool isApprovedFlag) = abi.decode(message, (uint256, bool));
        approved[approvalKey(sourceBlockchainID, originSenderAddress, assetId)] = isApprovedFlag;
        emit ApprovalReceived(sourceBlockchainID, originSenderAddress, assetId, isApprovedFlag);
    }
}
