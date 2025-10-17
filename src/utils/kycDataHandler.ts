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
    console.log("Saving KYC data for user:", userId);

    // First, try to update existing record
    const { data: existingData, error: selectError } = await supabase
      .from("kyc_responses")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error("Error checking existing KYC record:", selectError);
      throw selectError;
    }

    const kycRecord = {
      user_id: userId,
      responses: quizData as any,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let kycError;
    if (existingData) {
      // Update existing record
      console.log("Updating existing KYC record");
      const { error } = await supabase
        .from("kyc_responses")
        .update(kycRecord)
        .eq("user_id", userId);

      kycError = error;
    } else {
      // Insert new record
      console.log("Inserting new KYC record");
      const { error } = await supabase
        .from("kyc_responses")
        .insert(kycRecord);

      kycError = error;
    }

    if (kycError) {
      console.error("KYC save error:", kycError);
      throw kycError;
    }

    console.log("KYC data saved successfully for user:", userId);

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

    if (profileError) {
      console.error("Profile update error:", profileError);
      throw profileError;
    }

    console.log("Profile updated successfully for user:", userId);
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
    console.log("Fetching KYC data for user:", userId);
    const { data, error } = await supabase
      .from("kyc_responses")
      .select("responses, completed_at")
      .eq("user_id", userId)
      .order("completed_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("KYC fetch error:", error);
      throw error;
    }

    console.log("KYC data fetched:", data ? "found" : "not found", data?.completed_at ? "with completion date" : "without completion date");
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
    console.log("Checking KYC status for user:", userId);

    // First, try to get existing profile
    const { data, error } = await supabase
      .from("profiles")
      .select("kyc_completed, full_name, phone, email")
      .eq("user_id", userId)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching profile:", error);
      throw error;
    }

    if (data) {
      console.log("Profile found:", data.kyc_completed ? "KYC completed" : "KYC not completed");
      return {
        kycCompleted: data.kyc_completed || false,
        userData: {
          fullName: data.full_name || "",
          phone: data.phone || "",
          email: data.email || ""
        },
        error: null
      };
    }

    // If no profile exists, create one with default values
    console.log("No profile found, creating new profile for user:", userId);

    const { error: insertError } = await supabase
      .from("profiles")
      .insert({
        user_id: userId,
        kyc_completed: false,
        full_name: null,
        phone: null,
        email: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (insertError) {
      console.error("Error creating profile:", insertError);
      throw insertError;
    }

    console.log("Profile created successfully");
    return {
      kycCompleted: false,
      userData: null,
      error: null
    };
  } catch (error) {
    console.error("Error checking KYC status:", error);
    return { kycCompleted: false, userData: null, error };
  }
}
