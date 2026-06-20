import Svg, { Circle, Path, Rect } from 'react-native-svg';

export function Meadow({ size = 320 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 0.5625} viewBox="0 0 320 180">
      <Rect width="320" height="180" fill="#F4B400" />
      <Circle cx="256" cy="48" r="22" fill="#F4EFE3" />
      <Path d="M0,140 q80,-30 160,0 t160,0 L320,180 L0,180 Z" fill="#1F9E4D" />
      <Circle cx="70" cy="150" r="5" fill="#E5342B" />
      <Circle cx="120" cy="158" r="5" fill="#74C7E8" />
      <Circle cx="220" cy="152" r="5" fill="#E5342B" />
      <Circle cx="270" cy="160" r="5" fill="#74C7E8" />
    </Svg>
  );
}
