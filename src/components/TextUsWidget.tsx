import React, { useEffect, useRef, useState } from "react";

/**
 * TextUsWidget — versión estática (FormSubmit AJAX)
 * - Botón flotante negro (bottom-right)
 * - Teaser oscuro con imagen /Cover.webp
 * - Panel dark con inputs subrayados
 * - Envía a https://formsubmit.co/ajax/Georgevaldezr@gmail.com
 * - Honeypot, _replyto sync, _captcha=false, _template=table, _subject
 */

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/Georgevaldezr@gmail.com";

export default function TextUsWidget() {
  const [open, setOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // Teaser (aparece 1 vez cada 7 días por ~8s)
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
    try { localStorage.setItem("textus_teaser_dismissed_at", String(Date.now())); } catch {}
    setShowTeaser(false);
  }

  // Cerrar por click afuera
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(t) &&
        openerRef.current && !openerRef.current.contains(t)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Cerrar por ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // --- Envío con FormSubmit ---
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setOkMsg(null);
    setErrMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Validaciones mínimas: phone (10 dígitos), message (>=10)
    const rawPhone = String(fd.get("Phone") || "");
    const phoneDigits = rawPhone.replace(/[^\d]/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      setSending(false);
      setErrMsg("Please provide a valid mobile phone.");
      return;
    }
    const msg = String(fd.get("Message") || "").trim();
    if (msg.length < 10) {
      setSending(false);
      setErrMsg("Message must be at least 10 characters.");
      return;
    }

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Request failed");

      form.reset();
      setOkMsg("Thanks! We received your message.");
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
      {/* Teaser */}
      {!open && showTeaser && (
        <div className="absolute bottom-16 right-0 max-w-[270px] translate-y-1">
          <div className="relative rounded-2xl bg-neutral-950 text-white px-3 py-3 text-sm shadow-xl ring-1 ring-white/10">
            <div className="flex items-start gap-2">
              <img
                src="/Cover.webp"
                alt=""
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10"
                loading="lazy"
                decoding="async"
                width={28}
                height={28}
              />
              <p className="leading-snug">
                Hi there, have a question? <span className="font-medium">Text us here.</span>
              </p>
            </div>
            <div className="absolute -bottom-1 right-6 h-3 w-3 rotate-45 bg-neutral-950 ring-1 ring-white/10" aria-hidden />
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

      {/* Botón abrir */}
      <button
        ref={openerRef}
        onClick={() => { setOpen(true); dismissTeaser(); }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="textus-panel"
        className={"group flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white shadow-lg shadow-black/30 ring-1 ring-white/10 transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 " + (open ? "hidden" : "")}
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
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <svg className="h-5 w-5 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2 5a3 3 0 013-3h14a3 3 0 013 3v10a3 3 0 01-3 3H8.414l-3.707 3.707A1 1 0 013 21v-3.586A3 3 0 012 14V5z" />
              </svg>
              <p className="text-sm font-semibold">Send us a message</p>
            </div>

            <div className="p-4">
              <p className="mb-3 rounded-2xl bg-white/5 ring-1 ring-white/10 px-3 py-2 text-sm text-white/90">
                Enter your info and we’ll email our team. We reply quickly during business hours.
              </p>

              <form onSubmit={handleSubmit} className="rounded-2xl">
                {/* FormSubmit hidden settings */}
                <input type="hidden" name="_subject" value="New website text lead — D-Essence Wellness" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                {/* honeypot */}
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {/* page context */}
                <input type="hidden" name="Page URL" value={typeof window !== "undefined" ? window.location.href : ""} />
                {/* replyto sync (se llena si escriben email) */}
                <input type="hidden" id="replyto-hidden-widget" name="_replyto" value="" />

                <UnderlineInput label="Name" name="Name" type="text" required={false} />
                <UnderlineInput label="Email (optional — for confirmation)" name="Email" type="email" required={false} onChangeSyncReplyTo />
                <UnderlineInput label="Mobile Phone" name="Phone" type="tel" inputMode="tel" required />
                <UnderlineTextarea label="Message" name="Message" required />

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

          {/* Botón cerrar flotante */}
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
  onChangeSyncReplyTo,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChangeSyncReplyTo?: boolean;
}) {
  const [val, setVal] = useState("");
  useEffect(() => {
    if (onChangeSyncReplyTo) {
      const hidden = document.getElementById("replyto-hidden-widget") as HTMLInputElement | null;
      if (hidden) hidden.value = val;
    }
  }, [val, onChangeSyncReplyTo]);

  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/80">{label}</span>
      <input
        className="mt-1 block w-full border-0 border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white placeholder:text-neutral-400 outline-none focus:border-white/40"
        type={type}
        name={name}
        inputMode={inputMode}
        required={required}
        value={val}
        onChange={(e) => setVal(e.target.value)}
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
  const [val, setVal] = useState("");
  return (
    <label className="block">
      <span className="block text-xs font-medium text-white/80">{label}</span>
      <textarea
        rows={3}
        name={name}
        required={required}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="mt-1 block w-full resize-y border-0 border-b border-white/20 bg-transparent px-0 py-2 text-sm text-white placeholder:text-neutral-400 outline-none focus:border-white/40"
      />
    </label>
  );
}
