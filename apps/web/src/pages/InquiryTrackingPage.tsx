import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useI18n } from "../lib/i18n";
import { inquiriesService, TrackInquiryResponse } from "../features/inquiries/services/inquiries.service";
import { Button } from "../components/ui/Button";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Calendar,
  Video,
  DollarSign,
  Send,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  MessageSquare
} from "lucide-react";

export const InquiryTrackingPage: React.FC = () => {
  const { trackingCode: paramCode } = useParams<{ trackingCode?: string }>();
  const navigate = useNavigate();
  const { locale } = useI18n();

  const [searchInput, setSearchInput] = useState(paramCode || "");
  const [data, setData] = useState<TrackInquiryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Client actions
  const [copied, setCopied] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchTracking = async (code: string) => {
    if (!code || code.trim().length < 5) return;
    setIsLoading(true);
    setError(null);
    setActionSuccess(null);
    try {
      const res = await inquiriesService.trackInquiry(code);
      setData(res);
    } catch (err: any) {
      setError(err.message || (locale === "ar" ? "لم يتم العثور على الطلب" : "Inquiry not found"));
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (paramCode) {
      setSearchInput(paramCode);
      fetchTracking(paramCode);
    }
  }, [paramCode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/track/${encodeURIComponent(searchInput.trim().toUpperCase())}`);
    }
  };

  const handleCopyCode = () => {
    if (!data?.tracking_code) return;
    navigator.clipboard.writeText(data.tracking_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancelInquiry = async () => {
    if (!data || !cancelReason.trim()) return;
    setIsCancelling(true);
    try {
      await inquiriesService.cancelInquiry(data.tracking_code, cancelReason);
      setShowCancelModal(false);
      setCancelReason("");
      setActionSuccess(locale === "ar" ? "تم إلغاء طلبك بنجاح" : "Your request was cancelled successfully");
      await fetchTracking(data.tracking_code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !newMessage.trim()) return;
    setIsSendingMessage(true);
    try {
      await inquiriesService.sendMessage(data.tracking_code, newMessage);
      setNewMessage("");
      setActionSuccess(locale === "ar" ? "تم إرسال رسالتك إلى الإدارة بنجاح" : "Message sent to team successfully");
      await fetchTracking(data.tracking_code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const getStatusStepIndex = (status: string) => {
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
  };

  const steps = [
    { num: 1, title: locale === "ar" ? "تم الاستلام" : "Submitted" },
    { num: 2, title: locale === "ar" ? "قيد المراجعة والتدقيق" : "Under Review" },
    { num: 3, title: locale === "ar" ? "تمت الموافقة / تأكيد الموعد" : "Approved / Scheduled" },
    { num: 4, title: locale === "ar" ? "قيد التنفيذ والمتابعة" : "In Progress" },
    { num: 5, title: locale === "ar" ? "مكتمل ومسلّم" : "Completed" },
  ];

  const currentStep = data ? getStatusStepIndex(data.status) : 0;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-start animate-fade-in">
      {/* Back Link */}
      <div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-mute hover:text-ink transition-colors"
        >
          {locale === "ar" ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{locale === "ar" ? "العودة لصفحة التواصل وتقديم الطلبات" : "Back to Contact & Request Form"}</span>
        </Link>
      </div>

      {/* Header & Search Bar */}
      <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-mono text-secondary font-semibold">
            {locale === "ar" ? "بوابة تتبع الطلبات والاستشارات" : "REQUEST & CONSULTATION TRACKER"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {locale === "ar" ? "متابعة حالة طلبك في الوقت الفعلي" : "Live Request Status Tracking"}
          </h1>
          <p className="text-mute text-xs sm:text-sm">
            {locale === "ar"
              ? "أدخل كود التتبع الذي استلمته عند تقديم الطلب (مثال: AND-2026-XXXX) للاطلاع على العرض والمواعيد."
              : "Enter the tracking code received after submitting your request (e.g. AND-2026-XXXX)."}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-lg pt-2">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value.toUpperCase())}
            placeholder="AND-2026-XXXX"
            className="flex-1 h-12 px-4 rounded-lg border border-line bg-bg font-mono font-bold text-sm tracking-wider text-ink focus:outline-none focus:border-secondary uppercase"
          />
          <Button type="submit" variant="primary" isLoading={isLoading} className="px-6 h-12">
            <Search className="w-4 h-4" />
            <span className="ms-1.5">{locale === "ar" ? "استعلام" : "Track"}</span>
          </Button>
        </form>

        {error && (
          <div className="p-3.5 rounded-lg bg-err/10 border border-err/30 text-err text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {actionSuccess && (
          <div className="p-3.5 rounded-lg bg-ok/10 border border-ok/30 text-ok text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}
      </div>

      {/* Tracking Data Content */}
      {data && (
        <div className="space-y-6">
          {/* Card 1: Primary Overview */}
          <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-secondary/15 text-secondary border border-secondary/30 text-xs font-mono font-bold">
                    {data.request_type === "consultation"
                      ? (locale === "ar" ? "استشارة تقنية" : "Technical Consultation")
                      : (locale === "ar" ? "مشروع برمجيات" : "Software Project")}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-ink bg-surface-container px-3 py-1 rounded-lg border border-line">
                    <span>{data.tracking_code}</span>
                    <button
                      onClick={handleCopyCode}
                      className="text-mute hover:text-ink transition-colors p-0.5"
                      title={locale === "ar" ? "نسخ" : "Copy"}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-ok" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="text-xs text-mute font-mono pt-1">
                  {locale === "ar" ? "تاريخ التقديم:" : "Submitted on:"} {new Date(data.created_at).toLocaleString("ar-DZ")}
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
                    data.status === "approved" || data.status === "completed"
                      ? "bg-ok/15 text-ok border-ok/30"
                      : data.status === "in_progress"
                      ? "bg-secondary/15 text-secondary border-secondary/30"
                      : data.status === "cancelled" || data.status === "rejected"
                      ? "bg-err/15 text-err border-err/30"
                      : "bg-surface-container text-ink border-line"
                  }`}
                >
                  {data.status === "approved" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "تمت الموافقة / الموعد مؤكد" : "Approved / Confirmed"}</span>
                    </>
                  ) : data.status === "in_progress" ? (
                    <>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "قيد التنفيذ والمتابعة" : "In Progress"}</span>
                    </>
                  ) : data.status === "completed" ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "مكتمل بنجاح" : "Completed"}</span>
                    </>
                  ) : data.status === "cancelled" ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "ملغى من العميل" : "Cancelled by Client"}</span>
                    </>
                  ) : data.status === "rejected" ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{locale === "ar" ? "تم الاعتذار عن الطلب" : "Declined by Agency"}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      <span>{locale === "ar" ? "قيد المراجعة الأولية" : "Under Review"}</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Stepper Progress (If active) */}
            {currentStep > 0 && (
              <div className="py-2">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-line -translate-y-1/2 z-0" />
                  {steps.map(step => {
                    const isPassed = currentStep >= step.num;
                    const isCurrent = currentStep === step.num;
                    return (
                      <div key={step.num} className="relative z-10 flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                            isCurrent
                              ? "bg-secondary text-primary ring-4 ring-secondary/20 shadow-sm"
                              : isPassed
                              ? "bg-ok text-white"
                              : "bg-surface-container border border-line text-mute"
                          }`}
                        >
                          {isPassed && !isCurrent ? <Check className="w-4 h-4" /> : step.num}
                        </div>
                        <span
                          className={`text-[11px] mt-2 font-mono text-center hidden sm:block ${
                            isCurrent ? "font-bold text-secondary" : isPassed ? "text-ink" : "text-mute"
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cancellation / Rejection Banner */}
            {(data.status === "cancelled" || data.status === "rejected") && (
              <div className="p-4 rounded-xl bg-err/10 border border-err/30 text-xs space-y-1 text-err">
                <div className="font-bold flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>
                    {data.status === "cancelled"
                      ? (locale === "ar" ? "تم إلغاء هذا الطلب بناءً على رغبتك" : "This request was cancelled by you")
                      : (locale === "ar" ? "تم الاعتذار عن قبول الطلب" : "This request was declined")}
                  </span>
                </div>
                {data.cancellation_reason && (
                  <p className="text-text-primary text-xs leading-relaxed pt-1">
                    <span className="font-semibold text-err">{locale === "ar" ? "السبب المذكور:" : "Reason:"}</span>{" "}
                    {data.cancellation_reason}
                  </p>
                )}
              </div>
            )}

            {/* Quote / Approval Card for Projects */}
            {data.status === "approved" && data.request_type === "project" && data.quote_amount && (
              <div className="p-5 rounded-xl border border-ok/30 bg-ok/5 space-y-3">
                <div className="flex items-center gap-2 text-ok font-bold text-sm">
                  <DollarSign className="w-4 h-4" />
                  <span>{locale === "ar" ? "عرض السعر والجدول الزمني المعتمد" : "Approved Quotation & Timeline"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-surface border border-line">
                    <span className="text-mute">{locale === "ar" ? "الميزانية المعتمدة:" : "Quoted Amount:"}</span>
                    <p className="text-ink font-bold text-base pt-0.5">{data.quote_amount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-line">
                    <span className="text-mute">{locale === "ar" ? "المدة التقديرية للتسليم:" : "Estimated Timeline:"}</span>
                    <p className="text-ink font-bold text-base pt-0.5">{data.estimated_timeline || "حسب الاتفاق"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmed Meeting Card for Consultations */}
            {data.status === "approved" && data.request_type === "consultation" && (
              <div className="p-5 rounded-xl border border-secondary/30 bg-secondary/5 space-y-3">
                <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{locale === "ar" ? "تفاصيل جلسة الاستشارة المؤكدة" : "Confirmed Consultation Session"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-surface border border-line">
                    <span className="text-mute">{locale === "ar" ? "الموعد والتوقيت:" : "Date & Time:"}</span>
                    <p className="text-ink font-bold pt-0.5">
                      {data.confirmed_datetime ? new Date(data.confirmed_datetime).toLocaleString("ar-DZ") : data.preferred_date || "قريباً"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-line">
                    <span className="text-mute">{locale === "ar" ? "وسيلة اللقاء:" : "Meeting Mode:"}</span>
                    <p className="text-ink font-bold pt-0.5">{data.meeting_mode || "Google Meet"}</p>
                  </div>
                </div>

                {data.meeting_link && (
                  <div className="pt-2">
                    <a
                      href={data.meeting_link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-secondary/90 transition-all shadow-sm"
                    >
                      <Video className="w-4 h-4" />
                      <span>{locale === "ar" ? "الانضمام لاجتماع Google Meet" : "Join Google Meet"}</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Client & Request Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono">
              <div>
                <span className="text-mute">{locale === "ar" ? "الاسم:" : "Name:"}</span>
                <p className="text-ink font-bold pt-0.5">{data.name}</p>
              </div>
              <div>
                <span className="text-mute">{locale === "ar" ? "البريد (مشفر):" : "Email (Masked):"}</span>
                <p className="text-ink font-bold pt-0.5">{data.masked_email}</p>
              </div>
              <div>
                <span className="text-mute">{locale === "ar" ? "الهاتف:" : "Phone:"}</span>
                <p className="text-ink font-bold pt-0.5">{data.phone || "غير محدد"}</p>
              </div>
              <div>
                <span className="text-mute">{locale === "ar" ? "المؤسسة:" : "Company:"}</span>
                <p className="text-ink font-bold pt-0.5">{data.company || "عميل فردي"}</p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5 text-xs">
              <span className="font-mono text-mute font-semibold">
                {locale === "ar" ? "نص الرسالة والمتطلبات المرسلة:" : "Submitted Scope & Requirements:"}
              </span>
              <div className="p-4 rounded-xl bg-bg border border-line text-ink leading-relaxed whitespace-pre-wrap text-sm">
                {data.message}
              </div>
            </div>

            {/* Client Interactive Actions: Cancel & Message */}
            {data.status !== "cancelled" && data.status !== "completed" && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 rounded-lg bg-err/10 border border-err/30 text-err hover:bg-err/20 text-xs font-semibold transition-colors"
                >
                  {locale === "ar" ? "إلغاء هذا الطلب" : "Cancel Request"}
                </button>

                <div className="text-xs text-mute font-mono">
                  {locale === "ar"
                    ? "هل لديك استفسار أو إضافة؟ يمكنك مراسلة الفريق أدناه."
                    : "Need to add details? You can post a message below."}
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Interactive Message to Admin */}
          {data.status !== "cancelled" && (
            <div className="p-6 rounded-2xl border border-line bg-surface space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                <MessageSquare className="w-4 h-4 text-secondary" />
                <span>{locale === "ar" ? "إرسال رسالة أو تحديث إضافي لفريق AN DEV" : "Send Follow-up Message to Team"}</span>
              </div>
              <form onSubmit={handleSendMessage} className="space-y-3">
                <textarea
                  rows={3}
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder={
                    locale === "ar"
                      ? "أضف أي تفاصيل جديدة، استفسار حول الموعد، أو ملفات ترغب بمشاركتها..."
                      : "Type your follow-up note or question here..."
                  }
                  className="w-full p-3 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:border-secondary"
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="secondary" isLoading={isSendingMessage} disabled={!newMessage.trim()}>
                    <Send className="w-3.5 h-3.5 me-1.5" />
                    <span>{locale === "ar" ? "إرسال التحديث" : "Send Note"}</span>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Card 3: Timeline & Activity History */}
          {data.activity_log && data.activity_log.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-ink font-bold text-sm border-b border-line pb-3">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{locale === "ar" ? "سجل الأحداث ومراحل معالجة الطلب" : "Request Processing Timeline"}</span>
              </div>
              <div className="space-y-4 pt-2">
                {data.activity_log.map((event, idx) => (
                  <div key={event.id || idx} className="flex items-start gap-3 text-xs font-mono">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-ink">{event.title}</span>
                        <span className="text-mute text-[11px]">
                          {new Date(event.created_at).toLocaleString("ar-DZ")}
                        </span>
                      </div>
                      {event.body && (
                        <p className="text-mute font-sans text-xs whitespace-pre-wrap leading-relaxed">
                          {event.body}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-modal">
            <div className="flex items-center gap-2 text-err font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>{locale === "ar" ? "تأكيد إلغاء الطلب" : "Confirm Cancellation"}</span>
            </div>
            <p className="text-mute text-xs leading-relaxed">
              {locale === "ar"
                ? "هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ يرجى كتابة سبب الإلغاء لمساعدتنا في تحسين خدماتنا."
                : "Are you sure you want to cancel this request? Please provide a brief reason."}
            </p>
            <textarea
              rows={3}
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              placeholder={locale === "ar" ? "سبب الإلغاء..." : "Reason for cancellation..."}
              className="w-full p-3 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:border-err"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-mute hover:text-ink"
              >
                {locale === "ar" ? "تراجع" : "Keep Request"}
              </button>
              <Button
                variant="danger"
                isLoading={isCancelling}
                disabled={!cancelReason.trim()}
                onClick={handleCancelInquiry}
              >
                {locale === "ar" ? "تأكيد الإلغاء" : "Confirm Cancel"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

