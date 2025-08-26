import { CheckCircle, Circle } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
}

export const StepIndicator = ({ steps }: StepIndicatorProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {step.completed ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : step.active ? (
              <div className="w-6 h-6 rounded-full bg-primary border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${
              step.completed ? 'text-success' : 
              step.active ? 'text-foreground' : 
              'text-muted-foreground'
            }`}>
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {step.description}
            </p>
          </div>
          
          {index < steps.length - 1 && (
            <div className={`w-px h-8 ml-3 mt-8 ${
              step.completed ? 'bg-success' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};