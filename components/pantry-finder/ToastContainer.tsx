import { AlertCircle, Check, X } from "./icons";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "error";
};

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => {
        const error = t.type === "error";
        return (
          <div
            key={t.id}
            className={`flex min-w-[280px] max-w-[360px] items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium shadow-[0_4px_16px_rgba(0,0,0,0.1)] ${
              error
                ? "border-red-300 bg-red-50 text-red-900"
                : "border-green-300 bg-green-50 text-green-900"
            }`}
          >
            {error ? <AlertCircle size={16} /> : <Check size={16} />}
            <span className="flex-1">{t.message}</span>
            <button type="button" className="opacity-60">
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
