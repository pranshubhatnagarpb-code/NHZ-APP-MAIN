import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Loader2 } from "lucide-react";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import { fetchUserKYCData, fetchUserAppointments, checkKYCStatus, QuizData, UserData, AppointmentData } from "@/utils/kycDataHandler";

export default function Report() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [kycCompleted, setKycCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const loadReportData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Loading report data for user:", user?.id);

        // Check KYC status and get user data
        const { kycCompleted: kycStatus, userData: profileData, error: kycError } = await checkKYCStatus(user.id);

        if (kycError) {
          console.error("KYC status check error:", kycError);
          throw new Error("Failed to load profile data");
        }

        console.log("KYC status:", kycStatus, "Profile data:", profileData ? "found" : "not found");

        setKycCompleted(kycStatus);
        setUserData(profileData);

        if (kycStatus && profileData) {
          // Fetch quiz data
          const { data: quizResponse, error: quizError } = await fetchUserKYCData(user.id);

          if (quizError) {
            console.error("Quiz data fetch error:", quizError);
            throw new Error("Failed to load quiz data");
          }

          console.log("Quiz data:", quizResponse ? "found" : "not found", quizResponse ? Object.keys(quizResponse) : "no keys");

          if (quizResponse) {
            setQuizData(quizResponse);
          } else {
            console.warn("No quiz data found for user:", user.id);
          }

          // Fetch appointments
          const { data: appointmentsData, error: appointmentsError } = await fetchUserAppointments(user.id);

          if (appointmentsError) {
            console.error("Error fetching appointments:", appointmentsError);
          } else if (appointmentsData) {
            console.log("Appointments found:", appointmentsData.length);
            setAppointments(appointmentsData);
          }
        }
      } catch (err) {
        console.error("Error loading report data:", err);
        setError(err instanceof Error ? err.message : "An error occurred while loading your report");
      } finally {
        setLoading(false);
      }
    };

    loadReportData();
  }, [user, navigate]);

  const handleBookConsultation = () => {
    // Navigate to booking page or open booking modal
    navigate('/#consultation');
  };

  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL", "_blank");
  };

  const handleRetakeQuiz = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Loading Your Report</h3>
            <p className="text-muted-foreground text-sm">
              Please wait while we fetch your personalized nutrition data...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Report</h3>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!kycCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2 justify-center">
              <FileText className="w-6 h-6 text-primary" />
              Complete Your Health Profile
            </CardTitle>
            <CardDescription>
              To view your personalized nutrition report, please complete our health assessment quiz first.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your nutrition report will include:
            </p>
            <ul className="text-sm text-left space-y-2 text-muted-foreground">
              <li>• Personalized BMI and nutrition score</li>
              <li>• Health insights based on your profile</li>
              <li>• Actionable nutrition tips</li>
              <li>• Appointment tracking</li>
              <li>• Consultation recommendations</li>
            </ul>
            <Button onClick={handleRetakeQuiz} className="w-full">
              Take Health Assessment Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile Data Missing</h3>
            <p className="text-muted-foreground text-sm mb-4">
              We couldn't load your profile information. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show dashboard even if quiz data is missing - it will handle empty state gracefully
  return (
    <PersonalizedDashboard
      quizData={quizData || {} as QuizData}
      userData={userData}
      appointments={appointments}
      onBookConsultation={handleBookConsultation}
      onJoinWhatsApp={handleJoinWhatsApp}
      onRetakeQuiz={handleRetakeQuiz}
    />
  );
}
