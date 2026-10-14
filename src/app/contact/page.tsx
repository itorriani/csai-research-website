import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import DocumentPage from "@/components/DocumentPage";

export const metadata: Metadata = {
  title: "Contact Us | CSAI Research",
  description:
    "Write to CSAI Research at Cal Poly San Luis Obispo about submissions, the editorial board, or joining the division.",
};

export default function ContactPage() {
  return (
    // The sheet is pure white, as every document sheet is; the card reads
    // off its own border and shadow rather than off a tone difference.
    <DocumentPage>
      <ContactForm />
    </DocumentPage>
  );
}
