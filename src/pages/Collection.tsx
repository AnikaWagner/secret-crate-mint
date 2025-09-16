import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import { useState } from "react";

const Collection = () => {
  const [filterRarity, setFilterRarity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const nftCollection = [
    {
      id: "nft-001",
      name: "Encrypted Warrior #001",
      image: "/placeholder.svg",
      rarity: "Legendary",
      isRevealed: false,
      mintedBy: "0x742d...4E21",
      mintedAt: "2024-01-15"
    },
    {
      id: "nft-002", 
      name: "Mystery Guardian #002",
      image: "/placeholder.svg",
      rarity: "Epic",
      isRevealed: true,
      mintedBy: "0xA5B2...8F93",
      mintedAt: "2024-01-14"
    },
    {
      id: "nft-003",
      name: "Shadow Hunter #003", 
      image: "/placeholder.svg",
      rarity: "Rare",
      isRevealed: true,
      mintedBy: "0x1C4D...7B55",
      mintedAt: "2024-01-13"
    },
    {
      id: "nft-004",
      name: "Cyber Phantom #004",
      image: "/placeholder.svg", 
      rarity: "Common",
      isRevealed: false,
      mintedBy: "0x9E8F...2A11",
      mintedAt: "2024-01-12"
    },
    {
      id: "nft-005",
      name: "Digital Mystic #005",
      image: "/placeholder.svg",
      rarity: "Epic", 
      isRevealed: false,
      mintedBy: "0x3B7C...9D44",
      mintedAt: "2024-01-11"
    },
    {
      id: "nft-006",
      name: "Void Walker #006",
      image: "/placeholder.svg",
      rarity: "Rare",
      isRevealed: true,
      mintedBy: "0x6F1A...5E88",
      mintedAt: "2024-01-10"
    }
  ];

  const rarityColors = {
    Common: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    Rare: "bg-blue-500/20 text-blue-300 border-blue-500/30", 
    Epic: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Legendary: "bg-orange-500/20 text-orange-300 border-orange-500/30"
  };

  const filteredNFTs = nftCollection.filter(nft => {
    const matchesRarity = filterRarity === "all" || nft.rarity.toLowerCase() === filterRarity;
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRarity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow-purple">
              NFT Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our growing collection of mystery NFTs. Some have been revealed, others remain encrypted.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-mystery-card border-mystery-border text-center">
              <div className="text-2xl font-bold text-neon-purple mb-2">10,000</div>
              <div className="text-sm text-muted-foreground">Total Supply</div>
            </Card>
            <Card className="p-6 bg-mystery-card border-mystery-border text-center">
              <div className="text-2xl font-bold text-neon-cyan mb-2">2,847</div>
              <div className="text-sm text-muted-foreground">Minted</div>
            </Card>
            <Card className="p-6 bg-mystery-card border-mystery-border text-center">
              <div className="text-2xl font-bold text-neon-gold mb-2">512</div>
              <div className="text-sm text-muted-foreground">Revealed</div>
            </Card>
            <Card className="p-6 bg-mystery-card border-mystery-border text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">0.12 ETH</div>
              <div className="text-sm text-muted-foreground">Floor Price</div>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search NFTs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-mystery-card border-mystery-border"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterRarity === "all" ? "mint" : "outline"}
                size="sm"
                onClick={() => setFilterRarity("all")}
              >
                All
              </Button>
              <Button
                variant={filterRarity === "common" ? "mint" : "outline"}
                size="sm"
                onClick={() => setFilterRarity("common")}
              >
                Common
              </Button>
              <Button
                variant={filterRarity === "rare" ? "mint" : "outline"}
                size="sm"
                onClick={() => setFilterRarity("rare")}
              >
                Rare
              </Button>
              <Button
                variant={filterRarity === "epic" ? "mint" : "outline"}
                size="sm"
                onClick={() => setFilterRarity("epic")}
              >
                Epic
              </Button>
              <Button
                variant={filterRarity === "legendary" ? "mint" : "outline"}
                size="sm"
                onClick={() => setFilterRarity("legendary")}
              >
                Legendary
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* NFT Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <Card key={nft.id} className="bg-mystery-card border-mystery-border hover:border-neon-purple transition-all duration-300 group overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  {nft.isRevealed ? (
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-mystery-gradient flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-12 h-12 text-mystery-dark mx-auto mb-3 opacity-50" />
                        <p className="text-mystery-dark font-medium">Encrypted</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-3 left-3">
                    <Badge className={`${rarityColors[nft.rarity as keyof typeof rarityColors]} border`}>
                      <Star className="w-3 h-3 mr-1" />
                      {nft.rarity}
                    </Badge>
                  </div>

                  {!nft.isRevealed && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-mystery-dark/80 text-neon-cyan border-neon-cyan/30">
                        <Clock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-glow-cyan">
                    {nft.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Minted by:</span>
                      <span className="text-neon-purple font-mono">{nft.mintedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{nft.mintedAt}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-mystery-border">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:border-neon-cyan hover:text-neon-cyan"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredNFTs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No NFTs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collection;