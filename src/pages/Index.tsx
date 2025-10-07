import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LandingPage from "@/components/LandingPage";
import HealthQuiz from "@/components/HealthQuiz";
import UserRegistration from "@/components/UserRegistration";
import ProcessingScreen from "@/components/ProcessingScreen";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import BookingPayment from "@/components/BookingPayment";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { checkKYCStatus, fetchUserKYCData, fetchUserAppointments, AppointmentData } from "@/utils/kycDataHandler";

type AppStep = "landing" | "quiz" | "registration" | "processing" | "dashboard" | "booking" | "success";

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

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<AppStep>("landing");
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isLoadingKYC, setIsLoadingKYC] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const { user, session, loading: authLoading } = useAuth();

  // Check KYC status for returning users
  useEffect(() => {
    const checkReturningUser = async () => {
      if (authLoading) return;
      
      if (!user || !session) {
        setIsLoadingKYC(false);
        return;
      }

      try {
        const { kycCompleted, userData: storedUserData } = await checkKYCStatus(user.id);
        
        if (kycCompleted && storedUserData) {
          // Fetch existing KYC data and appointments
          const [kycResult, appointmentsResult] = await Promise.all([
            fetchUserKYCData(user.id),
            fetchUserAppointments(user.id)
          ]);

          if (kycResult.data) {
            setQuizData(kycResult.data);
            setUserData(storedUserData);
            setAppointments(appointmentsResult.data || []);
            setCurrentStep("dashboard");
            
            toast({
              title: "Welcome back!",
              description: "Loading your personalized dashboard...",
            });
          }
        }
      } catch (error) {
        console.error("Error checking KYC status:", error);
      } finally {
        setIsLoadingKYC(false);
      }
    };

    checkReturningUser();
  }, [user, session, authLoading, toast]);

  // Handle URL-based navigation
  useEffect(() => {
    if (isLoadingKYC) return; // Wait for KYC check to complete
    
    const action = searchParams.get('action');
    if (action === 'quiz') {
      setCurrentStep('quiz');
      setSearchParams({}); // Clear the parameter
    } else if (action === 'booking') {
      if (!user) {
        setShowAuthModal(true); // Auto-open auth modal
        toast({
          title: "Login Required",
          description: "Please log in to book a consultation.",
          variant: "destructive"
        });
        setSearchParams({}); // Clear the parameter
        return;
      }
      setCurrentStep('booking');
      setSearchParams({}); // Clear the parameter
    }
  }, [searchParams, setSearchParams, isLoadingKYC, user, toast]);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleQuizComplete = (data: QuizData) => {
    setQuizData(data);
    
    // If user is not authenticated, show auth modal (sign-up mode)
    if (!user) {
      setShowAuthModal(true);
      toast({
        title: "Almost there!",
        description: "Create an account to save your results and continue.",
      });
    } else {
      // User is authenticated, proceed to registration
      setCurrentStep("registration");
    }
  };

  const handleRegistrationComplete = (data: UserData) => {
    setUserData(data);
    setCurrentStep("processing");
  };

  const handleProcessingComplete = () => {
    setCurrentStep("dashboard");
  };

  const handleBookConsultation = () => {
    setCurrentStep("booking");
  };

  const handleBookAppointment = () => {
    setCurrentStep("booking");
  };

  const handleJoinWhatsApp = () => {
    // Redirect to WhatsApp community
    toast({
      title: "WhatsApp Community",
      description: "Opening WhatsApp community link...",
    });
    
    setTimeout(() => {
      window.open("https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL", "_blank");
    }, 1000);
  };

  const handleRetakeQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
  };

  const handleBackToQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleBackToDashboard = () => {
    setCurrentStep("dashboard");
  };

  const handleBookingSuccess = () => {
    setCurrentStep("success");
    handleJoinWhatsApp();
  };

  const renderCurrentStep = () => {
    if (isLoadingKYC) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your data...</p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case "landing":
        return <LandingPage onStartQuiz={handleStartQuiz} onBookAppointment={handleBookAppointment} />;
      
      case "quiz":
        return (
          <HealthQuiz 
            initialData={quizData || undefined}
            onComplete={handleQuizComplete} 
            onBack={handleBackToLanding}
          />
        );
      
      case "registration":
        return (
          <UserRegistration 
            quizData={quizData!}
            onComplete={handleRegistrationComplete}
            onBack={handleBackToQuiz}
          />
        );
      
      case "processing":
        return <ProcessingScreen onComplete={handleProcessingComplete} />;
      
      case "dashboard":
        return (
          <PersonalizedDashboard 
            quizData={quizData!}
            userData={userData!}
            appointments={appointments}
            onBookConsultation={handleBookConsultation}
            onJoinWhatsApp={handleJoinWhatsApp}
            onRetakeQuiz={handleRetakeQuiz}
          />
        );
      
      case "booking":
        return (
          <BookingPayment 
            onBack={handleBackToDashboard}
            onSuccess={handleBookingSuccess}
          />
        );
      
      case "success":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Welcome to Your Health Journey!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your consultation is booked and you're now part of our exclusive WhatsApp community. 
                Dr. Kirti Jain will contact you soon!
              </p>
              <button 
                onClick={handleBackToLanding}
                className="btn-hero"
              >
                Return Home
              </button>
            </div>
          </div>
        );
      
      default:
        return <LandingPage onStartQuiz={handleStartQuiz} onBookAppointment={handleBookAppointment} />;
    }
  };

  return (
    <>
      {renderCurrentStep()}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Index;
