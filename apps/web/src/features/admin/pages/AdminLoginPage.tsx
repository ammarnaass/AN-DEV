import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, AlertCircle, Eye, EyeOff, Terminal, ShieldCheck, ArrowRight } from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول. يرجى التحقق من صحة البريد وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden text-start">
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[560px] h-[560px] rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-[110px]" />
      </div>

      {/* Top Console Bar */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-line flex items-center justify-center text-secondary shadow-md">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-text-primary tracking-wide">
              AN DEV Core <span className="text-secondary">//</span> ACCESS_GATEWAY
            </p>
            <p className="font-mono text-[10px] text-text-muted">
              SUPERUSER CONSOLE · ALGIERS CLUSTER
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-secondary transition-colors"
        >
          <span>الموقع العام</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 sm:p-10 shadow-modal relative overflow-hidden">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-transparent" />

        <div className="space-y-3 pb-6 border-b border-line">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container border border-line text-secondary text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-status-ok" />
            <span>Argon2id + AES Session Vault</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            تسجيل دخول لوحة الإدارة
          </h1>
          <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
            أدخل بيانات الاعتماد المعتمدة للوصول إلى مركز العمليات وقاعدة بيانات الوكالة.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-lg bg-status-err/10 border border-status-err/30 text-status-err text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              البريد الإلكتروني المعتمد (Admin Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ammar@andev.dz"
                className="w-full h-11 ps-10 pe-4 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              كلمة المرور (Superuser Key)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 ps-10 pe-11 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-primary-container text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(13,110,253,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "جاري المصادقة..." : "تسجيل الدخول للنظام (SECURE_AUTH)"}</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-line text-center">
          <p className="text-[11px] font-mono text-text-muted">
            الجلسة محمية بـ HttpOnly Cookies و CSRF Token بتشفير صارم.
          </p>
        </div>
      </div>
    </div>
  );
};

