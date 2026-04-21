import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using DukaanAI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users including customers, business owners, and visitors. We reserve the right to update these terms at any time, and your continued use of the platform constitutes acceptance of any changes.`,
  },
  {
    title: "2. User Accounts",
    content: `To use certain features of DukaanAI, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account. You must be at least 18 years old to create an account. You may not share your account with others or create multiple accounts for the same person.`,
  },
  {
    title: "3. Customer Responsibilities",
    content: `As a customer, you agree to provide accurate delivery information for all orders, make payment as agreed at the time of purchase, treat store owners and delivery personnel with respect, not place fraudulent or false orders, and not use the platform for any illegal activities. Repeated cancellations or fraudulent orders may result in account suspension.`,
  },
  {
    title: "4. Business Owner Responsibilities",
    content: `As a registered business owner, you agree to provide accurate information about your store and products, maintain sufficient stock for listed products, fulfill orders in a timely manner, maintain the quality and safety of products sold, comply with all applicable laws and regulations, and not engage in deceptive pricing or misleading product descriptions. DukaanAI reserves the right to suspend or terminate business accounts that violate these terms.`,
  },
  {
    title: "5. Orders and Payments",
    content: `All orders placed through DukaanAI are subject to acceptance by the store. We reserve the right to cancel orders in cases of pricing errors, stock unavailability, or suspected fraud. Payment must be completed as specified at checkout. For online payments, orders will only be confirmed after payment verification. Delivery fees are clearly shown before checkout and are non-refundable once an order has been dispatched.`,
  },
  {
    title: "6. Refunds and Returns",
    content: `Refund and return policies are set by individual stores. Generally, if you receive a wrong or damaged item, you may request a return within 24 hours of delivery. Perishable items such as food and groceries are non-returnable unless they are spoiled or contaminated. Digital payments are refunded within 3-5 business days. Cash on Delivery refunds are coordinated through the store directly.`,
  },
  {
    title: "7. Prohibited Activities",
    content: `You may not use DukaanAI to engage in any unlawful or fraudulent activities, post false reviews or ratings, attempt to hack or disrupt our platform, collect user data without authorization, violate the intellectual property rights of others, send spam or unsolicited communications, or impersonate another person or entity. Violation of these rules will result in immediate account termination.`,
  },
  {
    title: "8. Intellectual Property",
    content: `All content on DukaanAI including text, graphics, logos, and software is the property of DukaanAI or its licensors and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our explicit written permission. Store owners retain ownership of their product images and descriptions but grant DukaanAI a license to display this content on our platform.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `DukaanAI acts as a marketplace connecting customers with local businesses. We are not responsible for the quality, safety, or legality of products sold by third-party stores. Our total liability for any claim arising from your use of the platform shall not exceed the amount you paid for the transaction in question. We are not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Service are governed by the laws of Pakistan. Any disputes arising from these terms or your use of DukaanAI shall be resolved through binding arbitration in Lahore, Pakistan. If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Header */}
      <div className="bg-olive px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-cream mb-2">
          Terms of Service
        </h1>
        <p className="text-cream/60 text-sm">Last updated: April 2026</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Intro */}
        <div className="bg-lavender rounded-2xl p-6 mb-8">
          <p className="text-sm text-olive/70 leading-relaxed">
            Please read these Terms of Service carefully before using DukaanAI.
            These terms govern your use of our platform and form a legally
            binding agreement between you and DukaanAI. By using our services,
            you confirm that you have read, understood, and agree to these terms.
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
            By using DukaanAI you agree to these terms.{" "}
            <Link
              to="/help"
              className="text-purple font-medium hover:underline"
            >
              Contact us
            </Link>{" "}
            if you have any questions.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}