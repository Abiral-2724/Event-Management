import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const tiers = [
    {
      name: 'Basic',
      price: 29,
      period: '/month',
      description: 'Perfect for small events and beginners',
      features: [
        'Up to 100 attendees',
        'Basic event registration',
        'Email notifications',
        'Event landing page',
        'Payment processing',
      ],
      highlighted: false,
    },
    {
      name: 'Professional',
      price: 79,
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 500 attendees',
        'Custom branding',
        'Advanced analytics',
        'Multiple ticket types',
        'Automated emails',
        'Mobile check-in app',
        'Priority support',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 199,
      period: '/month',
      description: 'For large-scale event management',
      features: [
        'Unlimited attendees',
        'White-label solution',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'On-site support',
        'Advanced security features',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the perfect plan for your event management needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.highlighted
                    ? 'border-2 border-blue-500 shadow-lg'
                    : 'border border-gray-200'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-gray-600">{tier.period}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${
                      tier.highlighted
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-800 text-white hover:bg-gray-900'
                    } transition-colors duration-200`}
                  >
                    Get Started
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;