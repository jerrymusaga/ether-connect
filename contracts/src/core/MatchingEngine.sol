// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./UserRegistry.sol";

interface ICrushSBT {
    function mintCrushSBT(address user1, address user2) external returns (uint256);
}

interface IMomentNFT {
    function mintMomentNFT(address user1, address user2) external returns (uint256);
}

contract MatchingEngine is Ownable, ReentrancyGuard {
    UserRegistry public userRegistry;
    ICrushSBT public crushSBT;
    IMomentNFT public momentNFT;

    struct Match {
        address user1;
        address user2;
        uint256 crushSBTId;
        uint256 momentNFTId;
        uint256 chemistryScore;
        uint256 createdAt;
        bool isActive;
    }

    struct Like {
        address liker;
        address liked;
        uint256 timestamp;
    }

    mapping(address => mapping(address => bool)) public hasLiked;
    mapping(address => mapping(address => bool)) public hasMatched;
    mapping(bytes32 => Match) public matches;
    mapping(address => Like[]) public userLikes;
    mapping(address => bytes32[]) public userMatches;
    
    Like[] public allLikes;
    bytes32[] public allMatches;

    event UserLiked(address indexed liker, address indexed liked, uint256 chemistryScore);
    event MatchCreated(
        address indexed user1, 
        address indexed user2, 
        bytes32 indexed matchId,
        uint256 crushSBTId,
        uint256 momentNFTId,
        uint256 chemistryScore
    );
    event ChemistryUpdated(address indexed user1, address indexed user2, uint256 newScore);

    constructor(address _userRegistry) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
    }

    function setCrushSBT(address _crushSBT) external onlyOwner {
        crushSBT = ICrushSBT(_crushSBT);
    }

    function setMomentNFT(address _momentNFT) external onlyOwner {
        momentNFT = IMomentNFT(_momentNFT);
    }

    function likeUser(address liked) external nonReentrant {
        require(userRegistry.isUserRegistered(msg.sender), "Liker not registered");
        require(userRegistry.isUserRegistered(liked), "Liked user not registered");
        require(msg.sender != liked, "Cannot like yourself");
        require(!hasLiked[msg.sender][liked], "Already liked this user");
        require(!hasMatched[msg.sender][liked], "Already matched with this user");

        // Record the like
        hasLiked[msg.sender][liked] = true;
        Like memory newLike = Like({
            liker: msg.sender,
            liked: liked,
            timestamp: block.timestamp
        });
        
        userLikes[msg.sender].push(newLike);
        allLikes.push(newLike);

        // Calculate chemistry score
        uint256 chemistryScore = calculateChemistry(msg.sender, liked);

        // Award XP for swiping
        userRegistry.awardXP(msg.sender, userRegistry.XP_SWIPE(), "Swipe");

        emit UserLiked(msg.sender, liked, chemistryScore);

        // Check for mutual match
        if (hasLiked[liked][msg.sender]) {
            _createMatch(msg.sender, liked, chemistryScore);
        }
    }

    function _createMatch(address user1, address user2, uint256 chemistryScore) internal {
        require(address(crushSBT) != address(0), "CrushSBT not set");
        require(address(momentNFT) != address(0), "MomentNFT not set");

        // Mark as matched
        hasMatched[user1][user2] = true;
        hasMatched[user2][user1] = true;

        // Generate unique match ID
        bytes32 matchId = keccak256(abi.encodePacked(user1, user2, block.timestamp));

        // Mint CrushSBT and MomentNFT
        uint256 crushSBTId = crushSBT.mintCrushSBT(user1, user2);
        uint256 momentNFTId = momentNFT.mintMomentNFT(user1, user2);

        // Create match record
        matches[matchId] = Match({
            user1: user1,
            user2: user2,
            crushSBTId: crushSBTId,
            momentNFTId: momentNFTId,
            chemistryScore: chemistryScore,
            createdAt: block.timestamp,
            isActive: true
        });

        // Update user records
        userMatches[user1].push(matchId);
        userMatches[user2].push(matchId);
        allMatches.push(matchId);

        // Update user registry
        userRegistry.incrementCrushCount(user1);
        userRegistry.incrementCrushCount(user2);

        // Award match XP
        userRegistry.awardXP(user1, userRegistry.XP_MATCH(), "Match");
        userRegistry.awardXP(user2, userRegistry.XP_MATCH(), "Match");

        emit MatchCreated(user1, user2, matchId, crushSBTId, momentNFTId, chemistryScore);
    }

    function calculateChemistry(address user1, address user2) public view returns (uint256) {
        UserRegistry.UserProfile memory profile1 = userRegistry.getProfile(user1);
        UserRegistry.UserProfile memory profile2 = userRegistry.getProfile(user2);

        if (!profile1.exists || !profile2.exists) return 0;

        uint256 score = 0;
        uint256 maxScore = 100;

        // Mode compatibility (40 points)
        if (profile1.isDatingMode == profile2.isDatingMode) {
            score += 40;
        } else if (!profile1.isDatingMode && !profile2.isDatingMode) {
            // Both in friendship mode
            score += 35;
        } else {
            // One dating, one friendship - partial compatibility
            score += 15;
        }

        // Interest overlap (30 points)
        uint256 commonInterests = _countCommonInterests(profile1.interests, profile2.interests);
        uint256 totalInterests = profile1.interests.length + profile2.interests.length;
        if (totalInterests > 0) {
            score += (commonInterests * 30) / (totalInterests / 2);
        }

        // Level compatibility (20 points)
        uint256 levelDiff = profile1.level > profile2.level ? 
            profile1.level - profile2.level : 
            profile2.level - profile1.level;
        
        if (levelDiff == 0) {
            score += 20;
        } else if (levelDiff <= 2) {
            score += 15;
        } else if (levelDiff <= 5) {
            score += 10;
        } else {
            score += 5;
        }

        // Quest style compatibility (10 points)
        if (keccak256(bytes(profile1.questStyle)) == keccak256(bytes(profile2.questStyle))) {
            score += 10;
        } else {
            score += 5; // Partial points for diversity
        }

        return score > maxScore ? maxScore : score;
    }

    function _countCommonInterests(
        string[] memory interests1, 
        string[] memory interests2
    ) internal pure returns (uint256) {
        uint256 common = 0;
        
        for (uint256 i = 0; i < interests1.length; i++) {
            for (uint256 j = 0; j < interests2.length; j++) {
                if (keccak256(bytes(interests1[i])) == keccak256(bytes(interests2[j]))) {
                    common++;
                    break;
                }
            }
        }
        
        return common;
    }

    function updateChemistryScore(bytes32 matchId, uint256 newScore) external onlyOwner {
        require(matches[matchId].isActive, "Match not active");
        matches[matchId].chemistryScore = newScore;
        
        emit ChemistryUpdated(
            matches[matchId].user1, 
            matches[matchId].user2, 
            newScore
        );
    }

    // View functions
    function getMatch(bytes32 matchId) external view returns (Match memory) {
        return matches[matchId];
    }

    function getUserLikes(address user) external view returns (Like[] memory) {
        return userLikes[user];
    }

    function getUserMatches(address user) external view returns (bytes32[] memory) {
        return userMatches[user];
    }

    function getAllMatches() external view returns (bytes32[] memory) {
        return allMatches;
    }

    function hasUserLiked(address liker, address liked) external view returns (bool) {
        return hasLiked[liker][liked];
    }

    function areUsersMatched(address user1, address user2) external view returns (bool) {
        return hasMatched[user1][user2];
    }

    function getLikesCount() external view returns (uint256) {
        return allLikes.length;
    }

    function getMatchesCount() external view returns (uint256) {
        return allMatches.length;
    }
}