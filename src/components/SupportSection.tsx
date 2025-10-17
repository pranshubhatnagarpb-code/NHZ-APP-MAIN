import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const SupportSection = () => {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Get in Touch with Nutrition Hai Zaruri
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with Dr. Kirti Jain and our nutrition experts for personalized guidance
          on your health journey.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">WhatsApp Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Quick response within 2-4 hours
              </p>
              <Button
                asChild
                className="w-full bg-primary hover:bg-green-700"
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
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Detailed response within 24 hours
              </p>
              <Button
                asChild
                className="w-full bg-primary hover:bg-green-700"
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

        <div className="mt-8 p-6 bg-card rounded-lg border border-border max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Nutrition Hai Zaruri - Jaipur</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Expert nutrition consultation and diet planning services by Dr. Kirti Jain
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;