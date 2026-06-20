import { getIllustration } from '../assets/illustrations/registry';
import type { CharacterId } from '../data/worlds';

// Fixed-size character slot. Swap real art: drop ./svg/<id>.tsx — no layout change.
export function Character({
  id,
  size = 120,
}: {
  id: CharacterId;
  size?: number;
}) {
  const Illus = getIllustration(id);
  return <Illus width={size} height={size} />;
}
