// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract CrushSBT is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    struct CrushToken {
        address user1;
        address user2;
        uint256 createdAt;
        uint256 chemistryScore;
        bool isActive;
    }

    mapping(uint256 => CrushToken) public crushTokens;
    mapping(address => uint256[]) public userCrushTokens;
    mapping(bytes32 => uint256) public matchToCrushToken; // matchId => tokenId
    
    uint256 private _tokenIdCounter;
    address public matchingEngine;

    event CrushSBTMinted(
        uint256 indexed tokenId,
        address indexed user1,
        address indexed user2,
        uint256 chemistryScore
    );

    constructor() ERC721("Ether-Connect Crush SBT", "CRUSH") Ownable(msg.sender) {}

    modifier onlyMatchingEngine() {
        require(msg.sender == matchingEngine, "Only MatchingEngine can call");
        _;
    }

    function setMatchingEngine(address _matchingEngine) external onlyOwner {
        require(_matchingEngine != address(0), "Invalid address");
        matchingEngine = _matchingEngine;
    }

    function mintCrushSBT(
        address user1,
        address user2
    ) external onlyMatchingEngine nonReentrant returns (uint256) {
        require(user1 != address(0) && user2 != address(0), "Invalid addresses");
        require(user1 != user2, "Cannot match with self");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        // Create crush token data
        crushTokens[tokenId] = CrushToken({
            user1: user1,
            user2: user2,
            createdAt: block.timestamp,
            chemistryScore: 0, // Will be updated by MatchingEngine
            isActive: true
        });

        // Track tokens for both users
        userCrushTokens[user1].push(tokenId);
        userCrushTokens[user2].push(tokenId);

        // Mint to both users (they both own the same SBT)
        _safeMint(user1, tokenId);
        
        emit CrushSBTMinted(tokenId, user1, user2, 0);
        
        return tokenId;
    }

    function updateChemistryScore(
        uint256 tokenId,
        uint256 newScore
    ) external onlyMatchingEngine {
        require(_exists(tokenId), "Token does not exist");
        crushTokens[tokenId].chemistryScore = newScore;
    }

    function deactivateCrush(uint256 tokenId) external onlyMatchingEngine {
        require(_exists(tokenId), "Token does not exist");
        crushTokens[tokenId].isActive = false;
    }

    // Override _update to make it soulbound
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address previousOwner = super._update(to, tokenId, auth);
        // Allow minting (from == address(0)) but prevent transfers
        if (previousOwner != address(0) && to != address(0)) {
            revert("CrushSBT: Soulbound token cannot be transferred");
        }
        return previousOwner;
    }

    // Check if user owns/co-owns a crush token
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return userCrushTokens[owner].length;
    }

    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: owner query for nonexistent token");
        // Return user1 as the primary owner for ERC721 compatibility
        return crushTokens[tokenId].user1;
    }

    // Custom function to check if address is associated with token
    function isTokenHolder(uint256 tokenId, address user) external view returns (bool) {
        if (!_exists(tokenId)) return false;
        CrushToken memory token = crushTokens[tokenId];
        return token.user1 == user || token.user2 == user;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        
        CrushToken memory token = crushTokens[tokenId];
        
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Crush Connection #',
                        tokenId.toString(),
                        '",',
                        '"description": "A soulbound token representing a mutual connection on Ether-Connect",',
                        '"image": "data:image/svg+xml;base64,',
                        _generateSVG(tokenId),
                        '",',
                        '"attributes": [',
                        '{"trait_type": "Chemistry Score", "value": ',
                        token.chemistryScore.toString(),
                        '},',
                        '{"trait_type": "Created At", "value": ',
                        token.createdAt.toString(),
                        '},',
                        '{"trait_type": "Status", "value": "',
                        token.isActive ? "Active" : "Inactive",
                        '"},',
                        '{"trait_type": "Type", "value": "Crush SBT"}',
                        ']}'
                    )
                )
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function _generateSVG(uint256 tokenId) internal view returns (string memory) {
        CrushToken memory token = crushTokens[tokenId];
        
        string memory svg = string(
            abi.encodePacked(
                '<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">',
                '<defs>',
                '<linearGradient id="crushGradient" x1="0%" y1="0%" x2="100%" y2="100%">',
                '<stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />',
                '<stop offset="100%" style="stop-color:#ee5a52;stop-opacity:1" />',
                '</linearGradient>',
                '</defs>',
                '<rect width="300" height="300" fill="url(#crushGradient)" rx="15"/>',
                '<circle cx="150" cy="120" r="40" fill="white" opacity="0.9"/>',
                '<text x="150" y="130" text-anchor="middle" fill="#ff6b6b" font-size="30" font-family="Arial">CRUSH</text>',
                '<text x="150" y="180" text-anchor="middle" fill="white" font-size="16" font-family="Arial">Crush Connection</text>',
                '<text x="150" y="200" text-anchor="middle" fill="white" font-size="12" font-family="Arial">#',
                tokenId.toString(),
                '</text>',
                '<text x="150" y="220" text-anchor="middle" fill="white" font-size="12" font-family="Arial">Chemistry: ',
                token.chemistryScore.toString(),
                '%</text>',
                '<text x="150" y="260" text-anchor="middle" fill="white" font-size="10" font-family="Arial">Soulbound - Ether-Connect</text>',
                '</svg>'
            )
        );
        
        return Base64.encode(bytes(svg));
    }

    // View functions
    function getCrushToken(uint256 tokenId) external view returns (CrushToken memory) {
        require(_exists(tokenId), "Token does not exist");
        return crushTokens[tokenId];
    }

    function getUserCrushTokens(address user) external view returns (uint256[] memory) {
        return userCrushTokens[user];
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId <= _tokenIdCounter;
    }
}