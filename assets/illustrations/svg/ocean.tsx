import Svg, { Circle, Path, Rect } from 'react-native-svg';

export function Ocean({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#74C7E8" />
      <Circle cx="252" cy="50" r="24" fill="#F4B400" />
      <Path d="M0,112 q40,-16 80,0 t80,0 t80,0 t80,0 L320,180 L0,180 Z" fill="#1B1B6E" />
      <Path d="M0,130 q40,-12 80,0 t80,0 t80,0 t80,0 L320,180 L0,180 Z" fill="#2E2BA6" />
    </Svg>
  );
}
