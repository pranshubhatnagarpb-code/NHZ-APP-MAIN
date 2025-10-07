import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, MapPin, Clock, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingPaymentProps {
  onBack: () => void;
  onSuccess: () => void;
}

const BookingPayment = ({ onBack, onSuccess }: BookingPaymentProps) => {
  const [appointmentType, setAppointmentType] = useState<"virtual" | "physical" | "">("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const handlePayment = async () => {
    if (!appointmentType || !selectedSlot) {
      toast({
        title: "Please complete your booking",
        description: "Select appointment type and time slot to proceed.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      toast({
        title: "Payment Successful!",
        description: "Your consultation is booked. Redirecting to WhatsApp...",
      });

      // Open WhatsApp with Dr. Kirti Jain
      const whatsappMessage = encodeURIComponent(
        "Hi Dr. Kirti, I've completed the health quiz and paid the registration fees and would like to join the community!"
      );
      
      setTimeout(() => {
        window.open(`https://wa.me/919884315705?text=${whatsappMessage}`, "_blank");
        onSuccess();
      }, 2000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
        <Card className="max-w-md mx-auto shadow-large">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your consultation with Dr. Kirti Jain has been successfully booked.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm">
                <strong>Type:</strong> {appointmentType === "virtual" ? "Virtual Consultation" : "Physical Consultation"}<br/>
                <strong>Time:</strong> {selectedSlot}<br/>
                <strong>Amount:</strong> ₹999
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                onClick={onSuccess}
                className="w-full btn-hero"
              >
                Join WhatsApp Community
              </Button>
              <p className="text-xs text-muted-foreground">
                Confirmation details sent to your email
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book Your Consultation
          </h1>
          <p className="text-muted-foreground">
            Schedule your personalized nutrition consultation with Dr. Kirti Jain
          </p>
        </div>

        {/* Appointment Type Selection */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Choose Consultation Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={appointmentType} onValueChange={(value) => setAppointmentType(value as "virtual" | "physical")}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="virtual" id="virtual" />
                  <div className="flex-1">
                    <Label htmlFor="virtual" className="flex items-center gap-2 cursor-pointer">
                      <Video className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="font-semibold">Virtual Consultation</div>
                        <div className="text-sm text-muted-foreground">Video call via Google Meet/Zoom</div>
                      </div>
                    </Label>
                  </div>
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="physical" id="physical" />
                  <div className="flex-1">
                    <Label htmlFor="physical" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-semibold">Physical Consultation</div>
                        <div className="text-sm text-muted-foreground">In-person visit to clinic in Jaipur</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Time Slot Selection */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Select Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                    selectedSlot === slot
                      ? "bg-primary text-white border-primary"
                      : "bg-background hover:bg-muted/50 border-border"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Available slots for tomorrow. More dates available after payment.
            </p>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span>Consultation Fee</span>
                <span className="font-semibold">₹999</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span>Platform Fee</span>
                <span className="font-semibold text-success">₹0</span>
              </div>
              <div className="flex justify-between items-center py-2 text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary">₹999</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">What's Included:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 45-minute consultation with Dr. Kirti Jain</li>
                <li>✓ Personalized nutrition plan</li>
                <li>✓ Meal timing recommendations</li>
                <li>✓ Follow-up support via WhatsApp</li>
                <li>✓ Digital recipe collection</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handlePayment}
            disabled={!appointmentType || !selectedSlot || isProcessing}
            className="w-full btn-hero"
            size="lg"
          >
            {isProcessing ? (
              "Processing Payment..."
            ) : (
              "Pay ₹999 & Book Consultation"
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Payment Security */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            🔒 Secure payment powered by Razorpay. Your payment information is encrypted and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;