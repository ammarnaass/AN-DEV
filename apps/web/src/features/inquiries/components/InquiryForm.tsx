import React from "react";
import { useSubmitInquiry } from "../hooks/useSubmitInquiry";
import { InquirySubmittedCard } from "./InquirySubmittedCard";
import { InquiryTypeSelector } from "./InquiryTypeSelector";
import { InquiryClientFields } from "./InquiryClientFields";
import { InquiryProjectFields } from "./InquiryProjectFields";
import { InquiryConsultationFields } from "./InquiryConsultationFields";
import { InquirySubmitSection } from "./InquirySubmitSection";

export const InquiryForm: React.FC = () => {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    trackingCode,
    serverError,
    updateField,
    resetForm,
    submit,
  } = useSubmitInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as any, e.target.value);
  };

  if (isSubmitted) {
    return (
      <InquirySubmittedCard
        trackingCode={trackingCode}
        onReset={resetForm}
      />
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-sm"
    >
      {serverError && (
        <div className="p-3.5 rounded-lg bg-err/10 border border-err/30 text-err text-sm">
          {serverError}
        </div>
      )}

      {/* Honeypot field for bot spam prevention */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Request Stream Selector */}
      <InquiryTypeSelector
        requestType={formData.request_type}
        onChange={(type) => updateField("request_type", type)}
      />

      {/* Client Coordinates */}
      <InquiryClientFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />

      {/* Type-Specific Fields */}
      {formData.request_type === "project" ? (
        <InquiryProjectFields
          formData={formData}
          onChange={handleChange}
        />
      ) : (
        <InquiryConsultationFields
          formData={formData}
          onChange={handleChange}
        />
      )}

      {/* Message and Submission */}
      <InquirySubmitSection
        requestType={formData.request_type}
        message={formData.message}
        error={errors.message}
        isSubmitting={isSubmitting}
        onChange={handleChange}
      />
    </form>
  );
};
