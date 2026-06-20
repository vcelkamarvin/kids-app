import Svg, { Circle, Rect } from 'react-native-svg';

export function Cozy({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#F4EFE3" />
      <Rect x="30" y="24" width="120" height="92" rx="6" fill="#1B1B6E" />
      <Rect x="40" y="34" width="46" height="34" fill="#74C7E8" />
      <Rect x="94" y="34" width="46" height="34" fill="#74C7E8" />
      <Rect x="40" y="76" width="46" height="32" fill="#74C7E8" />
      <Rect x="94" y="76" width="46" height="32" fill="#74C7E8" />
      <Circle cx="118" cy="50" r="12" fill="#F4B400" />
      <Rect x="0" y="150" width="320" height="30" fill="#1F9E4D" />
      <Rect x="200" y="120" width="110" height="40" rx="8" fill="#1F9E4D" />
      <Rect x="214" y="108" width="40" height="22" rx="6" fill="#F4EFE3" />
    </Svg>
  );
}
