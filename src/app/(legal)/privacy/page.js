import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy & Terms | IHRACHANE",
  description:
    "Review IHRACHANE's privacy policy, data protection, terms of use, and operational compliance. Gizlilik politikası ve kullanım koşulları.",
  keywords: [
    "ihrachane privacy policy",
    "data protection",
    "terms of service",
    "gizlilik politikası",
    "kullanım koşulları",
    "veri koruma",
  ],
  alternates: {
    canonical: "https://www.ihrachane.com/privacy",
  },
};

export default function Privacy() {
  return <PrivacyClient />;
}
