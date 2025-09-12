// app/about/page.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/#contact');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-orange-50 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-orange-500 to-orange-700 text-white">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hakkımızda <span className="text-white">/</span> About Us
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              İhracHane is a full-service logistics and sourcing company dedicated to connecting businesses worldwide with reliable Chinese manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our mission is to simplify global trade for businesses of all sizes, helping them navigate the complexities of Chinese manufacturing, quality control, and international logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Product Research & Market Analysis</h3>
              </div>
              <p className="text-gray-600">
                Identifying trending products, analyzing market potential, and evaluating suppliers to ensure your investments are profitable.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Factory Sourcing & Visits</h3>
              </div>
              <p className="text-gray-600">
                Locating reliable factories, conducting on-site inspections, and verifying production capabilities and quality standards.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Warehousing & Fulfillment in China</h3>
              </div>
              <p className="text-gray-600">
                Securely storing your products, managing inventory, and preparing orders for global delivery.
              </p>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Global Shipping & Logistics</h3>
              </div>
              <p className="text-gray-600">
                Handling export documentation, customs clearance, and reliable transportation to destinations around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-4">Global Sourcing Expertise</h3>
                  <p className="text-orange-100">Connecting businesses with reliable manufacturers worldwide</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose İhracHane?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Expertise with Global Experience</h3>
                    <p className="text-gray-600">We combine deep knowledge of Chinese manufacturing with international business understanding.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent & Cost-Effective Solutions</h3>
                    <p className="text-gray-600">We provide clear pricing and processes to ensure you get the best value.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Long-Term Partnerships</h3>
                    <p className="text-gray-600">We're committed to building lasting relationships that support your business growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-orange-500 to-orange-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Trusted Partner for Global Sourcing</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            With İhracHane, your sourcing, logistics, and supply chain needs are handled professionally, so you can focus on growing your business.
          </p>
          
          <button 
            onClick={handleContactClick}
            className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-orange-50 transition-colors duration-300 shadow-lg"
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
}