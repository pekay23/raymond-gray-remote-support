import { standards } from "@/lib/profile-content";
import { MotionBlock } from "@/components/site/MotionBlock";
import { SectionShell } from "@/components/site/SectionShell";

export function StandardsSection() {
  return (
    <SectionShell
      id="standards"
      tone="mist"
      eyebrow="Service standards"
      title="Remote support should feel calm, precise, and accountable."
      text="The experience is designed for business users who need clarity, not technical fog. Every support moment should reduce uncertainty."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {standards.map((standard, index) => {
          const Icon = standard.icon;

          return (
            <MotionBlock key={standard.title} delay={index * 0.03}>
              <article className="h-full rounded border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="mb-8 size-8 text-cyan-700" />
                <h3 className="text-balance text-2xl font-semibold">{standard.title}</h3>
                <p className="mt-4 text-pretty leading-7 text-slate-600">{standard.text}</p>
              </article>
            </MotionBlock>
          );
        })}
      </div>
    </SectionShell>
  );
}
