import React, { useState } from "react";
import { Project, ProjectGalleryItem } from "@andev/shared";
import { X } from "lucide-react";
import { useProjectForm } from "../hooks/useProjectForm";
import { ProjectLocalizedFields } from "./ProjectLocalizedFields";
import { ProjectSpecsFields } from "./ProjectSpecsFields";
import { ProjectGalleryManager } from "./ProjectGalleryManager";
import { ProjectModalNavPills, ProjectModalSection } from "./projectModal/ProjectModalNavPills";
import { ProjectCoverUploader } from "./projectModal/ProjectCoverUploader";
import { ProjectLinksSection } from "./projectModal/ProjectLinksSection";
import { ProjectModalFooterActions } from "./projectModal/ProjectModalFooterActions";

export interface ProjectEditModalProps {
  project?: Project | null;
  onClose: () => void;
  onSaved: () => void;
}

const SECTIONS: ProjectModalSection[] = ["content", "specs", "gallery", "links"];

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  onClose,
  onSaved,
}) => {
  const [activeSection, setActiveSection] = useState<ProjectModalSection>("content");
  const [activeLocaleTab, setActiveLocaleTab] = useState<"ar" | "en">("ar");

  const {
    form,
    setForm,
    techInput,
    setTechInput,
    isUploading,
    isSaving,
    error,
    handleFileUpload,
    handleSave,
  } = useProjectForm(project, onSaved);

  const currentSectionIdx = SECTIONS.indexOf(activeSection);
  const goToPrevSection = () => {
    if (currentSectionIdx > 0) {
      setActiveSection(SECTIONS[currentSectionIdx - 1]);
    }
  };
  const goToNextSection = () => {
    if (currentSectionIdx < SECTIONS.length - 1) {
      setActiveSection(SECTIONS[currentSectionIdx + 1]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-card border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-start">
        <button
          onClick={onClose}
          className="absolute top-5 end-5 text-mute hover:text-ink"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-ink">
            {project ? "تعديل دراسة الحالة والمواصفات" : "إضافة مشروع / تطبيق جديد للمعرض"}
          </h2>
          <p className="text-xs text-mute font-mono">
            نظام متكامل لدراسات الحالة التقنية، المواصفات البرمجية، وبوابة المعاينة الحية
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-err/10 border border-err/30 text-err rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <ProjectModalNavPills
            activeSection={activeSection}
            onSelectSection={setActiveSection}
          />

          {/* Section 1: Content & Translations */}
          {activeSection === "content" && (
            <div className="space-y-4">
              <div className="flex border-b border-line gap-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab("ar")}
                  className={`pb-2 transition-colors ${
                    activeLocaleTab === "ar" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
                  }`}
                >
                  البيانات بالعربية (RTL)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocaleTab("en")}
                  className={`pb-2 transition-colors ${
                    activeLocaleTab === "en" ? "text-primary border-b-2 border-primary font-bold" : "text-mute"
                  }`}
                >
                  English Content (LTR)
                </button>
              </div>

              <ProjectLocalizedFields
                activeTab={activeLocaleTab}
                form={form}
                onChange={(field, val) => setForm(prev => ({ ...prev, [field]: val }))}
              />
            </div>
          )}

          {/* Section 2: App Specs & Platforms */}
          {activeSection === "specs" && (
            <ProjectSpecsFields
              projectType={form.project_type as any}
              onTypeChange={val => setForm(prev => ({ ...prev, project_type: val }))}
              version={form.version}
              onVersionChange={val => setForm(prev => ({ ...prev, version: val }))}
              packageSize={form.package_size}
              onPackageSizeChange={val => setForm(prev => ({ ...prev, package_size: val }))}
              platforms={form.platforms_json}
              onPlatformsChange={val => setForm(prev => ({ ...prev, platforms_json: val }))}
              downloadUrl={form.download_url || ""}
              onDownloadUrlChange={val => setForm(prev => ({ ...prev, download_url: val }))}
              enableLivePreview={form.enable_live_preview}
              onEnableLivePreviewChange={val => setForm(prev => ({ ...prev, enable_live_preview: val }))}
              typeSpecs={typeof form.type_specs_json === "object" ? form.type_specs_json : {}}
              onTypeSpecsChange={specs => setForm(prev => ({ ...prev, type_specs_json: specs }))}
              liveUrl={form.live_url || ""}
              onLiveUrlChange={val => setForm(prev => ({ ...prev, live_url: val }))}
            />
          )}

          {/* Section 3: Gallery & Cover */}
          {activeSection === "gallery" && (
            <div className="space-y-6">
              <ProjectCoverUploader
                coverImage={form.cover_image}
                isUploading={isUploading}
                onCoverChange={val => setForm(prev => ({ ...prev, cover_image: val }))}
                onFileUpload={handleFileUpload}
              />

              <ProjectGalleryManager
                items={form.gallery_json as ProjectGalleryItem[]}
                onChange={val => setForm(prev => ({ ...prev, gallery_json: val }))}
              />
            </div>
          )}

          {/* Section 4: Links & Publishing */}
          {activeSection === "links" && (
            <ProjectLinksSection
              form={form}
              techInput={techInput}
              onTechInputChange={setTechInput}
              onFormChange={(field, val) => setForm(prev => ({ ...prev, [field]: val }))}
            />
          )}

          <ProjectModalFooterActions
            activeSection={activeSection}
            currentSectionIdx={currentSectionIdx}
            totalSections={SECTIONS.length}
            isSaving={isSaving}
            onClose={onClose}
            onPrev={goToPrevSection}
            onNext={goToNextSection}
          />
        </form>
      </div>
    </div>
  );
};
