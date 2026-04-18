import Spinner from '@/components/Spinner/Spinner';

export default function Loading() {
  return (
    <div className="flex gap-[65px] max-w-[1440px] mx-auto p-16 items-start">
      <div className="w-[360px] shrink-0" />
      <div className="flex-1 min-w-0">
        <Spinner />
      </div>
    </div>
  );
}
