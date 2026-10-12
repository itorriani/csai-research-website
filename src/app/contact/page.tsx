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
    // The sheet drops a shade off pure white so the card can be the lighter
    // of the two surfaces rather than relying on its border alone.
    <DocumentPage surface="bg-[#f7f7f5]">
      <ContactForm />
    </DocumentPage>
  );
}
