// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract UserRegistry is Ownable, ReentrancyGuard {
    struct UserProfile {
        bool exists;
        bool isDatingMode; // true for dating, false for friendship
        uint256 xp;
        uint256 level;
        uint256 crushCount;
        uint256 questsCompleted;
        uint256 nftCount;
        string avatar;
        string[] interests;
        string questStyle; // "Adventurer", "Socialite", "Strategist", "Wildcard"
        uint256 createdAt;
        uint256 lastActive;
    }

    struct UserPreferences {
        bool lookingForDating;
        bool lookingForFriends;
        uint256 minAge;
        uint256 maxAge;
        string[] preferredInterests;
    }

    mapping(address => UserProfile) public profiles;
    mapping(address => UserPreferences) public preferences;
    mapping(address => string[]) public userBadges;
    mapping(address => bool) public authorizedXPAwarded;
    
    address[] public activeUsers;
    mapping(address => uint256) private activeUserIndex;

    uint256 public constant XP_PER_LEVEL = 100;
    uint256 public constant XP_SWIPE = 5;
    uint256 public constant XP_MATCH = 20;
    uint256 public constant XP_QUEST = 50;

    event UserRegistered(address indexed user, bool isDatingMode);
    event ProfileUpdated(address indexed user);
    event XPAwarded(address indexed user, uint256 amount, string reason);
    event LevelUp(address indexed user, uint256 newLevel);
    event BadgeEarned(address indexed user, string badge);

    constructor() Ownable(msg.sender) {}

    function registerUser(
        bool _isDatingMode,
        string memory _avatar,
        string[] memory _interests,
        string memory _questStyle
    ) external {
        require(!profiles[msg.sender].exists, "User already registered");
        require(_interests.length > 0, "Must have at least one interest");

        profiles[msg.sender] = UserProfile({
            exists: true,
            isDatingMode: _isDatingMode,
            xp: 0,
            level: 1,
            crushCount: 0,
            questsCompleted: 0,
            nftCount: 0,
            avatar: _avatar,
            interests: _interests,
            questStyle: _questStyle,
            createdAt: block.timestamp,
            lastActive: block.timestamp
        });

        activeUsers.push(msg.sender);
        activeUserIndex[msg.sender] = activeUsers.length - 1;

        emit UserRegistered(msg.sender, _isDatingMode);
        
        // Award registration XP and pioneer badge
        _awardXP(msg.sender, 50, "Registration");
        _awardBadge(msg.sender, "Pioneer");
    }

    function updateProfile(
        string memory _avatar,
        string[] memory _interests,
        string memory _questStyle
    ) external {
        require(profiles[msg.sender].exists, "User not registered");
        
        UserProfile storage profile = profiles[msg.sender];
        profile.avatar = _avatar;
        profile.interests = _interests;
        profile.questStyle = _questStyle;
        profile.lastActive = block.timestamp;

        emit ProfileUpdated(msg.sender);
    }

    function setPreferences(
        bool _lookingForDating,
        bool _lookingForFriends,
        uint256 _minAge,
        uint256 _maxAge,
        string[] memory _preferredInterests
    ) external {
        require(profiles[msg.sender].exists, "User not registered");

        preferences[msg.sender] = UserPreferences({
            lookingForDating: _lookingForDating,
            lookingForFriends: _lookingForFriends,
            minAge: _minAge,
            maxAge: _maxAge,
            preferredInterests: _preferredInterests
        });
    }

    function addAuthorizedXPAwarder(address awarder) external onlyOwner {
        authorizedXPAwarded[awarder] = true;
    }

    function removeAuthorizedXPAwarder(address awarder) external onlyOwner {
        authorizedXPAwarded[awarder] = false;
    }

    function awardXP(address user, uint256 amount, string memory reason) external {
        require(msg.sender == owner() || authorizedXPAwarded[msg.sender], "Not authorized to award XP");
        _awardXP(user, amount, reason);
    }

    function _awardXP(address user, uint256 amount, string memory reason) internal {
        require(profiles[user].exists, "User not registered");
        
        UserProfile storage profile = profiles[user];
        uint256 oldLevel = profile.level;
        profile.xp += amount;
        
        uint256 newLevel = (profile.xp / XP_PER_LEVEL) + 1;
        if (newLevel > oldLevel) {
            profile.level = newLevel;
            emit LevelUp(user, newLevel);
            
            // Award level milestone badges
            if (newLevel == 5) _awardBadge(user, "Rising Star");
            if (newLevel == 10) _awardBadge(user, "Veteran");
            if (newLevel == 20) _awardBadge(user, "Legend");
        }

        emit XPAwarded(user, amount, reason);
    }

    function awardBadge(address user, string memory badge) external onlyOwner {
        _awardBadge(user, badge);
    }

    function _awardBadge(address user, string memory badge) internal {
        require(profiles[user].exists, "User not registered");
        userBadges[user].push(badge);
        emit BadgeEarned(user, badge);
    }

    function incrementCrushCount(address user) external {
        require(msg.sender == owner() || authorizedXPAwarded[msg.sender], "Not authorized");
        require(profiles[user].exists, "User not registered");
        profiles[user].crushCount++;
    }

    function incrementQuestCount(address user) external {
        require(msg.sender == owner() || authorizedXPAwarded[msg.sender], "Not authorized");
        require(profiles[user].exists, "User not registered");
        profiles[user].questsCompleted++;
        _awardXP(user, XP_QUEST, "Quest Completed");
    }

    function updateNFTCount(address user, uint256 count) external {
        require(msg.sender == owner() || authorizedXPAwarded[msg.sender], "Not authorized");
        require(profiles[user].exists, "User not registered");
        profiles[user].nftCount = count;
    }

    function updateLastActive(address user) external {
        require(profiles[user].exists, "User not registered");
        require(msg.sender == user || msg.sender == owner(), "Unauthorized");
        profiles[user].lastActive = block.timestamp;
    }

    // View functions
    function getProfile(address user) external view returns (UserProfile memory) {
        return profiles[user];
    }

    function getPreferences(address user) external view returns (UserPreferences memory) {
        return preferences[user];
    }

    function getUserBadges(address user) external view returns (string[] memory) {
        return userBadges[user];
    }

    function getActiveUsers() external view returns (address[] memory) {
        return activeUsers;
    }

    function getUserLevel(address user) external view returns (uint256) {
        if (!profiles[user].exists) return 0;
        return profiles[user].level;
    }

    function getUserXP(address user) external view returns (uint256) {
        if (!profiles[user].exists) return 0;
        return profiles[user].xp;
    }

    function getXPForNextLevel(address user) external view returns (uint256) {
        if (!profiles[user].exists) return 0;
        uint256 currentLevel = profiles[user].level;
        uint256 xpForNextLevel = currentLevel * XP_PER_LEVEL;
        return xpForNextLevel > profiles[user].xp ? xpForNextLevel - profiles[user].xp : 0;
    }

    function isUserRegistered(address user) external view returns (bool) {
        return profiles[user].exists;
    }
}