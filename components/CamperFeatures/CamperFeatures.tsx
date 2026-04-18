import { Camper } from '@/types/camper';
import Icon from '@/components/Icon/Icon';
import type { IconId } from '@/components/Icon/Icon';

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
    { label: 'Automatic',  icon: 'automatic',    active: camper.transmission === 'automatic' },
    { label: 'Manual',     icon: 'manual',       active: camper.transmission === 'manual' },
    { label: 'AC',         icon: 'ac',           active: has('ac') },
    { label: 'Bathroom',   icon: 'shower',       active: has('bathroom') },
    { label: 'Kitchen',    icon: 'kitchen',      active: has('kitchen') },
    { label: 'TV',         icon: 'tv',           active: has('tv') },
    { label: 'Radio',      icon: 'radio',        active: has('radio') },
    { label: 'Fridge',     icon: 'refrigerator', active: has('refrigerator') },
    { label: 'Microwave',  icon: 'microwave',    active: has('microwave') },
    { label: 'Gas',        icon: 'flame',        active: has('gas') },
    { label: 'Water',      icon: 'water',        active: has('water') },
    { label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: 'gas-pump', active: true },
    { label: FORM_LABELS[camper.form] ?? camper.form, icon: 'van', active: true },
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
    <div className="max-h-[400px] bg-[var(--inputs)] rounded-[16px] p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold leading-[1.33333] text-[var(--main)] m-0">
          Vehicle details
        </h2>
        <div className="flex flex-wrap gap-2 max-h-[104px] overflow-y-auto">
          {activeTags.map((t) => (
            <span
              key={t.label}
              className="inline-flex items-center gap-2 h-12 px-3 py-2 rounded-full bg-[var(--badges)] mix-blend-multiply text-sm font-medium text-[var(--main)] whitespace-nowrap"
            >
              <Icon id={t.icon} size={20} />
              {t.label}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-0 border-t border-[var(--gray-light)] my-4" />

      <dl className="flex flex-col gap-1 m-0">
        {specs.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center w-full">
            <dt className="text-base font-normal text-[var(--text)]">{label}</dt>
            <dd className="text-base font-medium text-[var(--main)] m-0">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
