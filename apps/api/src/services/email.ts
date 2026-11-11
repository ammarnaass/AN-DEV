import nodemailer from "nodemailer";

interface InquiryNotification {
  name: string;
  email: string;
  phone?: string | null;
  request_type?: string;
  project_type?: string;
  budget_range?: string | null;
  tracking_code?: string;
  message: string;
}

export async function sendInquiryNotification(inquiry: InquiryNotification) {
  // Check if SMTP is configured
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass }
    });

    try {
      const typeLabel = inquiry.request_type === "consultation" ? "طلب استشارة تقنية" : "طلب مشروع جديد";
      await transporter.sendMail({
        from: `"AN DEV Platform" <${user}>`,
        to: process.env.ADMIN_NOTIFY_EMAIL || "ammar@andev.dz",
        subject: `[${typeLabel}] ${inquiry.tracking_code ? `[${inquiry.tracking_code}] ` : ""}${inquiry.name}`,
        text: `
تم استلام ${typeLabel} عبر الموقع:
كود التتبع: ${inquiry.tracking_code || "غير محدد"}
الاسم: ${inquiry.name}
البريد: ${inquiry.email}
الهاتف: ${inquiry.phone || "غير محدد"}
نوع الطلب: ${inquiry.request_type || "project"} (${inquiry.project_type || "عام"})
الميزانية التقديرية: ${inquiry.budget_range || "غير محددة"}

تفاصيل الرسالة:
${inquiry.message}
        `
      });
    } catch (err) {
      console.error("Failed to send inquiry email notification:", err);
    }
  } else {
    // In dev / test environment, log notification
    console.log(`[Notification] New ${inquiry.request_type || "inquiry"} [${inquiry.tracking_code || "no-code"}] from ${inquiry.name} (${inquiry.email})`);
  }
}

