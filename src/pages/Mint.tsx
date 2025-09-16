import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Wallet, 
  Plus, 
  Minus, 
  Lock, 
  Sparkles, 
  Crown, 
  Gem, 
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import WalletConnect from "@/components/WalletConnect";
import { useState } from "react";

const Mint = () => {
  const [selectedTier, setSelectedTier] = useState("common");
  const [mintQuantity, setMintQuantity] = useState(1);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const mysteryTiers = [
    {
      id: "common",
      name: "Common Crate",
      price: "0.05",
      maxMint: 10,
      icon: <Lock className="w-6 h-6" />,
      description: "Basic tier with guaranteed Common or higher rarity",
      rarityDistribution: [
        { rarity: "Common", chance: "70%" },
        { rarity: "Rare", chance: "25%" },
        { rarity: "Epic", chance: "4%" },
        { rarity: "Legendary", chance: "1%" }
      ],
      features: ["Instant Mint", "Encrypted Metadata", "Reveal Event Access"]
    },
    {
      id: "rare", 
      name: "Rare Vault",
      price: "0.15",
      maxMint: 5,
      icon: <Sparkles className="w-6 h-6" />,
      description: "Enhanced tier with guaranteed Rare or higher rarity",
      rarityDistribution: [
        { rarity: "Rare", chance: "60%" },
        { rarity: "Epic", chance: "30%" },
        { rarity: "Legendary", chance: "10%" }
      ],
      features: ["Guaranteed Rare+", "Priority Support", "Exclusive Discord Role"]
    },
    {
      id: "epic",
      name: "Epic Chamber", 
      price: "0.5",
      maxMint: 3,
      icon: <Crown className="w-6 h-6" />,
      description: "Premium tier with guaranteed Epic or higher rarity",
      rarityDistribution: [
        { rarity: "Epic", chance: "70%" },
        { rarity: "Legendary", chance: "30%" }
      ],
      features: ["Guaranteed Epic+", "Early Reveal Access", "VIP Events"]
    },
    {
      id: "legendary",
      name: "Legendary Sanctum",
      price: "1.5", 
      maxMint: 1,
      icon: <Gem className="w-6 h-6" />,
      description: "Ultimate tier with guaranteed Legendary rarity",
      rarityDistribution: [
        { rarity: "Legendary", chance: "100%" }
      ],
      features: ["Guaranteed Legendary", "Founder Status", "Revenue Share"]
    }
  ];

  const selectedTierData = mysteryTiers.find(tier => tier.id === selectedTier);
  const totalCost = selectedTierData ? (parseFloat(selectedTierData.price) * mintQuantity).toFixed(3) : "0.000";

  const handleQuantityChange = (delta: number) => {
    const newQuantity = mintQuantity + delta;
    const maxAllowed = selectedTierData?.maxMint || 1;
    
    if (newQuantity >= 1 && newQuantity <= maxAllowed) {
      setMintQuantity(newQuantity);
    }
  };

  const mintingSteps = [
    { step: 1, title: "Connect Wallet", status: isWalletConnected ? "completed" : "pending" },
    { step: 2, title: "Select Tier", status: selectedTier ? "completed" : "pending" },
    { step: 3, title: "Confirm Transaction", status: "pending" },
    { step: 4, title: "Mint Complete", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow-purple">
            Mint Your Mystery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your mystery tier and mint encrypted NFTs. All metadata remains hidden until the reveal event.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Tier Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-glow-cyan mb-6">Choose Mystery Tier</h2>
              <div className="grid gap-4">
                {mysteryTiers.map((tier) => (
                  <Card 
                    key={tier.id}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      selectedTier === tier.id
                        ? "border-neon-purple bg-mystery-card/70"
                        : "border-mystery-border bg-mystery-card hover:border-neon-cyan"
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedTier === tier.id ? "bg-neon-purple/20 text-neon-purple" : "bg-mystery-gradient text-mystery-dark"
                      }`}>
                        {tier.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-glow-cyan">{tier.name}</h3>
                          <Badge variant="outline" className="text-neon-gold border-neon-gold/30">
                            {tier.price} ETH
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{tier.description}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-neon-cyan mb-2">Rarity Distribution</h4>
                            <div className="space-y-1">
                              {tier.rarityDistribution.map((dist, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{dist.rarity}:</span>
                                  <span className="text-neon-purple">{dist.chance}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-neon-cyan mb-2">Features</h4>
                            <div className="space-y-1">
                              {tier.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Mint Panel */}
          <div className="space-y-6">
            
            {/* Wallet Connection */}
            <Card className="p-6 bg-mystery-card border-mystery-border">
              <h3 className="text-lg font-semibold text-glow-cyan mb-4">Wallet Connection</h3>
              <WalletConnect />
            </Card>

            {/* Mint Configuration */}
            <Card className="p-6 bg-mystery-card border-mystery-border">
              <h3 className="text-lg font-semibold text-glow-cyan mb-4">Mint Configuration</h3>
              
              {selectedTierData && (
                <div className="space-y-4">
                  <div>
                    <Label>Selected Tier</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedTierData.icon}
                      <span className="font-medium">{selectedTierData.name}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Quantity (Max {selectedTierData.maxMint})</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={mintQuantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={mintQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          if (val >= 1 && val <= selectedTierData.maxMint) {
                            setMintQuantity(val);
                          }
                        }}
                        className="w-20 text-center bg-mystery-dark border-mystery-border"
                        min="1"
                        max={selectedTierData.maxMint}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        disabled={mintQuantity >= selectedTierData.maxMint}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-mystery-border" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price per NFT:</span>
                      <span className="text-neon-gold">{selectedTierData.price} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{mintQuantity}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-neon-gold">{totalCost} ETH</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="mint" size="lg" disabled={!isWalletConnected}>
                    <Wallet className="w-5 h-5 mr-2" />
                    {isWalletConnected ? "Mint Now" : "Connect Wallet First"}
                  </Button>
                </div>
              )}
            </Card>

            {/* Minting Progress */}
            <Card className="p-6 bg-mystery-card border-mystery-border">
              <h3 className="text-lg font-semibold text-glow-cyan mb-4">Minting Progress</h3>
              <div className="space-y-3">
                {mintingSteps.map((step) => (
                  <div key={step.step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.status === "completed" 
                        ? "bg-green-500 text-white" 
                        : "bg-mystery-border text-muted-foreground"
                    }`}>
                      {step.status === "completed" ? "✓" : step.step}
                    </div>
                    <span className={`text-sm ${
                      step.status === "completed" ? "text-green-400" : "text-muted-foreground"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Important Notice */}
            <Card className="p-6 bg-mystery-card border-mystery-border">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-neon-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-neon-gold mb-2">Important Notice</p>
                  <p>Your NFT metadata will remain encrypted until the official reveal event. This ensures fair distribution and prevents sniping.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;