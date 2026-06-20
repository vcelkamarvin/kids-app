import Svg, { Circle, Ellipse, Polygon } from 'react-native-svg';

export function Fern({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.0000} viewBox="0 0 120 120">
      <Polygon points="32,28 40,6 50,30" fill="#1F9E4D" />
      <Polygon points="88,28 80,6 70,30" fill="#1F9E4D" />
      <Ellipse cx="60" cy="66" rx="40" ry="44" fill="#1F9E4D" />
      <Ellipse cx="60" cy="86" rx="22" ry="22" fill="#F4EFE3" />
      <Circle cx="44" cy="56" r="16" fill="#F4EFE3" />
      <Circle cx="76" cy="56" r="16" fill="#F4EFE3" />
      <Circle cx="44" cy="56" r="16" fill="none" stroke="#1B1B6E" strokeWidth="4" />
      <Circle cx="76" cy="56" r="16" fill="none" stroke="#1B1B6E" strokeWidth="4" />
      <Circle cx="44" cy="56" r="5" fill="#141414" />
      <Circle cx="76" cy="56" r="5" fill="#141414" />
      <Polygon points="60,64 54,74 66,74" fill="#F4B400" />
      <Ellipse cx="48" cy="108" rx="7" ry="4" fill="#F4B400" />
      <Ellipse cx="72" cy="108" rx="7" ry="4" fill="#F4B400" />
    </Svg>
  );
}
