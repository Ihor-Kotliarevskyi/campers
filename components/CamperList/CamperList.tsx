import { Camper } from '@/types/camper';
import CamperCard from '@/components/CamperCard/CamperCard';

export default function CamperList({ campers }: { campers: Camper[] }) {
  if (campers.length === 0) {
    return <p className="text-base text-text-secondary text-center py-12">No campers found. Try changing the filters.</p>;
  }

  return (
    <ul className="flex flex-col gap-8 list-none m-0 p-0 w-full">
      {campers.map((camper) => (
        <li key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
}
