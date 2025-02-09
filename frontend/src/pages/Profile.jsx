import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, Calendar, MapPin, Edit, UserCheck, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="border-b bg-white">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-100 transition-colors">
                  <Edit size={16} /> Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {userData.profile ? (
                        <img 
                          src={userData.profile} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={64} className="text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Camera size={20} className="text-gray-600" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{userData.fullname}</h2>
                    <p className="text-gray-500">{userData.role || 'Member'}</p>
                  </div>
                </div>

                {/* User Details Section */}
                <div className="md:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Mail className="text-blue-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="font-semibold text-gray-800">{userData.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Phone className="text-blue-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-800">{userData.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <UserCheck className="text-blue-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Username</p>
                          <p className="font-semibold text-gray-800">{userData.username || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <MapPin className="text-blue-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="font-semibold text-gray-800">{userData.location || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Calendar className="text-blue-500" size={24} />
                        <div>
                          <p className="text-sm font-medium text-gray-500">Member Since</p>
                          <p className="font-semibold text-gray-800">
                            {userData.joinDate ? new Date(userData.joinDate).toLocaleDateString() : 'Not available'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {userData.bio || 'No bio provided yet.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Profile;