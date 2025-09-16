// SecretCrateMint Contract ABI
export const SECRET_CRATE_MINT_ABI = [
  // Events
  "event CrateCreated(uint256 indexed crateId, address indexed creator, string name)",
  "event NFTPurchased(uint256 indexed transactionId, uint256 indexed crateId, address indexed minter, uint32 amount)",
  "event NFTRevealed(uint256 indexed tokenId, uint256 indexed crateId, address indexed owner)",
  "event CrateRevealed(uint256 indexed crateId, address indexed creator)",
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  
  // Functions
  "function createCrate(string memory _name, string memory _description, uint256 _totalSupply, uint256 _price, uint256 _duration, uint256 _revealDelay) public returns (uint256)",
  "function purchaseNFT(uint256 crateId, externalEuint32 amount, bytes calldata inputProof) public payable returns (uint256)",
  "function processMint(uint256 transactionId, externalEuint32 tokenId, externalEuint32 rarity, string memory encryptedMetadata) public returns (uint256)",
  "function revealNFT(uint256 tokenId) public",
  "function revealCrate(uint256 crateId) public",
  "function updateReputation(address user, euint32 reputation) public",
  "function getCrateInfo(uint256 crateId) public view returns (string memory name, string memory description, uint8 totalSupply, uint8 currentMinted, uint8 price, bool isActive, bool isRevealed, address creator, uint256 startTime, uint256 endTime, uint256 revealTime)",
  "function getNFTInfo(uint256 tokenId) public view returns (uint8 tokenIdDecrypted, uint8 crateId, uint8 rarity, address owner, uint256 mintTime, bool isRevealed, string memory encryptedMetadata)",
  "function getUserReputation(address user) public view returns (uint8)",
  "function getUserMintCount(address user) public view returns (uint8)",
  "function withdrawFunds(uint256 crateId) public",
  "function setVerifier(address _verifier) public",
  
  // State variables
  "function owner() public view returns (address)",
  "function verifier() public view returns (address)",
  "function crateCounter() public view returns (uint256)",
  "function nftCounter() public view returns (uint256)",
  "function transactionCounter() public view returns (uint256)"
] as const;

export const SECRET_CRATE_MINT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
