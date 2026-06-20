import Svg, { Circle, Path, Polygon } from 'react-native-svg';

export function Pip({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.0000} viewBox="0 0 120 120">
      <Polygon points="30,42 24,12 50,32" fill="#E5342B" />
      <Polygon points="90,42 96,12 70,32" fill="#E5342B" />
      <Path d="M30,46 a30,30 0 0 1 60,0 L60,104 Z" fill="#E5342B" />
      <Path d="M44,66 L60,104 L76,66 Z" fill="#F4EFE3" />
      <Circle cx="46" cy="54" r="4.5" fill="#141414" />
      <Circle cx="74" cy="54" r="4.5" fill="#141414" />
      <Circle cx="60" cy="76" r="4.5" fill="#141414" />
    </Svg>
  );
}
