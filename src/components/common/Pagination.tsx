import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const MAX_VISIBLE = 5;

  let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE / 2));
  let end = start + MAX_VISIBLE - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-2 pt-10">
      {/* PREV */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border
          disabled:opacity-40 hover:bg-emerald-50 transition"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* FIRST + ELLIPSIS */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-9 h-9 rounded-full border hover:bg-emerald-50"
          >
            1
          </button>
          {start > 2 && <span className="px-1 text-muted-foreground">…</span>}
        </>
      )}

      {/* PAGE NUMBERS */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-full text-sm transition
            ${
              p === currentPage
                ? 'border border-emerald-600 text-emerald-600 font-semibold'
                : 'border hover:bg-emerald-50'
            }`}
        >
          {p}
        </button>
      ))}

      {/* LAST + ELLIPSIS */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-muted-foreground">…</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 rounded-full border hover:bg-emerald-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* NEXT */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-full border
          disabled:opacity-40 hover:bg-emerald-50 transition"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
