import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  TrendingUp, 
  Heart, 
  Activity, 
  Calendar, 
  MessageCircle,
  Star,
  AlertCircle,
  CheckCircle,
  Target,
  RefreshCw,
  Clock,
  DollarSign
} from "lucide-react";
import type { AppointmentData } from "@/utils/kycDataHandler";

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

interface UserData {
  fullName: string;
  phone: string;
  email: string;
}

interface PersonalizedDashboardProps {
  quizData: QuizData;
  userData: UserData;
  appointments: AppointmentData[];
  onBookConsultation: () => void;
  onJoinWhatsApp: () => void;
  onRetakeQuiz: () => void;
}

const PersonalizedDashboard = ({ 
  quizData, 
  userData, 
  appointments,
  onBookConsultation, 
  onJoinWhatsApp,
  onRetakeQuiz
}: PersonalizedDashboardProps) => {
  
  // Calculate BMI and nutrition score
  const calculateBMI = () => {
    const weight = parseFloat(quizData.weight);
    const height = parseFloat(quizData.height) / 100; // Convert cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return "N/A";
  };

  const getBMICategory = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (isNaN(bmiValue)) return "Unknown";
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Healthy";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const calculateNutritionScore = () => {
    let score = 100;
    const bmi = parseFloat(calculateBMI());
    
    // BMI impact
    if (!isNaN(bmi)) {
      if (bmi < 18.5 || bmi > 30) score -= 20;
      else if (bmi > 25) score -= 10;
    }
    
    // Medical conditions impact
    const highRiskConditions = ["Diabetes", "Cardiac Disease", "Blood Pressure"];
    const mediumRiskConditions = ["Thyroid", "PCOS/PCOD"];
    
    quizData.medicalConditions.forEach(condition => {
      if (highRiskConditions.includes(condition)) score -= 15;
      else if (mediumRiskConditions.includes(condition)) score -= 8;
      else score -= 3;
    });
    
    // Skin and hair issues
    if (quizData.skinType === "acne" || quizData.skinType === "pigmentation") score -= 5;
    if (quizData.hairType === "hairfall" || quizData.hairType === "dandruff") score -= 5;
    
    return Math.max(score, 30); // Minimum score of 30
  };

  const nutritionScore = calculateNutritionScore();
  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getPersonalizedInsights = () => {
    const insights = [];
    const bmiValue = parseFloat(bmi);
    
    if (!isNaN(bmiValue)) {
      if (bmiValue < 18.5) {
        insights.push({
          icon: <TrendingUp className="w-5 h-5 text-warning" />,
          title: "Weight Management Focus",
          description: "Your BMI suggests you may benefit from a nutrition plan focused on healthy weight gain with nutrient-dense foods."
        });
      } else if (bmiValue > 25) {
        insights.push({
          icon: <Target className="w-5 h-5 text-accent" />,
          title: "Weight Optimization",
          description: "A balanced nutrition plan can help you achieve optimal weight while maintaining energy and health."
        });
      } else {
        insights.push({
          icon: <CheckCircle className="w-5 h-5 text-success" />,
          title: "Healthy BMI Range",
          description: "Great! You're in a healthy BMI range. Focus on maintaining this with balanced nutrition."
        });
      }
    }

    if (quizData.medicalConditions.length > 0) {
      insights.push({
        icon: <Heart className="w-5 h-5 text-primary" />,
        title: "Health Condition Support",
        description: `Your nutrition plan will address ${quizData.medicalConditions.join(", ").toLowerCase()} with specific dietary recommendations.`
      });
    }

    if (quizData.skinType === "acne" || quizData.hairType === "hairfall") {
      insights.push({
        icon: <Star className="w-5 h-5 text-secondary" />,
        title: "Beauty & Wellness",
        description: "Your plan includes specific nutrients for healthy skin and hair, addressing your current concerns."
      });
    }

    return insights;
  };

  const getActionableTips = () => {
    const tips = [];
    
    if (quizData.dietType === "vegetarian") {
      tips.push("Include protein-rich foods like lentils, quinoa, and nuts in every meal");
      tips.push("Ensure adequate B12 intake through supplements or fortified foods");
    } else {
      tips.push("Balance your plate with lean proteins, vegetables, and whole grains");
      tips.push("Limit processed meats and focus on fresh, lean options");
    }
    
    if (quizData.medicalConditions.includes("Diabetes")) {
      tips.push("Monitor carbohydrate portions and focus on low glycemic index foods");
    }
    
    if (quizData.occupation === "job") {
      tips.push("Pack healthy snacks for busy workdays to avoid processed foods");
    }
    
    tips.push("Stay hydrated with 8-10 glasses of water daily");
    tips.push("Include colorful vegetables in every meal for optimal nutrition");
    
    return tips.slice(0, 5); // Return top 5 tips
  };

  const insights = getPersonalizedInsights();
  const tips = getActionableTips();
  
  const hasAppointments = appointments.length > 0;
  const latestAppointment = appointments[0];
  const hasPendingPayment = latestAppointment?.payment_status === 'pending';

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hello {userData.fullName}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Your personalized nutrition report
          </p>
          <Button
            variant="outline"
            onClick={onRetakeQuiz}
            className="mt-4"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Update My Health Information
          </Button>
        </div>

        {/* Nutrition Score Card */}
        <Card className="shadow-large mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="score-circle">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getScoreColor(nutritionScore)}`}>
                    {nutritionScore}
                  </div>
                  <div className="text-white text-sm">Score</div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Your Nutrition Score
            </h2>
            <p className="text-muted-foreground mb-4">
              Based on your health profile, lifestyle, and goals
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">{bmi}</div>
                <div className="text-sm text-muted-foreground">BMI</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  {bmiCategory}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {quizData.medicalConditions.length}
                </div>
                <div className="text-sm text-muted-foreground">Conditions</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  Tracking
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {quizData.dietType}
                </div>
                <div className="text-sm text-muted-foreground">Diet Type</div>
                <Badge variant="outline" className="mt-1 text-xs">
                  Preferred
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Health Insights */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Your Health Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                  {insight.icon}
                  <div>
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Tips */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Actionable Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Status Section */}
        {hasAppointments && (
          <Card className="shadow-medium mb-8 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Your Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                        <Badge variant={appointment.payment_status === 'completed' ? 'default' : 'outline'}>
                          Payment: {appointment.payment_status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">₹{appointment.payment_amount}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {hasPendingPayment && (
                <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Complete Your Booking</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your consultation slot is reserved! Complete payment to confirm your appointment with Dr. Kirti Jain.
                      </p>
                      <Button 
                        onClick={onBookConsultation}
                        className="btn-accent"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Complete Payment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-4">
          {!hasAppointments && (
            <Card className="shadow-medium border-primary/20">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Book Personal Consultation</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Get detailed guidance from Dr. Kirti Jain with a personalized nutrition plan
                </p>
                <Button 
                  onClick={onBookConsultation}
                  className="btn-hero w-full"
                >
                  Book Consultation - ₹999
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className={`shadow-medium border-secondary/20 ${!hasAppointments ? '' : 'md:col-span-2'}`}>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Join WhatsApp Community</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Connect with like-minded people and get daily health tips
              </p>
              <Button 
                onClick={() => window.open("https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL", "_blank")}
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                Join Community (Free)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            This report is generated based on your responses. For detailed medical advice, 
            consult with Dr. Kirti Jain directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;