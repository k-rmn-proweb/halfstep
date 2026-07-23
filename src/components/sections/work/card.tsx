import { workContent } from "@/content/work";

import { FragmentPalette } from "./fragment-palette";
import { FragmentPricing } from "./fragment-pricing";
import { FragmentStates } from "./fragment-states";
import { FragmentTokens } from "./fragment-tokens";
import { Frame } from "./frame";

type Case = (typeof workContent.cases)[number];

/**
 * Each case is represented by the fragment it maps to. A server component: only
 * the fragments themselves are interactive, and each carries its own boundary.
 */
const fragments = {
  palette: FragmentPalette,
  states: FragmentStates,
  tokens: FragmentTokens,
  pricing: FragmentPricing,
} as const;

export function WorkCard({ project }: { project: Case }) {
  const Fragment = fragments[project.fragment];

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-edge bg-surface p-6">
      <div>
        <p className="font-mono text-label text-ink-muted">{project.meta}</p>
        <h3 className="mt-2 font-display text-h3">{project.name}</h3>
        <p className="mt-2 text-small text-ink-muted">{project.summary}</p>
      </div>

      <Frame caption={`${project.id}.tsx`} className="mt-auto">
        <Fragment />
      </Frame>
    </article>
  );
}
