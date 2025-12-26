import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
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
  DollarSign,
  Scale,
  Ruler,
  Info
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
    const weight = parseFloat(quizData?.weight || '0');
    const height = parseFloat(quizData?.height || '0') / 100; // Convert cm to m
    if (weight && height && height > 0) {
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

    (quizData?.medicalConditions || []).forEach(condition => {
      if (highRiskConditions.includes(condition)) score -= 15;
      else if (mediumRiskConditions.includes(condition)) score -= 8;
      else score -= 3;
    });

    // Skin and hair issues
    if (quizData?.skinType === "acne" || quizData?.skinType === "pigmentation") score -= 5;
    if (quizData?.hairType === "hairfall" || quizData?.hairType === "dandruff") score -= 5;
    
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

    if (quizData?.medicalConditions?.length > 0) {
      insights.push({
        icon: <Heart className="w-5 h-5 text-primary" />,
        title: "Health Condition Support",
        description: `Your nutrition plan will address ${quizData.medicalConditions.join(", ").toLowerCase()} with specific dietary recommendations.`
      });
    }

    if (quizData?.skinType === "acne" || quizData?.hairType === "hairfall") {
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
    const bmiValue = parseFloat(bmi);
    const age = parseInt(quizData?.age || '0');
    const medicalConditions = quizData?.medicalConditions || [];

    // Priority 1: Critical health condition tips
    if (medicalConditions.includes("Diabetes")) {
      tips.push("Monitor carbohydrate portions and focus on low glycemic index foods");
      tips.push("Include fiber-rich foods like whole grains, legumes, and vegetables");
      tips.push("Choose healthy fats from nuts, seeds, and olive oil for better blood sugar control");
    }

    if (medicalConditions.includes("PCOS/PCOD")) {
      tips.push("Include anti-inflammatory foods like turmeric, ginger, and fatty fish");
      tips.push("Focus on complex carbs and fiber-rich foods for hormone balance");
      tips.push("Maintain consistent meal timing to support metabolic health");
    }

    if (medicalConditions.includes("Thyroid")) {
      tips.push("Ensure adequate iodine and selenium intake through food sources");
      tips.push("Avoid goitrogenic foods like raw cruciferous vegetables");
      tips.push("Include zinc-rich foods like pumpkin seeds and shellfish");
    }

    if (medicalConditions.includes("Blood Pressure")) {
      tips.push("Reduce sodium intake and focus on potassium-rich foods");
      tips.push("Include magnesium-rich foods like leafy greens and nuts");
      tips.push("Limit caffeine and alcohol for better blood pressure management");
    }

    // Priority 2: BMI-based recommendations
    if (!isNaN(bmiValue)) {
      if (bmiValue < 18.5) {
        tips.push("Focus on calorie-dense, nutrient-rich foods for healthy weight gain");
        tips.push("Include healthy fats like avocados, nuts, and olive oil");
        tips.push("Add protein-rich snacks between meals to support muscle development");
      } else if (bmiValue > 25) {
        tips.push("Emphasize portion control and high-fiber foods for satiety");
        tips.push("Include protein with every meal to support muscle maintenance");
        tips.push("Focus on whole foods over processed options for better nutrition");
      } else {
        tips.push("Maintain balanced portions with a mix of macronutrients");
        tips.push("Focus on nutrient density over calorie counting");
      }
    }

    // Priority 3: Age-appropriate advice
    if (age > 50) {
      tips.push("Focus on bone-health nutrients like calcium and vitamin D");
      tips.push("Include antioxidant-rich foods for healthy aging");
      tips.push("Consider digestive-friendly foods and adequate fiber intake");
    } else if (age < 25) {
      tips.push("Support growth and development with adequate protein and micronutrients");
      tips.push("Include brain-boosting foods like fatty fish and berries");
      tips.push("Focus on establishing healthy eating habits for long-term wellness");
    } else if (age >= 25 && age <= 40) {
      tips.push("Balance work-life stress with nutrient-dense meals");
      tips.push("Include stress-reducing foods rich in magnesium and B vitamins");
    }

    // Priority 4: Diet type specific advice
    if (quizData?.dietType === "vegetarian") {
      tips.push("Include complete protein sources like lentils, quinoa, and nuts");
      tips.push("Ensure adequate B12 intake through fortified foods or supplements");
      tips.push("Combine grains with legumes for complete protein profiles");
    } else if (quizData?.dietType === "non-vegetarian") {
      tips.push("Balance your plate with lean proteins, vegetables, and whole grains");
      tips.push("Choose fresh, unprocessed meats and fish over processed options");
      tips.push("Include plant-based proteins 2-3 times per week for variety");
    } else {
      tips.push("Focus on whole, unprocessed foods regardless of dietary preference");
      tips.push("Include a variety of colorful fruits and vegetables daily");
    }

    // Priority 5: Occupation/lifestyle based tips
    if (quizData?.occupation === "job") {
      tips.push("Pack healthy snacks for busy workdays to avoid processed foods");
      tips.push("Plan meals around your work schedule for sustained energy");
      tips.push("Include stress-reducing foods like dark chocolate and herbal teas");
    } else if (quizData?.occupation === "student") {
      tips.push("Keep healthy snacks available during long study sessions");
      tips.push("Include brain-boosting nutrients like omega-3s and antioxidants");
      tips.push("Maintain consistent meal timing for better focus and concentration");
    } else if (quizData?.occupation === "housewife" || quizData?.occupation === "retired") {
      tips.push("Focus on family-friendly, nutritious meal planning");
      tips.push("Include joint-health supporting foods like fatty fish and turmeric");
    }

    // Priority 6: General foundational tips (always include if space)
    if (tips.length < 5) {
      tips.push("Stay hydrated with 8-10 glasses of water daily");
    }
    if (tips.length < 5) {
      tips.push("Include colorful vegetables in every meal for optimal nutrition");
    }
    if (tips.length < 5) {
      tips.push("Practice mindful eating to better recognize hunger and fullness cues");
    }

    // Ensure we return exactly 5 tips, prioritizing the most relevant ones
    return tips.slice(0, 5);
  };

  const getHealthyBMIData = () => {
    const height = parseFloat(quizData?.height || '0') / 100; // Convert cm to m
    const currentWeight = parseFloat(quizData?.weight || '0');

    if (!height || !currentWeight || height <= 0) return null;

    // Healthy BMI range: 18.5 - 24.9
    const healthyBMIMin = 18.5;
    const healthyBMIMax = 24.9;

    const healthyWeightMin = healthyBMIMin * (height * height);
    const healthyWeightMax = healthyBMIMax * (height * height);

    const currentBMI = parseFloat(bmi);
    const weightDifference = currentWeight - (healthyWeightMin + healthyWeightMax) / 2 ;

    return {
      currentBMI,
      currentWeight,
      healthyBMIMin,
      healthyBMIMax,
      healthyWeightMin: Math.round(healthyWeightMin * 10) / 10,
      healthyWeightMax: Math.round(healthyWeightMax * 10) / 10,
      weightDifference: Math.round(weightDifference * 10) / 10,
      needsGain: currentBMI < 18.5,
      needsLose: currentBMI > 24.9,
      isHealthy: currentBMI >= 18.5 && currentBMI <= 24.9
    };
  };

  const insights = getPersonalizedInsights();
  const tips = getActionableTips();
  const healthyData = getHealthyBMIData();

  const hasAppointments = appointments.length > 0;
  const latestAppointment = appointments[0];
  const hasPendingPayment = latestAppointment?.payment_status === 'pending';

  return (
    <div className="min-h-screen bg-background py-4 sm:py-8 px-3 sm:px-4 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
            Hello {userData.fullName}! 👋
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">
            Your personalized nutrition report
          </p>
          <Button
            variant="outline"
            onClick={onRetakeQuiz}
            className="mt-3 sm:mt-4 mobile-spacing min-h-[44px]"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Update My Health Information
          </Button>
        </div>

        {/* BMI Comparison Section */}
        {healthyData && (
          <Card className="shadow-large mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 card-mobile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Scale className="w-5 h-5 text-primary" />
                BMI Comparison & Health Insights
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Understanding your current BMI compared to healthy ranges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-2 sm:px-6">
              {/* BMI Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-lg min-w-0">
                  <div className="text-lg sm:text-3xl font-bold text-primary mb-1 break-words">{healthyData.currentBMI}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Current BMI</div>
                  <Badge variant={healthyData.isHealthy ? "default" : "outline"} className="mt-2 text-xs break-words">
                    {healthyData.isHealthy ? "Healthy Range" : healthyData.needsGain ? "Underweight" : "Overweight"}
                  </Badge>
                </div>

                <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-lg min-w-0">
                  <div className="text-lg sm:text-3xl font-bold text-success mb-1 break-words">18.5 - 24.9</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Healthy BMI Range</div>
                  <Badge className="mt-2 bg-success/10 text-success text-xs break-words">Optimal</Badge>
                </div>

                <div className="text-center p-3 sm:p-4 bg-muted/30 rounded-lg min-w-0">
                  <div className={`text-lg sm:text-3xl font-bold mb-1 break-words ${healthyData.weightDifference > 0 ? 'text-orange-600' : healthyData.weightDifference < 0 ? 'text-green-600' : ''}`}>
                    {healthyData.weightDifference > 0 ? `-${healthyData.weightDifference}` : `${Math.abs(healthyData.weightDifference)}kg`}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground break-words">
                    {healthyData.needsGain ? "To achieve your optimal weight" : "To achieve your optimal weight"}
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs break-words">
                    {healthyData.needsGain ? "Gain Weight" : "Lose Weight"}
                  </Badge>
                </div>
              </div>
              {/* Visual Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-1">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-3 sm:mb-4">Comparison</h4>
                  <div className="flex justify-center items-end gap-5 sm:gap-8 h-24 sm:h-32 pt-8 sm:pt-6 mt-8 sm:mt-6">
                    {/* Current BMI Silhouette */}
                    <div className="flex flex-col items-center min-w-0">
                      <div className={`w-12 sm:w-16 h-20 sm:h-24 rounded-t-full border-2 sm:border-4 transition-all duration-300 ${
                        healthyData.currentBMI < 18.5 ? 'border-red-400 bg-red-50' :
                        healthyData.currentBMI > 24.9 ? 'border-orange-400 bg-orange-50' :
                        'border-success bg-success/10'
                      }`}>
                        <div className={`w-full h-3/4 rounded-t-full flex flex-col items-center justify-center gap-1 ${
                          healthyData.currentBMI < 18.5 ? 'bg-red-100' :
                          healthyData.currentBMI > 24.9 ? 'bg-orange-100' :
                          'bg-success/20'
                        }`}>
                          {/* Simple body shape: head and torso */}
                          <div className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-current opacity-80 flex-none ${
                            healthyData.currentBMI < 18.5 ? 'bg-red-600' :
                            healthyData.currentBMI > 24.9 ? 'bg-orange-600' :
                            'bg-success'
                          }`} /> {/* Head */}
                          <div className={`h-10 sm:h-8 rounded-full bg-current opacity-80 flex-none ${
                            healthyData.currentBMI < 18.5 ? 'bg-red-600 w-2 sm:w-3' :
                            healthyData.currentBMI > 24.9 ? 'bg-orange-600 w-6 sm:w-8' :
                            'bg-success w-3 sm:w-4'
                          }`} /> {/* Torso - wider for fat, narrower for lean */}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">Current</div>
                      <div className="text-xs font-semibold text-center">{healthyData.currentBMI}</div>
                    </div>

                    {/* Healthy BMI Silhouette */}
                    <div className="flex flex-col items-center min-w-0">
                      <div className="w-12 sm:w-16 h-20 sm:h-24 rounded-t-full border-2 sm:border-4 border-success bg-success/10">
                        <div className="w-full h-3/4 rounded-t-full bg-success/20 flex flex-col items-center justify-center gap-1">
                          {/* Lean body shape: head and narrow torso */}
                          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-success opacity-80 flex-none" /> {/* Head */}
                          <div className="h-10 sm:h-8 w-4 sm:w-4 rounded-full bg-success opacity-80 flex-none" /> {/* Narrow torso for lean */}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">Healthy</div>
                      <div className="text-xs font-semibold text-center">18.5-24.9</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Weight Range for Your Height</h4>
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center text-sm px-2">
                      <span className="text-muted-foreground flex-1 min-w-0">Minimum Healthy Weight</span>
                      <span className="font-semibold ml-2">{healthyData.healthyWeightMin} kg</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (healthyData.currentWeight / healthyData.healthyWeightMax) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm px-2">
                      <span className="text-muted-foreground flex-1 min-w-0">Maximum Healthy Weight</span>
                      <span className="font-semibold ml-2">{healthyData.healthyWeightMax} kg</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mx-2">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-800 leading-relaxed break-words">
                        <p className="font-medium mb-1">Important Note:</p>
                        <p>BMI is a general indicator. Consult Dt. Kirti Jain for personalized health assessment considering muscle mass, bone density, and overall body composition.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Insights Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8 mb-8">
          {/* Health Insights */}
          <Card className="shadow-soft card-mobile">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Activity className="w-5 h-5 text-primary" />
                Your Health Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 mt-0.5">
                    {insight.icon}
                  </div>
                  <div className="min-w-0 break-words">
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Tips */}
          <Card className="shadow-soft card-mobile">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <CheckCircle className="w-5 h-5 text-primary" />
                Actionable Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed break-words">{tip}</span>
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
                  <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base break-words">
                          {new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {appointment.status}
                        </Badge>
                        <Badge variant={appointment.payment_status === 'completed' ? 'default' : 'outline'} className="text-xs">
                          Payment: {appointment.payment_status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center sm:text-right mt-1 sm:mt-0">
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
                        Your consultation slot is reserved! Complete payment to confirm your appointment with Dt. Kirti Jain.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {!hasAppointments && (
            <Card className="shadow-medium border-primary/20 card-mobile">
              <CardContent className="p-4 sm:p-6 text-center">
                <Calendar className="w-10 sm:w-12 h-10 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">Book Personal Consultation</h3>
                <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                  Get detailed guidance from Dt. Kirti Jain with a personalized nutrition plan
                </p>
                <Button
                  onClick={onBookConsultation}
                  className="btn-hero w-full mobile-spacing min-h-[48px]"
                >
                  Book Consultation - ₹999
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-medium border-primary/20 card-mobile">
            <CardContent className="p-4 sm:p-6 text-center">
              <MessageCircle className="w-10 sm:w-12 h-10 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">Join WhatsApp Community</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                Connect with like-minded people and get daily health tips from experts over WhatsApp
              </p>
              <Button
                onClick={() => window.open("https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL", "_blank")}
                className="btn-hero w-full mobile-spacing min-h-[48px]"
              >
                Join Community (Free)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 sm:mt-8 px-2">
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            This report is generated based on your responses. For detailed medical advice,
            consult with Dt. Kirti Jain directly.
          </p>
        </div>
      </div>
    </div>
  );
};
export default PersonalizedDashboard;