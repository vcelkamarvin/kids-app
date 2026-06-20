import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

export function Bo({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.0000} viewBox="0 0 120 120">
      <Ellipse cx="46" cy="18" rx="7" ry="20" fill="#74C7E8" />
      <Ellipse cx="74" cy="18" rx="7" ry="20" fill="#74C7E8" />
      <Circle cx="60" cy="64" r="44" fill="#F4EFE3" />
      <Circle cx="60" cy="64" r="36" fill="#74C7E8" />
      <Circle cx="48" cy="62" r="4.5" fill="#141414" />
      <Circle cx="72" cy="62" r="4.5" fill="#141414" />
      <Path d="M52 76 q8 6 16 0" stroke="#141414" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Circle cx="40" cy="72" r="4" fill="#E5342B" opacity="0.5" />
      <Circle cx="80" cy="72" r="4" fill="#E5342B" opacity="0.5" />
    </Svg>
  );
}
