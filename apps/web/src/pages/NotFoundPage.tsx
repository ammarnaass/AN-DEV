import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { Button } from "../components/ui/Button";
import { Terminal, Home } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  const { locale } = useI18n();

  return (
    <div className="pt-24 pb-20 max-w-lg mx-auto p-inline-safe text-center space-y-6">
      {/* Terminal Block */}
      <div dir="ltr" className="rounded-card border border-primary/40 bg-surface p-5 text-start font-mono text-xs shadow-glow">
        <div className="flex items-center gap-1.5 pb-3 border-b border-line mb-3 text-mute">
          <Terminal className="w-3.5 h-3.5 text-err" />
          <span>error.log</span>
        </div>
        <p className="text-err font-bold">404: HTTP_PAGE_NOT_FOUND</p>
        <p className="text-mute">&gt; The requested path does not exist on this server.</p>
        <div className="pt-2 text-accent flex items-center gap-1">
          <span>&gt; redirect recommended to /</span>
          <span className="inline-block w-1.5 h-3 bg-accent animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-ink">404</h1>
        <p className="text-mute text-base">
          {locale === "ar"
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you are looking for does not exist or has been moved."}
        </p>
      </div>

      <div className="pt-2">
        <Link to="/">
          <Button variant="primary">
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>{locale === "ar" ? "العودة إلى الصفحة الرئيسية" : "Return to Home"}</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
