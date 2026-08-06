"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "privacy", label: "Privacy & Data Protection" },
  { id: "terms", label: "Terms of Use" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "general", label: "General Policies" },
];

export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState("privacy");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="site-section-dark overflow-hidden pt-28 sm:pt-32 lg:pt-36">
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
                          ? "site-nav-tab-active"
                          : "site-nav-tab-inactive"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:w-3/4">
              <div className="site-panel p-8 sm:p-12 site-prose">
                {activeSection === "privacy" && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                      Privacy & Data Protection Policy
                    </h2>
                    <p>
                      At <strong>IHRACHANE</strong>, we respect your privacy and are committed to protecting the personal and operational data you share with us.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                      We collect business information necessary to fulfill sourcing, inspection, and logistics inquiries. This includes:
                    </p>
                    <ul>
                      <li>Contact details (Name, business email address, phone number).</li>
                      <li>Inquiry specifications (Product requirements, estimated order quantities, shipping preferences).</li>
                      <li>Technical log data (IP address, browser type) used strictly for security and site analytics.</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                      Your information is used strictly to communicate regarding your request, manage supplier and freight coordination, and provide updates.
                    </p>

                    <h3>3. Data Confidentiality</h3>
                    <p>
                      We do not sell, trade, or rent your personal or commercial sourcing data to third parties.
                    </p>
                  </div>
                )}

                {activeSection === "terms" && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                      Terms of Use
                    </h2>
                    <p>
                      By accessing or using the <strong>IHRACHANE</strong> website, you agree to comply with the terms and conditions outlined below.
                    </p>

                    <h3>1. Services Scope</h3>
                    <p>
                      IHRACHANE acts as an end-to-end procurement, inspection, and shipping coordination service. Proposals and timelines are provided based on supplier availability and logistics terms.
                    </p>

                    <h3>2. Intellectual Property</h3>
                    <p>
                      All content, branding, logos, and UI elements on this website are the exclusive property of IHRACHANE.
                    </p>
                  </div>
                )}

                {activeSection === "cookies" && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                      Cookie Policy
                    </h2>
                    <p>
                      This site uses essential cookies and analytics tags to provide a seamless browsing experience and analyze site traffic.
                    </p>
                  </div>
                )}

                {activeSection === "general" && (
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-6">
                      General Operational Policies
                    </h2>
                    <p>
                      Our operational commitment is centered around transparency, verified factory relationships, and dependable shipping partners.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
