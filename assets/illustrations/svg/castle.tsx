import Svg, { Circle, Polygon, Rect } from 'react-native-svg';

export function Castle({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#E5342B" />
      <Circle cx="60" cy="46" r="18" fill="#F4B400" />
      <Rect x="110" y="80" width="100" height="100" fill="#1B1B6E" />
      <Rect x="80" y="60" width="30" height="120" fill="#1B1B6E" />
      <Rect x="210" y="60" width="30" height="120" fill="#1B1B6E" />
      <Rect x="80" y="52" width="8" height="12" fill="#1B1B6E" />
      <Rect x="94" y="52" width="8" height="12" fill="#1B1B6E" />
      <Rect x="218" y="52" width="8" height="12" fill="#1B1B6E" />
      <Rect x="232" y="52" width="8" height="12" fill="#1B1B6E" />
      <Rect x="148" y="130" width="24" height="50" fill="#F4B400" />
      <Polygon points="225,60 225,40 250,46 225,52" fill="#F4B400" />
    </Svg>
  );
}
