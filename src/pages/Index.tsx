import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { WalletConnection } from "@/components/WalletConnection";
import { DIDGeneration } from "@/components/DIDGeneration";
import { CredentialUpload } from "@/components/CredentialUpload";
import { ReputationDashboard } from "@/components/ReputationDashboard";
import { StepIndicator } from "@/components/StepIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Credential {
  id: string;
  name: string;
  type: string;
  ipfsHash: string;
  sbtTokenId: string;
  timestamp: string;
}

interface ReputationData {
  score: number;
  onChainScore: number;
  credentialScore: number;
  endorsementScore: number;
  badges: string[];
  walletAge: number;
  transactionCount: number;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isDIDGenerated, setIsDIDGenerated] = useState(false);
  const [userDID, setUserDID] = useState<string>("");
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [reputationData, setReputationData] = useState<ReputationData>({
    score: 15,
    onChainScore: 8,
    credentialScore: 5,
    endorsementScore: 2,
    badges: [],
    walletAge: 24,
    transactionCount: 1247,
  });

  const steps = [
    {
      id: 1,
      title: "Connect Wallet",
      description: "Connect your MetaMask or Phantom wallet to get started",
      completed: isWalletConnected,
      active: currentStep === 0 && !isWalletConnected,
    },
    {
      id: 2,
      title: "Generate DID",
      description: "Create your decentralized identifier on Ceramic Network",
      completed: isDIDGenerated,
      active: currentStep === 1 && isWalletConnected && !isDIDGenerated,
    },
    {
      id: 3,
      title: "Upload Credentials",
      description: "Upload and mint your credentials as Soulbound Tokens",
      completed: credentials.length > 0,
      active: currentStep === 2 && isDIDGenerated,
    },
    {
      id: 4,
      title: "View Reputation",
      description: "Monitor your reputation score and earned badges",
      completed: false,
      active: currentStep === 3,
    },
  ];

  const handleWalletConnect = (wallet: string, address: string) => {
    setIsWalletConnected(true);
    setConnectedWallet(wallet);
    setWalletAddress(address);
    setCurrentStep(1);
  };

  const handleDIDGenerated = (did: string) => {
    setIsDIDGenerated(true);
    setUserDID(did);
    setCurrentStep(2);
    
    // Update reputation for DID generation
    setReputationData(prev => ({
      ...prev,
      score: prev.score + 5,
      credentialScore: prev.credentialScore + 5,
      badges: [...prev.badges, "Verified Human"],
    }));
  };

  const handleCredentialAdded = (credential: Credential) => {
    setCredentials(prev => [...prev, credential]);
    setCurrentStep(3);
    
    // Update reputation for credential upload
    setReputationData(prev => ({
      ...prev,
      score: prev.score + 10,
      credentialScore: prev.credentialScore + 10,
      badges: prev.badges.includes("Crypto Trusted") 
        ? prev.badges 
        : [...prev.badges, "Crypto Trusted"],
    }));
  };

  const handleGetStarted = () => {
    setCurrentStep(0);
    // Scroll to the workflow section
    setTimeout(() => {
      document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const showHero = currentStep === 0 && !isWalletConnected;

  return (
    <div className="min-h-screen">
      {showHero && <HeroSection onGetStarted={handleGetStarted} />}
      
      {(!showHero || currentStep > 0) && (
        <div id="workflow" className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Build Your Web3 Identity</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to create your decentralized identity and build reputation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Steps Sidebar */}
              <div className="lg:col-span-1">
                <Card className="card-gradient border-card-border sticky top-6">
                  <CardHeader>
                    <CardTitle>Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StepIndicator steps={steps} />
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Step 1: Wallet Connection */}
                {currentStep >= 0 && (
                  <WalletConnection
                    onConnect={handleWalletConnect}
                    isConnected={isWalletConnected}
                    connectedWallet={connectedWallet}
                    connectedAddress={walletAddress}
                  />
                )}

                {/* Step 2: DID Generation */}
                {currentStep >= 1 && isWalletConnected && (
                  <DIDGeneration
                    walletAddress={walletAddress}
                    onDIDGenerated={handleDIDGenerated}
                    isGenerated={isDIDGenerated}
                    did={userDID}
                  />
                )}

                {/* Step 3: Credential Upload */}
                {currentStep >= 2 && isDIDGenerated && (
                  <CredentialUpload
                    onCredentialAdded={handleCredentialAdded}
                    credentials={credentials}
                  />
                )}

                {/* Step 4: Reputation Dashboard */}
                {currentStep >= 3 && credentials.length > 0 && (
                  <ReputationDashboard reputationData={reputationData} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
