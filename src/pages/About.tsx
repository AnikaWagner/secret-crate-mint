import { Card } from "@/components/ui/card";
import { Shield, Lock, Sparkles, Crown, Gem, Eye, Users, Trophy } from "lucide-react";
import Navigation from "@/components/Navigation";

const About = () => {
  const features = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Encrypted Metadata",
      description: "Your NFT's properties remain completely hidden until the official reveal event, ensuring fair distribution."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Anti-Sniping Protection",
      description: "Advanced encryption prevents bots from identifying rare traits before human collectors can mint."
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Fair Launch System",
      description: "Everyone has an equal opportunity at rare and legendary items through our confidential protocol."
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Guaranteed Rarity Tiers",
      description: "Each mystery box tier guarantees minimum rarity levels for your NFT collection."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Reveal Events",
      description: "Community-wide reveal events create excitement and shared experiences for all collectors."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built by collectors, for collectors. Join a community that values fairness and transparency."
    }
  ];

  const stats = [
    { number: "10K+", label: "NFTs Minted", icon: <Trophy className="w-6 h-6" /> },
    { number: "2.5K", label: "Active Collectors", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Still Encrypted", icon: <Lock className="w-6 h-6" /> },
    { number: "24hrs", label: "Until Reveal", icon: <Eye className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow-purple">
            About Mystery NFT
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary NFT minting platform that uses advanced encryption to create a fair and transparent marketplace. 
            <span className="text-neon-cyan block mt-2">Your mystery awaits revelation.</span>
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-mystery-dark/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 bg-mystery-card border-mystery-border text-center group hover:border-neon-purple transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 bg-mystery-gradient rounded-full flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-neon-purple mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-glow-cyan mb-6">
              Why Choose Mystery NFT?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with fair distribution mechanisms to create the ultimate NFT minting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 bg-mystery-card border-mystery-border hover:border-neon-purple transition-all duration-300 group"
              >
                <div className="w-16 h-16 mb-6 bg-mystery-gradient rounded-full flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-glow-cyan mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-mystery-dark/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-glow-gold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, secure, and transparent process from mint to reveal.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Connect Your Wallet",
                description: "Link your Web3 wallet to start your journey into the mystery."
              },
              {
                step: "02", 
                title: "Choose Your Mystery Box",
                description: "Select from different rarity tiers, each with guaranteed minimum rarities."
              },
              {
                step: "03",
                title: "Mint Your NFT",
                description: "Complete the minting process - your NFT metadata is immediately encrypted."
              },
              {
                step: "04",
                title: "Wait for the Reveal",
                description: "Join the community countdown until the grand reveal event."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-mystery-gradient rounded-full flex items-center justify-center text-2xl font-bold text-mystery-dark">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-neon-cyan mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;