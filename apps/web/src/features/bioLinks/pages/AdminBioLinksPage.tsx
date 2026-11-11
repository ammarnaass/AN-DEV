import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BioLink, BioLinkInput } from "@andev/shared";
import { Link2, Plus, ExternalLink, Palette, LayoutList } from "lucide-react";
import { useAdminBioLinks } from "../hooks/useBioLinks";
import { BioStatsCards } from "../admin/BioStatsCards";
import { BioLinksTable } from "../admin/BioLinksTable";
import { BioAppearanceSection } from "../admin/BioAppearanceSection";
import { BioLinksLivePreview } from "../admin/BioLinksLivePreview";
import { BioLinkEditModal } from "../admin/BioLinkEditModal";

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
    updateBioSettings,
    isUpdatingSettings,
  } = useAdminBioLinks();

  const [activeTab, setActiveTab] = useState<"links" | "appearance">("links");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<BioLink | null>(null);
  const [localSettings, setLocalSettings] = useState<Record<string, string>>({
    bio_page_bg_type: "mesh",
    bio_page_bg_value: "#090d16",
    ...(initialSettings || {}),
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  React.useEffect(() => {
    if (initialSettings) {
      setLocalSettings({
        bio_page_bg_type: "mesh",
        bio_page_bg_value: "#090d16",
        ...initialSettings,
      });
    }
  }, [initialSettings]);

  const handleEdit = (link: BioLink) => {
    setEditingLink(link);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingLink(null);
    setModalOpen(true);
  };

  const handleSaveModal = async (data: BioLinkInput) => {
    if (editingLink) {
      await updateBioLink({ id: editingLink.id, data });
    } else {
      await createBioLink(data);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (confirm(`هل أنت متأكد من حذف الرابط "${title}"؟`)) {
      await deleteBioLink(id);
    }
  };

  const handleToggleActive = async (link: BioLink) => {
    const { id, click_count, created_at, updated_at, ...inputData } = link;
    await updateBioLink({
      id: link.id,
      data: {
        ...inputData,
        is_active: !link.is_active,
      },
    });
  };

  const handleToggleFeatured = async (link: BioLink) => {
    const { id, click_count, created_at, updated_at, ...inputData } = link;
    await updateBioLink({
      id: link.id,
      data: {
        ...inputData,
        is_featured: !link.is_featured,
      },
    });
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0) return;
    const reordered = [...links];
    const temp = reordered[index];
    reordered[index] = reordered[index - 1];
    reordered[index - 1] = temp;
    await reorderBioLinks(
      reordered.map((l, idx) => ({ id: l.id, sort_order: (idx + 1) * 10 }))
    );
  };

  const handleMoveDown = async (index: number) => {
    if (index >= links.length - 1) return;
    const reordered = [...links];
    const temp = reordered[index];
    reordered[index] = reordered[index + 1];
    reordered[index + 1] = temp;
    await reorderBioLinks(
      reordered.map((l, idx) => ({ id: l.id, sort_order: (idx + 1) * 10 }))
    );
  };

  const handleSaveAppearance = async () => {
    await updateBioSettings(localSettings);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-start max-w-7xl mx-auto">
      {/* Header */}
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
            إدارة الروابط السريعة، شبكات التواصل، وتخصيص مظهر صفحة الـ Bio العامة للمنصة.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/links"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            <span>زيارة الصفحة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة رابط جديد</span>
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <BioStatsCards
        totalLinks={stats.totalLinks}
        totalClicks={stats.totalClicks}
        activeLinks={stats.activeLinks}
        topPerformerTitle={
          links.length > 0
            ? [...links].sort((a, b) => b.click_count - a.click_count)[0]?.title
            : undefined
        }
      />

      {/* Main Grid: Management Tabs & Phone Mockup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Main Column: Tabs & Forms */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tab Switcher */}
          <div className="flex border-b border-line gap-2">
            <button
              onClick={() => setActiveTab("links")}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === "links"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              <LayoutList className="w-4 h-4" />
              <span>إدارة الروابط وترتيبها ({links.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
                activeTab === "appearance"
                  ? "border-secondary text-secondary"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>الهوية والمظهر والخلفية</span>
            </button>
          </div>

          {activeTab === "links" ? (
            <BioLinksTable
              links={links}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              onToggleFeatured={handleToggleFeatured}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ) : (
            <BioAppearanceSection
              settings={localSettings}
              isUpdating={isUpdatingSettings}
              success={settingsSuccess}
              onChangeSetting={(k, v) => setLocalSettings((prev) => ({ ...prev, [k]: v }))}
              onSave={handleSaveAppearance}
            />
          )}
        </div>

        {/* Right Column: Live Smartphone Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <BioLinksLivePreview settings={localSettings} links={links} />
        </div>
      </div>

      {/* Edit / Create Modal */}
      <BioLinkEditModal
        isOpen={modalOpen}
        link={editingLink}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveModal}
        isSaving={isCreating || isUpdating}
      />
    </div>
  );
};
