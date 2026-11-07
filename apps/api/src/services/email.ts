import nodemailer from "nodemailer";

interface InquiryNotification {
  name: string;
  email: string;
  project_type: string;
  budget_range?: string | null;
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
      await transporter.sendMail({
        from: `"AN DEV Platform" <${user}>`,
        to: process.env.ADMIN_NOTIFY_EMAIL || "ammar@andev.dz",
        subject: `[طلب مشروع جديد] ${inquiry.project_type}: ${inquiry.name}`,
        text: `
تم استلام طلب مشروع جديد عبر الموقع:
الاسم: ${inquiry.name}
البريد: ${inquiry.email}
نوع المشروع: ${inquiry.project_type}
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
    console.log(`[Notification] New inquiry from ${inquiry.name} (${inquiry.email}): ${inquiry.project_type}`);
  }
}

