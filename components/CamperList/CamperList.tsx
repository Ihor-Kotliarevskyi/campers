import { Camper } from '@/types/camper';
import CamperCard from '@/components/CamperCard/CamperCard';
import styles from './CamperList.module.css';

export default function CamperList({ campers }: { campers: Camper[] }) {
  if (campers.length === 0) {
    return <p className={styles.empty}>No campers found. Try changing the filters.</p>;
  }

  return (
    <ul className={styles.list}>
      {campers.map((camper) => (
        <li key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
}
