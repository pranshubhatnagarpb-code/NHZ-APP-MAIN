import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Phone, Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { saveKYCData, QuizData } from "@/utils/kycDataHandler";
import { z } from "zod";

interface UserData {
  fullName: string;
  phone: string;
  email: string;
}

interface UserRegistrationProps {
  quizData: QuizData;
  onComplete: (userData: UserData) => void;
  onBack: () => void;
}

// Validation schemas
const emailSchema = z.string().trim().email({ message: "Invalid email address" }).max(255);
const phoneSchema = z.string().trim().min(10, { message: "Phone must be at least 10 digits" }).max(15);
const nameSchema = z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100);

const UserRegistration = ({ quizData, onComplete, onBack }: UserRegistrationProps) => {
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<UserData>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const updateUserData = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Partial<UserData> = {};
    
    try {
      nameSchema.parse(userData.fullName);
    } catch {
      newErrors.fullName = "Name must be 2-100 characters";
    }
    
    try {
      phoneSchema.parse(userData.phone);
    } catch {
      newErrors.phone = "Valid phone number required (10-15 digits)";
    }
    
    try {
      emailSchema.parse(userData.email);
    } catch {
      newErrors.email = "Valid email address required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return userData.fullName.trim() !== "" && 
           userData.phone.trim() !== "" && 
           userData.email.trim() !== "" &&
           userData.email.includes("@");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all fields and correct any errors.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save your information.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { success, error } = await saveKYCData(user.id, quizData, userData);
      
      if (!success || error) {
        throw new Error("Failed to save data");
      }

      toast({
        title: "Registration Successful!",
        description: "Generating your personalized nutrition report...",
      });
      
      onComplete(userData);
    } catch (error) {
      console.error("Error saving registration:", error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          </div>
          <p className="text-muted-foreground">
            Complete your profile to receive your personalized nutrition score, 
            detailed report, and expert tips from Dr. Kirti Jain.
          </p>
        </div>

        {/* Registration Card */}
        <Card className="shadow-large">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-primary">
              Almost there! Just a few more details...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={userData.fullName}
                onChange={(e) => updateUserData("fullName", e.target.value)}
                className="text-base"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={userData.phone}
                onChange={(e) => updateUserData("phone", e.target.value)}
                className="text-base"
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={userData.email}
                onChange={(e) => updateUserData("email", e.target.value)}
                className="text-base"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Benefits Reminder */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                What you'll receive:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Personalized nutrition score (0-100)</li>
                <li>✓ Detailed health insights report</li>
                <li>✓ Expert tips from Dr. Kirti Jain</li>
                <li>✓ Consultation booking access</li>
              </ul>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className="w-full btn-hero"
              size="lg"
            >
              {isSubmitting ? (
                "Generating Your Report..."
              ) : (
                "Get My Nutrition Report"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2 text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quiz
          </Button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          Your information is secure and will only be used to provide personalized 
          nutrition guidance. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default UserRegistration;