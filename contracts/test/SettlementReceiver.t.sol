// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {SettlementReceiver} from "../src/SettlementReceiver.sol";
import {MockTeleporter} from "./MockTeleporter.sol";

contract SettlementReceiverTest is Test {
    MockTeleporter internal teleporter;
    SettlementReceiver internal receiver;

    bytes32 internal constant NORTHSTAR = bytes32(uint256(0x4e53));
    bytes32 internal constant OTHER_CHAIN = bytes32(uint256(0x4f54));
    address internal registry = address(0xA11CE);
    address internal otherRegistry = address(0xB0B);

    function setUp() public {
        teleporter = new MockTeleporter();
        receiver = new SettlementReceiver(address(teleporter), NORTHSTAR, registry);
    }

    function test_validDeliverySetsNamespacedApproval() public {
        bytes memory payload = abi.encode(uint256(82731), true);
        teleporter.deliver(address(receiver), NORTHSTAR, registry, payload);
        assertTrue(receiver.isApproved(NORTHSTAR, registry, 82731));
    }

    function test_wrongMessengerReverts() public {
        bytes memory payload = abi.encode(uint256(82731), true);
        vm.expectRevert(SettlementReceiver.UnauthorizedMessenger.selector);
        receiver.receiveTeleporterMessage(NORTHSTAR, registry, payload);
    }

    function test_wrongSourceChainReverts() public {
        bytes memory payload = abi.encode(uint256(82731), true);
        vm.expectRevert(SettlementReceiver.UnauthorizedOrigin.selector);
        teleporter.deliver(address(receiver), OTHER_CHAIN, registry, payload);
        assertFalse(receiver.isApproved(OTHER_CHAIN, registry, 82731));
        assertFalse(receiver.isApproved(NORTHSTAR, registry, 82731));
    }

    function test_wrongOriginSenderReverts() public {
        bytes memory payload = abi.encode(uint256(82731), true);
        vm.expectRevert(SettlementReceiver.UnauthorizedSender.selector);
        teleporter.deliver(address(receiver), NORTHSTAR, otherRegistry, payload);
        assertFalse(receiver.isApproved(NORTHSTAR, otherRegistry, 82731));
    }

    function test_sameAssetIdFromDifferentOriginDoesNotCollide() public {
        bytes memory payload = abi.encode(uint256(82731), true);
        teleporter.deliver(address(receiver), NORTHSTAR, registry, payload);
        assertTrue(receiver.isApproved(NORTHSTAR, registry, 82731));
        assertFalse(receiver.isApproved(OTHER_CHAIN, registry, 82731));
        assertFalse(receiver.isApproved(NORTHSTAR, otherRegistry, 82731));
    }

    function test_approvalCanFlipFalse() public {
        teleporter.deliver(address(receiver), NORTHSTAR, registry, abi.encode(uint256(82731), true));
        teleporter.deliver(address(receiver), NORTHSTAR, registry, abi.encode(uint256(82731), false));
        assertFalse(receiver.isApproved(NORTHSTAR, registry, 82731));
    }

    function test_constructorRejectsZeroes() public {
        vm.expectRevert(SettlementReceiver.ZeroAddress.selector);
        new SettlementReceiver(address(0), NORTHSTAR, registry);
        vm.expectRevert(SettlementReceiver.ZeroAddress.selector);
        new SettlementReceiver(address(teleporter), NORTHSTAR, address(0));
        vm.expectRevert(SettlementReceiver.ZeroBlockchainID.selector);
        new SettlementReceiver(address(teleporter), bytes32(0), registry);
    }
}
