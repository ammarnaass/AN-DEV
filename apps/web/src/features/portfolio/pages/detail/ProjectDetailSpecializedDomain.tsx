import React from "react";
import { Project } from "@andev/shared";
import { PosHardwareCompatibility } from "../../components/PosHardwareCompatibility";
import { ErpModulesMatrix } from "../../components/ErpModulesMatrix";
import { MobileAppShowcase } from "../../components/MobileAppShowcase";

export interface ProjectDetailSpecializedDomainProps {
  project: Project;
  title: string;
}

export const ProjectDetailSpecializedDomain: React.FC<ProjectDetailSpecializedDomainProps> = ({
  project,
  title,
}) => {
  const typeSpecs =
    (project as any).type_specs ||
    (typeof (project as any).type_specs_json === "string"
      ? JSON.parse((project as any).type_specs_json || "{}")
      : (project as any).type_specs_json) ||
    {};

  if (project.project_type === "pos") {
    return <PosHardwareCompatibility specs={typeSpecs} />;
  }
  if (project.project_type === "system") {
    return <ErpModulesMatrix specs={typeSpecs} />;
  }
  if (project.project_type === "mobile") {
    return (
      <MobileAppShowcase
        specs={typeSpecs}
        downloadUrl={project.download_url || ""}
        title={title}
      />
    );
  }
  return null;
};

