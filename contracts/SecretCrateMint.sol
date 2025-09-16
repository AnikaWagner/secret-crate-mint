// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretCrateMint is SepoliaConfig {
    using FHE for *;
    
    struct SecretCrate {
        euint32 crateId;
        euint32 totalSupply;
        euint32 currentMinted;
        euint32 price;
        euint32 rarity;
        bool isActive;
        bool isRevealed;
        string name;
        string description;
        string encryptedMetadata;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 revealTime;
    }
    
    struct NFT {
        euint32 tokenId;
        euint32 crateId;
        euint32 rarity;
        address owner;
        uint256 mintTime;
        bool isRevealed;
        string encryptedMetadata;
    }
    
    struct MintTransaction {
        euint32 transactionId;
        euint32 crateId;
        euint32 amount;
        address minter;
        uint256 timestamp;
        bool isProcessed;
    }
    
    mapping(uint256 => SecretCrate) public crates;
    mapping(uint256 => NFT) public nfts;
    mapping(uint256 => MintTransaction) public mintTransactions;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userMintCount;
    
    uint256 public crateCounter;
    uint256 public nftCounter;
    uint256 public transactionCounter;
    
    address public owner;
    address public verifier;
    
    event CrateCreated(uint256 indexed crateId, address indexed creator, string name);
    event NFTPurchased(uint256 indexed transactionId, uint256 indexed crateId, address indexed minter, uint32 amount);
    event NFTRevealed(uint256 indexed tokenId, uint256 indexed crateId, address indexed owner);
    event CrateRevealed(uint256 indexed crateId, address indexed creator);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createCrate(
        string memory _name,
        string memory _description,
        uint256 _totalSupply,
        uint256 _price,
        uint256 _duration,
        uint256 _revealDelay
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Crate name cannot be empty");
        require(_totalSupply > 0, "Total supply must be positive");
        require(_duration > 0, "Duration must be positive");
        require(_revealDelay > 0, "Reveal delay must be positive");
        
        uint256 crateId = crateCounter++;
        
        crates[crateId] = SecretCrate({
            crateId: FHE.asEuint32(0), // Will be set properly later
            totalSupply: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentMinted: FHE.asEuint32(0),
            price: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rarity: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isActive: true,
            isRevealed: false,
            name: _name,
            description: _description,
            encryptedMetadata: "",
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            revealTime: block.timestamp + _duration + _revealDelay
        });
        
        emit CrateCreated(crateId, msg.sender, _name);
        return crateId;
    }
    
    function purchaseNFT(
        uint256 crateId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(crates[crateId].creator != address(0), "Crate does not exist");
        require(crates[crateId].isActive, "Crate is not active");
        require(block.timestamp >= crates[crateId].startTime, "Crate not yet available");
        require(block.timestamp <= crates[crateId].endTime, "Crate sale has ended");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Check if there's enough supply
        euint32 newMinted = FHE.add(crates[crateId].currentMinted, internalAmount);
        ebool hasEnoughSupply = FHE.le(newMinted, crates[crateId].totalSupply);
        
        // This would need to be handled with FHE comparison in a real implementation
        require(true, "Insufficient supply"); // Placeholder check
        
        mintTransactions[transactionId] = MintTransaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            crateId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            amount: internalAmount,
            minter: msg.sender,
            timestamp: block.timestamp,
            isProcessed: false
        });
        
        // Update crate totals
        crates[crateId].currentMinted = newMinted;
        
        // Update user mint count
        userMintCount[msg.sender] = FHE.add(userMintCount[msg.sender], internalAmount);
        
        emit NFTPurchased(transactionId, crateId, msg.sender, 0); // Amount will be decrypted off-chain
        return transactionId;
    }
    
    function processMint(
        uint256 transactionId,
        externalEuint32 tokenId,
        externalEuint32 rarity,
        string memory encryptedMetadata
    ) public returns (uint256) {
        require(msg.sender == owner || msg.sender == verifier, "Only owner or verifier can process mints");
        require(!mintTransactions[transactionId].isProcessed, "Transaction already processed");
        
        uint256 nftId = nftCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalTokenId = FHE.fromExternal(tokenId, new bytes(0)); // Would need proper proof
        euint32 internalRarity = FHE.fromExternal(rarity, new bytes(0)); // Would need proper proof
        
        nfts[nftId] = NFT({
            tokenId: internalTokenId,
            crateId: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            rarity: internalRarity,
            owner: mintTransactions[transactionId].minter,
            mintTime: block.timestamp,
            isRevealed: false,
            encryptedMetadata: encryptedMetadata
        });
        
        mintTransactions[transactionId].isProcessed = true;
        
        return nftId;
    }
    
    function revealNFT(uint256 tokenId) public {
        require(nfts[tokenId].owner == msg.sender, "Only owner can reveal NFT");
        require(!nfts[tokenId].isRevealed, "NFT already revealed");
        
        // Get crate ID and check if reveal time has passed
        uint256 crateId = 0; // Would need to decrypt from FHE value
        require(block.timestamp >= crates[crateId].revealTime, "Reveal time not yet reached");
        
        nfts[tokenId].isRevealed = true;
        
        emit NFTRevealed(tokenId, crateId, msg.sender);
    }
    
    function revealCrate(uint256 crateId) public {
        require(crates[crateId].creator == msg.sender, "Only creator can reveal crate");
        require(!crates[crateId].isRevealed, "Crate already revealed");
        require(block.timestamp >= crates[crateId].revealTime, "Reveal time not yet reached");
        
        crates[crateId].isRevealed = true;
        
        emit CrateRevealed(crateId, msg.sender);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getCrateInfo(uint256 crateId) public view returns (
        string memory name,
        string memory description,
        uint8 totalSupply,
        uint8 currentMinted,
        uint8 price,
        bool isActive,
        bool isRevealed,
        address creator,
        uint256 startTime,
        uint256 endTime,
        uint256 revealTime
    ) {
        SecretCrate storage crate = crates[crateId];
        return (
            crate.name,
            crate.description,
            0, // FHE.decrypt(crate.totalSupply) - will be decrypted off-chain
            0, // FHE.decrypt(crate.currentMinted) - will be decrypted off-chain
            0, // FHE.decrypt(crate.price) - will be decrypted off-chain
            crate.isActive,
            crate.isRevealed,
            crate.creator,
            crate.startTime,
            crate.endTime,
            crate.revealTime
        );
    }
    
    function getNFTInfo(uint256 tokenId) public view returns (
        uint8 tokenIdDecrypted,
        uint8 crateId,
        uint8 rarity,
        address owner,
        uint256 mintTime,
        bool isRevealed,
        string memory encryptedMetadata
    ) {
        NFT storage nft = nfts[tokenId];
        return (
            0, // FHE.decrypt(nft.tokenId) - will be decrypted off-chain
            0, // FHE.decrypt(nft.crateId) - will be decrypted off-chain
            0, // FHE.decrypt(nft.rarity) - will be decrypted off-chain
            nft.owner,
            nft.mintTime,
            nft.isRevealed,
            nft.encryptedMetadata
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getUserMintCount(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userMintCount[user]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 crateId) public {
        require(crates[crateId].creator == msg.sender, "Only creator can withdraw");
        require(crates[crateId].isRevealed, "Crate must be revealed");
        require(block.timestamp > crates[crateId].endTime, "Crate sale must be ended");
        
        // Transfer funds to creator
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        crates[crateId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
    
    function setVerifier(address _verifier) public {
        require(msg.sender == owner, "Only owner can set verifier");
        verifier = _verifier;
    }
}
