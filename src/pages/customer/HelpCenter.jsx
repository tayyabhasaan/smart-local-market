import { useState } from "react";
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const faqs = [
  {
    category: "Orders",
    questions: [
      { q: "How do I place an order?", a: "Browse stores near you, add products to your cart, and proceed to checkout. Select your delivery address and payment method to complete your order." },
      { q: "Can I cancel my order?", a: "You can cancel your order within 5 minutes of placing it. Go to My Orders, find the order and click Cancel Order. Orders that are already being processed cannot be cancelled." },
      { q: "How do I track my order?", a: "Go to My Orders section in your profile. Each order shows its current status — Pending, Processing, or Delivered." },
      { q: "What if I receive a wrong item?", a: "Contact the store directly using the phone number on the order page. You can also reach our support team and we will help resolve the issue within 24 hours." },
    ],
  },
  {
    category: "Payments",
    questions: [
      { q: "What payment methods are accepted?", a: "We accept JazzCash, Easypaisa, Cash on Delivery, and Pay at Store. More payment options will be added soon." },
      { q: "Is my payment information safe?", a: "Yes. We do not store your payment credentials. All transactions are processed securely through official payment gateways." },
      { q: "How do I pay via JazzCash or Easypaisa?", a: "Select JazzCash or Easypaisa at checkout. You will see the account number to send payment to. After sending, upload a screenshot of your payment confirmation." },
      { q: "Will I get a refund if I cancel?", a: "For JazzCash and Easypaisa payments, refunds are processed within 3-5 business days. For COD orders, no payment is taken so no refund is needed." },
    ],
  },
  {
    category: "Account",
    questions: [
      { q: "How do I create an account?", a: "Click Register on the homepage, fill in your name, email, phone number and password. Your account will be created instantly." },
      { q: "How do I reset my password?", a: "Click Forgot Password on the login page. Enter your email and we will send you a 6-digit OTP to reset your password." },
      { q: "Can I change my delivery address?", a: "Yes. Go to My Profile and update your address details. You can also enter a new address at checkout for each order." },
      { q: "How do I delete my account?", a: "Contact our support team at support@dukaanai.pk with your account email and we will process your deletion request within 7 business days." },
    ],
  },
  {
    category: "Stores",
    questions: [
      { q: "How do I find stores near me?", a: "The app automatically shows stores in your selected city and area. You can also search for specific stores or filter by category." },
      { q: "How do I register my store?", a: "Click Register Your Store in the footer or go to /business/register. Fill in your personal and store details. Your store will go live after admin approval." },
      { q: "How long does store approval take?", a: "Store approvals typically take 24-48 hours. You will receive an email notification once your store is approved or if any additional information is needed." },
    ],
  },
];

export default function HelpCenter() {
  const [search, setSearch]     = useState("");
  const [openItem, setOpenItem] = useState(null);

  const filtered = faqs.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Header */}
      <div className="bg-purple px-4 py-14 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          How can we help you?
        </h1>
        <p className="text-white/60 text-sm mb-6">
          Find answers to common questions about DukaanAI
        </p>

        {/* Search */}
        <div className="flex items-center bg-white rounded-xl overflow-hidden max-w-lg mx-auto focus-within:ring-2 focus-within:ring-white/30">
          <Search size={17} className="ml-4 text-olive/40 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for answers..."
            className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* FAQs */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-olive font-semibold">No results found</p>
            <p className="text-olive/50 text-sm mt-1">
              Try different keywords or contact our support team
            </p>
          </div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.category} className="mb-8">
              <h2 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-purple rounded-full inline-block" />
                {cat.category}
              </h2>

              <div className="flex flex-col gap-2">
                {cat.questions.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={key}
                      className="bg-white border border-olive/10 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream transition-colors"
                      >
                        <span className="text-sm font-semibold text-olive pr-4">
                          {item.q}
                        </span>
                        {isOpen
                          ? <ChevronUp size={16} className="text-purple shrink-0" />
                          : <ChevronDown size={16} className="text-olive/40 shrink-0" />
                        }
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 border-t border-olive/5">
                          <p className="text-sm text-olive/70 leading-relaxed pt-3">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Contact Support */}
        <div className="bg-lavender rounded-2xl p-6 mt-8">
          <h3 className="text-base font-bold text-olive mb-1 text-center">
            Still need help?
          </h3>
          <p className="text-olive/50 text-sm text-center mb-6">
            Our support team is available 9AM – 9PM, 7 days a week
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: <Mail size={18} />,          label: "Email Us",    value: "support@dukaanai.pk" },
              { icon: <Phone size={18} />,         label: "Call Us",     value: "+92 300 1234567" },
              { icon: <MessageCircle size={18} />, label: "WhatsApp",    value: "+92 300 1234567" },
            ].map((contact) => (
              <div
                key={contact.label}
                className="bg-white rounded-xl px-4 py-4 text-center"
              >
                <div className="flex justify-center text-purple mb-2">
                  {contact.icon}
                </div>
                <p className="text-xs font-semibold text-olive mb-1">
                  {contact.label}
                </p>
                <p className="text-xs text-olive/50">{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}