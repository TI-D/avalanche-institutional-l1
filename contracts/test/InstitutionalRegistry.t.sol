// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {Test} from "forge-std/Test.sol";
import {InstitutionalRegistry} from "../src/InstitutionalRegistry.sol";
import {MockTeleporter} from "./MockTeleporter.sol";

contract InstitutionalRegistryTest is Test {
    MockTeleporter internal teleporter;
    address internal admin = address(0xAD);
    address internal settlement = address(0x5E11);
    address internal relayer = address(0xBEEF);
    bytes32 internal constant SETTLEMENT_CHAIN = bytes32(uint256(0x5e11));

    function setUp() public {
        teleporter = new MockTeleporter();
    }

    function _registry(address allowedRelayer) internal returns (InstitutionalRegistry) {
        vm.prank(admin);
        return new InstitutionalRegistry(address(teleporter), SETTLEMENT_CHAIN, settlement, admin, allowedRelayer);
    }

    function test_allowlistedRelayerIsPopulated() public {
        InstitutionalRegistry registry = _registry(relayer);
        vm.startPrank(admin);
        registry.registerAsset(82731, "NSTAR-NOTE");
        registry.setApproval(82731, true);
        vm.stopPrank();

        assertEq(teleporter.lastRelayerCount(), 1);
        assertEq(teleporter.lastAllowedRelayers(0), relayer);
        assertEq(teleporter.lastDestination(), settlement);
        assertEq(teleporter.lastDestinationBlockchainID(), SETTLEMENT_CHAIN);
        assertEq(teleporter.lastMessage(), abi.encode(uint256(82731), true));
        assertTrue(registry.approved(82731));
    }

    function test_permissionlessRelayerPolicySendsEmptyList() public {
        InstitutionalRegistry registry = _registry(address(0));
        vm.startPrank(admin);
        registry.registerAsset(82731, "NSTAR-NOTE");
        registry.setApproval(82731, true);
        vm.stopPrank();

        assertEq(teleporter.lastRelayerCount(), 0);
        assertEq(registry.allowedRelayer(), address(0));
    }

    function test_unknownAssetReverts() public {
        InstitutionalRegistry registry = _registry(relayer);
        vm.prank(admin);
        vm.expectRevert(InstitutionalRegistry.UnknownAsset.selector);
        registry.setApproval(82731, true);
    }

    function test_nonAdminReverts() public {
        InstitutionalRegistry registry = _registry(relayer);
        vm.expectRevert(InstitutionalRegistry.NotAdmin.selector);
        registry.registerAsset(82731, "NSTAR-NOTE");
    }

    function test_constructorRejectsZeroes() public {
        vm.expectRevert(InstitutionalRegistry.ZeroAddress.selector);
        new InstitutionalRegistry(address(0), SETTLEMENT_CHAIN, settlement, admin, relayer);
        vm.expectRevert(InstitutionalRegistry.ZeroBlockchainID.selector);
        new InstitutionalRegistry(address(teleporter), bytes32(0), settlement, admin, relayer);
    }
}
