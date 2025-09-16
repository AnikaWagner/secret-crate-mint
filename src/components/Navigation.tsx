import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Hexagon, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/collection", label: "Collection" },
    { href: "/mint", label: "Mint" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-mystery-dark/95 backdrop-blur-sm border-b border-mystery-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Hexagon className="w-8 h-8 text-neon-cyan" />
            <span className="text-xl font-bold text-glow-purple">Mystery NFT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-neon-cyan"
                    : "text-muted-foreground hover:text-neon-purple"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="mint" size="sm">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neon-cyan"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-mystery-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-neon-cyan"
                      : "text-muted-foreground hover:text-neon-purple"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="mint" size="sm" className="w-fit">
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;