import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword: sendResetEmail } = useAuth();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('ResetPassword: Auth state change', { event, session: !!session });
        if (session?.user) {
          setUser(session.user);
          setError(''); // Clear error if user is set
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Clear the password reset flag when component mounts
  useEffect(() => {
    sessionStorage.removeItem('passwordResetAuth');
  }, []);

  // Check for session on mount
  // Replace the existing "Check for session on mount" useEffect with this
useEffect(() => {
  const checkSession = async () => {
    // First check existing session
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log('ResetPassword: Checking session', { session: !!session, error });
    
    if (error) {
      console.error('Session error:', error);
      setError('Unable to verify reset session. Please try again.');
    } else if (session?.user) {
      console.log('ResetPassword: Session found, setting user');
      setSessionUser(session.user);
      setUser(session.user);
      setError('');
    } else {
      // NO SESSION - check for hash token and process it
      const hash = window.location.hash.slice(1); // Remove #
      const urlParams = new URLSearchParams(hash);
      const type = urlParams.get('type');
      const access_token = urlParams.get('access_token');
      
      console.log('ResetPassword: Checking hash', { type, hasAccessToken: !!access_token });
      
      if (type === 'recovery' && access_token) {
        // Exchange hash token for session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(access_token);
        if (exchangeError) {
          console.error('Token exchange failed:', exchangeError);
          setError('Invalid or expired reset link. Please request a new one.');
        } else if (data.session?.user) {
          console.log('ResetPassword: Token exchanged, user set');
          setSessionUser(data.session.user);
          setUser(data.session.user);
          setError('');
        }
      } else {
        console.log('ResetPassword: No recovery token in hash');
        setError('Invalid or expired reset link. Please request a new password reset.');
      }
    }
    setIsCheckingSession(false);
  };

  checkSession();
}, []);


  const handlePasswordUpdate = async () => {
    const currentUser = user || sessionUser;
    if (!currentUser) {
      setError('You must be logged in to reset your password. Please request a new reset link.');
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Update the password using Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
  setError(updateError.message || 'Failed to update password');
  toast({
    title: "Password update failed",
    description: updateError.message || 'Failed to update password',
    variant: "destructive"
  });
} else {
  // Clear hash from URL and redirect
  window.history.replaceState({}, document.title, window.location.pathname);
  toast({
    title: "Password updated!",
    description: "Redirecting to login...",
  });
  setTimeout(() => {
    navigate('/');  // or navigate('/login') if you have a login page
  }, 1500);
}
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResendResetEmail = async () => {
    const currentUser = user || sessionUser;
    const targetEmail = currentUser?.email || resetEmail.trim();

    if (!targetEmail) {
      setError('Please enter your account email to receive a reset link.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: resetError } = await sendResetEmail(targetEmail);

      if (resetError) {
        setError(resetError.message || 'Failed to send reset email');
        toast({
          title: "Reset failed",
          description: resetError.message || 'Failed to send reset email',
          variant: "destructive"
        });
      } else {
        toast({
          title: "Reset email sent!",
          description: "Check your email for new password reset instructions.",
        });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isCheckingSession ? (
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>Checking reset session...</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {error.includes('Invalid or expired')
                ? 'Your reset link is invalid or expired.'
                : 'Enter your new password below.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && !error.includes('Invalid or expired') && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            {(user || sessionUser) ? (
              <>
                <div className="text-sm text-muted-foreground mb-4">
                  Logged in as: <span className="font-medium">{(user || sessionUser)?.email}</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <Button
                  onClick={handlePasswordUpdate}
                  className="w-full"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Password
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Account Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button
                  onClick={handleResendResetEmail}
                  className="w-full"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send New Reset Email
                </Button>
              </>
            )}

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
