import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import PolicyPlates from "@/components/PolicyPlates";
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

      {/* Blank sheets in the form of the Collections covers, folding like
          the papers on a project document. */}
      <PolicyPlates docs={editorialPolicyDocs} />

    </DocumentPage>
  );
}
