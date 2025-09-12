// app/privacy/page.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('privacy');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          href="/"
          className="bg-white text-orange-600 px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-orange-50 transition-colors duration-300 border border-orange-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İhracHane Policies</h1>
          <p className="text-xl md:text-2xl opacity-90">Comprehensive policies for privacy, terms of use, and more</p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl py-12 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Policy Sections</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('privacy')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === 'privacy' ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Privacy & Data Protection
                </button>
                <button
                  onClick={() => setActiveSection('terms')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === 'terms' ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Terms of Use
                </button>
                <button
                  onClick={() => setActiveSection('cookies')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === 'cookies' ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Cookie Policy
                </button>
                <button
                  onClick={() => setActiveSection('general')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === 'general' ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  General Policies
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Privacy & Data Protection Policy */}
            {activeSection === 'privacy' && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy & Data Protection Policy
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    İhracHane is committed to maintaining the privacy and security of all clients personal and business information. We comply with international data protection regulations, including GDPR, and apply strict policies for data handling.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Information We Collect</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li><span className="font-medium">Personal Information:</span> Full name, company name, billing and shipping addresses, email, and phone number.</li>
                    <li><span className="font-medium">Payment & Transaction Details:</span> Credit card or bank transfer information processed securely via certified third-party providers.</li>
                    <li><span className="font-medium">Order and Service Data:</span> Order history, product inquiries, communication records.</li>
                    <li><span className="font-medium">Technical Data:</span> IP address, browser type, device type, and cookies.</li>
                    <li><span className="font-medium">Factory & Product Data:</span> Information collected during inspections or sourcing, including photographs, certificates, and factory details.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">How We Use Your Data</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Process and fulfill orders accurately and efficiently.</li>
                    <li>Manage warehousing, inventory, and shipment logistics.</li>
                    <li>Provide customer support, status updates, and alerts.</li>
                    <li>Generate reports, product research, and market analysis.</li>
                    <li>Send marketing communications only if you have opted in.</li>
                    <li>Ensure compliance with legal obligations including taxation, customs, and import/export regulations.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Data Sharing and Disclosure</h3>
                  <p className="text-gray-700 mb-4">
                    We may share personal and business data with:
                  </p>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Freight forwarders and logistics partners for international shipping.</li>
                    <li>Payment gateways and banks for secure processing.</li>
                    <li>Warehousing providers for storage and fulfillment purposes.</li>
                    <li>Government or regulatory authorities when legally required.</li>
                  </ul>
                  <p className="text-gray-700 mb-6 font-medium">
                    We never sell or rent your personal information to third parties.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Security Measures</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Encrypted databases for sensitive information.</li>
                    <li>Access controls to ensure only authorized personnel handle your data.</li>
                    <li>Routine audits and security reviews to detect potential vulnerabilities.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Your Rights</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Access your personal data.</li>
                    <li>Request correction or update of incorrect or incomplete data.</li>
                    <li>Request deletion or restriction of data processing.</li>
                    <li>Receive a portable copy of your personal data.</li>
                  </ul>
                  <p className="text-gray-700">
                    <span className="font-medium">Contact:</span> All requests can be submitted via [email address].
                  </p>
                </div>
              </div>
            )}

            {/* Terms of Use */}
            {activeSection === 'terms' && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms of Use
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    By accessing and using İhracHane services or website, clients agree to the following:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Eligibility</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Users must be 18 years or older or operate under supervision of a parent/guardian.</li>
                    <li>Accurate information must be provided during registration and order placement.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Orders & Payment</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Orders constitute an offer to purchase and are subject to approval by İhracHane.</li>
                    <li>Payment is handled via secure gateways; we do not store sensitive payment data.</li>
                    <li>In case of a pricing or product description error, we reserve the right to correct or cancel orders.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Shipping & Logistics</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>International shipping times vary depending on destination, customs, and logistics providers.</li>
                    <li>Clients are responsible for local taxes, import duties, and additional charges.</li>
                    <li>Shipping delays due to customs inspections or force majeure are outside our control.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Returns & Refunds</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Clients may report defective, incorrect, or damaged products within 14 days of receipt.</li>
                    <li>Refunds or replacements are issued after inspection.</li>
                    <li>Returns shipping costs are borne by the client unless the product is defective.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Limitation of Liability</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>İhracHane is not responsible for indirect, incidental, or consequential damages.</li>
                    <li>Direct liability is limited to the value of the affected order.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Governing Law</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>All transactions are governed by Turkish law and applicable international trade regulations.</li>
                    <li>Any disputes are subject to the courts of Istanbul, Turkey, unless otherwise agreed in writing.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Cookie Policy */}
            {activeSection === 'cookies' && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Cookie Policy
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    İhracHane uses cookies to optimize the website, enhance user experience, and provide analytics.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">What Are Cookies?</h3>
                  <p className="text-gray-700 mb-6">
                    Cookies are small text files stored on your device that help remember your settings and improve functionality.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Types of Cookies</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li><span className="font-medium">Essential Cookies:</span> Required for login, security, and transaction completion.</li>
                    <li><span className="font-medium">Analytics Cookies:</span> Track user behavior to improve service efficiency.</li>
                    <li><span className="font-medium">Functional Cookies:</span> Store user preferences and settings.</li>
                    <li><span className="font-medium">Marketing Cookies:</span> Provide personalized offers and advertisements.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Managing Cookies</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Users can disable cookies in browser settings; however, some features may not function properly.</li>
                    <li>Third-party tools such as analytics and shipping platforms may also use cookies; see their privacy policies for more details.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* General Policies */}
            {activeSection === 'general' && (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  General Policies
                </h2>
                
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Product Sourcing & Factory Visits</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>We identify reliable manufacturers across China.</li>
                    <li>On-site inspections include: production capability assessment, quality control, and compliance verification.</li>
                    <li>Detailed factory reports with photos and certificates are provided to clients.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Warehousing & Fulfillment</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Products are securely stored in China-based warehouses.</li>
                    <li>Inventory management, packaging, and order fulfillment are handled to ensure efficiency.</li>
                    <li>Stock levels and shipment status are updated in real time.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Global Shipping & Logistics</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>End-to-end solutions include documentation, customs clearance, and coordination with freight forwarders.</li>
                    <li>International shipping timelines are provided and monitored; clients receive tracking information.</li>
                    <li>Clients are responsible for customs clearance in destination countries.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Returns & Dispute Resolution</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Clients may report quality or order discrepancies.</li>
                    <li>Disputes are resolved through inspection, replacement, or refund as appropriate.</li>
                    <li>Defective or misdelivered products are corrected promptly.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Customer Support</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>Support is available via email or platform contact forms.</li>
                    <li>Typical response time: 24–48 hours.</li>
                    <li>Dedicated account managers can be assigned for bulk or recurring clients.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b pb-2">Compliance</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
                    <li>All operations comply with Turkish laws and international trade regulations.</li>
                    <li>Export/import documents, invoices, and certificates are handled accurately for customs.</li>
                  </ul>

                  <div className="bg-orange-50 p-6 rounded-lg mt-8 border border-orange-100">
                    <h3 className="text-xl font-semibold text-orange-800 mb-3">Commitment to Clients</h3>
                    <p className="text-orange-700">
                      İhracHane strives to provide transparent, reliable, and efficient services for international sourcing, logistics, and global delivery. Our goal is to help businesses grow by handling the complexities of Chinese manufacturing, product inspection, warehousing, and worldwide shipping.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}