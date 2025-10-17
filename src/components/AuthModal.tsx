import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();

  const validateForm = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      if (authMode === 'signup' && !fullName.trim()) {
        setError('Full name is required');
        return false;
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return false;
    }
  };

  const handleEmailSignIn = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message || 'Failed to sign in');
        toast({
          title: "Sign in failed",
          description: signInError.message || 'Failed to sign in',
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        handleClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    try {
      emailSchema.parse(email);
    } catch (err) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: resetError } = await resetPassword(email);

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
          description: "Check your email for password reset instructions.",
        });
        setAuthMode('signin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const { error: signUpError } = await signUp(email, password, fullName);
      
      if (signUpError) {
        setError(signUpError.message || 'Failed to sign up');
        toast({
          title: "Sign up failed",
          description: signUpError.message || 'Failed to sign up',
          variant: "destructive"
        });
        const msg = (signUpError.message || '').toLowerCase();
        if (msg.includes('already') || msg.includes('exists')) {
          setAuthMode('signin');
        }
      } else {
        toast({
          title: "Account created!",
          description: "You're now signed in.",
        });
        handleClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAuthMode('signin');
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </DialogTitle>
          <DialogDescription>
            {authMode === 'signin'
              ? 'Welcome back! Sign in to your account'
              : 'Create a new account to get started'
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                <div>{error}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
                onClick={() => setAuthMode('reset')}
              >
                Forgot Password?
              </button>
            </div>

            <Button 
              onClick={handleEmailSignIn} 
              className="w-full" 
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </TabsContent>

          <TabsContent value="reset" className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              onClick={handlePasswordReset}
              className="w-full"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Email
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80"
                onClick={() => setAuthMode('signin')}
              >
                Back to Sign In
              </button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters
              </p>
            </div>

            <Button 
              onClick={handleEmailSignUp} 
              className="w-full" 
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <span>Already have an account? </span>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: 'inherit'
                }}
                onClick={() => setAuthMode('signin')}
              >
                Sign in
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
