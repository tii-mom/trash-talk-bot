export interface BearTraits {
  frameColor: string;
  screenColor: string;
  ledColor: string;
  eyes: 'normal' | 'happy' | 'sad' | 'angry' | 'hearts' | 'money' | 'hypno' | 'deadpan' | 'sleepy' | 'star' | 'dizzy' | 'wince' | 'confused' | 'shocked' | 'line';
  mouth: 'none' | 'line' | 'smile' | 'frown' | 'open' | 'zigzag' | 'tiny';
  accent: 'none' | 'blush' | 'sweat' | 'tears' | 'zzz' | 'sparkle';
}

export interface BearBotDef {
  id: string;
  name: string;
  personality: string;
  intensity: 'CHILL' | 'STRICT' | 'TOXIC' | 'PSYCHO';
  traits: BearTraits;
  symbol: string;
}
