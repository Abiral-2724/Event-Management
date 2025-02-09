import React from 'react';
import { 
  Calendar, 
  Users, 
  BarChart, 
  Clock, 
  Shield, 
  MessageSquare,
  CheckCircle,
  Trophy
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate() ;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section - Improved padding for mobile */}
      <main className='relative top-16'>
      <section className="bg-blue-600 text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 px-4">
              Transforming Event Management
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-4">
              We're on a mission to make event planning seamless, efficient, and enjoyable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Improved spacing on mobile */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600">10K+</h3>
              <p className="text-gray-600 mt-2">Events Managed</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600">50K+</h3>
              <p className="text-gray-600 mt-2">Happy Customers</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg sm:col-span-2 md:col-span-1">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600">98%</h3>
              <p className="text-gray-600 mt-2">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Improved card spacing */}
      <section className="py-10 md:py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How We Help You Succeed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="h-full">
              <CardHeader>
                <Calendar className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl md:text-2xl">Event Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Comprehensive planning tools, customizable templates, and smart checklists to ensure no detail is overlooked.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Users className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl md:text-2xl">Guest Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Easy RSVP tracking, seating arrangements, and automated guest communications.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full sm:col-span-2 md:col-span-1">
              <CardHeader>
                <BarChart className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl md:text-2xl">Budget Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm md:text-base">
                  Real-time budget management, expense tracking, and financial reporting tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Improved spacing and alignment */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Why Choose Eventify</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Time-Saving Automation</h3>
                <p className="text-gray-600 text-sm md:text-base">Automate repetitive tasks and focus on what matters most - creating memorable events.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-600 text-sm md:text-base">Enterprise-grade security to protect your event data and guest information.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm md:text-base">Dedicated support team ready to help you at every step of your event journey.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Industry Leading Tools</h3>
                <p className="text-gray-600 text-sm md:text-base">Access to cutting-edge event management tools and features.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Improved mobile spacing */}
      <section className="py-10 md:py-16 bg-blue-600 text-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Transform Your Event Planning?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8">Join thousands of successful event planners who trust Eventify</p>
          <button onClick={() => {
            navigate('/create-event') ;
          }} className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </button>
        </div>
      </section>
      </main>
    </div>
  );
};

export default About;