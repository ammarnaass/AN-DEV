import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BioLink, BioLinkInput } from "@andev/shared";
import {
  Link2,
  Plus,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Star,
  Eye,
  Palette,
  LayoutList,
  Upload,
  Save,
  RotateCcw,
  CheckCircle2,
  MousePointerClick,
  Sparkles,
  Smartphone,
  AlertCircle,
  Check,
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
} from "lucide-react";
import { useAdminBioLinks } from "../../bioLinks/hooks/useBioLinks";
import { BioLinkEditModal } from "../components/BioLinkEditModal";
import { BioLinksLivePreview } from "../components/BioLinksLivePreview";

const ICON_RESOLVER: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4 shrink-0 text-secondary" />,
  FolderKanban: <FolderKanban className="w-4 h-4 shrink-0 text-primary" />,
  MessageCircle: <MessageCircle className="w-4 h-4 shrink-0 text-status-ok" />,
  BookOpen: <BookOpen className="w-4 h-4 shrink-0 text-amber-400" />,
  Globe: <Globe className="w-4 h-4 shrink-0 text-sky-400" />,
  Code2: <Code2 className="w-4 h-4 shrink-0 text-indigo-400" />,
  Cpu: <Cpu className="w-4 h-4 shrink-0 text-purple-400" />,
  Layers: <Layers className="w-4 h-4 shrink-0 text-cyan-400" />,
  Terminal: <Terminal className="w-4 h-4 shrink-0 text-emerald-400" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />,
  Send: <Send className="w-4 h-4 shrink-0 text-rose-400" />,
  Zap: <Zap className="w-4 h-4 shrink-0 text-yellow-400" />,
};

const BG_COLOR_PRESETS = [
  { label: "Dark Slate", value: "#090d16" },
  { label: "Midnight Black", value: "#030712" },
  { label: "Obsidian Neutral", value: "#0a0a0a" },
  { label: "GitHub Dark", value: "#0d1117" },
  { label: "Deep Navy", value: "#051329" },
  { label: "Cyber Violet", value: "#120726" },
];

