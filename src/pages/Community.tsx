import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Users, 
  Heart, 
  Zap, 
  Gift,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  UserCheck
} from "lucide-react";

export default function Community() {
  const benefits = [
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Daily Health Tips",
      description: "Get expert nutrition advice, healthy recipes, and wellness tips delivered daily to your WhatsApp."
    },
    {
      icon: <Users className="w-6 h-6 text-secondary" />,
      title: "Peer Support Network",
      description: "Connect with like-minded individuals on similar health journeys for motivation and encouragement."
    },
    {
      icon: <Heart className="w-6 h-6 text-accent" />,
      title: "Recipe Sharing",
      description: "Discover and share healthy, delicious recipes that fit your dietary preferences and restrictions."
    },
    {
      icon: <Zap className="w-6 h-6 text-success" />,
      title: "Quick Q&A Sessions",
      description: "Get quick answers to your nutrition questions from Dr. Kirti and experienced community members."
    },
    {
      icon: <Gift className="w-6 h-6 text-warning" />,
      title: "Exclusive Content",
      description: "Access to exclusive meal plans, workout tips, and health challenges not available elsewhere."
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Weekly Live Sessions",
      description: "Join live Q&A sessions, cooking demonstrations, and health workshops with Dr. Kirti."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      text: "The WhatsApp community has been a game-changer! Daily tips and recipe exchanges keep me motivated.",
      role: "Community Member for 8 months"
    },
    {
      name: "Rahul Gupta",
      text: "Love the peer support. Sharing my progress and seeing others' success stories keeps me on track.",
      role: "Community Member for 1 year"
    },
    {
      name: "Anita Singh",
      text: "Dr. Kirti's weekly live sessions are incredibly valuable. So much practical knowledge shared!",
      role: "Community Member for 6 months"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Members" },
    { number: "500+", label: "Recipes Shared" },
    { number: "50+", label: "Weekly Live Sessions" },
    { number: "95%", label: "Member Satisfaction" }
  ];

  const communityRules = [
    "Be respectful and supportive of all members",
    "Share only evidence-based health information",
    "Keep discussions focused on nutrition and wellness",
    "No spam, promotions, or unrelated content",
    "Respect privacy - no sharing personal information",
    "Follow Dr. Kirti's guidance for health advice"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-white/20 text-white mb-4">
            Free WhatsApp Community
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Join Our Thriving
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Health Community
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Connect with 2,500+ health enthusiasts, get daily nutrition tips, share recipes, 
            and stay motivated on your wellness journey with Dr. Kirti Jain's expert guidance.
          </p>
          
          <div className="flex justify-center mb-8">
            <a
              href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-large"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What You'll Get in Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of health enthusiasts and get access to exclusive content, 
              peer support, and expert guidance - all completely free!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How Our Community Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to join and start benefiting from our supportive health community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Click to Join</h3>
              <p className="text-muted-foreground">
                Click the WhatsApp link to join our private community group instantly. 
                It's completely free with no hidden costs.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Introduce Yourself</h3>
              <p className="text-muted-foreground">
                Share a brief introduction about your health goals and connect with 
                like-minded community members.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Start Participating</h3>
              <p className="text-muted-foreground">
                Engage with daily tips, share your progress, ask questions, and 
                support others on their health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Rules Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Community Guidelines
            </h2>
            <p className="text-lg text-muted-foreground">
              To maintain a positive and supportive environment, please follow these simple guidelines:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {communityRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Community Members Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real experiences from real people who've benefited from our supportive community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Health Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our supportive community today and take the first step towards 
            a healthier, happier you with expert guidance and peer support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Community Free
            </a>
            <a
              href="/?action=quiz"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 border-2 border-white"
            >
              Start Health Quiz
            </a>
          </div>

          <p className="text-white/70 text-sm mt-4">
            No spam, no sales pitches - just genuine support and expert guidance!
          </p>
        </div>
      </section>
    </div>
  );
}