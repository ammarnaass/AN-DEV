/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { ProjectSpecsFields } from "../components/ProjectSpecsFields";

afterEach(cleanup);

describe("ProjectSpecsFields component", () => {
  it("renders inputs and handles changes", () => {
    const onTypeChange = vi.fn();
    const onVersionChange = vi.fn();
    const onPackageSizeChange = vi.fn();
    const onPlatformsChange = vi.fn();
    const onDownloadUrlChange = vi.fn();
    const onEnableLivePreviewChange = vi.fn();

    render(
      <ProjectSpecsFields
        projectType="pos"
        onTypeChange={onTypeChange}
        version="v2.4.0"
        onVersionChange={onVersionChange}
        packageSize="48 MB"
        onPackageSizeChange={onPackageSizeChange}
        platforms={["windows", "pos_terminals"]}
        onPlatformsChange={onPlatformsChange}
        downloadUrl="https://example.com/setup.exe"
        onDownloadUrlChange={onDownloadUrlChange}
        enableLivePreview={true}
        onEnableLivePreviewChange={onEnableLivePreviewChange}
      />
    );

    // Verify fields are present
    expect(screen.getByLabelText(/نوع التطبيق|Project Type/i)).toBeDefined();
    expect(screen.getByLabelText(/رقم الإصدار|Version/i)).toBeDefined();
    expect(screen.getByLabelText(/حجم الحزمة|Package Size/i)).toBeDefined();

    // Trigger platform toggle
    const androidCheckbox = screen.getByTestId("platform-checkbox-android");
    fireEvent.click(androidCheckbox);
    expect(onPlatformsChange).toHaveBeenCalledWith(["windows", "pos_terminals", "android"]);
  });
});

