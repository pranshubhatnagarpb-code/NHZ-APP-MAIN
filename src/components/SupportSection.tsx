import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, HelpCircle } from "lucide-react";

const SupportSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Still have questions? We're here to help!
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team is ready to assist you with any questions about nutrition, 
          consultations, or getting started on your health journey.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Quick response within 2-4 hours
              </p>
              <Button 
                asChild
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <a 
                  href="https://wa.me/919884315705?text=Hi%20Dr.%20Kirti,%20I%20need%20support%20with%20my%20nutrition%20plan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with Dr. Kirti
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Detailed response within 24 hours
              </p>
              <Button 
                asChild
                variant="outline"
                className="w-full"
              >
                <a 
                  href="mailto:info@nutritionhaizaruri.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;