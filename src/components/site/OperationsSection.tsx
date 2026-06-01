import { process } from "@/lib/profile-content";
import { MotionBlock } from "@/components/site/MotionBlock";
import { SectionShell } from "@/components/site/SectionShell";

export function OperationsSection() {
  return (
    <SectionShell
      id="operations"
      tone="ink"
      eyebrow="Operating model"
      title="A clean path from request to resolution."
      text="Remote support works best when users know what is happening, technicians know what has already been tried, and leaders can see the pattern behind the tickets."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {process.map((item, index) => (
          <MotionBlock key={item.step} delay={index * 0.03}>
            <article className="h-full rounded border border-white/15 bg-white/5 p-5">
              <p className="tabular-nums text-sm font-semibold text-cyan-200">
                {item.step}
              </p>
              <h3 className="mt-8 text-balance text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-pretty text-sm leading-6 text-slate-300">
                {item.text}
              </p>
            </article>
          </MotionBlock>
        ))}
      </div>
    </SectionShell>
  );
}
