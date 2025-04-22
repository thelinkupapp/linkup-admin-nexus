
import { FC, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface NotesModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  notes: string;
}

export const NotesModal: FC<NotesModalProps> = ({ open, onClose, title = "Additional Notes", notes }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
      onMouseDown={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      style={{ animation: "fadeIn 0.17s" }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-7 relative flex flex-col items-center animate-in fade-in-0 zoom-in-95 outline-none">
        <button
          className="absolute top-3 right-3 text-neutral-400 hover:bg-neutral-200 rounded-full p-2 transition"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="font-bold text-lg mb-3 text-center">{title}</div>
        <div className="text-base text-gray-700 whitespace-pre-line text-center">{notes}</div>
      </div>
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
