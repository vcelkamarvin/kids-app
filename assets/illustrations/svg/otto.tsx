import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

export function Otto({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.0000} viewBox="0 0 120 120">
      <Circle cx="38" cy="32" r="14" fill="#1F9E4D" />
      <Circle cx="82" cy="32" r="14" fill="#1F9E4D" />
      <Circle cx="38" cy="32" r="6" fill="#F4EFE3" />
      <Circle cx="82" cy="32" r="6" fill="#F4EFE3" />
      <Circle cx="60" cy="64" r="40" fill="#1F9E4D" />
      <Ellipse cx="60" cy="78" rx="20" ry="14" fill="#F4EFE3" />
      <Circle cx="46" cy="54" r="4.5" fill="#141414" />
      <Circle cx="74" cy="54" r="4.5" fill="#141414" />
      <Ellipse cx="60" cy="72" rx="5" ry="3.5" fill="#141414" />
      <Path d="M52 82 q8 6 16 0" stroke="#141414" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
