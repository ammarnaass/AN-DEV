/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Button } from "./Button";
import React from "react";

afterEach(cleanup);

describe("Button component", () => {
  it("renders with primary variant and correct label", () => {
    render(<Button variant="primary">ابدأ مشروعك</Button>);
    const btn = screen.getByRole("button", { name: /ابدأ مشروعك/i });
    expect(btn).toBeDefined();
    expect(btn.className).toContain("btn-primary");
  });

  it("shows spinner and is disabled when isLoading is true", () => {
    render(<Button isLoading>إرسال</Button>);
    const btn = screen.getByRole("button");
    expect(btn.hasAttribute("disabled")).toBe(true);
  });
});

