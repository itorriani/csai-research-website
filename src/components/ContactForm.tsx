"use client";

import { useState } from "react";
import BrainMark from "@/components/BrainMark";
import { contactEmail } from "@/lib/content";

// Boxed fields, ruled in the document's own black at the thinnest weight the
// browser will draw. Grey would read as a disabled UI control; the sheets
// elsewhere on the site rule in full black, and these match them.
const FIELD_CLASS =
  "doc-ink mt-1 w-full border border-black bg-transparent px-2 py-1 text-[15px] leading-[1.4] text-black outline-none transition-shadow duration-300 focus:shadow-[0_0_0_1px_#000]";

// The labels are set in the document's own Venetian at its own weight — the
// same type as the running prose everywhere else on the site, not a separate
// sans-serif UI face.
const LABEL_CLASS = "doc-ink block text-[15px] leading-[1.45] text-black";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // No backend sits behind this sheet, so the form hands the message to the
  // sender's own mail client rather than claiming to have sent it.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Contact — ${name}`;
    const body = `${message}\n\n— ${name} <${email}>`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    // A business card: 3.5 × 2 inches, held by aspect ratio from sm up. On
    // phones the ratio is dropped and the card grows to its content —
    // a card that keeps its proportions at 320px wide is unusable, and a
    // legible form beats a faithful one.
    <div className="mx-auto mt-10 w-full max-w-[680px] border border-black/15 bg-white p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.18)] sm:aspect-[3.5/2] sm:p-8">
      <form onSubmit={onSubmit} className="flex h-full flex-col">
        {/* The house mark in the corner, as it would be printed on the
            card. The heavy fill solidifies the nodes so it holds its weight
            at this size against the boxed fields below it. */}
        <BrainMark variant="heavy" className="h-6 w-auto shrink-0 self-start" />

        <div className="mt-4">
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div className="mt-3">
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        {/* The message takes whatever height the card has left, so the card
            keeps its proportions instead of the textarea dictating them. */}
        <div className="mt-3 flex min-h-0 flex-1 flex-col">
          <label htmlFor="contact-message" className={LABEL_CLASS}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${FIELD_CLASS} min-h-[2.75rem] flex-1 resize-none`}
          />
        </div>

        {/* The inverse of the read-more strip on the research index — same
            tracked caps, black on the white card. */}
        <button
          type="submit"
          className="font-sans mt-8 flex h-10 w-full shrink-0 items-center justify-center bg-black pl-[0.18em] text-[11px] font-bold uppercase tracking-[0.18em] text-white antialiased transition-colors duration-300 hover:bg-black/80"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
