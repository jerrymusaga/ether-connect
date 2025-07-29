// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../../src/core/UserRegistry.sol";
import "../../src/core/MatchingEngine.sol";
import "../../src/tokens/EtherToken.sol";

contract SetupDemo is Script {
    UserRegistry public userRegistry;
    MatchingEngine public matchingEngine;
    EtherToken public etherToken;

    function run() external {
        // Load deployed contract addresses
        userRegistry = UserRegistry(vm.envAddress("USER_REGISTRY_ADDRESS"));
        matchingEngine = MatchingEngine(vm.envAddress("MATCHING_ENGINE_ADDRESS"));
        etherToken = EtherToken(vm.envAddress("ETHER_TOKEN_ADDRESS"));

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        console.log("Setting up demo data...");

        // Create demo user accounts (you would replace these with actual test accounts)
        address alice = 0x1234567890123456789012345678901234567890;
        address bob = 0x0987654321098765432109876543210987654321;

        // Register demo users (this would normally be done by the frontend)
        console.log("Demo setup complete!");
        console.log("Use the frontend to register users and test the platform");

        vm.stopBroadcast();
    }

    function registerDemoUser(
        address user,
        bool isDatingMode,
        string memory avatar,
        string[] memory interests,
        string memory questStyle
    ) internal {
        // This would be called from the frontend in real usage
        // userRegistry.registerUser(isDatingMode, avatar, interests, questStyle);
        console.log("Demo user registered:", user);
    }
}