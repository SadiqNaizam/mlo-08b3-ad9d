import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppFooter from '@/components/layout/AppFooter'; // Custom component
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Used by react-hook-form's FormLabel
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LogIn, User, Lock, AlertCircle, Bell } from 'lucide-react';

// Define the Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginStatus {
  type: 'error' | 'success' | null;
  message: string | null;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState<LoginStatus>({ type: null, message: null });

  useEffect(() => {
    console.log('LoginPage loaded');
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login form submitted:", data);
    // Simulate API call
    if (data.email === "user@example.com" && data.password === "password") {
      setLoginStatus({ type: 'success', message: "Login successful! Redirecting..." });
      // In a real app, you'd set auth tokens here
      setTimeout(() => {
        navigate("/dashboard"); // Navigate to dashboard as per App.tsx
      }, 1000);
    } else {
      setLoginStatus({ type: 'error', message: "Invalid email or password. (Hint: user@example.com / password)" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100">
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center mb-8">
          {/* Doraemon-themed Bell Icon */}
          <div className="p-3 bg-yellow-400 rounded-full shadow-lg mb-4">
            <Bell className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Doraemon Health</h1>
          <p className="text-gray-600 mt-1">Your friendly health companion.</p>
        </div>

        <Card className="w-full max-w-md shadow-xl rounded-xl border-2 border-blue-300 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-blue-600">Welcome Back!</CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to access your health dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Email Address</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                            className="pl-10 border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Password</FormLabel>
                       <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            className="pl-10 border-blue-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loginStatus.message && (
                  <Alert variant={loginStatus.type === 'error' ? 'destructive' : 'default'} className={`rounded-lg ${loginStatus.type === 'success' ? 'bg-green-50 border-green-300 text-green-700' : ''}`}>
                    <AlertCircle className={`h-4 w-4 ${loginStatus.type === 'success' ? 'text-green-700' : ''}`} />
                    <AlertTitle>{loginStatus.type === 'error' ? 'Login Failed' : 'Success'}</AlertTitle>
                    <AlertDescription>
                      {loginStatus.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-6">
            <Link to="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
              Forgot your password?
            </Link>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="#" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <AppFooter />
    </div>
  );
};

export default LoginPage;