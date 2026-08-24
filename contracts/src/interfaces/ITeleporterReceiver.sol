// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

/// @notice Interface shape matches ava-labs/icm-contracts
///         contracts/teleporter/ITeleporterReceiver.sol (fetched 2026-08-24).
///         Official file uses LicenseRef-Ecosystem. This local copy is MIT
///         because it is only the function signature we implement.
interface ITeleporterReceiver {
    function receiveTeleporterMessage(
        bytes32 sourceBlockchainID,
        address originSenderAddress,
        bytes calldata message
    ) external;
}
