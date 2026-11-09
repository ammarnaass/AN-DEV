import { useState } from "react";
import { InquirySchema, InquiryInput } from "@andev/shared";
import { inquiriesService } from "../services/inquiries.service";

const initialFormState: InquiryInput = {
  name: "",
  email: "",
  project_type: "web",
  budget_range: "",
  message: "",
  honeypot: ""
};

export function useSubmitInquiry() {
  const [formData, setFormData] = useState<InquiryInput>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const updateField = (name: keyof InquiryInput, value: string) => {
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
      await inquiriesService.submitInquiry(formData);
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
    serverError,
    updateField,
    resetForm,
    submit
  };
}

