import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, UserPlus, Mail, User, Lock, Upload } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        profilePhoto: null
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePhoto: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'profilePhoto' && formData[key]) {
                formDataToSend.append('file', formData[key]);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('https://event-management-bj0d.onrender.com/api/v1/user/register', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess(response.data.message);
            navigate('/login');
            toast.success('Registered successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const response = await axios.post('https://event-management-bj0d.onrender.com/api/v1/user/guestlogin');
            setSuccess(response.data.message);
            toast.success('🚀 Welcome back');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Guest login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl"> {/* Increased from max-w-md to max-w-3xl */}
            <Card className="backdrop-blur-sm bg-white/95 shadow-xl">
                <CardHeader className="space-y-1 px-8"> {/* Increased padding */}
                    <div className="flex justify-center mb-6"> {/* Increased margin */}
                        <div className="p-3 bg-blue-100 rounded-full"> {/* Increased padding */}
                            <UserPlus className="h-8 w-8 text-blue-600" /> {/* Increased icon size */}
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 text-lg"> {/* Increased text size */}
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-8"> {/* Increased padding */}
                    <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
                        {error && (
                            <Alert variant="destructive" className="animate-shake">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert className="bg-green-50 text-green-700 border-green-200">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Grid layout for side-by-side inputs */}
                            <div className="relative">
                                <Label htmlFor="fullname" className="text-gray-700 text-base">Full Name</Label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 h-11 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Label htmlFor="username" className="text-gray-700 text-base">Username</Label>
                                <div className="mt-2 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 h-11 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="johndoe"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Label htmlFor="email" className="text-gray-700 text-base">Email</Label>
                                <div className="mt-2 relative rounded-md shadow-sm">
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
                                        className="pl-10 h-11 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <Label htmlFor="password" className="text-gray-700 text-base">Password</Label>
                                <div className="mt-2 relative rounded-md shadow-sm">
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
                                        className="pl-10 h-11 hover:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profilePhoto" className="text-gray-700 text-base">Profile Photo</Label>
                            <div className="mt-2 flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Input
                                        id="profilePhoto"
                                        name="profilePhoto"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-11 flex items-center justify-center gap-2"
                                        onClick={() => document.getElementById('profilePhoto').click()}
                                    >
                                        <Upload className="h-5 w-5" />
                                        Choose Photo
                                    </Button>
                                </div>
                                {previewUrl && (
                                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-blue-500">
                                        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                    Creating account...
                                </div>
                            ) : "Create account"}
                        </Button>
                    </form>

                    <div className="relative my-8"> {/* Increased margin */}
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-gray-500"> {/* Increased padding */}
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={handleGuestLogin}
                        variant="outline"
                        className="w-full h-11 transition-all duration-200 hover:bg-gray-50"
                        disabled={loading}
                    >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Continue as Guest
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pb-8"> {/* Increased padding */}
                    <div className="text-sm text-center text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                            Login
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>

    );
};

export default Signup;