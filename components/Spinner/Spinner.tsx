export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <span className="w-12 h-12 border-4 border-[var(--gray-light)] border-t-[var(--button)] rounded-full animate-spin" />
    </div>
  );
}
