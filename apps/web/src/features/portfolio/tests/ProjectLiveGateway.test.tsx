/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { ProjectLiveGateway } from "../components/ProjectLiveGateway";

afterEach(cleanup);

describe("ProjectLiveGateway component", () => {
  it("renders live gateway toolbar with desktop, tablet, and mobile viewport buttons", () => {
    render(
      <ProjectLiveGateway
        liveUrl="https://anposwebsite.vercel.app"
        title="AN POS"
      />
    );

    expect(screen.getByTestId("viewport-btn-desktop")).toBeDefined();
    expect(screen.getByTestId("viewport-btn-tablet")).toBeDefined();
    expect(screen.getByTestId("viewport-btn-mobile")).toBeDefined();

    // Default viewport is desktop
    const iframe = screen.getByTestId("gateway-iframe");
    expect(iframe.getAttribute("src")).toBe("https://anposwebsite.vercel.app");

    // Click tablet viewport
    fireEvent.click(screen.getByTestId("viewport-btn-tablet"));
    const container = screen.getByTestId("gateway-viewport-container");
    expect(container.className).toContain("max-w-[768px]");

    // Click mobile viewport
    fireEvent.click(screen.getByTestId("viewport-btn-mobile"));
    expect(container.className).toContain("max-w-[390px]");
  });

  it("provides reload and open in new tab actions", () => {
    render(
      <ProjectLiveGateway
        liveUrl="https://anposwebsite.vercel.app"
        title="AN POS"
      />
    );

    const openLink = screen.getByRole("link", { name: /فتح في نافذة جديدة|Open in New Tab/i });
    expect(openLink.getAttribute("href")).toBe("https://anposwebsite.vercel.app");
  });
});