export const AdminBioLinksPage: React.FC = () => {
  const {
    links,
    settings: initialSettings,
    stats,
    isLoading,
    createBioLink,
    isCreating,
    updateBioLink,
    isUpdating,
    deleteBioLink,
    reorderBioLinks,
    isReordering,
    updateBioSettings,
    isUpdatingSettings,
  } = useAdminBioLinks();

  const [activeTab, setActiveTab] = useState<"links" | "appearance">("links");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<BioLink | null>(null);

  // Appearance & identity settings local state for live preview
  const [localSettings, setLocalSettings] = useState<Record<string, string>>({
    bio_page_bg_type: "mesh",
    bio_page_bg_value: "#090d16",
    ...(initialSettings || {}),
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialSettings) {
      setLocalSettings({
        bio_page_bg_type: "mesh",
        bio_page_bg_value: "#090d16",
        ...initialSettings,
      });
    }
  }, [initialSettings]);

  const handleSettingChange = (key: string, value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarUploadError(null);
    if (file.size > 2 * 1024 * 1024) {
      setAvatarUploadError("حجم الصورة يجب ألا يتجاوز 2 ميغابايت لضمان سرعة التحميل");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        handleSettingChange("bio_page_avatar", result);
      }
    };
    reader.onerror = () => {
      setAvatarUploadError("حدث خطأ أثناء قراءة ملف الصورة");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBioSettings(localSettings);
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    } catch {
      alert("حدث خطأ أثناء حفظ الإعدادات، يرجى المحاولة مرة أخرى.");
    }
  };

  const handleResetSettings = () => {
    if (initialSettings) {
      setLocalSettings(initialSettings);
    }
  };

  // Link CRUD handlers
  const handleOpenCreateModal = () => {
    setEditingLink(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (link: BioLink) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleSaveModal = async (data: BioLinkInput) => {
    if (editingLink) {
      await updateBioLink({ id: editingLink.id, data });
    } else {
      await createBioLink(data);
    }
    setModalOpen(false);
    setEditingLink(null);
  };

  const handleDeleteLink = async (id: number, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف رابط "${title}" نهائياً؟`)) {
      await deleteBioLink(id);
    }
  };

  const handleToggleActive = async (link: BioLink) => {
    await updateBioLink({
      id: link.id,
      data: {
        title: link.title,
        url: link.url,
        subtitle: link.subtitle,
        icon_or_image: link.icon_or_image,
        image_size: link.image_size,
        image_radius: link.image_radius,
        image_fit: link.image_fit,
        font_family: link.font_family,
        text_color: link.text_color,
        bg_color: link.bg_color,
        border_color: link.border_color,
        style_variant: link.style_variant,
        gradient_from: link.gradient_from,
        gradient_to: link.gradient_to,
        is_active: !link.is_active,
        is_featured: link.is_featured,
        sort_order: link.sort_order,
      },
    });
  };

  const handleToggleFeatured = async (link: BioLink) => {
    await updateBioLink({
      id: link.id,
      data: {
        title: link.title,
        url: link.url,
        subtitle: link.subtitle,
        icon_or_image: link.icon_or_image,
        image_size: link.image_size,
        image_radius: link.image_radius,
        image_fit: link.image_fit,
        font_family: link.font_family,
        text_color: link.text_color,
        bg_color: link.bg_color,
        border_color: link.border_color,
        style_variant: link.style_variant,
        gradient_from: link.gradient_from,
        gradient_to: link.gradient_to,
        is_active: link.is_active,
        is_featured: !link.is_featured,
        sort_order: link.sort_order,
      },
    });
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= links.length) return;

    const newLinks = [...links];
    const temp = newLinks[index];
    newLinks[index] = newLinks[targetIndex];
    newLinks[targetIndex] = temp;

    const reorderPayload = newLinks.map((item, idx) => ({
      id: item.id,
      sort_order: (idx + 1) * 10,
    }));

    await reorderBioLinks(reorderPayload);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-text-muted font-mono">
        جاري تحميل بيانات وروابط الـ Bio Links...
      </div>
    );
  }

  return (
    <div className="space-y-8 text-start max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <Link2 className="w-3.5 h-3.5" />
            <span>BIOLINKS_ENGINE // CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            صفحة اختصارات الروابط (Bio Links)
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            نظام متكامل لتخصيص صفحة الهبوط العامة (/links)، وإدارة أزرار التحويل المباشر مع دعم التخصيص اللوني الكامل ومعاينة حية على الهاتف.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/links"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-secondary" />
            <span>معاينة الصفحة العامة</span>
          </Link>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة رابط جديد</span>
          </button>
        </div>
      </div>

      {/* Analytics Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-line flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-text-muted font-mono">إجمالي الروابط</span>
            <div className="text-2xl font-black text-text-primary">
              {stats.totalLinks}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Link2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-text-muted font-mono">الروابط النشطة</span>
            <div className="text-2xl font-black text-status-ok">
              {stats.activeLinks}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-status-ok/10 border border-status-ok/20 flex items-center justify-center text-status-ok">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-text-muted font-mono">إجمالي النقرات المجمعة</span>
            <div className="text-2xl font-black text-secondary">
              {stats.totalClicks}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
            <MousePointerClick className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Split Layout: Editor & Mobile Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Col 7): Tabs & Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface border border-line">
            <button
              onClick={() => setActiveTab("links")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "links"
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-container"
              }`}
            >
              <LayoutList className="w-4 h-4" />
              <span>قائمة وترتيب الروابط ({links.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "appearance"
                  ? "bg-primary-container text-white shadow-sm"
                  : "text-text-muted hover:text-text-primary hover:bg-surface-container"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>الهوية والمظهر والخلفية</span>
            </button>
          </div>

          {/* TAB 1: Links List Management */}
          {activeTab === "links" && (
            <div className="space-y-4">
              {links.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-surface border border-dashed border-line space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-surface-container border border-line flex items-center justify-center text-text-muted">
                    <Link2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-text-primary">
                      لا توجد روابط مضافة بعد
                    </h3>
                    <p className="text-xs text-text-muted max-w-sm mx-auto">
                      ابدأ بإضافة أول رابط إلى صفحة الاختصارات الخاصة بك ليظهر مباشرة في صفحة /links
                    </p>
                  </div>
                  <button
                    onClick={handleOpenCreateModal}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة أول رابط</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {links.map((link, index) => {
                    const isCustomImg =
                      link.icon_or_image?.startsWith("http") ||
                      link.icon_or_image?.startsWith("data:");
                    const resolvedIcon =
                      ICON_RESOLVER[link.icon_or_image || ""] || (
                        <Link2 className="w-4 h-4 text-text-muted" />
                      );

                    return (
                      <div
                        key={link.id}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          link.is_active
                            ? "bg-surface border-line hover:border-slate-700"
                            : "bg-surface/50 border-line/50 opacity-60"
                        }`}
                      >
                        {/* Left Info & Reorder Controls */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          {/* Order Buttons */}
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              disabled={index === 0 || isReordering}
                              onClick={() => handleMoveOrder(index, "up")}
                              title="تحريك لأعلى"
                              className="p-1 rounded bg-surface-container border border-line text-text-muted hover:text-text-primary disabled:opacity-30 disabled:hover:text-text-muted"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={index === links.length - 1 || isReordering}
                              onClick={() => handleMoveOrder(index, "down")}
                              title="تحريك لأسفل"
                              className="p-1 rounded bg-surface-container border border-line text-text-muted hover:text-text-primary disabled:opacity-30 disabled:hover:text-text-muted"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Icon / Image Avatar */}
                          <div className="w-10 h-10 rounded-lg bg-surface-container border border-line flex items-center justify-center shrink-0 overflow-hidden">
                            {isCustomImg ? (
                              <img
                                src={link.icon_or_image!}
                                alt={link.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              resolvedIcon
                            )}
                          </div>

                          {/* Titles & Meta */}
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-text-primary truncate">
                                {link.title}
                              </span>
                              {link.is_featured && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  مميز
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-text-muted font-mono truncate max-w-xs sm:max-w-md">
                              {link.url}
                            </p>

                            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container border border-line text-text-muted font-mono">
                                خط: {link.font_family || "cairo"}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container border border-line text-text-muted font-mono">
                                نمط: {link.style_variant || "solid"}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-secondary/10 border border-secondary/20 text-secondary font-mono font-bold flex items-center gap-1">
                                <MousePointerClick className="w-2.5 h-2.5" />
                                {link.click_count || 0} نقرة
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Quick Actions */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {/* Toggle Featured */}
                          <button
                            onClick={() => handleToggleFeatured(link)}
                            title={link.is_featured ? "إلغاء التمييز" : "تمييز الرابط بنجمة"}
                            className={`p-2 rounded-lg border transition-colors ${
                              link.is_featured
                                ? "bg-secondary/10 text-secondary border-secondary/30"
                                : "bg-surface-container text-text-muted border-line hover:text-text-primary"
                            }`}
                          >
                            <Star className={`w-4 h-4 ${link.is_featured ? "fill-current" : ""}`} />
                          </button>

                          {/* Toggle Active Switch */}
                          <button
                            onClick={() => handleToggleActive(link)}
                            title={link.is_active ? "تعطيل الرابط" : "تفعيل الرابط"}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                              link.is_active
                                ? "bg-status-ok/10 text-status-ok border-status-ok/30"
                                : "bg-surface-container text-text-muted border-line"
                            }`}
                          >
                            {link.is_active ? "نشط" : "معطل"}
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleOpenEditModal(link)}
                            title="تعديل الرابط والمظهر"
                            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-primary transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteLink(link.id, link.title)}
                            title="حذف نهائي"
                            className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-status-danger transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Appearance & Profile Settings */}
          {activeTab === "appearance" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              {settingsSuccess && (
                <div className="p-3.5 rounded-xl bg-status-ok/15 border border-status-ok/30 text-status-ok text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>تم حفظ إعدادات الهوية والخلفية بنجاح!</span>
                </div>
              )}

              {/* Section 1: Hero Profile & Identity */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-line">
                  <Smartphone className="w-4 h-4 text-secondary" />
                  <h3 className="text-sm font-bold text-text-primary">
                    الهيدر والصورة الشخصية (Hero Header)
                  </h3>
                </div>

                {/* Avatar Preview & Upload */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative group shrink-0">
                    <img
                      src={localSettings.bio_page_avatar || "/brand/logo-squircle.webp"}
                      alt="Avatar Preview"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-line bg-surface-container shadow-md"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/brand/logo-squircle.webp";
                      }}
                    />
                    <div className="absolute -bottom-1 -start-1 w-3.5 h-3.5 rounded-full bg-status-ok border-2 border-surface" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>رفع صورة من الجهاز</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSettingChange("bio_page_avatar", "/brand/logo-squircle.webp")}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-line text-text-muted hover:text-text-primary text-xs font-semibold transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>استعادة الشعار الأصلي</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="أو أدخل رابط الصورة المباشر (URL)..."
                      value={localSettings.bio_page_avatar || ""}
                      onChange={(e) => handleSettingChange("bio_page_avatar", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-primary focus:outline-none focus:border-primary"
                    />

                    {avatarUploadError && (
                      <p className="text-[11px] text-status-danger flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{avatarUploadError}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Page Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    عنوان الصفحة الرئيسي (Display Name)
                  </label>
                  <input
                    type="text"
                    value={localSettings.bio_page_title || ""}
                    onChange={(e) => handleSettingChange("bio_page_title", e.target.value)}
                    placeholder="مثال: AN DEV | استوديو البرمجيات"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-line text-xs text-text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Bio / Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-primary">
                    الوصف المختصر / النبذة التعريفية (Bio Description)
                  </label>
                  <textarea
                    rows={2}
                    value={localSettings.bio_page_bio || ""}
                    onChange={(e) => handleSettingChange("bio_page_bio", e.target.value)}
                    placeholder="نبذة سريعة تظهر تحت العنوان مباشرة للزوار..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container border border-line text-xs text-text-primary focus:outline-none focus:border-primary resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Section 2: Background Style Customizer */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-secondary" />
                    <h3 className="text-sm font-bold text-text-primary">
                      نمط وخلفية الصفحة (Background Style)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await updateBioSettings(localSettings);
                        setSettingsSuccess(true);
                        setTimeout(() => setSettingsSuccess(false), 3500);
                      } catch (err: any) {
                        alert(err?.message || "حدث خطأ أثناء حفظ الإعدادات، يرجى المحاولة مرة أخرى.");
                      }
                    }}
                    disabled={isUpdatingSettings}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs disabled:opacity-50 ${
                      settingsSuccess
                        ? "bg-status-ok/20 text-status-ok border border-status-ok/40"
                        : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                    }`}
                  >
                    {settingsSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-ok shrink-0" />
                        <span>تم حفظ المظهر بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5 shrink-0" />
                        <span>{isUpdatingSettings ? "جاري الحفظ..." : "حفظ المظهر"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Background Type Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-primary">
                    نوع التأثير البصري للخلفية
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: "mesh",
                        title: "شبكة متوهجة (Mesh)",
                        desc: "إضاءة نيون هادئة متكيفة تلقائياً مع الوضعين الداكن والفاتح",
                      },
                      {
                        id: "color",
                        title: "لون مخصص (Solid)",
                        desc: "خلفية بلون داكن موحد ثابت",
                      },
                      {
                        id: "gradient",
                        title: "تدرج عميق (Gradient)",
                        desc: "تدرج ناعم يعطي عمقاً بصرياً فخماً",
                      },
                    ].map((type) => {
                      const isSelected = (localSettings.bio_page_bg_type || "mesh") === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleSettingChange("bio_page_bg_type", type.id)}
                          className={`p-3 rounded-xl border text-start transition-all ${
                            isSelected
                              ? "bg-primary/10 border-primary shadow-sm"
                              : "bg-surface-container border-line hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-text-primary">
                              {type.title}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                          </div>
                          <span className="text-[10px] text-text-muted leading-tight block">
                            {type.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Value with Presets */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-primary">
                    اللون الأساسي للخلفية
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {BG_COLOR_PRESETS.map((preset) => {
                      const isCurrent =
                        (localSettings.bio_page_bg_value || "#090d16").toLowerCase() ===
                        preset.value.toLowerCase();
                      return (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => handleSettingChange("bio_page_bg_value", preset.value)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono transition-all ${
                            isCurrent
                              ? "border-primary bg-primary/15 text-primary font-bold shadow-sm"
                              : "border-line bg-surface-container text-text-muted hover:text-text-primary"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: preset.value }}
                          />
                          <span>{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="color"
                      value={localSettings.bio_page_bg_value || "#090d16"}
                      onChange={(e) => handleSettingChange("bio_page_bg_value", e.target.value)}
                      className="w-9 h-9 rounded-lg border border-line bg-surface-container cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={localSettings.bio_page_bg_value || "#090d16"}
                      onChange={(e) => handleSettingChange("bio_page_bg_value", e.target.value)}
                      className="w-36 px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Social Media Ribbon Links */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <h3 className="text-sm font-bold text-text-primary">
                      روابط شبكات التواصل الاجتماعي (Social Ribbon)
                    </h3>
                  </div>
                  <span className="text-[11px] text-text-muted font-mono">
                    تظهر كشريط أيقونات تحت الهيدر مباشرة
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "whatsapp", label: "WhatsApp", placeholder: "https://wa.me/213555000000 أو رقم الهاتف" },
                    { key: "telegram", label: "Telegram", placeholder: "https://t.me/yourusername" },
                    { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage أو رابط صفحة فيسبوك" },
                    { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourcompany" },
                    { key: "github", label: "GitHub", placeholder: "https://github.com/yourhandle" },
                    { key: "twitter", label: "X / Twitter", placeholder: "https://x.com/yourhandle" },
                    { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
                    { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
                  ].map((soc) => (
                    <div key={soc.key} className="space-y-1">
                      <label className="text-[11px] font-semibold text-text-muted">
                        {soc.label}
                      </label>
                      <input
                        type="text"
                        placeholder={soc.placeholder}
                        value={localSettings[soc.key] || ""}
                        onChange={(e) => handleSettingChange(soc.key, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-primary focus:outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>تراجع عن التعديلات</span>
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingSettings}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md disabled:opacity-50 ${
                    settingsSuccess
                      ? "bg-status-ok text-white shadow-[0_0_16px_rgba(34,197,94,0.35)]"
                      : "bg-primary-container text-white hover:bg-primary/90 shadow-[0_0_16px_rgba(13,110,253,0.35)]"
                  }`}
                >
                  {settingsSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>تم حفظ كل الإعدادات بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 shrink-0" />
                      <span>{isUpdatingSettings ? "جاري الحفظ..." : "حفظ كل الإعدادات والمظهر"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column (Col 5): Live Interactive Phone Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[340px] space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-text-muted flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-secondary" />
                <span>معاينة حية على الهاتف</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-status-ok/10 text-status-ok border border-status-ok/20 font-bold">
                تحديث لحظي
              </span>
            </div>

            <BioLinksLivePreview settings={localSettings} links={links} />
          </div>
        </div>
      </div>

      {/* Link Edit / Create Modal */}
      <BioLinkEditModal
        isOpen={modalOpen}
        link={editingLink}
        onClose={() => {
          setModalOpen(false);
          setEditingLink(null);
        }}
        onSave={handleSaveModal}
        isSaving={isCreating || isUpdating}
      />
    </div>
  );
};
