import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/mystery-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-mystery-dark/80" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-mystery-card/50 border border-mystery-border rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">Confidential NFT Protocol</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-glow-purple">
            Mint in Secret,
            <br />
            <span className="text-glow-gold">Reveal in Style</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Revolutionary NFT minting with encrypted metadata prevents sniping.
            <br />
            <span className="text-neon-cyan">Your treasures stay hidden until the grand reveal.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
          <Link to="/mint">
            <Button variant="mint" size="xl" className="group">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Start Minting
            </Button>
          </Link>
          
          <Link to="/collection">
            <Button variant="mystery" size="xl">
              Explore Collection
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto text-center animate-fade-in">
          <div>
            <div className="text-3xl font-bold text-neon-purple">2,847</div>
            <div className="text-sm text-muted-foreground">NFTs Minted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neon-cyan">1,203</div>
            <div className="text-sm text-muted-foreground">Active Collectors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neon-gold">94%</div>
            <div className="text-sm text-muted-foreground">Still Encrypted</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-floating">
          <ArrowDown className="w-6 h-6 text-neon-cyan" />
        </div>
      </div>
    </section>
  );
};

export default Hero;