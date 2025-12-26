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
import AnimatedLiquidBackground from "@/components/AnimatedLiquidBackground";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function About() {
  const achievements = [
    {
      icon: <Users className="w-6 h-6 text-yellow-300" />,
      number: 5000,
      displayNumber: "5,000+",
      label: "Happy Clients Transformed"
    },
    {
      icon: <Clock className="w-6 h-6 text-yellow-300" />,
      number: 10,
      displayNumber: "10+",
      label: "Years of Experience"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-300" />,
      number: 4.9,
      displayNumber: "4.9",
      label: "Average Client Rating"
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-300" />,
      number: 15,
      displayNumber: "15+",
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
      <AnimatedLiquidBackground className="text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">
                About Dt. Kirti Jain
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                Transforming Lives Through
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                  Science-Based Nutrition
                </span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed drop-shadow-md">
                With over 19 years of expertise in clinical nutrition and a passion for holistic wellness, 
                Dt. Kirti Jain has helped thousands of individuals achieve their health goals through 
                personalized, sustainable nutrition strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/?action=booking">
                  <Button size="lg" className="btn-hero">
                    Book Consultation
                  </Button>
                </a>
                <a
                  href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="btn-hero">
                    Join Community
                  </Button>
                </a>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      className="text-center group cursor-pointer"
                    >
                      <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        {achievement.icon}
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        <AnimatedNumber
                          value={achievement.number}
                          className="text-white"
                          suffix={achievement.displayNumber.includes('+') ? '+' : ''}
                        />
                      </div>
                      <div className="text-sm text-white/80">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedLiquidBackground>

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
                  <Target className="w-8 h-8 text-secondary mb-4" />
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
              <Target className="w-12 h-12 text-primary mx-auto" />
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
              <Button size="lg" className="btn-hero">
                Schedule Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}