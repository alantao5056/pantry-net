import { Button } from "@/components/tailgrids/core/button";
import { Flag, X } from "./icons";
import type { Pantry } from "./data";

const ISSUE_OPTIONS = [
  "Incorrect address",
  "Wrong phone number",
  "Schedule outdated",
  "Pantry permanently closed",
  "Missing food types",
  "Other information incorrect",
];

export function FeedbackModal({ pantry }: { pantry: Pantry }) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[480px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="flex items-start justify-between border-b border-orange-200 bg-orange-50 px-7 py-6">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Flag size={18} className="text-orange-600" />
              <span className="text-base font-bold text-orange-900">
                Report an Issue
              </span>
            </div>
            <p className="text-[13px] text-orange-700">{pantry.name}</p>
          </div>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-black/[0.06]"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-7 py-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">
              What&apos;s incorrect? (select all that apply)
            </p>
            <div className="flex flex-col gap-2">
              {ISSUE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-left transition"
                >
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-md border-2 border-gray-300 bg-transparent" />
                  <span className="text-[13px] text-gray-700">{opt}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-gray-700">
              Additional Details
            </label>
            <textarea
              placeholder="Please describe what information needs to be corrected..."
              className="min-h-[80px] w-full resize-y rounded-xl border border-gray-200 bg-pantry-cream px-3.5 py-3 text-[13px] leading-relaxed text-pantry-ink outline-none"
            />
          </div>

          <div className="flex gap-2.5">
            <Button
              size="md"
              appearance="outline"
              className="flex-1 border-gray-200 bg-white text-gray-700"
            >
              Cancel
            </Button>
            <Button
              size="md"
              className="flex-[2] bg-orange-600 text-white hover:bg-orange-700"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
