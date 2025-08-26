import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Shield, Users, TrendingUp, Award, Star } from "lucide-react";

interface ReputationData {
  score: number;
  onChainScore: number;
  credentialScore: number;
  endorsementScore: number;
  badges: string[];
  walletAge: number;
  transactionCount: number;
}

interface ReputationDashboardProps {
  reputationData: ReputationData;
}

export const ReputationDashboard = ({ reputationData }: ReputationDashboardProps) => {
  const { score, onChainScore, credentialScore, endorsementScore, badges, walletAge, transactionCount } = reputationData;

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "Verified Human": return <Shield className="w-4 h-4" />;
      case "Crypto Trusted": return <Trophy className="w-4 h-4" />;
      case "Active Contributor": return <Users className="w-4 h-4" />;
      case "Early Adopter": return <Star className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Verified Human": return "bg-success/10 text-success border-success/20";
      case "Crypto Trusted": return "bg-primary/10 text-primary border-primary/20";
      case "Active Contributor": return "bg-accent/10 text-accent border-accent/20";
      case "Early Adopter": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-secondary/10 text-secondary border-secondary/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Reputation Score */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Reputation Score</CardTitle>
            </div>
            <div className="text-3xl font-bold text-primary">{score}</div>
          </div>
          <CardDescription>
            Your decentralized reputation based on on-chain activity and verified credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Score</span>
                <span>{score}/100</span>
              </div>
              <Progress value={score} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{onChainScore}</div>
                <div className="text-xs text-muted-foreground">On-Chain</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{credentialScore}</div>
                <div className="text-xs text-muted-foreground">Credentials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{endorsementScore}</div>
                <div className="text-xs text-muted-foreground">Endorsements</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-gradient border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              On-Chain Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Wallet Age:</span>
                <span className="font-medium">{walletAge} months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Transactions:</span>
                <span className="font-medium">{transactionCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">On-Chain Score:</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  {onChainScore}/40
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-success" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={getBadgeColor(badge)}
                  >
                    <div className="flex items-center gap-1">
                      {getBadgeIcon(badge)}
                      {badge}
                    </div>
                  </Badge>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  Complete verification to earn badges
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      <Card className="card-gradient border-card-border">
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>
            How your reputation score is calculated (OnChain×0.4 + Credentials×0.4 + Endorsements×0.2)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  On-Chain Activity (40%)
                </span>
                <span>{onChainScore}/40</span>
              </div>
              <Progress value={(onChainScore / 40) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Verified Credentials (40%)
                </span>
                <span>{credentialScore}/40</span>
              </div>
              <Progress value={(credentialScore / 40) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-success" />
                  Community Endorsements (20%)
                </span>
                <span>{endorsementScore}/20</span>
              </div>
              <Progress value={(endorsementScore / 20) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};