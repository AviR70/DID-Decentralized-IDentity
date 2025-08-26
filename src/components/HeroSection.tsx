import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Award, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            🚀 Decentralized Identity Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            Build Your
            <span className="hero-gradient bg-clip-text text-transparent"> Web3 Reputation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect your wallet, generate a decentralized identity, upload credentials, 
            and build a verifiable reputation score on the blockchain.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 h-auto"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 h-auto border-primary/20 hover:border-primary/40"
          >
            View Demo
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Decentralized Identity</h3>
            <p className="text-sm text-muted-foreground text-center">
              Generate a unique DID linked to your wallet on Ceramic Network
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold">Soulbound Tokens</h3>
            <p className="text-sm text-muted-foreground text-center">
              Mint credentials as non-transferable NFTs stored on IPFS
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold">Reputation Score</h3>
            <p className="text-sm text-muted-foreground text-center">
              Build trust through verified credentials and on-chain activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};