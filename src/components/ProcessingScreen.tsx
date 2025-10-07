import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Activity, Zap } from "lucide-react";

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      text: "Analyzing your health profile...",
      duration: 1500
    },
    {
      icon: <Activity className="w-8 h-8 text-secondary" />,
      text: "Calculating your BMI and health metrics...",
      duration: 1500
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      text: "Generating personalized recommendations...",
      duration: 2000
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      text: "Preparing your nutrition report...",
      duration: 1500
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let currentTime = 0;
    
    const interval = setInterval(() => {
      currentTime += 100;
      const newProgress = Math.min((currentTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on progress
      let stepTime = 0;
      for (let i = 0; i < steps.length; i++) {
        stepTime += steps[i].duration;
        if (currentTime <= stepTime) {
          setCurrentStep(i);
          break;
        }
      }

      if (currentTime >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="max-w-md mx-auto w-full">
        <Card className="shadow-large border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            {/* Main Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
                  {steps[currentStep]?.icon}
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 animate-ping"></div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Creating Your Personalized Report
            </h1>

            {/* Current Step */}
            <p className="text-lg text-muted-foreground mb-8">
              {steps[currentStep]?.text}
            </p>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </p>
            </div>

            {/* Processing Steps */}
            <div className="mt-8 space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    index <= currentStep 
                      ? "bg-primary/10 text-foreground" 
                      : "text-muted-foreground"
                  }`}
                >
                  <div className={`transition-all duration-300 ${
                    index <= currentStep ? "scale-100 opacity-100" : "scale-75 opacity-50"
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm font-medium">{step.text}</span>
                  {index < currentStep && (
                    <div className="ml-auto">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Fun Fact */}
            <div className="mt-8 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-accent font-medium">
                💡 Did you know? Dr. Kirti Jain has helped over 5,000 people 
                achieve their health goals with personalized nutrition plans!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProcessingScreen;