import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../components/layout/Logo";
import { Lock, Mail, AlertCircle } from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await apiFetch<{ success: boolean }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول. تأكد من صحة البريد وكلمة المرور.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg">
      <div className="w-full max-w-md space-y-8 rounded-card border border-line bg-surface p-8 shadow-xl text-start">
        <div className="text-center space-y-2">
          <Logo size={48} className="justify-center" />
          <h1 className="text-2xl font-bold text-ink pt-2">تسجيل دخول المدير</h1>
          <p className="text-mute text-xs font-mono">لوحة تحكم موقع AN DEV</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-err/10 border border-err/30 text-err text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-mute font-semibold">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-mute absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ammar@andev.dz"
                className="w-full h-11 ps-10 pe-4 rounded border border-line bg-bg/50 text-ink text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-mute font-semibold">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-mute absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 ps-10 pe-4 rounded border border-line bg-bg/50 text-ink text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              className="w-full"
            >
              دخول إلى اللوحة
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
