import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, CheckCircle } from "lucide-react";

interface WalletConnectionProps {
  onConnect: (wallet: string, address: string) => void;
  isConnected: boolean;
  connectedWallet?: string;
  connectedAddress?: string;
}

export const WalletConnection = ({ onConnect, isConnected, connectedWallet, connectedAddress }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = async (walletType: string) => {
    setIsConnecting(walletType);
    
    // Simulate wallet connection delay
    setTimeout(() => {
      const mockAddress = walletType === 'metamask' 
        ? '0x742d35Cc6634C0532925a3b8D746C10D9DC00000'
        : 'H4KJz8fV9Tx3y7aP8K9nQ2wR5tE6mL3pB7gS1vN8cX9z';
      
      onConnect(walletType, mockAddress);
      setIsConnecting(null);
    }, 2000);
  };

  if (isConnected) {
    return (
      <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <CardTitle className="text-lg">Wallet Connected</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Wallet Type:</span>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                {connectedWallet === 'metamask' ? 'MetaMask' : 'Phantom'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address:</span>
              <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">
                {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient border-card-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          <CardTitle>Connect Your Wallet</CardTitle>
        </div>
        <CardDescription>
          Choose your preferred wallet to get started with decentralized identity
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          variant="wallet"
          onClick={() => handleConnect('metamask')}
          disabled={isConnecting === 'metamask'}
          className="h-12"
        >
          {isConnecting === 'metamask' ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Connecting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Connect MetaMask (Ethereum)
            </div>
          )}
        </Button>
        
        <Button
          variant="wallet"
          onClick={() => handleConnect('phantom')}
          disabled={isConnecting === 'phantom'}
          className="h-12"
        >
          {isConnecting === 'phantom' ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Connecting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Connect Phantom (Solana)
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};