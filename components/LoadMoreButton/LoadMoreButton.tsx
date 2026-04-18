interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onClick}
        disabled={loading}
        className="flex items-center justify-center w-auto h-14 px-8 py-4 bg-transparent border border-[var(--gray-light)] rounded-[200px] text-base font-medium leading-normal tracking-[-0.01em] text-[var(--main)] cursor-pointer outline-none transition-opacity hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
}
