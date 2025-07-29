// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MomentNFT is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    struct MomentToken {
        address user1;
        address user2;
        uint256 level;
        uint256 questsCompleted;
        uint256 createdAt;
        uint256 lastLevelUp;
        bool isActive;
        string[] completedQuests;
        uint256 totalXP;
    }

    struct QuestCompletion {
        string questName;
        uint256 timestamp;
        uint256 xpAwarded;
    }

    mapping(uint256 => MomentToken) public momentTokens;
    mapping(address => uint256[]) public userMomentTokens;
    mapping(uint256 => QuestCompletion[]) public tokenQuestHistory;
    
    uint256 private _tokenIdCounter;
    address public matchingEngine;
    address public questManager;

    // Level progression requirements
    uint256 public constant XP_PER_LEVEL = 100;
    uint256 public constant MAX_LEVEL = 50;

    event MomentNFTMinted(
        uint256 indexed tokenId,
        address indexed user1,
        address indexed user2
    );
    
    event MomentLevelUp(
        uint256 indexed tokenId,
        uint256 newLevel,
        uint256 totalXP
    );
    
    event QuestCompleted(
        uint256 indexed tokenId,
        string questName,
        uint256 xpAwarded
    );

    constructor() ERC721("Ether-Connect Moment NFT", "MOMENT") Ownable(msg.sender) {}

    modifier onlyAuthorized() {
        require(
            msg.sender == matchingEngine || 
            msg.sender == questManager || 
            msg.sender == owner(),
            "Not authorized"
        );
        _;
    }

    function setMatchingEngine(address _matchingEngine) external onlyOwner {
        require(_matchingEngine != address(0), "Invalid address");
        matchingEngine = _matchingEngine;
    }

    function setQuestManager(address _questManager) external onlyOwner {
        require(_questManager != address(0), "Invalid address");  
        questManager = _questManager;
    }

    function mintMomentNFT(
        address user1,
        address user2
    ) external onlyAuthorized nonReentrant returns (uint256) {
        require(user1 != address(0) && user2 != address(0), "Invalid addresses");
        require(user1 != user2, "Cannot create moment with self");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        // Create moment token data
        momentTokens[tokenId] = MomentToken({
            user1: user1,
            user2: user2,
            level: 1,
            questsCompleted: 0,
            createdAt: block.timestamp,
            lastLevelUp: block.timestamp,
            isActive: true,
            completedQuests: new string[](0),
            totalXP: 0
        });

        // Track tokens for both users
        userMomentTokens[user1].push(tokenId);
        userMomentTokens[user2].push(tokenId);

        // Mint to user1 (primary holder)
        _safeMint(user1, tokenId);
        
        emit MomentNFTMinted(tokenId, user1, user2);
        
        return tokenId;
    }

    function completeQuest(
        uint256 tokenId,
        string memory questName,
        uint256 xpAwarded
    ) external onlyAuthorized {
        require(_exists(tokenId), "Token does not exist");
        require(momentTokens[tokenId].isActive, "Moment not active");

        MomentToken storage token = momentTokens[tokenId];
        
        // Add quest to completed list
        token.completedQuests.push(questName);
        token.questsCompleted++;
        token.totalXP += xpAwarded;

        // Record quest completion
        tokenQuestHistory[tokenId].push(QuestCompletion({
            questName: questName,
            timestamp: block.timestamp,
            xpAwarded: xpAwarded
        }));

        // Check for level up
        uint256 newLevel = (token.totalXP / XP_PER_LEVEL) + 1;
        if (newLevel > token.level && newLevel <= MAX_LEVEL) {
            token.level = newLevel;
            token.lastLevelUp = block.timestamp;
            emit MomentLevelUp(tokenId, newLevel, token.totalXP);
        }

        emit QuestCompleted(tokenId, questName, xpAwarded);
    }

    function deactivateMoment(uint256 tokenId) external onlyAuthorized {
        require(_exists(tokenId), "Token does not exist");
        momentTokens[tokenId].isActive = false;
    }

    function reactivateMoment(uint256 tokenId) external onlyAuthorized {
        require(_exists(tokenId), "Token does not exist");
        momentTokens[tokenId].isActive = true;
    }

    // Check if user is associated with token
    function isTokenHolder(uint256 tokenId, address user) external view returns (bool) {
        if (!_exists(tokenId)) return false;
        MomentToken memory token = momentTokens[tokenId];
        return token.user1 == user || token.user2 == user;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        MomentToken memory token = momentTokens[tokenId];
        
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        _getMomentName(token.level),
                        ' #',
                        tokenId.toString(),
                        '",',
                        '"description": "An evolving NFT representing a relationship journey on Ether-Connect",',
                        '"image": "data:image/svg+xml;base64,',
                        _generateSVG(tokenId),
                        '",',
                        '"attributes": [',
                        '{"trait_type": "Level", "value": ',
                        token.level.toString(),
                        '},',
                        '{"trait_type": "Total XP", "value": ',
                        token.totalXP.toString(),
                        '},',
                        '{"trait_type": "Quests Completed", "value": ',
                        token.questsCompleted.toString(),
                        '},',
                        '{"trait_type": "Status", "value": "',
                        token.isActive ? "Active" : "Inactive",
                        '"},',
                        '{"trait_type": "Evolution Stage", "value": "',
                        _getEvolutionStage(token.level),
                        '"}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function _getMomentName(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "First Spark";
        if (level <= 5) return "Growing Connection";
        if (level <= 10) return "Strong Bond";
        if (level <= 20) return "Deep Connection";
        if (level <= 30) return "Unbreakable Bond";
        if (level <= 40) return "Legendary Love";
        return "Eternal Moment";
    }

    function _getEvolutionStage(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "Spark";
        if (level <= 5) return "Flame";
        if (level <= 10) return "Fire";
        if (level <= 20) return "Blaze";
        if (level <= 30) return "Inferno";
        if (level <= 40) return "Phoenix";
        return "Cosmic";
    }

    function _generateSVG(uint256 tokenId) internal view returns (string memory) {
        MomentToken memory token = momentTokens[tokenId];
        
        // Generate different visuals based on level
        string memory centerSymbol = _getLevelSymbol(token.level);
        string memory bgColor = _getLevelColor(token.level);
        string memory glowColor = _getGlowColor(token.level);
        
        string memory svg = string(
            abi.encodePacked(
                '<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">',
                '<defs>',
                '<radialGradient id="bg" cx="50%" cy="50%" r="50%">',
                '<stop offset="0%" style="stop-color:',
                bgColor,
                ';stop-opacity:1" />',
                '<stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />',
                '</radialGradient>',
                '<filter id="glow">',
                '<feGaussianBlur stdDeviation="3" result="coloredBlur"/>',
                '<feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>',
                '</filter>',
                '</defs>',
                '<rect width="300" height="300" fill="url(#bg)" rx="15"/>',
                '<circle cx="150" cy="150" r="',
                (40 + (token.level * 2)).toString(),
                '" fill="none" stroke="',
                glowColor,
                '" stroke-width="2" opacity="0.6" filter="url(#glow)"/>',
                '<text x="150" y="160" text-anchor="middle" fill="white" font-size="40" font-family="Arial">',
                centerSymbol,
                '</text>',
                '<text x="150" y="220" text-anchor="middle" fill="white" font-size="14" font-family="Arial">Level ',
                token.level.toString(),
                '</text>',
                '<text x="150" y="240" text-anchor="middle" fill="white" font-size="12" font-family="Arial">',
                token.questsCompleted.toString(),
                ' Quests Completed</text>',
                '<text x="150" y="280" text-anchor="middle" fill="white" font-size="10" font-family="Arial">Ether-Connect Moment</text>',
                '</svg>'
            )
        );
        
        return Base64.encode(bytes(svg));
    }

    function _getLevelSymbol(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "*";
        if (level <= 5) return "HEART";
        if (level <= 10) return "DIAMOND";
        if (level <= 20) return "FIRE";
        if (level <= 30) return "STAR";
        if (level <= 40) return "CROWN";
        return "KING";
    }

    function _getLevelColor(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "#ff9ff3";
        if (level <= 5) return "#ff6b6b";
        if (level <= 10) return "#4ecdc4";
        if (level <= 20) return "#ffe66d";
        if (level <= 30) return "#a8e6cf";
        if (level <= 40) return "#ffd93d";
        return "#c44569";
    }

    function _getGlowColor(uint256 level) internal pure returns (string memory) {
        if (level == 1) return "#ffffff";
        if (level <= 5) return "#ff6b6b";
        if (level <= 10) return "#00d2d3";
        if (level <= 20) return "#ffb347";
        if (level <= 30) return "#98fb98";
        if (level <= 40) return "#ffd700";
        return "#da70d6";
    }

    // View functions
    function getMomentToken(uint256 tokenId) external view returns (MomentToken memory) {
        require(_exists(tokenId), "Token does not exist");
        return momentTokens[tokenId];
    }

    function getQuestHistory(uint256 tokenId) external view returns (QuestCompletion[] memory) {
        return tokenQuestHistory[tokenId];
    }

    function getUserMomentTokens(address user) external view returns (uint256[] memory) {
        return userMomentTokens[user];
    }

    function getXPForNextLevel(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        MomentToken memory token = momentTokens[tokenId];
        
        if (token.level >= MAX_LEVEL) return 0;
        
        uint256 xpForNextLevel = token.level * XP_PER_LEVEL;
        return xpForNextLevel > token.totalXP ? xpForNextLevel - token.totalXP : 0;
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId <= _tokenIdCounter;
    }
}