import { useState } from "react";
import { InquirySchema, InquiryInput } from "@andev/shared";
import { inquiriesService } from "../services/inquiries.service";

const initialFormState: InquiryInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  request_type: "project",
  project_type: "web",
  budget_range: "",
  consultation_domain: "general",
  preferred_date: "",
  preferred_time_slot: "morning",
  meeting_mode: "google_meet",
  message: "",
  honeypot: ""
};

export function useSubmitInquiry() {
  const [formData, setFormData] = useState<InquiryInput>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const updateField = (name: keyof InquiryInput, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setTrackingCode(null);
    setFormData(initialFormState);
    setErrors({});
    setServerError(null);
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setServerError(null);

    const parseResult = InquirySchema.safeParse(formData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setIsSubmitting(true);
    try {
      const res = await inquiriesService.submitInquiry(formData);
      setTrackingCode(res.tracking_code);
      setIsSubmitted(true);
      return true;
    } catch (err: any) {
      setServerError(err.message || "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    trackingCode,
    serverError,
    updateField,
    resetForm,
    submit
  };
}
