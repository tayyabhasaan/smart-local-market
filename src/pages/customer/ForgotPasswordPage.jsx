import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart, Mail, ArrowLeft,
  CheckCircle, KeyRound, Eye, EyeOff
} from "lucide-react";

const steps = [
  { num: 1, label: "Email" },
  { num: 2, label: "OTP" },
  { num: 3, label: "Reset" },
  { num: 4, label: "Done" },
];

export default function ForgotPasswordPage() {
  const [step, setStep]               = useState(1);
  const [email, setEmail]             = useState("");
  const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [passwords, setPasswords]       = useState({
    password: "",
    confirm: "",
  });

  // OTP input handler
  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const otpComplete = otp.every((d) => d !== "");
  const passwordsMatch =
    passwords.password.length >= 8 &&
    passwords.password === passwords.confirm;

  return (
    <div className="min-h-screen bg-cream flex">

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-purple p-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <ShoppingCart size={20} color="white" />
          </div>
          <span className="font-bold text-2xl text-white">
            Dukaan<span className="text-lavender">AI</span>
          </span>
        </Link>

        {/* Content */}
        <div>
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Forgot your<br />password?
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8">
            No worries! Enter your email address and
            we'll send you a 6-digit OTP to reset your password.
          </p>

          {/* Steps Preview */}
          <div className="flex flex-col gap-3">
            {[
              { emoji: "📧", text: "Enter your registered email" },
              { emoji: "🔢", text: "Enter the 6-digit OTP" },
              { emoji: "🔑", text: "Set your new password" },
              { emoji: "✅", text: "Login with new password" },
            ].map((s) => (
              <div key={s.text} className="flex items-center gap-3">
                <span className="text-xl">{s.emoji}</span>
                <span className="text-white/70 text-sm">{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs">
          © 2025 DukaanAI. Built for Pakistan 🇵🇰
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-purple rounded-lg flex items-center justify-center">
              <ShoppingCart size={18} color="white" />
            </div>
            <span className="font-bold text-xl text-olive">
              Dukaan<span className="text-purple">AI</span>
            </span>
          </Link>

          {/* Step Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-0 mb-8">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step >= s.num
                        ? "bg-purple text-white"
                        : "bg-white border-2 border-olive/20 text-olive/40"
                    }`}>
                      {step > s.num ? <CheckCircle size={14} /> : s.num}
                    </div>
                    <span className={`text-xs font-medium ${
                      step >= s.num ? "text-purple" : "text-olive/40"
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mb-4 mx-1 ${
                      step > s.num ? "bg-purple" : "bg-olive/15"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Step 1 — Enter Email */}
          {step === 1 && (
            <>
              <div className="mb-8">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-olive/50 hover:text-purple text-sm mb-4 transition-colors"
                >
                  <ArrowLeft size={15} /> Back to Login
                </Link>
                <h1 className="text-2xl font-bold text-olive mb-1">
                  Reset your password
                </h1>
                <p className="text-olive/50 text-sm">
                  Enter your email and we'll send you an OTP
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Email Address
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <Mail size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!email.includes("@")}
                  className="w-full bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send OTP
                </button>
              </div>
            </>
          )}

          {/* Step 2 — Enter OTP */}
          {step === 2 && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-olive mb-1">
                  Enter OTP
                </h1>
                <p className="text-olive/50 text-sm">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-olive">{email}</span>
                </p>
              </div>

              {/* OTP Inputs */}
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    className={`w-12 h-12 text-center text-lg font-bold text-olive border-2 rounded-xl outline-none transition-colors ${
                      digit
                        ? "border-purple bg-lavender"
                        : "border-olive/20 bg-white"
                    } focus:border-purple`}
                  />
                ))}
              </div>

              {/* Resend */}
              <p className="text-center text-sm text-olive/50 mb-6">
                Didn't receive the code?{" "}
                <button
                  onClick={() => setOtp(["", "", "", "", "", ""])}
                  className="text-purple font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-olive/20 text-olive font-semibold py-3.5 rounded-xl hover:border-olive/40 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!otpComplete}
                  className="flex-1 bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-olive mb-1">
                  Set new password
                </h1>
                <p className="text-olive/50 text-sm">
                  Choose a strong password for your account
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* New Password */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    New Password
                  </label>
                  <div className="flex items-center bg-white border-2 border-olive/20 rounded-xl overflow-hidden focus-within:border-purple transition-colors">
                    <KeyRound size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.password}
                      onChange={(e) =>
                        setPasswords({ ...passwords, password: e.target.value })
                      }
                      placeholder="Min. 8 characters"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-4 text-olive/40 hover:text-olive transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium text-olive mb-1.5 block">
                    Confirm Password
                  </label>
                  <div className={`flex items-center bg-white border-2 rounded-xl overflow-hidden transition-colors ${
                    passwords.confirm && passwords.password !== passwords.confirm
                      ? "border-red-400"
                      : "border-olive/20 focus-within:border-purple"
                  }`}>
                    <KeyRound size={16} className="ml-4 text-olive/40 shrink-0" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                      placeholder="Re-enter password"
                      className="flex-1 px-3 py-3.5 text-sm text-olive bg-transparent outline-none placeholder:text-olive/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="pr-4 text-olive/40 hover:text-olive transition-colors"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwords.confirm &&
                    passwords.password !== passwords.confirm && (
                      <p className="text-xs text-red-500 mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>

                {/* Password strength hint */}
                {passwords.password && (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full ${
                          passwords.password.length >= i * 3
                            ? i <= 1
                              ? "bg-red-400"
                              : i <= 2
                              ? "bg-orange-400"
                              : i <= 3
                              ? "bg-yellow-400"
                              : "bg-green-400"
                            : "bg-olive/10"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-olive/40 ml-1">
                      {passwords.password.length < 4
                        ? "Weak"
                        : passwords.password.length < 7
                        ? "Fair"
                        : passwords.password.length < 10
                        ? "Good"
                        : "Strong"}
                    </span>
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-olive/20 text-olive font-semibold py-3.5 rounded-xl hover:border-olive/40 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!passwordsMatch}
                    className="flex-1 bg-purple text-white font-semibold py-3.5 rounded-xl hover:bg-purple/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-olive mb-2">
                Password Reset!
              </h2>
              <p className="text-olive/50 text-sm mb-8">
                Your password has been successfully reset.
                You can now login with your new password.
              </p>

              <Link
                to="/login"
                className="w-full bg-purple text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-purple/90 transition-colors inline-block"
              >
                Login Now
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}