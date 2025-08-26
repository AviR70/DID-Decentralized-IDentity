import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Credential {
  id: string;
  name: string;
  type: string;
  ipfsHash: string;
  sbtTokenId: string;
  timestamp: string;
}

interface CredentialUploadProps {
  onCredentialAdded: (credential: Credential) => void;
  credentials: Credential[];
}

export const CredentialUpload = ({ onCredentialAdded, credentials }: CredentialUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const uploadCredential = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload completion
    setTimeout(() => {
      const newCredential: Credential = {
        id: Date.now().toString(),
        name: uploadFile.name,
        type: uploadFile.type.includes('pdf') ? 'Certificate' : 'Document',
        ipfsHash: `QmX${Math.random().toString(36).substring(2, 15)}`,
        sbtTokenId: `#${Math.floor(Math.random() * 10000)}`,
        timestamp: new Date().toISOString(),
      };

      onCredentialAdded(newCredential);
      setIsUploading(false);
      setUploadProgress(0);
      setUploadFile(null);

      toast({
        title: "Credential Uploaded Successfully",
        description: "Your credential has been stored on IPFS and minted as an SBT.",
      });
    }, 3500);
  };

  return (
    <div className="space-y-6">
      <Card className="card-gradient border-card-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <CardTitle>Upload Credential</CardTitle>
          </div>
          <CardDescription>
            Upload certificates, licenses, or other credentials to mint as Soulbound Tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-card-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="credential-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <label
                htmlFor="credential-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <FileText className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploadFile ? uploadFile.name : "Click to select credential file"}
                </span>
                <span className="text-xs text-muted-foreground">
                  PDF, DOC, or Image files supported
                </span>
              </label>
            </div>

            {uploadFile && !isUploading && (
              <Button
                variant="hero"
                onClick={uploadCredential}
                className="w-full h-12"
              >
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload to IPFS & Mint SBT
                </div>
              </Button>
            )}

            {isUploading && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Uploading to IPFS...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <div className="text-xs text-muted-foreground text-center">
                  {uploadProgress < 60 ? "Storing on IPFS..." : 
                   uploadProgress < 90 ? "Minting Soulbound Token..." : 
                   "Finalizing..."}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {credentials.length > 0 && (
        <Card className="card-gradient border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              Your Credentials
            </CardTitle>
            <CardDescription>
              Verified credentials stored as Soulbound Tokens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {credentials.map((credential) => (
                <div
                  key={credential.id}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-card-border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-primary" />
                    <div>
                      <div className="font-medium text-sm">{credential.name}</div>
                      <div className="text-xs text-muted-foreground">
                        SBT {credential.sbtTokenId} • {new Date(credential.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                      {credential.type}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};