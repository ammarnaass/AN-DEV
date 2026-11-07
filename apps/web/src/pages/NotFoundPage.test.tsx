/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { NotFoundPage } from "./NotFoundPage";
import { MemoryRouter } from "react-router-dom";
import { I18nProvider } from "../lib/i18n";
import React from "react";

afterEach(cleanup);

describe("NotFoundPage", () => {
  it("renders 404 terminal title and home link", () => {
    render(
      <I18nProvider initialLocale="ar">
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </I18nProvider>
    );
    expect(screen.getByRole("heading", { name: /404/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /الرئيسية/i })).toBeDefined();
  });
});
