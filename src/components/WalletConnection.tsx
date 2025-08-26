import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { ethers } from "ethers";

interface WalletConnectionProps {
  onConnect: (wallet: string, address: string) => void;
  isConnected: boolean;
  connectedWallet?: string;
  connectedAddress?: string;
}

export const WalletConnection = ({ onConnect, isConnected, connectedWallet, connectedAddress }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (walletType: string) => {
    setIsConnecting(walletType);
    setError(null);
    
    try {
      if (walletType === 'metamask') {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
          throw new Error('MetaMask is not installed. Please install MetaMask extension.');
        }

        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        if (accounts.length === 0) {
          throw new Error('No accounts found. Please make sure MetaMask is unlocked.');
        }

        // Get the connected account
        const address = accounts[0];
        
        // Switch to Ethereum mainnet (optional)
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }], // Ethereum mainnet
          });
        } catch (switchError: any) {
          // Chain doesn't exist or user rejected
          console.log('Could not switch to Ethereum mainnet:', switchError);
        }

        onConnect(walletType, address);
      } else {
        // Keep mock for Phantom
        const mockAddress = 'H4KJz8fV9Tx3y7aP8K9nQ2wR5tE6mL3pB7gS1vN8cX9z';
        setTimeout(() => {
          onConnect(walletType, mockAddress);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(null);
    }
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
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        )}
        
        <div className="grid gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
};