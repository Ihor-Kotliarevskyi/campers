import { Camper } from '@/types/camper';
import Icon from '@/components/Icon/Icon';
import type { IconId } from '@/components/Icon/Icon';
import styles from './CamperFeatures.module.css';

const FORM_LABELS: Record<string, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel Van',
  integrated: 'Integrated',
  semi_integrated: 'Semi Integrated',
};

interface AmenityTag {
  label: string;
  icon: IconId;
  active: boolean;
}

export default function CamperFeatures({ camper }: { camper: Camper }) {
  const has = (key: string) => camper.amenities.includes(key);

  const amenityTags: AmenityTag[] = [
    { label: 'Automatic', icon: 'automatic', active: camper.transmission === 'automatic' },
    { label: 'Manual',    icon: 'manual',    active: camper.transmission === 'manual' },
    { label: 'AC',        icon: 'ac',        active: has('ac') },
    { label: 'Bathroom',  icon: 'shower',    active: has('bathroom') },
    { label: 'Kitchen',   icon: 'kitchen',   active: has('kitchen') },
    { label: 'TV',        icon: 'tv',        active: has('tv') },
    { label: 'Radio',     icon: 'radio',     active: has('radio') },
    { label: 'Fridge',    icon: 'refrigerator', active: has('refrigerator') },
    { label: 'Microwave', icon: 'microwave', active: has('microwave') },
    { label: 'Gas',       icon: 'flame',     active: has('gas') },
    { label: 'Water',     icon: 'water',     active: has('water') },
    {
      label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
      icon: 'gas-pump',
      active: true,
    },
    {
      label: FORM_LABELS[camper.form] ?? camper.form,
      icon: 'van',
      active: true,
    },
  ];

  const activeTags = amenityTags.filter((t) => t.active);

  const specs = [
    { label: 'Form',        value: FORM_LABELS[camper.form] ?? camper.form },
    { label: 'Length',      value: camper.length },
    { label: 'Width',       value: camper.width },
    { label: 'Height',      value: camper.height },
    { label: 'Tank',        value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Vehicle details</h2>

      <div className={styles.tags}>
        {activeTags.map((t) => (
          <span key={t.label} className={styles.tag}>
            <Icon id={t.icon} size={18} />
            {t.label}
          </span>
        ))}
      </div>

      <hr className={styles.divider} />

      <dl className={styles.specs}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.specRow}>
            <dt className={styles.specLabel}>{label}</dt>
            <dd className={styles.specValue}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
