import React from 'react';
import { Calendar, Users, Gift, Music, Camera, Utensils, Award, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const Services = () => {
  const mainServices = [
    {
      title: 'Corporate Events',
      icon: Users,
      description: 'Professional conferences, seminars, and team-building events tailored to your company culture.',
      features: ['Conference planning', 'Team building', 'Award ceremonies', 'Product launches'],
      color: 'bg-blue-500'
    },
    {
      title: 'Social Celebrations',
      icon: Gift,
      description: 'Create unforgettable moments with our expertly planned social events and celebrations.',
      features: ['Weddings', 'Birthday parties', 'Anniversary celebrations', 'Graduation parties'],
      color: 'bg-purple-500'
    },
    {
      title: 'Entertainment Events',
      icon: Music,
      description: 'From concerts to festivals, we handle all aspects of entertainment event management.',
      features: ['Concerts', 'Music festivals', 'Art exhibitions', 'Cultural shows'],
      color: 'bg-pink-500'
    }
  ];

  const additionalServices = [
    {
      icon: Camera,
      title: 'Photography & Videography',
      description: 'Professional event documentation'
    },
    {
      icon: Utensils,
      title: 'Catering Services',
      description: 'Customized menu planning'
    },
    {
      icon: Calendar,
      title: 'Venue Selection',
      description: 'Perfect location scouting'
    },
    {
      icon: Award,
      title: 'Event Design',
      description: 'Creative themes & décor'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
      <main className="flex-grow bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comprehensive Event Management Services
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Transform your vision into reality with our professional event planning and management services
              </p>
            </div>
          </div>
        </div>

        {/* Main Services Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {mainServices.map((service) => (
              <Card key={service.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <ArrowRight className="h-4 w-4 text-blue-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Services Grid */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {additionalServices.map((service) => (
                <div key={service.title} className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We bring your events to life with meticulous planning, creative design, and flawless execution
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">10+ Years Experience</h3>
                <p className="text-gray-600">Proven track record of successful event management across industries</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Dedicated Team</h3>
                <p className="text-gray-600">Professional event planners committed to your event's success</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Award className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
                <p className="text-gray-600">Attention to detail and commitment to excellence in every event</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Services;