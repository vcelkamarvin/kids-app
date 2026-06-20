import Svg, { Circle, Ellipse, Rect } from 'react-native-svg';

export function Space({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#1B1B6E" />
      <Circle cx="108" cy="92" r="34" fill="#74C7E8" />
      <Ellipse cx="108" cy="92" rx="54" ry="14" fill="none" stroke="#F4B400" strokeWidth="4" />
      <Circle cx="60" cy="40" r="3" fill="#F4B400" />
      <Circle cx="200" cy="36" r="3" fill="#F4EFE3" />
      <Circle cx="250" cy="70" r="3" fill="#F4B400" />
      <Circle cx="280" cy="120" r="3" fill="#F4EFE3" />
      <Circle cx="170" cy="140" r="3" fill="#F4B400" />
      <Circle cx="30" cy="120" r="3" fill="#F4EFE3" />
    </Svg>
  );
}
