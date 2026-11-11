import React from "react";
import { ProjectTypeSelector } from "./specs/ProjectTypeSelector";
import { ProjectReleaseInfoFields } from "./specs/ProjectReleaseInfoFields";
import { ProjectPlatformsSelector, AVAILABLE_PLATFORMS } from "./specs/ProjectPlatformsSelector";
import { WebSpecsEditor } from "./specs/WebSpecsEditor";
import { MobileSpecsEditor } from "./specs/MobileSpecsEditor";
import { DesktopSpecsEditor } from "./specs/DesktopSpecsEditor";
import { PosSpecsEditor } from "./specs/PosSpecsEditor";
import { ErpSpecsEditor } from "./specs/ErpSpecsEditor";

export interface ProjectSpecsFieldsProps {
  projectType: "web" | "mobile" | "desktop" | "pos" | "system";
  onTypeChange: (val: "web" | "mobile" | "desktop" | "pos" | "system") => void;
  version: string;
  onVersionChange: (val: string) => void;
  packageSize: string;
  onPackageSizeChange: (val: string) => void;
  platforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
  downloadUrl: string;
  onDownloadUrlChange: (val: string) => void;
  enableLivePreview: boolean;
  onEnableLivePreviewChange: (val: boolean) => void;
  typeSpecs?: Record<string, any>;
  onTypeSpecsChange?: (specs: Record<string, any>) => void;
  liveUrl?: string;
  onLiveUrlChange?: (val: string) => void;
}

const DEFAULT_TYPE_PLATFORMS: Record<string, string[]> = {
  web: ["web"],
  mobile: ["android", "ios"],
  desktop: ["windows", "macos", "linux"],
  pos: ["windows", "android", "pos_terminals"],
  system: ["web", "windows", "linux"]
};

function parsePlatforms(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    if (val.trim()) return [val.trim()];
  }
  return ["web"];
}

export const ProjectSpecsFields: React.FC<ProjectSpecsFieldsProps> = ({
  projectType,
  onTypeChange,
  version,
  onVersionChange,
  packageSize,
  onPackageSizeChange,
  platforms,
  onPlatformsChange,
  downloadUrl,
  onDownloadUrlChange,
  enableLivePreview,
  onEnableLivePreviewChange,
  typeSpecs = {},
  onTypeSpecsChange = () => {},
  liveUrl = "",
  onLiveUrlChange = () => {}
}) => {
  const currentPlatforms = parsePlatforms(platforms);

  const handleTypeSelect = (newType: "web" | "mobile" | "desktop" | "pos" | "system") => {
    onTypeChange(newType);
    const suggested = DEFAULT_TYPE_PLATFORMS[newType] || ["web"];
    onPlatformsChange(suggested);
  };

  const togglePlatform = (platformId: string) => {
    const list = parsePlatforms(platforms);
    if (list.includes(platformId)) {
      onPlatformsChange(list.filter(p => p !== platformId));
    } else {
      onPlatformsChange([...list, platformId]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-start">
      {/* 1. Project Type Selector */}
      <ProjectTypeSelector
        projectType={projectType}
        onSelectType={handleTypeSelect}
      />

      {/* 2. Dynamic Domain-Specific Editor */}
      <div className="pt-1">
        {projectType === "web" && (
          <WebSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            liveUrl={liveUrl}
            onLiveUrlChange={onLiveUrlChange}
            enableLivePreview={enableLivePreview}
            onEnableLivePreviewChange={onEnableLivePreviewChange}
          />
        )}

        {projectType === "mobile" && (
          <MobileSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            packageSize={packageSize}
            onPackageSizeChange={onPackageSizeChange}
            downloadUrl={downloadUrl}
            onDownloadUrlChange={onDownloadUrlChange}
          />
        )}

        {projectType === "desktop" && (
          <DesktopSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
            packageSize={packageSize}
            onPackageSizeChange={onPackageSizeChange}
            downloadUrl={downloadUrl}
            onDownloadUrlChange={onDownloadUrlChange}
          />
        )}

        {projectType === "pos" && (
          <PosSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
          />
        )}

        {projectType === "system" && (
          <ErpSpecsEditor
            specs={typeSpecs}
            onChange={onTypeSpecsChange}
          />
        )}
      </div>

      {/* 3. Common Release Info (Version & Package Size) */}
      <ProjectReleaseInfoFields
        version={version}
        onVersionChange={onVersionChange}
        packageSize={packageSize}
        onPackageSizeChange={onPackageSizeChange}
      />

      {/* 4. Supported Platforms Multi-Select Buttons */}
      <ProjectPlatformsSelector
        currentPlatforms={currentPlatforms}
        onTogglePlatform={togglePlatform}
        onSelectAll={() => onPlatformsChange(AVAILABLE_PLATFORMS.map(p => p.id))}
        onClearAll={() => onPlatformsChange([])}
      />
    </div>
  );
};
