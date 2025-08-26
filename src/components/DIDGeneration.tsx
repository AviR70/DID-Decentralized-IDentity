import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Key, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DIDGenerationProps {
  walletAddress: string;
  onDIDGenerated: (did: string) => void;
  isGenerated: boolean;
  did?: string;
}

export const DIDGeneration = ({ walletAddress, onDIDGenerated, isGenerated, did }: DIDGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateDID = async () => {
    setIsGenerating(true);
    
    // Simulate DID generation
    setTimeout(() => {
      const mockDID = `did:ceramic:${walletAddress.slice(2, 8)}${Date.now().toString().slice(-6)}`;
      onDIDGenerated(mockDID);
      setIsGenerating(false);
      
      toast({
        title: "DID Generated Successfully",
        description: "Your decentralized identifier has been created and linked to your wallet.",
      });
    }, 3000);
  };

  const copyDID = () => {
    if (did) {
      navigator.clipboard.writeText(did);
      toast({
        title: "DID Copied",
        description: "Your DID has been copied to clipboard.",
      });
    }
  };

  if (isGenerated && did) {
    return (
      <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <CardTitle className="text-lg">Decentralized Identity Created</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-secondary rounded-lg border border-card-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your DID:</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyDID}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <code className="text-xs font-mono text-muted-foreground break-all">
                {did}
              </code>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Active on Ceramic Network
              </Badge>
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
          <Key className="w-5 h-5 text-primary" />
          <CardTitle>Generate Decentralized Identity</CardTitle>
        </div>
        <CardDescription>
          Create your unique DID (Decentralized Identifier) linked to your wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-secondary/50 rounded-lg border border-card-border">
            <div className="text-sm font-medium mb-1">Linked Wallet:</div>
            <code className="text-xs font-mono text-muted-foreground">
              {walletAddress}
            </code>
          </div>
          
          <Button
            variant="hero"
            onClick={generateDID}
            disabled={isGenerating}
            className="w-full h-12"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating DID on Ceramic Network...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Generate My DID
              </div>
            )}
          </Button>
          
          {isGenerating && (
            <div className="text-xs text-muted-foreground text-center">
              This may take a few moments while we create your decentralized identity...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};