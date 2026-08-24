// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

/// @notice Interface shape matches ava-labs/icm-contracts
///         contracts/teleporter/ITeleporterMessenger.sol send path
///         (fetched 2026-08-24). An empty allowedRelayerAddresses list
///         means permissionless delivery at the Teleporter layer.

struct TeleporterFeeInfo {
    address feeTokenAddress;
    uint256 amount;
}

struct TeleporterMessageInput {
    bytes32 destinationBlockchainID;
    address destinationAddress;
    TeleporterFeeInfo feeInfo;
    uint256 requiredGasLimit;
    address[] allowedRelayerAddresses;
    bytes message;
}

interface ITeleporterMessenger {
    function sendCrossChainMessage(TeleporterMessageInput calldata messageInput) external returns (bytes32);
}
