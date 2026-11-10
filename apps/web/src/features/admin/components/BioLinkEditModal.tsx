import React, { useState, useEffect } from "react";
import { BioLink, BioLinkInput } from "@andev/shared";
import {
  X,
  Sparkles,
  Save,
  Palette,
  Type,
  FolderKanban,
  MessageCircle,
  BookOpen,
  Globe,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Send,
  Zap,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

interface BioLinkEditModalProps {
  isOpen: boolean;
  link: BioLink | null;
  onClose: () => void;
  onSave: (data: BioLinkInput) => Promise<void>;
  isSaving: boolean;
}

const AVAILABLE_ICONS = [
  { name: "Sparkles", icon: <Sparkles className="w-4 h-4" /> },
  { name: "FolderKanban", icon: <FolderKanban className="w-4 h-4" /> },
  { name: "MessageCircle", icon: <MessageCircle className="w-4 h-4" /> },
  { name: "BookOpen", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Globe", icon: <Globe className="w-4 h-4" /> },
  { name: "Code2", icon: <Code2 className="w-4 h-4" /> },
  { name: "Cpu", icon: <Cpu className="w-4 h-4" /> },
  { name: "Layers", icon: <Layers className="w-4 h-4" /> },
  { name: "Terminal", icon: <Terminal className="w-4 h-4" /> },
  { name: "ShieldCheck", icon: <ShieldCheck className="w-4 h-4" /> },
  { name: "Send", icon: <Send className="w-4 h-4" /> },
  { name: "Zap", icon: <Zap className="w-4 h-4" /> },
];

const PRESET_FONTS = [
  { id: "cairo", label: "Cairo (الافتراضي)" },
  { id: "tajawal", label: "Tajawal (عصري متناسق)" },
  { id: "ibm", label: "IBM Plex Arabic (تقني احترافي)" },
  { id: "inter", label: "Inter (هندسي لاتيني)" },
  { id: "mono", label: "JetBrains Mono (رموز برمجية)" },
];

const PRESET_COLORS = [
  "#0d6efd", // Blue
  "#1e293b", // Slate
  "#128c7e", // Emerald / WhatsApp
  "#0f172a", // Dark
  "#7c3aed", // Violet
  "#db2777", // Pink
  "#ea580c", // Orange
  "#dc2626", // Red
];

export const BioLinkEditModal: React.FC<BioLinkEditModalProps> = ({
  isOpen,
  link,
  onClose,
  onSave,
  isSaving,
}) => {
  const [form, setForm] = useState<BioLinkInput>({
    title: "",
    url: "",
    subtitle: "",
    icon_or_image: "Sparkles",
    image_size: "md",
    image_radius: "md",
    image_fit: "cover",
    font_family: "cairo",
    text_color: "#ffffff",
    bg_color: "#1e293b",
    border_color: "#334155",
    style_variant: "solid",
    gradient_from: "#0d6efd",
    gradient_to: "#00d2ff",
    is_active: true,
    is_featured: false,
    sort_order: 0,
  });

  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (link) {
      setForm({
        title: link.title,
        url: link.url,
        subtitle: link.subtitle || "",
        icon_or_image: link.icon_or_image || "Sparkles",
        image_size: link.image_size || "md",
        image_radius: link.image_radius || "md",
        image_fit: link.image_fit || "cover",
        font_family: link.font_family || "cairo",
        text_color: link.text_color || "#ffffff",
        bg_color: link.bg_color || "#1e293b",
        border_color: link.border_color || "#334155",
        style_variant: link.style_variant || "solid",
        gradient_from: link.gradient_from || "#0d6efd",
        gradient_to: link.gradient_to || "#00d2ff",
        is_active: link.is_active,
        is_featured: link.is_featured,
        sort_order: link.sort_order,
      });
    } else {
      setForm({
        title: "",
        url: "",
        subtitle: "",
        icon_or_image: "Sparkles",
        image_size: "md",
        image_radius: "md",
        image_fit: "cover",
        font_family: "cairo",
        text_color: "#ffffff",
        bg_color: "#1e293b",
        border_color: "#334155",
        style_variant: "solid",
        gradient_from: "#0d6efd",
        gradient_to: "#00d2ff",
        is_active: true,
        is_featured: false,
        sort_order: 0,
      });
    }
    setError(null);
  }, [link, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("يرجى إدخال عنوان الرابط");
      return;
    }
    if (!form.url.trim()) {
      setError("يرجى إدخال رابط الوجهة");
      return;
    }

    try {
      await onSave(form);
      onClose();
    } catch (err: any) {
      setError(err?.message || "فشل حفظ الرابط");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800 * 1024) {
      setError("حجم صورة الأيقونة يجب أن لا يتجاوز 800 كيلوبايت");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setForm((prev) => ({ ...prev, icon_or_image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        dir="rtl"
        className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-surface border border-line shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary-container/15 text-primary border border-primary/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text-primary">
                {link ? "تعديل الرابط المخصص" : "إضافة رابط مخصص جديد"}
              </h2>
              <p className="text-xs text-text-muted">
                تحديد الوجهة، النصوص، الألوان، وأنماط التصميم.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="px-6 pt-3 flex items-center gap-3 border-b border-line bg-surface-container/30">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`pb-2.5 px-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "content"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>بيانات الرابط والمحتوى</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("style")}
            className={`pb-2.5 px-2 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "style"
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>المظهر، الألوان، والخطوط</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs font-medium">
              {error}
            </div>
          )}

          {activeTab === "content" ? (
            <div className="space-y-4 text-start">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  عنوان الرابط (الرئيسي) *
                </label>
                <input
                  type="text"
                  placeholder="مثال: حجز استشارة برمجية مجانية"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              {/* URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  رابط الوجهة (Target URL) *
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="https://example.com أو /contact"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  الوصف التوضيحي (اختياري)
                </label>
                <input
                  type="text"
                  placeholder="مثال: رد مخصص خلال 48 ساعة مع دراسة تقنية كاملة"
                  value={form.subtitle || ""}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs focus:outline-none focus:border-secondary"
                />
              </div>

              {/* Icon Selection */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  أيقونة الرابط أو صورة مصغرة
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVAILABLE_ICONS.map((item) => {
                    const isSelected = form.icon_or_image === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setForm({ ...form, icon_or_image: item.name })}
                        className={`h-11 rounded-lg border flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-primary-container text-white border-primary shadow-sm"
                            : "bg-surface-container border-line text-text-muted hover:text-text-primary"
                        }`}
                        title={item.name}
                      >
                        {item.icon}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-surface-container hover:bg-surface-elevated text-text-primary text-xs cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-secondary" />
                    <span>رفع صورة أيقونة خاصة...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {(form.icon_or_image?.startsWith("data:") || form.icon_or_image?.startsWith("http")) && (
                    <span className="text-[11px] font-mono text-status-ok font-bold">
                      ✓ صورة مخصصة مرفوعة
                    </span>
                  )}
                </div>

                {/* Custom Image Settings & Framing */}
                {(form.icon_or_image?.startsWith("data:") ||
                  form.icon_or_image?.startsWith("http")) && (
                  <div className="p-4 rounded-xl border border-secondary/30 bg-surface-container/60 space-y-3.5 mt-2">
                    <div className="flex items-center justify-between pb-2 border-b border-line">
                      <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-secondary" />
                        <span>إعدادات ومقاس الصورة في إطار الرابط</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, icon_or_image: "Sparkles" })}
                        className="text-[11px] text-text-muted hover:text-status-danger underline"
                      >
                        إلغاء واستخدام أيقونة
                      </button>
                    </div>

                    {/* Image Preview Lockup */}
                    <div className="flex items-center gap-4 p-2.5 rounded-lg bg-surface border border-line">
                      <div className="text-[11px] text-text-muted font-mono shrink-0">معاينة الصورة:</div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`border border-line overflow-hidden bg-surface-container flex items-center justify-center transition-all ${
                            form.image_size === "banner"
                              ? "w-28 h-12 rounded-lg"
                              : form.image_size === "lg"
                              ? "w-16 h-16"
                              : form.image_size === "sm"
                              ? "w-9 h-9"
                              : "w-12 h-12"
                          } ${
                            form.image_radius === "full" && form.image_size !== "banner"
                              ? "rounded-full"
                              : form.image_radius === "md"
                              ? "rounded-2xl"
                              : "rounded-lg"
                          }`}
                        >
                          <img
                            src={form.icon_or_image}
                            alt=""
                            className={`w-full h-full ${
                              form.image_fit === "contain" ? "object-contain p-1" : "object-cover"
                            }`}
                          />
                        </div>
                        <div className="text-[11px] space-y-0.5">
                          <span className="font-bold text-text-primary block">
                            {form.image_size === "banner"
                              ? "غلاف علوي عريض"
                              : form.image_size === "lg"
                              ? "حجم كبير بارز (76px)"
                              : form.image_size === "sm"
                              ? "حجم صغير مدمج (38px)"
                              : "حجم متوسط متوازن (56px)"}
                          </span>
                          <span className="text-text-muted font-mono text-[10px] block">
                            {form.image_fit === "contain" ? "احتواء كامل بدون قص" : "تغطية وملء الإطار"} •{" "}
                            {form.image_radius === "full" ? "شكل دائري" : form.image_radius === "md" ? "زوايا ناعمة" : "مستطيل"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 1. Size Presets */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-text-primary block">
                        حجم ومقاس الصورة في البطاقة:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: "sm", label: "صغير (38px)", desc: "أيقونة مدمجة" },
                          { id: "md", label: "متوسط (56px)", desc: "شعار متوازن (افتراضي)" },
                          { id: "lg", label: "كبير (76px)", desc: "بارز للبرامج والتطبيقات" },
                          { id: "banner", label: "غلاف عريض", desc: "يمتد في الأعلى" },
                        ].map((sz) => {
                          const isSelected = (form.image_size || "md") === sz.id;
                          return (
                            <button
                              key={sz.id}
                              type="button"
                              onClick={() => setForm({ ...form, image_size: sz.id as any })}
                              className={`p-2 rounded-lg border text-start transition-all ${
                                isSelected
                                  ? "bg-primary-container text-white border-primary shadow-xs"
                                  : "bg-surface-container border-line text-text-muted hover:text-text-primary"
                              }`}
                            >
                              <span className="text-xs font-bold block">{sz.label}</span>
                              <span className="text-[9px] opacity-80 block truncate">{sz.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Shape / Radius (only when not banner) */}
                    {form.image_size !== "banner" && (
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-text-primary block">
                          شكل وتدوير إطار الصورة:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "md", label: "زوايا ناعمة (Squircle)" },
                            { id: "full", label: "دائري بالكامل (Circle)" },
                            { id: "none", label: "مربع بزوايا خفيفة" },
                          ].map((rad) => {
                            const isSelected = (form.image_radius || "md") === rad.id;
                            return (
                              <button
                                key={rad.id}
                                type="button"
                                onClick={() => setForm({ ...form, image_radius: rad.id as any })}
                                className={`py-1.5 px-2 rounded-lg border text-xs font-semibold transition-all ${
                                  isSelected
                                    ? "bg-primary-container text-white border-primary shadow-xs"
                                    : "bg-surface-container border-line text-text-muted hover:text-text-primary"
                                }`}
                              >
                                {rad.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. Image Fit */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-text-primary block">
                        طريقة احتواء الصورة داخل الإطار:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "cover", label: "ملء وتغطية الإطار (Cover)", desc: "يملأ المساحة بالكامل بدون حواف فارغة" },
                          { id: "contain", label: "احتواء كامل (Contain)", desc: "يُظهر كامل أبعاد الشعار والرمز بدون أي قص" },
                        ].map((fit) => {
                          const isSelected = (form.image_fit || "cover") === fit.id;
                          return (
                            <button
                              key={fit.id}
                              type="button"
                              onClick={() => setForm({ ...form, image_fit: fit.id as any })}
                              className={`p-2 rounded-lg border text-start transition-all ${
                                isSelected
                                  ? "bg-primary-container text-white border-primary shadow-xs"
                                  : "bg-surface-container border-line text-text-muted hover:text-text-primary"
                              }`}
                            >
                              <span className="text-xs font-bold block">{fit.label}</span>
                              <span className="text-[9px] opacity-80 block">{fit.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-line">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    تفعيل الرابط في الصفحة
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-text-primary">
                    رابط مميز (توهج وإبراز خاص)
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-start">
              {/* Style Variant */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  نمط تصميم البطاقة (Style Variant)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "solid", label: "لون ثابت" },
                    { id: "gradient", label: "تدرج لوني" },
                    { id: "outline", label: "شفاف بإطار" },
                    { id: "glow", label: "متوهج" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          style_variant: v.id as BioLinkInput["style_variant"],
                        })
                      }
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        form.style_variant === v.id
                          ? "bg-primary-container text-white border-primary"
                          : "bg-surface-container border-line text-text-muted hover:text-text-primary"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-text-muted">
                  نوع الخط المخصص للرابط (Font Family)
                </label>
                <select
                  value={form.font_family}
                  onChange={(e) => setForm({ ...form, font_family: e.target.value })}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-bold focus:outline-none focus:border-secondary"
                >
                  {PRESET_FONTS.map((font) => (
                    <option key={font.id} value={font.id}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Colors Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Background / Primary Color */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-semibold text-text-muted">
                    لون الخلفية الأساسي
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.bg_color}
                      onChange={(e) => setForm({ ...form, bg_color: e.target.value })}
                      className="w-9 h-9 rounded border border-line bg-transparent cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={form.bg_color}
                      onChange={(e) => setForm({ ...form, bg_color: e.target.value })}
                      className="w-full h-9 px-2.5 rounded-lg border border-line bg-surface-container text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-semibold text-text-muted">
                    لون النص والأيقونة
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={form.text_color}
                      onChange={(e) => setForm({ ...form, text_color: e.target.value })}
                      className="w-9 h-9 rounded border border-line bg-transparent cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      dir="ltr"
                      value={form.text_color}
                      onChange={(e) => setForm({ ...form, text_color: e.target.value })}
                      className="w-full h-9 px-2.5 rounded-lg border border-line bg-surface-container text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Gradient Settings if Gradient or Glow */}
              {(form.style_variant === "gradient" || form.style_variant === "glow") && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-semibold text-text-muted">
                      بداية التدرج (Gradient From)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={form.gradient_from || "#0d6efd"}
                        onChange={(e) =>
                          setForm({ ...form, gradient_from: e.target.value })
                        }
                        className="w-9 h-9 rounded border border-line bg-transparent cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        dir="ltr"
                        value={form.gradient_from || "#0d6efd"}
                        onChange={(e) =>
                          setForm({ ...form, gradient_from: e.target.value })
                        }
                        className="w-full h-9 px-2.5 rounded-lg border border-line bg-surface-container text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-semibold text-text-muted">
                      نهاية التدرج (Gradient To)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={form.gradient_to || "#00f2fe"}
                        onChange={(e) =>
                          setForm({ ...form, gradient_to: e.target.value })
                        }
                        className="w-9 h-9 rounded border border-line bg-transparent cursor-pointer p-0"
                      />
                      <input
                        type="text"
                        dir="ltr"
                        value={form.gradient_to || "#00f2fe"}
                        onChange={(e) =>
                          setForm({ ...form, gradient_to: e.target.value })
                        }
                        className="w-full h-9 px-2.5 rounded-lg border border-line bg-surface-container text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Presets */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[11px] font-mono text-text-muted block">
                  لوحة الألوان الجاهزة السريعة:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm({ ...form, bg_color: c })}
                      style={{ backgroundColor: c }}
                      className="w-7 h-7 rounded-lg border border-white/20 hover:scale-110 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-line flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-line bg-surface-container text-text-muted hover:text-text-primary text-xs font-semibold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary-container text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)] disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "جاري الحفظ..." : "حفظ الرابط"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

