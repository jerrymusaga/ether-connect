// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract EtherToken is ERC20, Ownable, ReentrancyGuard {
    // Reward amounts
    uint256 public constant QUEST_REWARD = 50 * 10**18;        // 50 ETHER
    uint256 public constant MATCH_REWARD = 20 * 10**18;        // 20 ETHER  
    uint256 public constant LEVEL_UP_REWARD = 100 * 10**18;    // 100 ETHER
    uint256 public constant DAILY_LOGIN_REWARD = 10 * 10**18;  // 10 ETHER
    uint256 public constant REKT_CONSOLATION = 5 * 10**18;     // 5 ETHER (CrushDust)

    // Authorized contracts
    mapping(address => bool) public authorizedMinters;
    
    // User reward tracking
    mapping(address => uint256) public lastDailyLogin;
    mapping(address => uint256) public totalEarned;
    mapping(address => uint256) public questRewardsEarned;
    mapping(address => uint256) public matchRewardsEarned;

    // Supply limits
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1B ETHER
    uint256 public constant INITIAL_SUPPLY = 100_000_000 * 10**18; // 100M for initial distribution

    event RewardMinted(address indexed to, uint256 amount, string reason);
    event DailyLoginClaimed(address indexed user, uint256 amount);
    event AuthorizedMinterAdded(address indexed minter);
    event AuthorizedMinterRemoved(address indexed minter);

    constructor() ERC20("Ether-Connect Token", "ETHER") Ownable(msg.sender) {
        // Mint initial supply to owner for distribution
        _mint(msg.sender, INITIAL_SUPPLY);
        
        // Owner is authorized minter by default
        authorizedMinters[msg.sender] = true;
    }

    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        _;
    }

    function addAuthorizedMinter(address minter) external onlyOwner {
        require(minter != address(0), "Invalid address");
        authorizedMinters[minter] = true;
        emit AuthorizedMinterAdded(minter);
    }

    function removeAuthorizedMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit AuthorizedMinterRemoved(minter);
    }

    function mintQuestReward(address to) external onlyAuthorizedMinter nonReentrant {
        require(to != address(0), "Invalid address");
        require(totalSupply() + QUEST_REWARD <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, QUEST_REWARD);
        totalEarned[to] += QUEST_REWARD;
        questRewardsEarned[to] += QUEST_REWARD;
        
        emit RewardMinted(to, QUEST_REWARD, "Quest Completion");
    }

    function mintMatchReward(address to) external onlyAuthorizedMinter nonReentrant {
        require(to != address(0), "Invalid address");
        require(totalSupply() + MATCH_REWARD <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, MATCH_REWARD);
        totalEarned[to] += MATCH_REWARD;
        matchRewardsEarned[to] += MATCH_REWARD;
        
        emit RewardMinted(to, MATCH_REWARD, "Match Creation");
    }

    function mintLevelUpReward(address to) external onlyAuthorizedMinter nonReentrant {
        require(to != address(0), "Invalid address");
        require(totalSupply() + LEVEL_UP_REWARD <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, LEVEL_UP_REWARD);
        totalEarned[to] += LEVEL_UP_REWARD;
        
        emit RewardMinted(to, LEVEL_UP_REWARD, "Level Up");
    }

    function mintRektConsolation(address to) external onlyAuthorizedMinter nonReentrant {
        require(to != address(0), "Invalid address");
        require(totalSupply() + REKT_CONSOLATION <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, REKT_CONSOLATION);
        totalEarned[to] += REKT_CONSOLATION;
        
        emit RewardMinted(to, REKT_CONSOLATION, "Rekt in Love Consolation");
    }

    function claimDailyLogin() external nonReentrant {
        require(
            block.timestamp >= lastDailyLogin[msg.sender] + 24 hours,
            "Daily login already claimed"
        );
        require(totalSupply() + DAILY_LOGIN_REWARD <= MAX_SUPPLY, "Max supply exceeded");
        
        lastDailyLogin[msg.sender] = block.timestamp;
        _mint(msg.sender, DAILY_LOGIN_REWARD);
        totalEarned[msg.sender] += DAILY_LOGIN_REWARD;
        
        emit DailyLoginClaimed(msg.sender, DAILY_LOGIN_REWARD);
    }

    function batchMintRewards(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string calldata reason
    ) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "Invalid address");
            require(totalSupply() + amounts[i] <= MAX_SUPPLY, "Max supply exceeded");
            
            _mint(recipients[i], amounts[i]);
            totalEarned[recipients[i]] += amounts[i];
            
            emit RewardMinted(recipients[i], amounts[i], reason);
        }
    }

    // Emergency functions
    function emergencyMint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        
        _mint(to, amount);
        emit RewardMinted(to, amount, "Emergency Mint");
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) external {
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }

    // View functions
    function canClaimDailyLogin(address user) external view returns (bool) {
        return block.timestamp >= lastDailyLogin[user] + 24 hours;
    }

    function getTimeUntilNextDailyLogin(address user) external view returns (uint256) {
        uint256 nextClaimTime = lastDailyLogin[user] + 24 hours;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        return nextClaimTime - block.timestamp;
    }

    function getUserStats(address user) external view returns (
        uint256 balance,
        uint256 totalEarnedAmount,
        uint256 questRewards,
        uint256 matchRewards,
        uint256 lastLogin,
        bool canClaimDaily
    ) {
        balance = balanceOf(user);
        totalEarnedAmount = totalEarned[user];
        questRewards = questRewardsEarned[user];
        matchRewards = matchRewardsEarned[user];
        lastLogin = lastDailyLogin[user];
        canClaimDaily = block.timestamp >= lastDailyLogin[user] + 24 hours;
    }

    function getRemainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }

    function isAuthorizedMinter(address account) external view returns (bool) {
        return authorizedMinters[account];
    }
}