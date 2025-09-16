import Hero from "@/components/Hero";
import RevealCountdown from "@/components/RevealCountdown";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <RevealCountdown />
    </div>
  );
};

export default Index;
