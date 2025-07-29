// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../../src/core/UserRegistry.sol";
import "../../src/core/MatchingEngine.sol";
import "../../src/nft/CrushSBT.sol";
import "../../src/nft/MomentNFT.sol";
import "../../src/tokens/EtherToken.sol";

contract DeployAll is Script {
    UserRegistry public userRegistry;
    MatchingEngine public matchingEngine;
    CrushSBT public crushSBT;
    MomentNFT public momentNFT;
    EtherToken public etherToken;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy UserRegistry first (no dependencies)
        console.log("Deploying UserRegistry...");
        userRegistry = new UserRegistry();
        console.log("UserRegistry deployed at:", address(userRegistry));

        // 2. Deploy EtherToken (no dependencies)
        console.log("Deploying EtherToken...");
        etherToken = new EtherToken();
        console.log("EtherToken deployed at:", address(etherToken));

        // 3. Deploy CrushSBT (no dependencies)
        console.log("Deploying CrushSBT...");
        crushSBT = new CrushSBT();
        console.log("CrushSBT deployed at:", address(crushSBT));

        // 4. Deploy MomentNFT (no dependencies)
        console.log("Deploying MomentNFT...");
        momentNFT = new MomentNFT();
        console.log("MomentNFT deployed at:", address(momentNFT));

        // 5. Deploy MatchingEngine (depends on UserRegistry)
        console.log("Deploying MatchingEngine...");
        matchingEngine = new MatchingEngine(address(userRegistry));
        console.log("MatchingEngine deployed at:", address(matchingEngine));

        // 6. Configure contract relationships
        console.log("Configuring contract relationships...");
        
        // Set MatchingEngine in NFT contracts
        crushSBT.setMatchingEngine(address(matchingEngine));
        momentNFT.setMatchingEngine(address(matchingEngine));
        
        // Set NFT contracts in MatchingEngine
        matchingEngine.setCrushSBT(address(crushSBT));
        matchingEngine.setMomentNFT(address(momentNFT));
        
        // Add MatchingEngine as authorized minter for EtherToken
        etherToken.addAuthorizedMinter(address(matchingEngine));
        etherToken.addAuthorizedMinter(address(userRegistry));
        
        // Add MatchingEngine as authorized XP awarder
        userRegistry.addAuthorizedXPAwarder(address(matchingEngine));

        vm.stopBroadcast();

        // 7. Log deployment summary
        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("UserRegistry:", address(userRegistry));
        console.log("MatchingEngine:", address(matchingEngine));
        console.log("CrushSBT:", address(crushSBT));
        console.log("MomentNFT:", address(momentNFT));
        console.log("EtherToken:", address(etherToken));
        console.log("=========================\n");

        // 8. Save deployment addresses to file
        _saveDeploymentAddresses();

        // 9. Verify contracts are properly configured
        _verifyDeployment();
    }

    function _saveDeploymentAddresses() internal {
        string memory deploymentInfo = string(
            abi.encodePacked(
                "# Ether-Connect Contract Addresses\n\n",
                "USER_REGISTRY_ADDRESS=", vm.toString(address(userRegistry)), "\n",
                "MATCHING_ENGINE_ADDRESS=", vm.toString(address(matchingEngine)), "\n", 
                "CRUSH_SBT_ADDRESS=", vm.toString(address(crushSBT)), "\n",
                "MOMENT_NFT_ADDRESS=", vm.toString(address(momentNFT)), "\n",
                "ETHER_TOKEN_ADDRESS=", vm.toString(address(etherToken)), "\n\n",
                "# Deploy block: ", vm.toString(block.number), "\n",
                "# Deploy timestamp: ", vm.toString(block.timestamp), "\n"
            )
        );
        
        vm.writeFile("./deployment-addresses.txt", deploymentInfo);
        console.log("Deployment addresses saved to: deployment-addresses.txt");
    }

    function _verifyDeployment() internal view {
        console.log("\n=== VERIFICATION ===");
        
        // Verify UserRegistry
        require(userRegistry.owner() != address(0), "UserRegistry owner not set");
        console.log("UserRegistry owner verified");
        
        // Verify MatchingEngine
        require(address(matchingEngine.userRegistry()) == address(userRegistry), "MatchingEngine UserRegistry not set");
        require(address(matchingEngine.crushSBT()) == address(crushSBT), "MatchingEngine CrushSBT not set");
        require(address(matchingEngine.momentNFT()) == address(momentNFT), "MatchingEngine MomentNFT not set");
        console.log("MatchingEngine configuration verified");
        
        // Verify CrushSBT
        require(crushSBT.matchingEngine() == address(matchingEngine), "CrushSBT MatchingEngine not set");
        console.log("CrushSBT configuration verified");
        
        // Verify MomentNFT
        require(momentNFT.matchingEngine() == address(matchingEngine), "MomentNFT MatchingEngine not set");
        console.log("MomentNFT configuration verified");
        
        // Verify EtherToken
        require(etherToken.isAuthorizedMinter(address(matchingEngine)), "MatchingEngine not authorized minter");
        require(etherToken.isAuthorizedMinter(address(userRegistry)), "UserRegistry not authorized minter");
        console.log("EtherToken authorization verified");
        
        console.log("All contracts deployed and configured successfully!");
        console.log("====================\n");
    }
}