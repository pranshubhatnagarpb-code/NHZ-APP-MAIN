import { supabase } from "@/integrations/supabase/client";

export interface QuizData {
  dietType: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  occupation: string;
  hearAbout: string;
  medicalConditions: string[];
  skinType: string;
  hairType: string;
  productsUsed: string;
}

export interface UserData {
  fullName: string;
  phone: string;
  email: string;
}

export interface AppointmentData {
  id: string;
  appointment_date: string;
  status: string;
  payment_status: string;
  payment_amount: number;
  notes?: string;
}

/**
 * Save KYC responses to the database
 */
export async function saveKYCData(
  userId: string,
  quizData: QuizData,
  userData: UserData
) {
  try {
    // Save quiz responses to kyc_responses table
    const { error: kycError } = await supabase
      .from("kyc_responses")
      .upsert({
        user_id: userId,
        responses: quizData as any,
        updated_at: new Date().toISOString()
      });

    if (kycError) throw kycError;

    // Update profile with user data and mark KYC as completed
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: userData.fullName,
        phone: userData.phone,
        email: userData.email,
        kyc_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", userId);

    if (profileError) throw profileError;

    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving KYC data:", error);
    return { success: false, error };
  }
}

/**
 * Fetch user's KYC data
 */
export async function fetchUserKYCData(userId: string) {
  try {
    const { data, error } = await supabase
      .from("kyc_responses")
      .select("responses")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return { 
      data: data?.responses ? (data.responses as unknown as QuizData) : null, 
      error: null 
    };
  } catch (error) {
    console.error("Error fetching KYC data:", error);
    return { data: null, error };
  }
}

/**
 * Fetch user's appointments
 */
export async function fetchUserAppointments(userId: string): Promise<{
  data: AppointmentData[] | null;
  error: any;
}> {
  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { data: null, error };
  }
}

/**
 * Check if user has completed KYC
 */
export async function checkKYCStatus(userId: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("kyc_completed, full_name, phone, email")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;

    return { 
      kycCompleted: data?.kyc_completed || false,
      userData: data ? {
        fullName: data.full_name || "",
        phone: data.phone || "",
        email: data.email || ""
      } : null,
      error: null 
    };
  } catch (error) {
    console.error("Error checking KYC status:", error);
    return { kycCompleted: false, userData: null, error };
  }
}
