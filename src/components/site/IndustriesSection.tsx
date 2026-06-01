import { industries } from "@/lib/profile-content";
import { MotionBlock } from "@/components/site/MotionBlock";
import { SectionShell } from "@/components/site/SectionShell";

export function IndustriesSection() {
  return (
    <SectionShell
      eyebrow="Who it supports"
      title="Built for teams that need dependable remote help without friction."
      text="The offer is especially useful where technical support has to coordinate with operations, facilities, vendors, and distributed users."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {industries.map((industry, index) => (
          <MotionBlock key={industry.title} delay={index * 0.03}>
            <article className="rounded border border-slate-200 p-6">
              <h3 className="text-balance text-2xl font-semibold text-slate-950">
                {industry.title}
              </h3>
              <p className="mt-4 text-pretty leading-7 text-slate-600">
                {industry.text}
              </p>
            </article>
          </MotionBlock>
        ))}
      </div>
    </SectionShell>
  );
}
