interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoadMoreButton({ onClick, loading }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="block mx-auto mt-12 px-12 py-4 bg-transparent text-[var(--main)] border border-[var(--main)] rounded-full text-base font-medium cursor-pointer transition-opacity [&:hover:not(:disabled)]:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Loading...' : 'Load more'}
    </button>
  );
}
