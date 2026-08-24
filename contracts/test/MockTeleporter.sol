// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {ITeleporterMessenger, TeleporterMessageInput} from "../src/interfaces/ITeleporterMessenger.sol";
import {ITeleporterReceiver} from "../src/interfaces/ITeleporterReceiver.sol";

contract MockTeleporter is ITeleporterMessenger {
    bytes32 public lastDestinationBlockchainID;
    address public lastDestination;
    address[] public lastAllowedRelayers;
    bytes public lastMessage;
    address public lastSender;
    uint256 public sendCount;

    function sendCrossChainMessage(TeleporterMessageInput calldata messageInput) external returns (bytes32) {
        lastDestinationBlockchainID = messageInput.destinationBlockchainID;
        lastDestination = messageInput.destinationAddress;
        lastAllowedRelayers = messageInput.allowedRelayerAddresses;
        lastMessage = messageInput.message;
        lastSender = msg.sender;
        sendCount += 1;
        return bytes32(sendCount);
    }

    function lastRelayerCount() external view returns (uint256) {
        return lastAllowedRelayers.length;
    }

    function deliver(address receiver, bytes32 sourceBlockchainID, address originSender, bytes calldata message) external {
        ITeleporterReceiver(receiver).receiveTeleporterMessage(sourceBlockchainID, originSender, message);
    }
}
