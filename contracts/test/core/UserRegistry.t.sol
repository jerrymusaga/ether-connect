// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../../src/core/UserRegistry.sol";

contract UserRegistryTest is Test {
    UserRegistry public userRegistry;
    
    address public alice = address(0x1);
    address public bob = address(0x2);
    
    function setUp() public {
        userRegistry = new UserRegistry();
    }
    
    function testRegisterUser() public {
        string[] memory interests = new string[](2);
        interests[0] = "DeFi";
        interests[1] = "NFTs";
        
        vm.prank(alice);
        userRegistry.registerUser(true, "avatar1", interests, "Adventurer");
        
        UserRegistry.UserProfile memory profile = userRegistry.getProfile(alice);
        
        assertEq(profile.exists, true);
        assertEq(profile.isDatingMode, true);
        assertEq(profile.xp, 50); // Registration XP
        assertEq(profile.level, 1);
        assertEq(profile.avatar, "avatar1");
        assertEq(profile.questStyle, "Adventurer");
    }
    
    function testCannotRegisterTwice() public {
        string[] memory interests = new string[](1);
        interests[0] = "DeFi";
        
        vm.startPrank(alice);
        userRegistry.registerUser(true, "avatar1", interests, "Adventurer");
        
        vm.expectRevert("User already registered");
        userRegistry.registerUser(false, "avatar2", interests, "Socialite");
        vm.stopPrank();
    }
    
    function testAwardXP() public {
        string[] memory interests = new string[](1);
        interests[0] = "DeFi";
        
        vm.prank(alice);
        userRegistry.registerUser(true, "avatar1", interests, "Adventurer");
        
        // Award XP as owner
        userRegistry.awardXP(alice, 100, "Test reward");
        
        UserRegistry.UserProfile memory profile = userRegistry.getProfile(alice);
        assertEq(profile.xp, 150); // 50 registration + 100 test
        assertEq(profile.level, 2); // Should level up
    }
    
    function testLevelProgression() public {
        string[] memory interests = new string[](1);
        interests[0] = "DeFi";
        
        vm.prank(alice);
        userRegistry.registerUser(true, "avatar1", interests, "Adventurer");
        
        // Award enough XP to reach level 5
        userRegistry.awardXP(alice, 350, "Level test"); // 50 + 350 = 400 XP = Level 5
        
        UserRegistry.UserProfile memory profile = userRegistry.getProfile(alice);
        assertEq(profile.level, 5);
        
        // Check that Rising Star badge was awarded
        string[] memory badges = userRegistry.getUserBadges(alice);
        assertEq(badges[1], "Rising Star"); // badges[0] is "Pioneer"
    }
}