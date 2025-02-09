import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, MapPin, PartyPopper, Trophy, Music, ArrowRight, Star, Clock } from "lucide-react";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';



const Homepage = () => {
    const navigate = useNavigate() ;
  return (
    <main className="min-h-screen">
        <Navbar></Navbar>
      {/* Hero Section with Gradient Overlay */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://plus.unsplash.com/premium_vector-1683141200177-9575262876f7?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Event venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Create Memorable Events<br />That Last a Lifetime
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Transform your vision into extraordinary experiences with our professional event planning services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={()=>{
                navigate('/create-event')
            }}>
              Start Planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
              View Our Past Event
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {[
            { number: "500+", label: "Events Organized" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "50+", label: "Venue Partners" },
            { number: "10+", label: "Years Experience" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we handle every detail with precision and care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: PartyPopper,
                title: "Corporate Events",
                desc: "Conferences, seminars, and team building events tailored to your company's needs",
                features: ["Custom Themes", "Professional Staff", "Technical Support"]
              },
              {
                icon: Music,
                title: "Social Celebrations",
                desc: "Weddings, birthdays, and milestone celebrations that create lasting memories",
                features: ["Event Design", "Catering Services", "Entertainment"]
              },
              {
                icon: Trophy,
                title: "Special Occasions",
                desc: "Award ceremonies, galas, and product launches that make a lasting impression",
                features: ["Venue Selection", "Event Planning", "Full Coordination"]
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8">Let's bring your vision to life with our expert event planning services</p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Initial Consultation", desc: "We discuss your vision and requirements" },
              { icon: Users, title: "Planning Phase", desc: "Our team develops a detailed event plan" },
              { icon: MapPin, title: "Coordination", desc: "We handle all vendor and venue arrangements" },
              { icon: PartyPopper, title: "Execution", desc: "Flawless delivery of your perfect event" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      <div>
        <Footer></Footer>
      </div>
    </main>
  );
};

export default Homepage;