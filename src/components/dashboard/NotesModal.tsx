
import { FC } from "react";
import { X } from "lucide-react";

interface NotesModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  notes: string;
}

export const NotesModal: FC<NotesModalProps> = ({ open, onClose, title = "Additional Notes", notes }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all">
      <div className="relative bg-white rounded-xl shadow-2xl w-[420px] max-w-[92vw] px-7 py-7">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200/80 rounded-full p-1 transition"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="font-bold text-[1.17rem] mb-4">{title}</div>
        <div className="text-base text-gray-700 whitespace-pre-line">{notes}</div>
      </div>
    </div>
  );
};
