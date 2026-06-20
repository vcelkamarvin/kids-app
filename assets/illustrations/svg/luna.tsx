import Svg, { Path } from 'react-native-svg';

export function Luna({ size = 96 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.0000} viewBox="0 0 120 120">
      <Path d="M64,14 A46,46 0 1,0 64,106 A80,80 0 1,1 64,14 Z" fill="#F4B400" />
      <Path d="M30 56 q5 5 10 0" stroke="#141414" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Path d="M44 56 q5 5 10 0" stroke="#141414" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Path d="M32 70 q8 7 16 0" stroke="#141414" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}
