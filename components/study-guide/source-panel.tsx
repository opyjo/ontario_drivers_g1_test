import { ExternalLink, ShieldCheck } from "lucide-react";
import { getStudyGuideSourceRecord } from "@/lib/content/study-guide-sources";

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function StudyGuideSourcePanel({ chapterId }: Readonly<{ chapterId: string }>) {
  const record = getStudyGuideSourceRecord(chapterId);
  if (!record) return null;

  return (
    <aside className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 text-sm text-slate-700">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
        <div className="space-y-3">
          <div>
            <h2 className="font-semibold text-slate-900">Sources and content review</h2>
            <p className="mt-1 leading-6">
              Reviewed <time dateTime={record.reviewedAt}>{formatReviewDate(record.reviewedAt)}</time>. Next review due <time dateTime={record.reviewBy}>{formatReviewDate(record.reviewBy)}</time>. This independent study material summarizes official sources; Ontario laws and testing procedures can change.
            </p>
          </div>
          <ul className="space-y-2">
            {record.sources.map((source) => (
              <li key={source.url}>
                <a className="inline-flex items-center gap-1 font-medium text-blue-800 underline underline-offset-4 hover:text-blue-950" href={source.url} target="_blank" rel="noreferrer">
                  {source.title}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-600">For legal requirements, rely on current Ontario legislation and official Ontario or DriveTest instructions.</p>
        </div>
      </div>
    </aside>
  );
}
