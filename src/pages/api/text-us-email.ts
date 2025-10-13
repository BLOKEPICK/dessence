// src/pages/api/text-us-email.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Basic cooldown per IP (best-effort; serverless may reset between invocations).
 * This avoids quick repeated submits. Not bulletproof, but helps.
 */
const ipBuckets = new Map<string, number>();
const COOLDOWN_MS = 30 * 1000;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();
    const { name = "", email = "", phone = "", message = "", website = "", pageUrl = "" } = body || {};

    // Honeypot
    if (website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Cooldown
    const ip = (clientAddress || request.headers.get("x-forwarded-for") || "unknown").toString();
    const now = Date.now();
    const last = ipBuckets.get(ip) || 0;
    if (now - last < COOLDOWN_MS) {
      return new Response(JSON.stringify({ error: "Please wait a bit before sending again." }), { status: 429 });
    }
    ipBuckets.set(ip, now);

    // Validation
    const cleanPhone = String(phone).replace(/[^\d]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return new Response(JSON.stringify({ error: "Please provide a valid mobile phone." }), { status: 422 });
    }
    const cleanMsg = String(message).trim();
    if (cleanMsg.length < 10 || cleanMsg.length > 2000) {
      return new Response(JSON.stringify({ error: "Message must be between 10 and 2000 characters." }), { status: 422 });
    }
    const cleanName = String(name).trim().slice(0, 120);
    const cleanEmail = String(email).trim();
    if (cleanEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
      return new Response(JSON.stringify({ error: "Email address is invalid." }), { status: 422 });
    }

    const TO_EMAIL = process.env.TO_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL;
    if (!process.env.RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
      return new Response(JSON.stringify({ error: "Email server not configured." }), { status: 500 });
    }

    // Compose internal email (to business)
    const subject = "New website text lead";
    const html = `
      <div style="font-family:Inter,system-ui,Arial,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">New website text lead</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(cleanName || "(not provided)")}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(cleanEmail || "(not provided)")}</p>
        <p style="margin:0 0 8px"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p style="margin:12px 0 8px"><strong>Message:</strong><br/>${escapeHtml(cleanMsg).replace(/\n/g, "<br/>")}</p>
        <p style="margin:12px 0 0;color:#667085"><small>From: ${escapeHtml(pageUrl || "(unknown)")}</small></p>
      </div>
    `;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      reply_to: cleanEmail || undefined,
    });

    // Optional auto-ack to visitor (only if they provided an email)
    if (cleanEmail) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: cleanEmail,
        subject: "We received your message — D-Essence Wellness",
        html: `
          <div style="font-family:Inter,system-ui,Arial,sans-serif;line-height:1.6">
            <p>Hi${cleanName ? " " + escapeHtml(cleanName) : ""},</p>
            <p>Thanks for reaching out to <strong>D-Essence Wellness</strong>. We received your message and will get back to you shortly.</p>
            <p style="margin:16px 0 0;color:#667085"><small>If this wasn't you, you can ignore this email.</small></p>
          </div>
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), { status: 500 });
  }
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
