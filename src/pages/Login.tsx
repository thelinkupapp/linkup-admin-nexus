
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2, ArrowRight, KeyRound } from "lucide-react";

type ResetStep = "login" | "confirm-reset" | "enter-code" | "new-password" | "success";

export default function Login() {
  const [email, setEmail] = useState("jack@linkupapp.io");
  const [password, setPassword] = useState("linkup");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("login");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Login page rendered, user:", user);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/";
      console.log("User already logged in, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    // In-app state transition, not navigation
    setResetStep("enter-code");
    toast({
      title: "Code Sent",
      description: `A verification code has been sent to ${email}`,
    });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCode.length === 6) {
      setResetStep("new-password");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 6-digit code",
      });
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long",
      });
      return;
    }
    setResetStep("success");
    toast({
      title: "Success",
      description: "Your password has been reset successfully",
    });
  };

  const handleCancel = () => {
    setResetStep("login");
    setResetCode("");
    setNewPassword("");
  };

  const renderContent = () => {
    switch (resetStep) {
      case "confirm-reset":
        return (
          <form onSubmit={handleConfirmReset} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="confirm-email" className="text-sm font-medium">
                Confirm your email address to receive a reset code
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirm-email"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
              >
                Send Code <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );

      case "enter-code":
        return (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter the 6-digit code sent to your email
              </label>
              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="h-12 w-12 text-center text-lg"
                    value={resetCode[index] || ""}
                    onChange={(e) => {
                      const newCode = resetCode.split('');
                      newCode[index] = e.target.value;
                      setResetCode(newCode.join(''));
                      
                      // Auto-focus next input
                      if (e.target.value && index < 5) {
                        const nextInput = document.querySelector(`input[name="digit-${index + 1}"]`);
                        if (nextInput instanceof HTMLInputElement) {
                          nextInput.focus();
                        }
                      }
                    }}
                    name={`digit-${index}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Didn't receive a code? <button type="button" className="text-primary hover:underline" onClick={handleConfirmReset}>Resend</button>
              </p>
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={resetCode.length !== 6}
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
              >
                Verify Code <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );

      case "new-password":
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">
                Enter your new password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="new-password"
                  type="password"
                  className="pl-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!newPassword}
                className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
              >
                Reset Password <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Password Reset Successfully</h2>
            <p className="text-muted-foreground">Your password has been updated.</p>
            <Button 
              onClick={() => setResetStep("login")}
              className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/90"
            >
              Return to Login
            </Button>
          </div>
        );

      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Button 
                  type="button"
                  variant="link" 
                  className="text-xs p-0 h-auto" 
                  onClick={() => setResetStep("confirm-reset")}
                  disabled={!email}
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#8B5CF6] hover:bg-[#8B5CF6]/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/108c3143-87e9-491c-96ec-f3c4a43ba199.png"
            alt="Linkup Logo"
            className="mx-auto mb-4 object-contain h-24 w-auto max-w-full"
          />
          <h1 className="text-2xl font-semibold mb-1">
            {resetStep === "login" ? "Do more, together" : 
             resetStep === "confirm-reset" ? "Reset Password" :
             resetStep === "enter-code" ? "Verify Code" :
             resetStep === "new-password" ? "Create New Password" :
             "Success"}
          </h1>
          <p className="text-muted-foreground">
            {resetStep === "login" ? "Sign in to access the admin dashboard" :
             resetStep === "confirm-reset" ? "We'll send you a code to reset your password" :
             resetStep === "enter-code" ? "Enter the verification code from your email" :
             resetStep === "new-password" ? "Choose a new password for your account" :
             "You can now sign in with your new password"}
          </p>
          <Alert variant="default" className="mt-2 bg-blue-50 border-blue-100">
            <AlertDescription className="text-sm">
              For demo: Use <strong>jack@linkupapp.io</strong> and password <strong>linkup</strong>
            </AlertDescription>
          </Alert>
        </div>

        <div className="bg-card border rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
