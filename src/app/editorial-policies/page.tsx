import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { editorialPolicy, editorialPolicyDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editorial Policies | CSAI Research",
  description:
    "CSAI Research follows NeurIPS and IEEE guidelines: IEEE for paper structure, the NeurIPS Paper Checklist for ethics, credibility and significance.",
};

export default function EditorialPoliciesPage() {
  return (
    <DocumentPage
      title="Editorial Policies"
      meta={<>CSAI Research Division &middot; NeurIPS and IEEE standards</>}
    >
      {editorialPolicy.map((para, i) => (
        <p
          key={para.slice(0, 32)}
          className={`doc-ink doc-justify text-[17px] leading-[1.45] ${
            i === 0 ? "mt-12" : "mt-7"
          }`}
        >
          {para}
        </p>
      ))}

      <h2 className="doc-heading mt-14 text-[20px] leading-[1.3] text-black">
        Official Documents
      </h2>

      <p className="doc-ink doc-justify mt-5 text-[17px] leading-[1.45]">
        Please refer to the links below to see the official documents.
      </p>

      {/* The same strip the papers use to leave a plate, one per document. */}
      <ul className="mt-8 space-y-5">
        {editorialPolicyDocs.map((doc) => (
          <li key={doc.href}>
            <p className="antialiased text-[14px] leading-[1.5] text-black/65">
              {doc.issuer}
            </p>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener"
              className="font-sans mt-2 flex h-12 w-full items-center justify-center bg-black pl-[0.18em] text-center text-[12px] font-bold uppercase tracking-[0.18em] text-white antialiased transition-colors duration-300 hover:bg-black/80"
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
    </DocumentPage>
  );
}
