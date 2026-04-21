import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you create an account, place an order, or contact us for support. This includes your name, email address, phone number, and delivery address. We also collect information about your device and how you use our platform, such as browsing history, search queries, and purchase history. This data helps us improve our services and provide personalized recommendations.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to process your orders and deliver products, send you order confirmations and updates, provide customer support, improve and personalize your experience, send you promotional communications (with your consent), detect and prevent fraudulent activity, and comply with legal obligations. We use your purchase history and browsing behavior to power our AI recommendation system, which suggests products you may be interested in.`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with store owners to fulfill your orders, payment processors to complete transactions, and service providers who help us operate our platform. All third parties are required to keep your information confidential and use it only to provide services on our behalf. We may also disclose your information if required by law or to protect the rights and safety of our users.`,
  },
  {
    title: "4. Data Security",
    content: `We take the security of your personal information seriously. We use industry-standard encryption to protect your data during transmission and storage. Your password is hashed using bcrypt and is never stored in plain text. We regularly review and update our security practices to protect against unauthorized access, disclosure, or destruction of your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to improve your experience on our platform. Cookies help us remember your preferences, keep you logged in, and understand how you use our services. You can control cookie settings through your browser, but disabling cookies may affect some features of our platform. We do not use cookies to track your activity across other websites.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to access the personal information we hold about you, correct any inaccurate information, request deletion of your account and associated data, opt out of promotional communications at any time, and request a copy of your data in a portable format. To exercise any of these rights, please contact us at privacy@dukaanai.pk. We will respond to your request within 7 business days.`,
  },
  {
    title: "7. Children's Privacy",
    content: `Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child under 13, please contact us immediately and we will take steps to delete such information.`,
  },
  {
    title: "8. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any significant changes by email or by posting a notice on our platform. Your continued use of our services after the changes take effect constitutes your acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@dukaanai.pk or write to us at DukaanAI, Lahore, Pakistan. We are committed to resolving any privacy concerns you may have.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Header */}
      <div className="bg-olive px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-cream mb-2">Privacy Policy</h1>
        <p className="text-cream/60 text-sm">
          Last updated: April 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Intro */}
        <div className="bg-lavender rounded-2xl p-6 mb-8">
          <p className="text-sm text-olive/70 leading-relaxed">
            At DukaanAI, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you use our platform. By using DukaanAI, you agree to the terms
            described in this policy.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white border border-olive/10 rounded-2xl p-6"
            >
              <h2 className="text-base font-bold text-olive mb-3">
                {section.title}
              </h2>
              <p className="text-sm text-olive/70 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-olive/50">
            Have questions about our privacy practices?{" "}
            <Link to="/help" className="text-purple font-medium hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}