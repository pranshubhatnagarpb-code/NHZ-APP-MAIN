import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  Heart,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number too long"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message too long")
});

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      title: "WhatsApp",
      description: "Quick response within 2-4 hours",
      contact: "+91 9884315705",
      action: "Chat Now",
      link: "https://wa.me/919884315705?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20your%20nutrition%20services",
      primary: true
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      description: "Detailed inquiries & consultation booking",
      contact: "info@nutritionhaizaruri.com",
      action: "Send Email",
      link: "mailto:info@nutritionhaizaruri.com"
    },
    {
      icon: <Phone className="w-6 h-6 text-secondary" />,
      title: "Phone",
      description: "Direct consultation booking",
      contact: "+91 9884315705",
      action: "Call Now",
      link: "tel:+919884315705"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "9:00 AM - 5:00 PM" },
    { day: "Sunday", time: "10:00 AM - 2:00 PM" }
  ];

  const faqs = [
    {
      question: "How quickly can I get a consultation?",
      answer: "Usually within 24-48 hours for online consultations, and within 3-5 days for in-person meetings."
    },
    {
      question: "Do you offer online consultations?",
      answer: "Yes! We provide comprehensive online consultations via video call, WhatsApp, and phone."
    },
    {
      question: "What should I prepare for my consultation?",
      answer: "Please complete our health quiz, bring recent lab reports if any, and have your current medications list ready."
    }
  ];

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please correct the errors",
        description: "Check the form fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Call the edge function to save and email the inquiry
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      console.log("Contact form submitted successfully:", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We've received your inquiry and will get back to you within 24 hours. Check your email for confirmation.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again or contact us directly via WhatsApp.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-white/20 text-white mb-4">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let's Start Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Health Transformation
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Ready to take the next step? Get in touch with Dr. Kirti Jain for personalized 
            nutrition guidance and start your journey to better health today.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className={`shadow-soft border-0 hover:shadow-medium transition-all duration-300 ${
                method.primary ? 'ring-2 ring-green-200 bg-green-50/50' : ''
              }`}>
                <CardContent className="p-6 text-center">
                  {method.primary && (
                    <Badge className="bg-green-100 text-green-800 mb-4">
                      Recommended
                    </Badge>
                  )}
                  <div className="flex justify-center mb-4">
                    {method.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                  <p className="font-medium text-foreground mb-4">{method.contact}</p>
                  <Button 
                    asChild 
                    className={method.primary ? "bg-green-600 hover:bg-green-700" : ""}
                    size="sm"
                  >
                    <a href={method.link} target="_blank" rel="noopener noreferrer">
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours. 
                For urgent inquiries, please use WhatsApp or call directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="What would you like to discuss?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className={errors.subject ? 'border-destructive' : ''}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your health goals, current challenges, or any specific questions you have..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{schedule.day}</span>
                      <span className="font-medium">{schedule.time}</span>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 inline mr-1 text-success" />
                      Emergency consultations available via WhatsApp 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    Dr. Kirti Jain Nutrition Clinic
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Jaipur, Rajasthan, India
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Heart className="w-4 h-4 inline mr-1 text-accent" />
                    Currently serving clients across India through online consultations
                  </p>
                </CardContent>
              </Card>

              {/* Quick FAQ */}
              <Card className="shadow-soft border-0">
                <CardHeader>
                  <CardTitle>Quick Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-foreground mb-1">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Health Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Don't wait another day to start improving your health. 
            Take our free health quiz and get personalized nutrition insights right now!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto" asChild>
              <a href="/?action=quiz">Start Free Health Quiz</a>
            </Button>
            <a
              href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-primary bg-white hover:bg-white/90 w-full"
              >
                Join WhatsApp Community
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}