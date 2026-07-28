import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";

export function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-navy-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-60" />
        <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-medical-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <Logo tone="dark" />
        </div>

        <div className="relative">
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-balance leading-tight">
            Welcome back to the future of{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-medical-300 bg-clip-text text-transparent">
              preventive healthcare
            </span>
            .
          </h2>
          <p className="mt-4 text-white/70 max-w-md leading-relaxed">
            Sign in to continue your CuraCore™ risk assessment journey. Your data is encrypted
            end-to-end.
          </p>

          <div className="mt-10 space-y-3 max-w-sm">
            <Feature icon={ShieldCheck} text="HIPAA-grade security" />
            <Feature icon={Mail} text="Used by 1,200+ clinicians" />
            <Feature icon={Lock} text="Zero data retention on CuraCore™" />
          </div>
        </div>

        <div className="relative text-xs text-white/40">
          © {new Date().getFullYear()} CuraMind Health, Inc.
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-gradient-soft">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-semibold text-navy tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-navy-300">
            Don't have an account?{" "}
            <Link to="/assessment" className="text-medical-500 font-medium hover:underline">
              Start a screening
            </Link>
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            <div>
              <Label>Email</Label>
              <div className="mt-2 relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-200" />
                <Input
                  type="email"
                  defaultValue="jordan.avery@example.com"
                  className="pl-10"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <a href="#" className="text-xs text-medical-500 font-medium hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="mt-2 relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-200" />
                <Input
                  type={showPassword ? "text" : "password"}
                  defaultValue="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-200 hover:text-navy-300"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-navy-300">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-surface-border text-medical-500 focus:ring-medical-500/20"
              />
              Keep me signed in
            </label>

            <Button type="submit" variant="primary" size="lg" className="w-full group">
              Sign in
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-navy-200">
            <div className="flex-1 h-px bg-surface-border" />
            <span>or continue with</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md">
              <GoogleIcon /> Google
            </Button>
            <Button variant="outline" size="md">
              <AppleIcon /> Apple
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: React.ComponentType<{ size?: number; className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-white/80">
      <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
        <Icon size={14} className="text-cyan-400" />
      </div>
      {text}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 17.5c-.4 1-.9 1.9-1.5 2.7-.8 1.1-1.5 1.9-2.1 2.3-.8.5-1.7.8-2.6.8-.7 0-1.5-.2-2.5-.6-1-.4-1.9-.6-2.7-.6-.8 0-1.7.2-2.7.6-1 .4-1.8.6-2.4.7-.9 0-1.8-.3-2.7-.9-.6-.4-1.4-1.2-2.2-2.4C.5 18.7-.1 16.9-.1 14.7c0-1.6.4-3 1.1-4.2.6-.9 1.3-1.6 2.2-2.2.9-.5 1.8-.8 2.8-.8.7 0 1.7.2 2.8.6 1.2.4 1.9.6 2.3.6.3 0 1.1-.2 2.4-.7 1.3-.4 2.3-.6 3.2-.5 2.3.2 4.1 1.1 5.2 2.8-2.1 1.3-3.1 3-3.1 5.2 0 1.7.6 3.2 1.9 4.3.6.5 1.2.9 1.9 1.2-.1.4-.3.8-.4 1.1zM14.9 4.3c0 1.3-.5 2.5-1.4 3.5-1.1 1.2-2.4 1.9-3.7 1.8 0-.1 0-.3 0-.4 0-1.2.5-2.5 1.4-3.5.4-.5 1-.9 1.7-1.2.6-.3 1.3-.5 1.9-.5 0 .1 0 .2 0 .3z" />
    </svg>
  );
}
