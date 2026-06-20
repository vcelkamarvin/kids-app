import Svg, { Circle, Polygon, Rect } from 'react-native-svg';

export function Forest({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#1F9E4D" />
      <Circle cx="268" cy="44" r="20" fill="#F4B400" />
      <Rect x="52" y="120" width="8" height="30" fill="#1B1B6E" />
      <Polygon points="56,52 30,118 82,118" fill="#1B1B6E" />
      <Rect x="146" y="116" width="8" height="34" fill="#1B1B6E" />
      <Polygon points="150,40 120,114 180,114" fill="#1B1B6E" />
      <Rect x="232" y="124" width="8" height="26" fill="#1B1B6E" />
      <Polygon points="236,64 212,122 260,122" fill="#1B1B6E" />
      <Rect y="146" width="320" height="34" fill="#1B1B6E" />
    </Svg>
  );
}
