import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";


interface QuizData {
  dietType: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  occupation: string;
  hearAbout: string;
  medicalConditions: string[];
  skinType: string;
  hairType: string;
  productsUsed: string;
}


interface HealthQuizProps {
  initialData?: QuizData;
  onComplete: (data: QuizData) => void;
  onBack: () => void;
}


const HealthQuiz = ({ initialData, onComplete, onBack }: HealthQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>(initialData || {
    dietType: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    occupation: "",
    hearAbout: "",
    medicalConditions: [],
    skinType: "",
    hairType: "",
    productsUsed: ""
  });


  const totalSteps = 10;
  const progress = ((currentStep + 1) / totalSteps) * 100;


  const medicalConditionOptions = [
    "Blood Pressure", "Diabetes", "Cardiac Disease", "Thyroid", "PCOS/PCOD",
    "Constipation", "Migraine", "Back Pain", "Knee Pain", "Bodyache", 
    "Hyperacidity", "Surgery (if any)"
  ];


  const motivationalMessages = [
    "Great start! Let's learn about your dietary preferences",
    "Perfect! Now tell us about yourself",
    "Excellent! Your health journey is taking shape",
    "Amazing progress! Physical details help us personalize better",
    "Wonderful! Understanding your lifestyle is key",
    "Fantastic! This helps us tailor your experience",
    "Brilliant! Health history is crucial for personalization",
    "Outstanding! Skin health reflects overall wellness",
    "Superb! Hair health indicates nutritional status",
    "Almost there! Final details for your perfect plan"
  ];


  const updateQuizData = (field: keyof QuizData, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };


  const updateMedicalConditions = (condition: string, checked: boolean) => {
    const updated = checked 
      ? [...quizData.medicalConditions, condition]
      : quizData.medicalConditions.filter(c => c !== condition);
    updateQuizData("medicalConditions", updated);
  };


  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(quizData);
    }
  };


  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };


  const isStepValid = () => {
    switch (currentStep) {
      case 0: return quizData.dietType !== "";
      case 1: return quizData.age !== "";
      case 2: return quizData.gender !== "";
      case 3: return quizData.weight !== "" && quizData.height !== "";
      case 4: return quizData.occupation !== "";
      case 5: return quizData.hearAbout !== "";
      case 6: return true; // Medical conditions can be empty
      case 7: return quizData.skinType !== "";
      case 8: return quizData.hairType !== "";
      case 9: return true; // Products used can be empty
      default: return false;
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your dietary preference?</h2>
            <RadioGroup value={quizData.dietType} onValueChange={(value) => updateQuizData("dietType", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="vegetarian" id="vegetarian" />
                <span className="flex-1">🌱 Vegetarian</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
                <span className="flex-1">🍗 Non-Vegetarian</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your age?</h2>
            <div className="max-w-xs mx-auto">
              <Input
                type="number"
                placeholder="Enter your age"
                value={quizData.age}
                onChange={(e) => updateQuizData("age", e.target.value)}
                className="text-center text-lg"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your gender?</h2>
            <RadioGroup value={quizData.gender} onValueChange={(value) => updateQuizData("gender", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="male" id="male" />
                <span className="flex-1">👨 Male</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="female" id="female" />
                <span className="flex-1">👩 Female</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Tell us about your physical stats</h2>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <label htmlFor="weight">Weight (kg)</label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={quizData.weight}
                  onChange={(e) => updateQuizData("weight", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="height">Height (cm)</label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={quizData.height}
                  onChange={(e) => updateQuizData("height", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your occupation?</h2>
            <RadioGroup value={quizData.occupation} onValueChange={(value) => updateQuizData("occupation", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="job" id="job" />
                <span className="flex-1">💼 Job</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="business" id="business" />
                <span className="flex-1">🏢 Business</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="other" id="other" />
                <span className="flex-1">🎯 Other</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">How did you hear about us?</h2>
            <RadioGroup value={quizData.hearAbout} onValueChange={(value) => updateQuizData("hearAbout", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="facebook" id="facebook" />
                <span className="flex-1">📘 Facebook</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="instagram" id="instagram" />
                <span className="flex-1">📸 Instagram</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="website" id="website" />
                <span className="flex-1">🌐 Website</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Any medical conditions? (Optional)</h2>
            <p className="text-center text-muted-foreground">Select all that apply</p>
            <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
              {medicalConditionOptions.map((condition) => (
                <label key={condition} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Checkbox
                    id={condition}
                    checked={quizData.medicalConditions.includes(condition)}
                    onCheckedChange={(checked) => updateMedicalConditions(condition, checked as boolean)}
                  />
                  <span className="text-sm">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your skin type?</h2>
            <RadioGroup value={quizData.skinType} onValueChange={(value) => updateQuizData("skinType", value)}>
              {["Dry", "Normal", "Oily", "Acne", "Pigmentation"].map((type) => (
                <label key={type} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={type.toLowerCase()} id={type.toLowerCase()} />
                  <span className="flex-1">{type}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your hair type?</h2>
            <RadioGroup value={quizData.hairType} onValueChange={(value) => updateQuizData("hairType", value)}>
              {["Dry", "Normal", "Oily", "Dandruff", "Itchy Scalp", "Hairfall"].map((type) => (
                <label key={type} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value={type.toLowerCase().replace(" ", "-")} id={type.toLowerCase().replace(" ", "-")} />
                  <span className="flex-1">{type}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Any specific products you use?</h2>
            <p className="text-center text-muted-foreground">Tell us about skin/hair products (Optional)</p>
            <div className="max-w-md mx-auto">
              <Input
                placeholder="e.g., Himalaya face wash, Loreal shampoo..."
                value={quizData.productsUsed}
                onChange={(e) => updateQuizData("productsUsed", e.target.value)}
                className="text-center"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Health Assessment Quiz</h1>
          </div>
          <p className="text-muted-foreground">{motivationalMessages[currentStep]}</p>
        </div>


        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>


        {/* Quiz Card */}
        <Card className="quiz-card quiz-card-active shadow-large">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>


        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center gap-2 btn-accent"
          >
            {currentStep === totalSteps - 1 ? "Complete Quiz" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};


export default HealthQuiz; 