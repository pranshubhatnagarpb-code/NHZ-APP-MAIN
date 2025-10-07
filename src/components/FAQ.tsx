import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the personalized nutrition consultation work?",
    answer: "After completing our comprehensive health quiz, you'll receive a detailed nutrition score and personalized report. Dr. Kirti Jain will then provide expert consultation based on your specific health profile, dietary preferences, and lifestyle. The consultation includes customized meal plans, supplement recommendations, and ongoing support."
  },
  {
    question: "What is included in the nutrition plan?",
    answer: "Your personalized nutrition plan includes: customized meal plans based on Indian cuisine, portion size guidelines, food substitution options, supplement recommendations if needed, grocery shopping lists, and recipes tailored to your preferences and health goals."
  },
  {
    question: "How much does the consultation cost?",
    answer: "Our consultation packages start from ₹1,999 for a basic nutrition assessment and personalized plan. Premium packages include follow-up sessions, WhatsApp support, and additional resources. Pricing varies based on the level of support and duration of the program you choose."
  },
  {
    question: "Can I join the WhatsApp community for free?",
    answer: "Yes! Our WhatsApp community is free to join and provides daily health tips, nutrition advice, recipe sharing, and peer support. It's a great way to stay motivated and connected with others on their health journey."
  },
  {
    question: "How long does it take to see results?",
    answer: "Most clients start seeing improvements in energy levels and digestion within 2-3 weeks. Significant weight management results typically become visible after 4-6 weeks, while long-term health improvements develop over 2-3 months with consistent adherence to the plan."
  },
  {
    question: "Do you provide support for specific health conditions?",
    answer: "Yes, Dr. Kirti Jain specializes in nutrition plans for various health conditions including diabetes, PCOS, thyroid disorders, high blood pressure, digestive issues, and weight management. Each plan is medically informed and tailored to your specific condition."
  },
  {
    question: "How do I access my nutrition report and plan?",
    answer: "After completing your consultation, you'll receive your personalized nutrition report via email within 24-48 hours. You can also access it through your account dashboard on our app, where you can track your progress and access additional resources."
  },
  {
    question: "Is the app available on mobile devices?",
    answer: "Yes, our platform is fully responsive and works seamlessly on all mobile devices through your web browser. We also provide WhatsApp support for easy communication and quick questions about your nutrition plan."
  },
  {
    question: "What if I have food allergies or dietary restrictions?",
    answer: "Absolutely! Our health quiz includes detailed questions about food allergies, intolerances, and dietary preferences (vegetarian, vegan, Jain, etc.). Dr. Kirti will create a plan that works around your restrictions while ensuring you get all necessary nutrients."
  },
  {
    question: "How often should I have follow-up consultations?",
    answer: "We recommend follow-up consultations every 2-4 weeks initially to track progress and make necessary adjustments. As you progress, the frequency can be reduced to monthly or quarterly check-ins, depending on your goals and progress."
  }
];

export function FAQ() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our nutrition consultations, 
            app usage, and health programs.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-lg border shadow-soft px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/DZf2YjUlHn36DzJA5ZePtL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              WhatsApp Support
            </a>
            <a
              href="mailto:info@nutritionhaizaruri.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}