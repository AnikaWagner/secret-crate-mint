import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSecretCrateContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { Lock, Sparkles, Clock } from "lucide-react";

interface MysteryBoxProps {
  id: string;
  name: string;
  price: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  isLocked: boolean;
  timeToReveal?: string;
}

const MysteryBox = ({ id, name, price, rarity, isLocked, timeToReveal }: MysteryBoxProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const { address, isConnected } = useAccount();
  const { purchaseNFT, isPending } = useSecretCrateContract();
  
  const rarityColors = {
    Common: "bg-muted text-muted-foreground",
    Rare: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan",
    Epic: "bg-neon-purple/20 text-neon-purple border-neon-purple",
    Legendary: "bg-neon-gold/20 text-neon-gold border-neon-gold"
  };

  const handleMint = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first");
      return;
    }

    setIsMinting(true);
    try {
      // In a real implementation, you would encrypt the amount and price using FHE
      // For now, we'll use placeholders for encrypted data
      const encryptedAmount = "0x0000000000000000000000000000000000000000000000000000000000000001";
      const encryptedPrice = "0x0000000000000000000000000000000000000000000000000000000000000005"; // 0.05 ETH
      const inputProof = "0x0000000000000000000000000000000000000000000000000000000000000000";
      
      await purchaseNFT(0, encryptedAmount, encryptedPrice, inputProof); // crateId would be dynamic
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  const handleLocked = () => {
    // Add shake animation class temporarily
    const element = document.getElementById(`box-${id}`);
    if (element) {
      element.classList.add("animate-locked-shake");
      setTimeout(() => {
        element.classList.remove("animate-locked-shake");
      }, 500);
    }
  };

  return (
    <Card 
      id={`box-${id}`}
      className="p-6 bg-crate-gradient border-mystery-border hover:border-neon-cyan transition-all duration-300 floating relative overflow-hidden"
    >
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <Badge className={`${rarityColors[rarity]} border`}>
            {rarity}
          </Badge>
          {isLocked && (
            <div className="flex items-center gap-1 text-destructive">
              <Lock className="w-4 h-4" />
              <span className="text-xs">Locked</span>
            </div>
          )}
        </div>

        <div className="text-center space-y-4">
          {/* Mystery Box Visual */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="w-full h-full bg-mystery-gradient rounded-lg shadow-crate flex items-center justify-center">
              {isLocked ? (
                <Lock className="w-8 h-8 text-foreground" />
              ) : (
                <Sparkles className="w-8 h-8 text-foreground animate-pulse-glow" />
              )}
            </div>
            {!isLocked && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon-gold rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-mystery-dark" />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-glow-purple">{name}</h3>
            <p className="text-2xl font-bold text-neon-cyan">{price} ETH</p>
          </div>

          {timeToReveal && (
            <div className="flex items-center justify-center gap-2 text-neon-gold">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Reveal in {timeToReveal}</span>
            </div>
          )}

          <Button 
            variant={isLocked ? "locked" : "mint"}
            size="lg"
            className="w-full"
            onClick={isLocked ? handleLocked : handleMint}
            disabled={isMinting || isPending}
          >
            {isMinting || isPending ? "Minting..." : isLocked ? "Locked" : "Mint Now"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MysteryBox;