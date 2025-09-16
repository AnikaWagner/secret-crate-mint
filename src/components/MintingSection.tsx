import { Card } from "@/components/ui/card";
import MysteryBox from "@/components/MysteryBox";
import WalletConnect from "@/components/WalletConnect";
import { useSecretCrateContract } from "@/hooks/useContract";
import { useAccount } from "wagmi";
import { Sparkles, Lock, Crown, Gem } from "lucide-react";

const MintingSection = () => {
  const { address, isConnected } = useAccount();
  const { createCrate, purchaseNFT, isPending } = useSecretCrateContract();
  
  const mysteryBoxes = [
    {
      id: "common",
      name: "Common Crate",
      price: "0.05",
      rarity: "Common" as const,
      isLocked: false,
    },
    {
      id: "rare",
      name: "Rare Vault",
      price: "0.15",
      rarity: "Rare" as const,
      isLocked: false,
      timeToReveal: "2d 14h 32m"
    },
    {
      id: "epic",
      name: "Epic Chamber",
      price: "0.5",
      rarity: "Epic" as const,
      isLocked: true,
      timeToReveal: "2d 14h 32m"
    },
    {
      id: "legendary",
      name: "Legendary Sanctum",
      price: "1.5",
      rarity: "Legendary" as const,
      isLocked: true,
      timeToReveal: "2d 14h 32m"
    }
  ];

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Encrypted Metadata",
      description: "Your NFT's properties remain hidden until the reveal event"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Anti-Sniping",
      description: "Prevent bots from identifying rare traits before you can mint"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Fair Launch",
      description: "Everyone has an equal chance at rare and legendary items"
    },
    {
      icon: <Gem className="w-6 h-6" />,
      title: "Guaranteed Rarity",
      description: "Each tier guarantees minimum rarity levels for your collection"
    }
  ];

  return (
    <section className="py-20 px-4 bg-mystery-dark/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-glow-purple mb-6">
            Choose Your Mystery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our collection of encrypted mystery boxes. Each contains unique NFTs
            with hidden properties that will be revealed during our next event.
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="max-w-md mx-auto mb-16">
          <WalletConnect />
        </div>

        {/* Mystery Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mysteryBoxes.map((box) => (
            <MysteryBox key={box.id} {...box} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-mystery-card border-mystery-border hover:border-neon-purple transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 bg-mystery-gradient rounded-full flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-glow-cyan mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MintingSection;