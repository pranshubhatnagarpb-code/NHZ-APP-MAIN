import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Sparkles, Apple, Banana, Cherry, Grape, Heart, Activity, Droplets, Scale, Calendar, Stethoscope, Sparkle, ShoppingBag, Utensils, Clock, Users, Ruler, Briefcase, MessageSquare, Package } from "lucide-react";


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
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 150); // Animation duration
    } else {
      onComplete(quizData);
    }
  };


  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
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
    const getQuestionIcon = (step: number) => {
      const questionIcons = [
        Utensils,    // Step 0: Dietary preference
        Clock,       // Step 1: Age
        Users,       // Step 2: Gender
        Ruler,       // Step 3: Physical stats
        Briefcase,   // Step 4: Occupation
        MessageSquare, // Step 5: How heard about us
        Stethoscope, // Step 6: Medical conditions
        Droplets,    // Step 7: Skin type
        Package,     // Step 8: Hair type (products)
        ShoppingBag  // Step 9: Products used
      ];
      const Icon = questionIcons[step % questionIcons.length];
      return <Icon className="w-8 h-8 text-primary mr-3" />;
    };

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(0)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your dietary preference?
              </h2>
            </div>

            {/* Decorative icons in corners */}
            <div className="relative">
              <div className="absolute top-2 right-2 text-green-400 animate-quiz-corner">
                <Sparkle className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 text-orange-400 animate-quiz-corner">
                <Utensils className="w-4 h-4" />
              </div>
            </div>

            <RadioGroup value={quizData.dietType} onValueChange={(value) => updateQuizData("dietType", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="vegetarian" id="vegetarian" />
                <span className="flex-1">🌱 Vegetarian</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="non-vegetarian" id="non-vegetarian" />
                <span className="flex-1">🍗 Non-Vegetarian</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(1)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your age?
              </h2>
            </div>

            {/* Decorative icons in corners */}
            <div className="relative">
              <div className="absolute top-2 right-2 text-purple-400 animate-quiz-corner">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 text-blue-400 animate-quiz-corner">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            <div className="max-w-xs mx-auto">
              <Input
                type="number"
                placeholder="Enter your age"
                value={quizData.age}
                onChange={(e) => updateQuizData("age", e.target.value)}
                className="text-center text-lg hover:shadow-md transition-shadow duration-200"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(2)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your gender?
              </h2>
            </div>
            <RadioGroup value={quizData.gender} onValueChange={(value) => updateQuizData("gender", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="male" id="male" />
                <span className="flex-1">👨 Male</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="female" id="female" />
                <span className="flex-1">👩 Female</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(3)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                Tell us about your physical stats
              </h2>
            </div>

            {/* Decorative measurement icons */}
            <div className="relative">
              <div className="absolute top-2 right-2 text-emerald-400 animate-quiz-corner">
                <Scale className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 text-cyan-400 animate-quiz-corner">
                <Activity className="w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <label htmlFor="weight">Weight (kg)</label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={quizData.weight}
                  onChange={(e) => updateQuizData("weight", e.target.value)}
                  className="hover:shadow-md transition-shadow duration-200"
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
                  className="hover:shadow-md transition-shadow duration-200"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(4)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your occupation?
              </h2>
            </div>
            <RadioGroup value={quizData.occupation} onValueChange={(value) => updateQuizData("occupation", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="job" id="job" />
                <span className="flex-1">💼 Job</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="business" id="business" />
                <span className="flex-1">🏢 Business</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="other" id="other" />
                <span className="flex-1">🎯 Other</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(5)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                How did you hear about us?
              </h2>
            </div>
            <RadioGroup value={quizData.hearAbout} onValueChange={(value) => updateQuizData("hearAbout", value)}>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="facebook" id="facebook" />
                <span className="flex-1">📘 Facebook</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="instagram" id="instagram" />
                <span className="flex-1">📸 Instagram</span>
              </label>
              <label className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                <RadioGroupItem value="website" id="website" />
                <span className="flex-1">🌐 Website</span>
              </label>
            </RadioGroup>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(6)}
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-center leading-tight break-words max-w-full">
                Any medical conditions? (Optional)
              </h2>
            </div>

            {/* Decorative medical icons */}
            <div className="relative">
              <div className="absolute top-2 right-2 text-red-400 animate-quiz-corner">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 text-indigo-400 animate-quiz-corner">
                <Heart className="w-4 h-4" />
              </div>
            </div>

            <p className="text-center text-muted-foreground">Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-2xl mx-auto">
              {medicalConditionOptions.map((condition) => (
                <label key={condition} className="flex items-start space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
                  <Checkbox
                    id={condition}
                    checked={quizData.medicalConditions.includes(condition)}
                    onCheckedChange={(checked) => updateMedicalConditions(condition, checked as boolean)}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm leading-relaxed break-words">{condition}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(7)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your skin type?
              </h2>
            </div>
            <RadioGroup value={quizData.skinType} onValueChange={(value) => updateQuizData("skinType", value)}>
              {["Dry", "Normal", "Oily", "Acne", "Pigmentation"].map((type) => (
                <label key={type} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
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
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(8)}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center leading-tight break-words max-w-full">
                What's your hair type?
              </h2>
            </div>
            <RadioGroup value={quizData.hairType} onValueChange={(value) => updateQuizData("hairType", value)}>
              {["Dry", "Normal", "Oily", "Dandruff", "Itchy Scalp", "Hairfall"].map((type) => (
                <label key={type} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 hover:scale-105 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
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
            <div className="flex items-center justify-center mb-4 px-2">
              {getQuestionIcon(9)}
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-center leading-tight break-words max-w-full">
                Any specific products you use?
              </h2>
            </div>

            {/* Decorative product icons */}
            <div className="relative">
              <div className="absolute top-2 right-2 text-pink-400 animate-quiz-corner">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="absolute bottom-2 left-2 text-emerald-400 animate-quiz-corner">
                <Sparkle className="w-4 h-4" />
              </div>
            </div>

            <p className="text-center text-muted-foreground">Tell us about skin/hair products (Optional)</p>
            <div className="max-w-md mx-auto">
              <Input
                placeholder="e.g., Himalaya face wash, Loreal shampoo..."
                value={quizData.productsUsed}
                onChange={(e) => updateQuizData("productsUsed", e.target.value)}
                className="text-center hover:shadow-md transition-shadow duration-200"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            <h1 className="text-xl sm:text-2xl font-bold">Health Assessment Quiz</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">{motivationalMessages[currentStep]}</p>
        </div>


        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
        </div>


        {/* Floating Icons Around Quiz */}
        <div className="relative">
          {/* Floating Heart Icon */}
          <div className="absolute -top-6 sm:-top-8 -left-4 sm:-left-8 z-10 animate-float-heart">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-red-400 drop-shadow-lg" />
          </div>

          {/* Floating Activity Icon */}
          <div className="absolute -top-2 sm:-top-4 -right-4 sm:-right-8 z-10 animate-float-activity">
            <Activity className="w-6 sm:w-8 h-6 sm:h-8 text-green-400 drop-shadow-lg" />
          </div>

          {/* Floating Water Drop Icon */}
          <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-4 z-10 animate-float-water">
            <Droplets className="w-6 sm:w-8 h-6 sm:h-8 text-blue-400 drop-shadow-lg" />
          </div>

          {/* Quiz Card */}
          <Card className={`quiz-card ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 shadow-large`}>
            <CardContent className="p-4 sm:p-8">
              {renderStep()}
            </CardContent>
          </Card>
        </div>


        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            className="flex items-center justify-center gap-2 mobile-spacing min-h-[48px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={nextStep}
            disabled={!isStepValid()}
            className="flex items-center justify-center gap-2 btn-accent mobile-spacing min-h-[48px]"
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