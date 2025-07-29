// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../../src/core/UserRegistry.sol";
import "../../src/core/MatchingEngine.sol";
import "../../src/nft/CrushSBT.sol";
import "../../src/nft/MomentNFT.sol";

contract MatchingEngineTest is Test {
    UserRegistry public userRegistry;
    MatchingEngine public matchingEngine;
    CrushSBT public crushSBT;
    MomentNFT public momentNFT;
    
    address public alice = address(0x1);
    address public bob = address(0x2);
    address public charlie = address(0x3);
    
    function setUp() public {
        userRegistry = new UserRegistry();
        matchingEngine = new MatchingEngine(address(userRegistry));
        crushSBT = new CrushSBT();
        momentNFT = new MomentNFT();
        
        // Configure contracts
        crushSBT.setMatchingEngine(address(matchingEngine));
        momentNFT.setMatchingEngine(address(matchingEngine));
        matchingEngine.setCrushSBT(address(crushSBT));
        matchingEngine.setMomentNFT(address(momentNFT));
        
        // Add matchingEngine as authorized to award XP
        // This simulates the real deployment where MatchingEngine would be authorized
        userRegistry.addAuthorizedXPAwarder(address(matchingEngine));
        
        // Register test users
        string[] memory interests = new string[](2);
        interests[0] = "DeFi";
        interests[1] = "NFTs";
        
        vm.prank(alice);
        userRegistry.registerUser(true, "avatar1", interests, "Adventurer");
        
        vm.prank(bob);
        userRegistry.registerUser(true, "avatar2", interests, "Socialite");
        
        vm.prank(charlie);
        userRegistry.registerUser(false, "avatar3", interests, "Strategist");
    }
    
    function testLikeUser() public {
        vm.prank(alice);
        matchingEngine.likeUser(bob);
        
        assertTrue(matchingEngine.hasUserLiked(alice, bob));
        assertFalse(matchingEngine.hasUserLiked(bob, alice));
        assertFalse(matchingEngine.areUsersMatched(alice, bob));
    }
    
    function testMutualMatch() public {
        // Alice likes Bob
        vm.prank(alice);
        matchingEngine.likeUser(bob);
        
        // Bob likes Alice - should create match
        vm.prank(bob);
        matchingEngine.likeUser(alice);
        
        assertTrue(matchingEngine.areUsersMatched(alice, bob));
        assertTrue(matchingEngine.areUsersMatched(bob, alice));
        
        // Check that both users have crush count incremented
        assertEq(userRegistry.getProfile(alice).crushCount, 1);
        assertEq(userRegistry.getProfile(bob).crushCount, 1);
    }
    
    function testCannotLikeSelf() public {
        vm.prank(alice);
        vm.expectRevert("Cannot like yourself");
        matchingEngine.likeUser(alice);
    }
    
    function testCannotLikeTwice() public {
        vm.prank(alice);
        matchingEngine.likeUser(bob);
        
        vm.prank(alice);
        vm.expectRevert("Already liked this user");
        matchingEngine.likeUser(bob);
    }
    
    function testChemistryCalculation() public {
        uint256 chemistry = matchingEngine.calculateChemistry(alice, bob);
        
        // Both are in dating mode with same interests
        // Should have high chemistry score
        assertGt(chemistry, 50);
        
        // Test different modes
        uint256 chemistryDifferentMode = matchingEngine.calculateChemistry(alice, charlie);
        assertLt(chemistryDifferentMode, chemistry); // Should be lower due to mode mismatch
    }
}