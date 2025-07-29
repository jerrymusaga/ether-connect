# Ether-Connect Smart Contracts

Onchain dating and social quest platform built on Etherlink.

## Architecture

### Core Contracts
- `UserRegistry.sol` - User profiles, XP, levels, preferences
- `MatchingEngine.sol` - Like/match logic, chemistry calculations

### NFT Contracts  
- `CrushSBT.sol` - Soulbound tokens for mutual matches
- `MomentNFT.sol` - Evolving relationship NFTs
- `BuddyBadge.sol` - Friendship mode NFTs

### Token Contracts
- `EtherToken.sol` - Platform utility token for rewards

## Development

```bash
# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test

# Deploy to Etherlink testnet
forge script script/deploy/DeployAll.s.sol --rpc-url etherlink --broadcast --verify
```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in your private key and RPC URLs
3. Get testnet ETH from Etherlink faucet

## Contract Addresses

Will be populated after deployment.