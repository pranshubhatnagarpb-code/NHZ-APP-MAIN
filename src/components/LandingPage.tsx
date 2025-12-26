import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, CheckCircle, Heart, Zap, Shield, MessageCircle, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { FAQ } from "@/components/FAQ";
import SupportSection from "@/components/SupportSection";
import AnimatedLiquidBackground from "@/components/AnimatedLiquidBackground";
import SequentialTypewriter from "@/components/SequentialTypewriter";
import { Badge } from "@/components/ui/badge";

interface LandingPageProps {
  onStartQuiz: () => void;
  onBookAppointment: () => void;
}

const LandingPage = ({ onStartQuiz, onBookAppointment }: LandingPageProps) => {
  const { user, profile } = useAuth();
  const testimonials = [
    {
      name: "Kanika Dhingra",
      text: "I approached Kirti Jain, 5 months post-delivery. She planned foods that improved my breast milk production and at the same time helped me to shed extra Kilos.",
      rating: 5
    },
    {
      name: "Neelu Jain",
      text: "It was the best experience I ever had after taking diet from Kirti Jain. I am so overwhelmed for her support and care she gave throughout my journey as I suffered from grade 3 Fatty Liver, history of Breast cancer, Vit. D and Vit B12 deficiency, severe acidity plus menopausal symptoms. Now after 10 months, I have lost 21 kgs along with no medical issues which I had earlier. Now I feel energetic and fully active after taking diet from Nutrition Hai Zaruri. Thank you NHZ team for your efforts.",
      rating: 5
    },
    {
      name: "Shaurya Malik",
      text: "I was suffering from High Blood Pressure & weight gain. Dietician Kirti Jain gave me special care and a Diet Plan with cheat meals.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-secondary" />,
      title: "Personalized Nutrition Plans",
      description: "Tailored specifically for your body type, lifestyle, and health goals"
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary" />,
      title: "Expert Consultation",
      description: "Direct access to Dt. Kirti Jain's 19+ years of nutrition expertise"
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary" />,
      title: "WhatsApp Community",
      description: "Join our exclusive health community for ongoing support and motivation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <AnimatedLiquidBackground className="text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-white/20 text-white mb-4">
                Personalised Health Quiz
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Discover Your Personalized
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
              Nutrition Score & Report
            </span>
          </h1>
          <div className="text-xl md:text-4xl mb-10 text-white/90 max-w-3xl mx-auto drop-shadow-md min-h-[8rem] flex items-center justify-center">
            <div className="w-full">
              <SequentialTypewriter
                segments={[
                  "Hello!",
                  "Take our 10 min health quiz to get your personalised Nutrition score and Report",
                  "Book your consultation with Dt. Kirti Jain to get expert nutrition advice"
                ]}
                className="text-xl md:text-4xl text-white/90 drop-shadow-md block text-center"
                speed={100}
                delay={500}
                pauseBetween={1000}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button 
              onClick={onStartQuiz}
              size="2lg" className="btn-hero mobile-spacing"
            >
              Start Your Health Quiz
            </Button>
            <Button 
              onClick={onBookAppointment}
              size="2lg" className="btn-hero mobile-spacing"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Appointment
            </Button>
          </div>
          
          <div size="lg" className="mt-6">
            <a
              href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center btn-hero mobile-spacing text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Community
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/80 drop-shadow-sm">
            <Users className="w-5 h-5" />
            <span>Join 5,000+ happy clients who transformed their health</span>
          </div>
        </div>
      </AnimatedLiquidBackground>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About Nutrition hai Zaruri
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Driven by nutrition science, Nutrition Hai Zaruri helps people transform their health
                through practical, expert guidance. We believe that proper nutrition is not just about
                eating right—it's about creating a sustainable lifestyle that brings lasting wellness.
                With over 19 years of experience, Dt. Kirti Jain combines traditional wisdom with modern
                nutrition science to help you achieve your health goals.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {benefit.icon}
                    <div>
                      <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Meet Dt. Kirti Jain
              </h3>
              <p className="text-muted-foreground mb-6">
                Renowned Jaipur dietitian specializing in tailored Indian diets and holistic wellness.
                Post Graduate (M.Hsc) in Food and Nutrition with over 19 years of experience.
                Has interned at Choithram Hospital (Indore) and Dt. Ram Manohar Lohia Hospital (Delhi),
                and provided services at Pushpanjali Hospital (Agra).
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-4 shadow-soft">
                  <div className="text-2xl font-bold text-primary">19+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-soft">
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Why Choose Nutrition hai Zaruri?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Personalized Plans</h3>
                <p className="text-muted-foreground">
                  Custom nutrition plans based on your unique health profile and Indian dietary preferences
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Direct consultation with Dt. Kirti Jain for professional health and nutrition advice
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Access to exclusive WhatsApp health community for ongoing motivation and tips
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Success Stories from Our Clients
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-foreground">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Take the first step towards a healthier you. Our personalized nutrition assessment 
            takes just 2 minutes and provides instant insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onStartQuiz}
              className="bg-white text-primary hover:bg-white/90 font-semibold py-4 px-8 rounded-xl text-lg"
              size="lg"
            >
              Start Your Health Quiz Now
            </Button>
            <Button 
              onClick={onBookAppointment}
              className="border-white text-primary bg-white hover:bg-white/90 font-semibold py-4 px-8 rounded-xl text-lg"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <SupportSection />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default LandingPage;