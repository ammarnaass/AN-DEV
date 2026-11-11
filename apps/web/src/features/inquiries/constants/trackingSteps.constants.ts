export const TRACKING_STEPS = [
  { num: 1, ar: "تم الاستلام", en: "Submitted" },
  { num: 2, ar: "قيد المراجعة والتدقيق", en: "Under Review" },
  { num: 3, ar: "تمت الموافقة / تأكيد الموعد", en: "Approved / Scheduled" },
  { num: 4, ar: "قيد التنفيذ والمتابعة", en: "In Progress" },
  { num: 5, ar: "مكتمل ومسلّم", en: "Completed" },
] as const;

export function getStatusStepIndex(status: string): number {
  switch (status) {
    case "pending":
    case "new":
      return 1;
    case "approved":
      return 2;
    case "in_progress":
      return 3;
    case "completed":
      return 4;
    case "cancelled":
    case "rejected":
      return -1;
    default:
      return 1;
  }
}
