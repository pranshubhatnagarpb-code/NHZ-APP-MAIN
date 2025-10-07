import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const resendApiKey = Deno.env.get("RESEND_API_KEY")!;
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const sendEmail = async (to: string[], subject: string, html: string, from: string) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return await response.json();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactRequest = await req.json();

    console.log("Received contact form submission from:", email);

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user ID if authenticated
    const authHeader = req.headers.get("Authorization");
    let userId = null;
    
    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(
        authHeader.replace("Bearer ", "")
      );
      userId = user?.id || null;
    }

    // Save to database
    const { data: inquiry, error: dbError } = await supabase
      .from("contact_inquiries")
      .insert({
        name,
        email,
        phone,
        subject,
        message,
        user_id: userId,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to save inquiry: ${dbError.message}`);
    }

    console.log("Saved inquiry to database:", inquiry.id);

    // Send email to Dr. Kirti
    try {
      const adminEmail = await sendEmail(
        ["info@nutritionhaizaruri.com"],
        `New Contact Form: ${subject}`,
        `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>Inquiry ID: ${inquiry.id}</small></p>
        `,
        "Nutrition hai Zaruri <onboarding@resend.dev>"
      );
      console.log("Admin email sent successfully:", adminEmail.id);
    } catch (error) {
      console.error("Failed to send admin email:", error);
    }

    // Send confirmation email to user
    try {
      const userEmail = await sendEmail(
        [email],
        "We received your message!",
        `
          <h1>Thank you for contacting us, ${name}!</h1>
          <p>We have received your message regarding "<strong>${subject}</strong>" and will get back to you within 24 hours.</p>
          
          <h3>Your Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
          
          <p>If you need immediate assistance, please reach out to us on WhatsApp: <a href="https://wa.me/919884315705">+91 9884315705</a></p>
          
          <p>Best regards,<br>Dr. Kirti Jain<br>Nutrition hai Zaruri</p>
        `,
        "Dr. Kirti Jain <onboarding@resend.dev>"
      );
      console.log("User confirmation email sent successfully:", userEmail.id);
    } catch (error) {
      console.error("Failed to send user confirmation email:", error);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        inquiryId: inquiry.id,
        message: "Your message has been sent successfully!" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
