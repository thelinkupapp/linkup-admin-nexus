
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Lock, Loader2, ArrowRight, KeyRound, CheckCircle2 } from "lucide-react";

type ResetStep = "login" | "confirm-reset" | "enter-code" | "new-password";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetStep, setResetStep] = useState<ResetStep>("login");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
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

  const handleForgotPassword = () => {
    setResetStep("confirm-reset");
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending a reset code
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
    toast({
      title: "Success",
      description: "Your password has been reset successfully. Please log in.",
    });
    setResetStep("login");
    setEmail("");
    setPassword("");
    setNewPassword("");
    setResetCode("");
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
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
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
              <InputOTP
                maxLength={6}
                value={resetCode}
                onChange={setResetCode}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, i) => (
                      <InputOTPSlot key={i} {...slot} index={i} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={resetCode.length !== 6}>
                Verify Code <CheckCircle2 className="ml-2 h-4 w-4" />
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
                  minLength={8}
                />
              </div>
            </div>
            <div className="flex justify-between space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={!newPassword}>
                Reset Password <KeyRound className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
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
                  onClick={handleForgotPassword}
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

            <Button type="submit" className="w-full" disabled={isLoading}>
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
            src="/lovable-uploads/1d844ea0-52cc-4ed0-b8d2-cb250bf887d2.png"
            alt="Linkup Logo"
            className="h-16 w-16 rounded-xl mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold mb-1">
            {resetStep === "login" ? "Do more, together" : 
             resetStep === "confirm-reset" ? "Reset Password" :
             resetStep === "enter-code" ? "Verify Code" :
             "Create New Password"}
          </h1>
          <p className="text-muted-foreground">
            {resetStep === "login" ? "Sign in to access the admin dashboard" :
             resetStep === "confirm-reset" ? "We'll send you a code to reset your password" :
             resetStep === "enter-code" ? "Enter the verification code from your email" :
             "Choose a new password for your account"}
          </p>
        </div>

        <div className="bg-card border rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
