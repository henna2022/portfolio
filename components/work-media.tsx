import type { Project } from "@/lib/data";
import { assetPath } from "@/lib/asset";

export function firstSentence(text: string) {
  return text.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? text;
}

export function projectLabel(project: Project) {
  return project.kicker.includes(project.year) ? project.kicker : `${project.kicker} · ${project.year}`;
}

export function WorkMedia({ project, thumbnail = false, image: coverImage, selected = false }: {
  project: Project;
  thumbnail?: boolean;
  image?: string;
  selected?: boolean;
}) {
  const image = coverImage ?? (thumbnail ? project.imageTall ?? project.image : project.image);
  const tall = thumbnail && !!project.imageTall;
  return (
    <div className={thumbnail ? `work-thumb${tall ? " work-thumb-phone" : ""}` : `work-cover${selected ? ` work-cover-${project.slug}` : ""}`}>
      {image ? (
        <img src={assetPath(image)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      ) : project.flowImage ? (
        <>
          <img src={assetPath(project.flowImage.light)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover dark:hidden" />
          <img src={assetPath(project.flowImage.dark)} alt="" loading="lazy" decoding="async" className="hidden h-full w-full object-cover dark:block" />
        </>
      ) : null}
    </div>
  );
}
