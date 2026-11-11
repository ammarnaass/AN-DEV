import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import {
  inquiriesService,
  TrackInquiryResponse,
} from "../services/inquiries.service";
import { getStatusStepIndex } from "../constants/trackingSteps.constants";
import { TrackingSearchBar } from "../tracking/TrackingSearchBar";
import { TrackingHeaderBadge } from "../tracking/TrackingHeaderBadge";
import { TrackingStatusStepper } from "../tracking/TrackingStatusStepper";
import { TrackingDecisionBanner } from "../tracking/TrackingDecisionBanner";
import { TrackingCancellationBanner } from "../tracking/TrackingCancellationBanner";
import { TrackingClientDetails } from "../tracking/TrackingClientDetails";
import { TrackingFollowUpBox } from "../tracking/TrackingFollowUpBox";
import { TrackingTimeline } from "../tracking/TrackingTimeline";
import { TrackingCancelModal } from "../tracking/TrackingCancelModal";

export const InquiryTrackingPage: React.FC = () => {
  const { trackingCode: paramCode } = useParams<{ trackingCode?: string }>();
  const navigate = useNavigate();
  const { locale } = useI18n();

  const [searchInput, setSearchInput] = useState(paramCode || "");
  const [data, setData] = useState<TrackInquiryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const fetchTracking = async (code: string) => {
    if (!code || code.trim().length < 5) return;
    setIsLoading(true);
    setError(null);
    setActionSuccess(null);
    try {
      const res = await inquiriesService.trackInquiry(code);
      setData(res);
    } catch (err: any) {
      setError(
        err.message ||
          (locale === "ar" ? "لم يتم العثور على الطلب" : "Inquiry not found")
      );
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

  const handleCancelInquiry = async (reason: string) => {
    if (!data) return;
    setIsCancelling(true);
    try {
      await inquiriesService.cancelInquiry(data.tracking_code, reason);
      setShowCancelModal(false);
      setActionSuccess(
        locale === "ar"
          ? "تم إلغاء طلبك بنجاح"
          : "Your request was cancelled successfully"
      );
      await fetchTracking(data.tracking_code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSendMessage = async (msg: string) => {
    if (!data) return;
    setIsSendingMessage(true);
    try {
      await inquiriesService.sendMessage(data.tracking_code, msg);
      setActionSuccess(
        locale === "ar"
          ? "تم إرسال رسالتك إلى الإدارة بنجاح"
          : "Message sent to team successfully"
      );
      await fetchTracking(data.tracking_code);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const currentStep = data ? getStatusStepIndex(data.status) : 0;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 text-start animate-fade-in">
      {/* Back to Contact link */}
      <div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-mute hover:text-ink transition-colors"
        >
          {locale === "ar" ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          <span>
            {locale === "ar"
              ? "العودة لصفحة التواصل وتقديم الطلبات"
              : "Back to Contact & Request Form"}
          </span>
        </Link>
      </div>

      {/* Header & Search Bar */}
      <TrackingSearchBar
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        onSubmit={handleSearchSubmit}
        isLoading={isLoading}
        error={error}
        actionSuccess={actionSuccess}
      />

      {/* Live Tracking Information Card */}
      {data && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-6 shadow-sm">
            <TrackingHeaderBadge data={data} />
            <TrackingStatusStepper currentStep={currentStep} />
            <TrackingCancellationBanner data={data} />
            <TrackingDecisionBanner data={data} />
            <TrackingClientDetails
              data={data}
              onOpenCancelModal={() => setShowCancelModal(true)}
            />
          </div>

          {/* Follow-up Note Form */}
          {data.status !== "cancelled" && (
            <TrackingFollowUpBox
              onSendMessage={handleSendMessage}
              isSending={isSendingMessage}
            />
          )}

          {/* Activity Log Timeline */}
          <TrackingTimeline activityLog={data.activity_log} />
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <TrackingCancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelInquiry}
        isCancelling={isCancelling}
      />
    </div>
  );
};
