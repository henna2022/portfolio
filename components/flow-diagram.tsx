"use client";

import { flows, type FlowNode, type Text2 } from "@/lib/flows";
import { ArrowIcon } from "./icons";
import { useI18n } from "./lang-provider";

export function FlowDiagram({ slug }: { slug: string }) {
  const { lang, t } = useI18n();
  const diagram = flows[slug];
  const language = lang === "ko" ? "ko" : "en";
  const text = (value: Text2) => value[language];

  if (!diagram) return null;

  return (
    <section className="mt-12" aria-labelledby={`architecture-${slug}`}>
      <h2 id={`architecture-${slug}`} className="font-display text-2xl font-semibold">
        {t.architecture}
      </h2>
      <p className="mt-1 text-sm text-muted">{t.architectureSub}</p>

      <div className="mt-8 space-y-10">
        {diagram.groups.map((group, groupIndex) => {
          const isFlow = group.mode === "flow";
          // 긴 문구가 있는 묶음은 모바일에서 한 단으로 읽을 공간을 확보한다.
          const needsWideCards = group.nodes.some(
            (node) =>
              text(node.label).length > (language === "ko" ? 14 : 28) ||
              (node.sub ? text(node.sub).length > (language === "ko" ? 24 : 44) : false),
          );
          const List = isFlow ? "ol" : "ul";

          return (
            <div key={group.title.en}>
              <h3 id={`architecture-${slug}-${groupIndex}`} className="text-sm font-semibold text-ink">
                {text(group.title)}
              </h3>
              <List
                aria-labelledby={`architecture-${slug}-${groupIndex}`}
                className={`mt-4 ${
                  isFlow
                    ? "flex flex-col gap-8 md:flex-row"
                    : `grid gap-4 ${needsWideCards ? "grid-cols-1" : "grid-cols-2"} md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]`
                }`}
              >
                {group.nodes.map((node, index) => (
                  <li key={node.label.en} className={`relative min-w-0 ${isFlow ? "md:flex-1" : ""}`}>
                    <NodeCard node={node} language={language} />
                    {isFlow && index < group.nodes.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-muted md:-right-6 md:bottom-auto md:left-auto md:top-1/2 md:translate-x-0 md:-translate-y-1/2"
                      >
                        <ArrowIcon className="h-4 w-4 rotate-90 md:rotate-0" />
                      </span>
                    ) : null}
                  </li>
                ))}
              </List>
              {group.note ? (
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {text(group.note)}
                </p>
              ) : null}
            </div>
          );
        })}
        {diagram.note ? (
          <p className="text-[13px] leading-relaxed text-muted">
            {text(diagram.note)}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function NodeCard({ node, language }: { node: FlowNode; language: keyof Text2 }) {
  return (
    <div
      className={`h-full rounded-2xl p-5 md:p-4 lg:p-5 ${
        node.accent
          ? "bg-blue-accessible text-white dark:bg-lime"
          : "bg-sand/60 text-ink"
      }`}
    >
      <p className="text-[15px] font-medium leading-relaxed">{node.label[language]}</p>
      {node.sub ? (
        <p className={`mt-2 text-[13px] leading-relaxed ${node.accent ? "text-white" : "text-muted"}`}>
          {node.sub[language]}
        </p>
      ) : null}
    </div>
  );
}
