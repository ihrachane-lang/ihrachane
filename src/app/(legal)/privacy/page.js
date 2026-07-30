'use client';

import Link from 'next/link';
import { useState } from 'react';

const sections = [
  { id: 'privacy', label: 'Privacy & Data Protection' },
  { id: 'terms', label: 'Terms of Use' },
  { id: 'cookies', label: 'Cookie Policy' },
  { id: 'general', label: 'General Policies' },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('privacy');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="site-section-dark overflow-hidden">
        <div className="site-container relative z-10">
          <div className="mb-8">
            <Link href="/" className="site-button-dark">
              Back to Home
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="site-badge-dark">Legal & Compliance</div>
            <h1 className="site-title-dark mt-4 text-4xl sm:text-5xl">
              IHRACHANE Policies
            </h1>
            <p className="site-copy-dark mt-4">
              Comprehensive policies covering privacy, terms of use, cookies, and general operational guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="site-section-soft">
        <div className="site-container">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="site-panel sticky top-28 p-5">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-900">
                  Policy Sections
                </h2>
                <nav className="space-y-1.5">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`site-nav-tab ${
                        activeSection === section.id
                          ? 'site-nav-tab-active'
                          : 'site-nav-tab-inactive'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {activeSection === 'privacy' && (
                <div className="site-panel p-6 sm:p-10">
                  <h2 className="site-title mb-6 flex items-center gap-3 text-2xl sm:text-3xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    Privacy & Data Protection Policy
                  </h2>

                  <div className="site-prose">
                    <p className="text-lg">
                      IHRACHANE is committed to maintaining the privacy and security of all clients&apos; personal and business information. We comply with international data protection regulations, including GDPR, and apply strict policies for data handling.
                    </p>

                    <h3>Information We Collect</h3>
                    <ul>
                      <li><strong>Personal Information:</strong> Full name, company name, billing and shipping addresses, email, and phone number.</li>
                      <li><strong>Payment & Transaction Details:</strong> Credit card or bank transfer information processed securely via certified third-party providers.</li>
                      <li><strong>Order and Service Data:</strong> Order history, product inquiries, communication records.</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, device type, and cookies.</li>
                      <li><strong>Factory & Product Data:</strong> Information collected during inspections or sourcing, including photographs, certificates, and factory details.</li>
                    </ul>

                    <h3>How We Use Your Data</h3>
                    <ul>
                      <li>Process and fulfill orders accurately and efficiently.</li>
                      <li>Manage warehousing, inventory, and shipment logistics.</li>
                      <li>Provide customer support, status updates, and alerts.</li>
                      <li>Generate reports, product research, and market analysis.</li>
                      <li>Send marketing communications only if you have opted in.</li>
                      <li>Ensure compliance with legal obligations including taxation, customs, and import/export regulations.</li>
                    </ul>

                    <h3>Data Sharing and Disclosure</h3>
                    <p>We may share personal and business data with:</p>
                    <ul>
                      <li>Freight forwarders and logistics partners for international shipping.</li>
                      <li>Payment gateways and banks for secure processing.</li>
                      <li>Warehousing providers for storage and fulfillment purposes.</li>
                      <li>Government or regulatory authorities when legally required.</li>
                    </ul>
                    <p><strong>We never sell or rent your personal information to third parties.</strong></p>

                    <h3>Security Measures</h3>
                    <ul>
                      <li>Encrypted databases for sensitive information.</li>
                      <li>Access controls to ensure only authorized personnel handle your data.</li>
                      <li>Routine audits and security reviews to detect potential vulnerabilities.</li>
                    </ul>

                    <h3>Your Rights</h3>
                    <ul>
                      <li>Access your personal data.</li>
                      <li>Request correction or update of incorrect or incomplete data.</li>
                      <li>Request deletion or restriction of data processing.</li>
                      <li>Receive a portable copy of your personal data.</li>
                    </ul>
                    <p>
                      <strong>Contact:</strong> All requests can be submitted via our contact form or email listed on the website.
                    </p>
                  </div>
                </div>
              )}

              {activeSection === 'terms' && (
                <div className="site-panel p-6 sm:p-10">
                  <h2 className="site-title mb-6 flex items-center gap-3 text-2xl sm:text-3xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </span>
                    Terms of Use
                  </h2>

                  <div className="site-prose">
                    <p className="text-lg">
                      By accessing and using IHRACHANE services or website, clients agree to the following:
                    </p>

                    <h3>Eligibility</h3>
                    <ul>
                      <li>Users must be 18 years or older or operate under supervision of a parent/guardian.</li>
                      <li>Accurate information must be provided during registration and order placement.</li>
                    </ul>

                    <h3>Orders & Payment</h3>
                    <ul>
                      <li>Orders constitute an offer to purchase and are subject to approval by IHRACHANE.</li>
                      <li>Payment is handled via secure gateways; we do not store sensitive payment data.</li>
                      <li>In case of a pricing or product description error, we reserve the right to correct or cancel orders.</li>
                    </ul>

                    <h3>Shipping & Logistics</h3>
                    <ul>
                      <li>International shipping times vary depending on destination, customs, and logistics providers.</li>
                      <li>Clients are responsible for local taxes, import duties, and additional charges.</li>
                      <li>Shipping delays due to customs inspections or force majeure are outside our control.</li>
                    </ul>

                    <h3>Returns & Refunds</h3>
                    <ul>
                      <li>Clients may report defective, incorrect, or damaged products within 14 days of receipt.</li>
                      <li>Refunds or replacements are issued after inspection.</li>
                      <li>Returns shipping costs are borne by the client unless the product is defective.</li>
                    </ul>

                    <h3>Limitation of Liability</h3>
                    <ul>
                      <li>IHRACHANE is not responsible for indirect, incidental, or consequential damages.</li>
                      <li>Direct liability is limited to the value of the affected order.</li>
                    </ul>

                    <h3>Governing Law</h3>
                    <ul>
                      <li>All transactions are governed by Turkish law and applicable international trade regulations.</li>
                      <li>Any disputes are subject to the courts of Istanbul, Turkey, unless otherwise agreed in writing.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === 'cookies' && (
                <div className="site-panel p-6 sm:p-10">
                  <h2 className="site-title mb-6 flex items-center gap-3 text-2xl sm:text-3xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    Cookie Policy
                  </h2>

                  <div className="site-prose">
                    <p className="text-lg">
                      IHRACHANE uses cookies to optimize the website, enhance user experience, and provide analytics.
                    </p>

                    <h3>What Are Cookies?</h3>
                    <p>
                      Cookies are small text files stored on your device that help remember your settings and improve functionality.
                    </p>

                    <h3>Types of Cookies</h3>
                    <ul>
                      <li><strong>Essential Cookies:</strong> Required for login, security, and transaction completion.</li>
                      <li><strong>Analytics Cookies:</strong> Track user behavior to improve service efficiency.</li>
                      <li><strong>Functional Cookies:</strong> Store user preferences and settings.</li>
                      <li><strong>Marketing Cookies:</strong> Provide personalized offers and advertisements.</li>
                    </ul>

                    <h3>Managing Cookies</h3>
                    <ul>
                      <li>Users can disable cookies in browser settings; however, some features may not function properly.</li>
                      <li>Third-party tools such as analytics and shipping platforms may also use cookies; see their privacy policies for more details.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeSection === 'general' && (
                <div className="site-panel p-6 sm:p-10">
                  <h2 className="site-title mb-6 flex items-center gap-3 text-2xl sm:text-3xl">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </span>
                    General Policies
                  </h2>

                  <div className="site-prose">
                    <h3>Product Sourcing & Factory Visits</h3>
                    <ul>
                      <li>We identify reliable manufacturers across China.</li>
                      <li>On-site inspections include: production capability assessment, quality control, and compliance verification.</li>
                      <li>Detailed factory reports with photos and certificates are provided to clients.</li>
                    </ul>

                    <h3>Warehousing & Fulfillment</h3>
                    <ul>
                      <li>Products are securely stored in China-based warehouses.</li>
                      <li>Inventory management, packaging, and order fulfillment are handled to ensure efficiency.</li>
                      <li>Stock levels and shipment status are updated in real time.</li>
                    </ul>

                    <h3>Global Shipping & Logistics</h3>
                    <ul>
                      <li>End-to-end solutions include documentation, customs clearance, and coordination with freight forwarders.</li>
                      <li>International shipping timelines are provided and monitored; clients receive tracking information.</li>
                      <li>Clients are responsible for customs clearance in destination countries.</li>
                    </ul>

                    <h3>Returns & Dispute Resolution</h3>
                    <ul>
                      <li>Clients may report quality or order discrepancies.</li>
                      <li>Disputes are resolved through inspection, replacement, or refund as appropriate.</li>
                      <li>Defective or misdelivered products are corrected promptly.</li>
                    </ul>

                    <h3>Customer Support</h3>
                    <ul>
                      <li>Support is available via email or platform contact forms.</li>
                      <li>Typical response time: 24–48 hours.</li>
                      <li>Dedicated account managers can be assigned for bulk or recurring clients.</li>
                    </ul>

                    <h3>Compliance</h3>
                    <ul>
                      <li>All operations comply with Turkish laws and international trade regulations.</li>
                      <li>Export/import documents, invoices, and certificates are handled accurately for customs.</li>
                    </ul>

                    <div className="highlight-box">
                      <h3>Commitment to Clients</h3>
                      <p>
                        IHRACHANE strives to provide transparent, reliable, and efficient services for international sourcing, logistics, and global delivery. Our goal is to help businesses grow by handling the complexities of Chinese manufacturing, product inspection, warehousing, and worldwide shipping.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
