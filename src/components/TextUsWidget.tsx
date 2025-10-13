import React, { useEffect, useRef, useState } from "react";

/**
 * TextUsWidget — D-Essence (dark theme)
 * - Floating black button bottom-right
 * - Dark teaser bubble (shows once every 7 days, ~8s) "Hi there, have a question? Text us here."
 * - Panel (dark) with underline inputs
 * - Sends to /api/text-us-email (Resend)
 * - Auto-ack only if visitor provides Email
 *
 * Env on server:
 *  - RESEND_API_KEY
 *  - TO_EMAIL=Georgevaldezr@gmail.com
 *  - FROM_EMAIL=website@d-essencewellness.com   (o el que definas)
 */

export default function TextUsWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // Teaser: show once per 7 days for ~8s when closed
  useEffect(() => {
    try {
      const ts = localStorage.getItem("textus_teaser_dismissed_at");
      const weekMs = 7 * 24 * 60 * 60 * 1000;
      if (!ts || Date.now() - Number(ts) > weekMs) {
        setShowTeaser(true);
        const t = setTimeout(() => setShowTeaser(false), 8000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  function dismissTeaser() {
    try {
      localStorage.setItem("textus_teaser_dismissed_at", String(Date.now()));
    } catch {}
    setShowTeaser(false);
  }

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        openerRef.current &&
        !openerRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setOkMsg(null);
    setErrMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      pageUrl: window?.location?.href || "",
    };

    try {
      const res = await fetch("/api/text-us-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Request failed: ${res.status}`);

      setOkMsg("Thanks! We received your message.");
      (e.target as HTMLFormElement).reset();

      // Close after a short pause
      setTimeout(() => {
        setOpen(false);
        setOkMsg(null);
      }, 1200);
    } catch (err: any) {
      setErrMsg(err?.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {/* Teaser bubble (only when closed) */}
      {!open && showTeaser && (
        <div className="absolute bottom-16 right-0 max-w-[260px] translate-y-1">
          <div className="relative rounded-2xl bg-neutral-950 text-white px-3 py-3 text-sm shadow-xl ring-1 ring-white/10">
            <div className="flex items-start gap-2">
              {/* Replace avatar if you want */}
              <div className="h-7 w-7 rounded-full bg-white/10 grid place-items-center shrink-0">
                <svg className="h-4 w-4 opacity-90" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9a9 9 0 1118 0H3z" />
                </svg>
              </div>
              <p className="leading-snug">
                Hi there, have a question? <span className="font-medium">Text us here.</span>
              </p>
            </div>
            {/* Tail */}
            <div
              className="absolute -bottom-1 right-6 h-3 w-3 rotate-45 bg-neutral-950 ring-1 ring-white/10"
              aria-hidden
            />
            {/* Dismiss */}
            <button
              onClick={dismissTeaser}
              aria-label="Dismiss"
              className="absolute right-1.5 top-1.5 rounded-full p-1 text-white/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.225 4.811l12.964 12.964-1.414 1.414L4.811 6.225l1.414-1.414z" />
                <path d="M19.189 6.225L6.225 19.189l-1.414-1.414L17.775 4.811l1.414 1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Open button (hidden while panel is open) */}
      <button
        ref={openerRef}
        onClick={() => {
          setOpen(true);
          dismissTeaser();
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="textus-panel"
        className={
          "group flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 " +
          (open ? "hidden" : "")
        }
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v10a3 3 0 01-3 3H8.414l-3.707 3.707A1 1 0 013 21v-3.586A3 3 0 012 14V5z" />
        </svg>
        <span className="font-medium">Text us</span>
      </button>

      {open && (
        <>
          {/* Panel */}
          <div
            id="textus-panel"
            role="dialog"
            aria-modal="true"
            ref={panelRef}
            className="fixed bottom-20 right-4 w-[340px] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-neutral-950/95"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <svg className="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v10a3 3 0 01-3 3H8.414l-3.707 3.707A1 1 0 013 21v-3.586A3 3 0 012 14V5z" />
              </svg>
              <p className="text-sm font-semibold">Send us a message</p>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="mb-3 rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm text-white/90">
                Enter your info and we’ll email our team. We reply quickly during business hours.
              </p>

              <form onSubmit={handleSubmit} className="rounded-2xl">
                {/* Honeypot (bots only) */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off"
                  className="hidden" aria-hidden="true" />

                <UnderlineInput label="Name" name="name" type="text" required={false} />
                <UnderlineInput label="Email (optional — for confirmation)" name="email" type="email" required={false} />
                <UnderlineInput label="Mobile Phone" name="phone" type="tel" inputMode="tel" required />
                <UnderlineTextarea label="Message" name="message" required />

                {/* Consent */}
                <p className="mt-3 text-[11px] leading-snug text-neutral-400">
                  By submitting, you authorize D-Essence Wellness to contact you. Message/data rates may apply.
                  Consent isn’t a condition of purchase. <a className="underline" href="/terms-and-conditions">See terms</a>.
                </p>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90 disabled:opacity-60"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send"}
                  </button>
                </div>

                {okMsg && <p className="mt-3 text-xs text-emerald-400">{okMsg}</p>}
                {errMsg && <p className="mt-3 text-xs text-red-400">{errMsg}</p>}
              </form>
            </div>
          </div>

          {/* Floating close FAB (bottom-right) */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="fixed bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white shadow-xl ring-1 ring-white/10 transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.225 4.811l12.964 12.964-1.414 1.414L4.811 6.225l1.414-1.414z" />
              <path d="M19.189 6.225L6.225 19.189l-1.414-1.414L17.775 4.811l1.414 1.414z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

function UnderlineInput({
  label,
  name,
  type,
  required,
  inputMode,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/80">{label}</span>
      <input
        className="mt-1 block w-full border-0 border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white placeholder:text-neutral-400 outline-none focus:border-white/40"
        type={type}
        name={name}
        inputMode={inputMode}
        required={required}
        placeholder=""
        autoComplete="off"
      />
    </label>
  );
}

function UnderlineTextarea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/80">{label}</span>
      <textarea
        rows={3}
        name={name}
        required={required}
        className="mt-1 block w-full resize-y border-0 border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white placeholder:text-neutral-400 outline-none focus:border-white/40"
      />
    </label>
  );
}
