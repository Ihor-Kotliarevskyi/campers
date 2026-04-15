export type IconId =
  | 'map'
  | 'star-filled'
  | 'star-empty'
  | 'close'
  | 'gas-pump'
  | 'van'
  | 'automatic'
  | 'manual'
  | 'ac'
  | 'shower'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'flame'
  | 'water';

interface IconProps {
  id: IconId;
  size?: number;
  className?: string;
  color?: string;
}

export default function Icon({ id, size = 18, className, color = 'currentColor' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      color={color}
      className={className}
      style={{ flexShrink: 0 }}
    >
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
}
