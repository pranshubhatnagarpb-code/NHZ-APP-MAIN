import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Award, 
  Users, 
  Heart, 
  Star, 
  Clock,
  CheckCircle,
  Target,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const achievements = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      number: "5,000+",
      label: "Happy Clients Transformed"
    },
    {
      icon: <Clock className="w-6 h-6 text-secondary" />,
      number: "10+",
      label: "Years of Experience"
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      number: "4.9",
      label: "Average Client Rating"
    },
    {
      icon: <Award className="w-6 h-6 text-success" />,
      number: "15+",
      label: "Certifications & Awards"
    }
  ];

  const specializations = [
    "Weight Management & Fat Loss",
    "PCOS & Hormonal Balance",
    "Diabetes & Blood Sugar Control",
    "Thyroid Disorder Management",
    "Digestive Health & Gut Wellness",
    "Sports Nutrition & Performance",
    "Pregnancy & Postpartum Nutrition",
    "Child & Teen Nutrition"
  ];

  const qualifications = [
    {
      degree: "M.Sc. Clinical Nutrition & Dietetics",
      institution: "IGNOU, New Delhi",
      year: "2012"
    },
    {
      degree: "B.Sc. Home Science (Foods & Nutrition)",
      institution: "University of Rajasthan",
      year: "2010"
    },
    {
      degree: "Certified Diabetes Educator",
      institution: "Indian Dietetic Association",
      year: "2014"
    },
    {
      degree: "Sports Nutrition Specialist",
      institution: "International Sports Sciences Association",
      year: "2016"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">
                About Dr. Kirti Jain
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transforming Lives Through
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Science-Based Nutrition
                </span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                With over a decade of expertise in clinical nutrition and a passion for holistic wellness, 
                Dr. Kirti Jain has helped thousands of individuals achieve their health goals through 
                personalized, sustainable nutrition strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/?action=booking">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                    Book Consultation
                  </Button>
                </a>
                <a
                  href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-white text-primary bg-white hover:bg-white/90 w-full sm:w-auto">
                    Join Community
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        {achievement.icon}
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {achievement.number}
                      </div>
                      <div className="text-sm text-white/80">
                        {achievement.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                My Journey to Nutrition Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  My passion for nutrition began during my own health transformation journey. 
                  After struggling with weight management and digestive issues in my early twenties, 
                  I discovered the profound impact that proper nutrition could have on overall wellness.
                </p>
                <p>
                  This personal experience motivated me to pursue advanced degrees in clinical nutrition 
                  and dietetics. Over the past decade, I've specialized in creating sustainable, 
                  culturally-appropriate nutrition solutions that work with Indian dietary preferences 
                  and lifestyle patterns.
                </p>
                <p>
                  Today, through "Nutrition hai Zaruri," I combine evidence-based nutrition science 
                  with practical, personalized approaches to help individuals achieve lasting health 
                  transformations. Every client's success story reinforces my belief that proper 
                  nutrition truly is essential - "zaruri" - for a fulfilling life.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <Target className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Mission</h3>
                  <p className="text-muted-foreground">
                    To make evidence-based nutrition accessible to everyone, empowering individuals 
                    to take control of their health through sustainable dietary changes.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft border-0">
                <CardContent className="p-6">
                  <Sparkles className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Vision</h3>
                  <p className="text-muted-foreground">
                    A world where every individual has the knowledge and tools to maintain 
                    optimal health through personalized nutrition strategies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Education & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continuously advancing knowledge through formal education and professional certifications 
              to provide the highest quality nutrition guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualifications.map((qual, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {qual.degree}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {qual.institution}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {qual.year}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Areas of Specialization
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive nutrition expertise across various health conditions and life stages, 
              ensuring personalized care for every individual's unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {specializations.map((specialization, index) => (
              <Card key={index} className="shadow-soft border-0 hover:shadow-medium transition-all duration-300 group">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-success mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">
                    {specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            My Nutrition Philosophy
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <Heart className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Holistic Approach</h3>
              <p className="text-muted-foreground">
                Addressing not just what you eat, but how, when, and why you eat, 
                considering your lifestyle, preferences, and mental well-being.
              </p>
            </div>
            
            <div className="space-y-4">
              <Target className="w-12 h-12 text-secondary mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Personalized Solutions</h3>
              <p className="text-muted-foreground">
                No one-size-fits-all approach. Every nutrition plan is tailored to your 
                unique body, health conditions, and cultural food preferences.
              </p>
            </div>
            
            <div className="space-y-4">
              <Sparkles className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Sustainable Change</h3>
              <p className="text-muted-foreground">
                Focus on creating lasting lifestyle changes rather than quick fixes, 
                ensuring long-term health and wellness success.
              </p>
            </div>
          </div>

          <blockquote className="text-xl italic text-muted-foreground mb-8 border-l-4 border-primary pl-6">
            "True health transformation happens when science meets compassion, 
            and when personalized nutrition becomes a sustainable way of life."
          </blockquote>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/?action=quiz">
              <Button size="lg" className="btn-hero">
                Start Your Health Quiz
              </Button>
            </a>
            <a href="/?action=booking">
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}