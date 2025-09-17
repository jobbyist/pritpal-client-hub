import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This would integrate with Supabase authentication once connected
    console.log("Login attempt:", { username, password });
  };

  const handleSocialLogin = (provider: string) => {
    // This would integrate with Supabase social auth once connected
    console.log(`${provider} login attempt`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={logo} 
            alt="Law Offices of Pritpal Singh" 
            className="h-16 w-auto mx-auto mb-6"
          />
        </div>

        <Card className="border-0 shadow-[var(--shadow-elevated)] bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-primary">
              SECURE CLIENT PORTAL
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm leading-relaxed">
              View your account information, send/request updates on your matter, store important legal 
              documents, manage or pay your bills and view your transaction history. More features coming soon.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                variant="professional" 
                className="w-full h-12 text-base font-semibold tracking-wide"
              >
                LAUNCH THE DASHBOARD
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or sign in with</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full h-11 font-medium"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full h-11 font-medium"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Continue with Facebook
                </Button>

                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  className="w-full h-11 font-medium bg-black text-white hover:bg-gray-800"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Sign in with Apple
                </Button>
              </div>
            </div>

            <div className="text-center text-xs text-muted-foreground space-y-2">
              <p>Need help? Contact our support team at</p>
              <div className="space-y-1">
                <a 
                  href="mailto:info@pritsinghlaw.com" 
                  className="text-primary hover:underline font-medium"
                >
                  info@pritsinghlaw.com
                </a>
                <p>or call <a href="tel:+15104432123" className="text-primary hover:underline font-medium">(510) 443-2123</a> for assistance.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;