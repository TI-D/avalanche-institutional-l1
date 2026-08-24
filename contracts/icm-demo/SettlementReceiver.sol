// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ITeleporterReceiver} from "./ITeleporterMessenger.sol";

/// @title SettlementReceiver
/// @notice Destination contract on Settlement L1. Decodes AssetApproved and
///         records ApprovalReceived. No tokens move. This is an audit event.
contract SettlementReceiver is ITeleporterReceiver {
    error UnauthorizedMessenger();

    event ApprovalReceived(bytes32 indexed sourceChain, uint256 indexed assetId, bool approved, uint256 sourceChainId);

    address public immutable teleporter;
    mapping(uint256 => bool) public approved;
    mapping(uint256 => bytes32) public sourceOf;

    constructor(address teleporterAddress) {
        teleporter = teleporterAddress;
    }

    function receiveTeleporterMessage(
        bytes32 sourceBlockchainID,
        address,
        bytes calldata message
    ) external {
        if (msg.sender != teleporter) revert UnauthorizedMessenger();
        (uint256 assetId, bool isApproved, uint256 sourceChainId) = abi.decode(message, (uint256, bool, uint256));
        approved[assetId] = isApproved;
        sourceOf[assetId] = sourceBlockchainID;
        emit ApprovalReceived(sourceBlockchainID, assetId, isApproved, sourceChainId);
    }
}
