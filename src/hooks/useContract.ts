import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SECRET_CRATE_MINT_ABI, SECRET_CRATE_MINT_ADDRESS } from '@/lib/contract-abi';

export function useSecretCrateContract() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const createCrate = async (
    name: string,
    description: string,
    totalSupply: number,
    price: number,
    duration: number,
    revealDelay: number
  ) => {
    return writeContract({
      address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
      abi: SECRET_CRATE_MINT_ABI,
      functionName: 'createCrate',
      args: [name, description, BigInt(totalSupply), BigInt(price), BigInt(duration), BigInt(revealDelay)],
    });
  };

  const purchaseNFT = async (
    crateId: number,
    amount: any, // FHE encrypted amount
    encryptedPrice: any, // FHE encrypted price
    inputProof: string
  ) => {
    return writeContract({
      address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
      abi: SECRET_CRATE_MINT_ABI,
      functionName: 'purchaseNFT',
      args: [BigInt(crateId), amount, encryptedPrice, inputProof],
      value: BigInt(0), // Will be calculated based on encrypted amount
    });
  };

  const revealNFT = async (tokenId: number) => {
    return writeContract({
      address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
      abi: SECRET_CRATE_MINT_ABI,
      functionName: 'revealNFT',
      args: [BigInt(tokenId)],
    });
  };

  const revealCrate = async (crateId: number) => {
    return writeContract({
      address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
      abi: SECRET_CRATE_MINT_ABI,
      functionName: 'revealCrate',
      args: [BigInt(crateId)],
    });
  };

  return {
    createCrate,
    purchaseNFT,
    revealNFT,
    revealCrate,
    hash,
    isPending,
    error,
  };
}

export function useCrateInfo(crateId: number) {
  const { data, isLoading, error } = useReadContract({
    address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
    abi: SECRET_CRATE_MINT_ABI,
    functionName: 'getCrateInfo',
    args: [BigInt(crateId)],
  });

  return {
    crateInfo: data,
    isLoading,
    error,
  };
}

export function useNFTInfo(tokenId: number) {
  const { data, isLoading, error } = useReadContract({
    address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
    abi: SECRET_CRATE_MINT_ABI,
    functionName: 'getNFTInfo',
    args: [BigInt(tokenId)],
  });

  return {
    nftInfo: data,
    isLoading,
    error,
  };
}

export function useUserReputation(userAddress: string) {
  const { data, isLoading, error } = useReadContract({
    address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
    abi: SECRET_CRATE_MINT_ABI,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  });

  return {
    reputation: data,
    isLoading,
    error,
  };
}

export function useUserMintCount(userAddress: string) {
  const { data, isLoading, error } = useReadContract({
    address: SECRET_CRATE_MINT_ADDRESS as `0x${string}`,
    abi: SECRET_CRATE_MINT_ABI,
    functionName: 'getUserMintCount',
    args: [userAddress as `0x${string}`],
  });

  return {
    mintCount: data,
    isLoading,
    error,
  };
}
