import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', formData, {
        withCredentials: true,
      });
      console.log(response.data);
      const { user,token, message } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token',token);
      localStorage.setItem('isAuthenticated', 'true');
      toast.success(`🚀 ${message}`);
      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      toast.error('❌ Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/guestlogin', {}, {
        withCredentials: true,
      });
      console.log(response.data);
      const { user,token, message } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token',token);
      localStorage.setItem('isGuest', 'true');
      toast.success(`🎉 ${message}`);
      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message || 'Guest login failed. Please try again.');
      toast.error('❌ Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <LogIn className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Sign in
                  </div>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              onClick={handleGuestLogin}
              variant="outline"
              className="w-full transition-all duration-200 hover:bg-gray-50"
              disabled={loading}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Continue as Guest
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;