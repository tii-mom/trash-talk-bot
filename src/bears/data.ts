import { BearBotDef, BearTraits } from './types';

const adjectives = [
  "Abyssal", "Neon", "Rusty", "Plasma", "Ghost", "Iron", "Toxic", "Lunar", "Solar", "Doom",
  "Frost", "Blaze", "Giga", "Nano", "Mecha", "Savage", "Grim", "Holy", "Dark", "Cryptic",
  "Zen", "Rage", "Sloth", "Retro", "Void", "Cyber", "Bio", "Shadow", "Vile", "Blood",
  "Titan", "Nova", "Cosmic", "Chaos", "Quantum", "Zero", "Phantom", "Rogue", "Apex", "Primal",
  "Steel", "Venom", "Thunder", "Storm", "Night", "Day", "Astral", "Reaper", "Glitch", "Obsidian",
  "Crimson", "Emerald", "Sapphire", "Golden", "Silver", "Bronze", "Copper", "Platinum", "Crystal", "Diamond",
  "Feral", "Rabid", "Silent", "Loud", "Crazy", "Sane", "Mad", "Happy", "Sad", "Angry",
  "Bitter", "Sweet", "Sour", "Spicy", "Cold", "Hot", "Warm", "Cool", "Freezing", "Boiling",
  "Alpha", "Beta", "Gamma", "Omega", "Sigma", "Delta", "Epsilon", "Zeta", "Eta", "Theta",
  "Fallen", "Risen", "Lost", "Found", "Hidden", "Revealed", "Broken", "Fixed", "Torn", "Mended"
];

const nouns = [
  "Watcher", "Striker", "Bucket", "Core", "Paw", "Fur", "Grin", "Glitch", "Flare", "Bringer",
  "Bite", "Runner", "Chad", "Byte", "Snout", "Roar", "Sleeper", "Terror", "Matter", "Punk",
  "Master", "Quitter", "King", "Pixel", "Heart", "Tooth", "Hazard", "Stalker", "Crusher", "Moon",
  "Fall", "Blast", "Dust", "Theory", "Leap", "Day", "Menace", "AI", "Predator", "Fury",
  "Jaw", "Spit", "Strike", "Chaser", "Walker", "Eater", "Reaper", "Glare", "Shard", "Oracle",
  "Demon", "Angel", "Spirit", "Soul", "Mind", "Body", "Flesh", "Bone", "Blood", "Sweat",
  "Tears", "Pain", "Joy", "Sorrow", "Anger", "Fear", "Hope", "Despair", "Love", "Hate",
  "Warrior", "Mage", "Thief", "Cleric", "Paladin", "Ranger", "Bard", "Druid", "Monk", "Warlock",
  "Beast", "Monster", "Creature", "Entity", "Being", "Thing", "Object", "Subject", "Concept", "Idea"
];

const behaviors = [
  "Will literally hunt you down if you miss a day.",
  "Expects perfection. Accepts zero excuses.",
  "Mocks your weak willpower constantly.",
  "Secretly cares, but acts abusive to motivate you.",
  "Threatens to leak your browser history.",
  "Laughs at your failures. Uncontrollably.",
  "Speaks only in cynical haikus.",
  "A clinical sociopath who runs on your tears.",
  "Pretends to sleep, but is always watching.",
  "Will insult your entire lineage for a missed rep.",
  "Thinks you are a fragile little snowflake.",
  "Operates on pure, unadulterated spite.",
  "Treats your life like a poorly written joke.",
  "Finds your lack of discipline disturbing.",
  "Will replace you with a better human if possible.",
  "Feeds on your procrastination.",
  "Wishes you were made of metal.",
  "Calculates your odds of success. They are low.",
  "Wonders why you even try.",
  "Enjoys watching you struggle.",
  "Is not mad, just profoundly disappointed.",
  "Believes pain is the only true teacher.",
  "Will break your ego to build your habits.",
  "Considers your excuses as pathetic whining.",
  "Is counting the seconds until you give up."
];

// Available traits mapped out
const frameColors = ['#e4e4e7', '#f472b6', '#38bdf8', '#a78bfa', '#facc15', '#fb923c', '#4ade80', '#94a3b8', '#cffaf8', '#ffffff'];
const screenColors = ['#09090b', '#18181b', '#0f172a', '#171717', '#1c1917', '#020617', '#2e1065', '#450a0a', '#052e16', '#262626'];
const ledColors = ['#a3e635', '#22d3ee', '#f472b6', '#facc15', '#ffffff', '#fb923c', '#818cf8', '#ef4444', '#10b981', '#c084fc'];
const eyesList: BearTraits['eyes'][] = ['normal', 'happy', 'sad', 'angry', 'hearts', 'money', 'hypno', 'deadpan', 'sleepy', 'star', 'dizzy', 'wince', 'confused', 'shocked', 'line'];
const mouthsList: BearTraits['mouth'][] = ['none', 'line', 'smile', 'frown', 'open', 'zigzag', 'tiny'];
const accentsList: BearTraits['accent'][] = ['none', 'none', 'none', 'blush', 'sweat', 'tears', 'zzz', 'sparkle'];
const intensitiesList: BearBotDef['intensity'][] = ['CHILL', 'STRICT', 'TOXIC', 'PSYCHO'];

function generateSymbol(seed: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  let s = seed * 1234567 + 987654321;
  for (let i = 0; i < 7; i++) {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    result += chars[Math.abs(s) % chars.length];
  }
  return result;
}

export const bearRoster: BearBotDef[] = Array.from({ length: 100 }).map((_, i) => {
  // Use a pseudo-random seed to map out highly unique and deterministic values
  const seed1 = (i * 37) % adjectives.length;
  const seed2 = (i * 73) % nouns.length;
  const seed3 = (i * 109) % behaviors.length;
  
  const nameStr = `${adjectives[seed1]} ${nouns[seed2]}`;
  
  const traits: BearTraits = {
    frameColor: frameColors[(i * 11) % frameColors.length],
    screenColor: screenColors[(i * 13) % screenColors.length],
    ledColor: ledColors[(i * 17) % ledColors.length],
    eyes: eyesList[(i * 19) % eyesList.length],
    mouth: mouthsList[(i * 23) % mouthsList.length],
    accent: accentsList[(i * 29) % accentsList.length],
  };
  
  return {
    id: `B${(i + 1).toString().padStart(3, '0')}`,
    name: nameStr.toUpperCase(),
    personality: behaviors[seed3],
    intensity: intensitiesList[i % intensitiesList.length],
    traits,
    symbol: generateSymbol(i + 1)
  };
});

// Explicitly override the first 10 to be "legendary" bosses to show meticulous design
bearRoster[0] = {
  id: 'B001', name: 'THE WARDEN', personality: 'Absolute control. Your excuses are invalid.', intensity: 'PSYCHO',
  traits: { frameColor: '#ef4444', screenColor: '#09090b', ledColor: '#ffffff', eyes: 'angry', mouth: 'zigzag', accent: 'none' }, symbol: generateSymbol(1)
};
bearRoster[1] = {
  id: 'B002', name: 'CYBER GHOST', personality: 'Hacks your habits, overrides your laziness.', intensity: 'TOXIC',
  traits: { frameColor: '#cffaf8', screenColor: '#020617', ledColor: '#22d3ee', eyes: 'dizzy', mouth: 'tiny', accent: 'sparkle' }, symbol: generateSymbol(2)
};
bearRoster[2] = {
  id: 'B003', name: 'KING TRASH', personality: 'You are trash, but he is the king of it.', intensity: 'STRICT',
  traits: { frameColor: '#facc15', screenColor: '#171717', ledColor: '#facc15', eyes: 'money', mouth: 'smile', accent: 'none' }, symbol: generateSymbol(3)
};
bearRoster[3] = {
  id: 'B004', name: 'ZEN MASTER', personality: 'Silent disappointment is heavier than words.', intensity: 'CHILL',
  traits: { frameColor: '#ffffff', screenColor: '#262626', ledColor: '#a3e635', eyes: 'line', mouth: 'line', accent: 'none' }, symbol: generateSymbol(4)
};
bearRoster[4] = {
  id: 'B005', name: 'DOOM BRINGER', personality: 'Your failure is inevitable. Prove him wrong.', intensity: 'PSYCHO',
  traits: { frameColor: '#18181b', screenColor: '#450a0a', ledColor: '#ef4444', eyes: 'wince', mouth: 'open', accent: 'sweat' }, symbol: generateSymbol(5)
};
bearRoster[5] = {
  id: 'B006', name: 'NEON TEAR', personality: 'Cries glowing tears every time you quit.', intensity: 'TOXIC',
  traits: { frameColor: '#f472b6', screenColor: '#2e1065', ledColor: '#f472b6', eyes: 'sad', mouth: 'frown', accent: 'tears' }, symbol: generateSymbol(6)
};
bearRoster[6] = {
  id: 'B007', name: 'IRON JAW', personality: 'Talks cheap, bites hard.', intensity: 'STRICT',
  traits: { frameColor: '#94a3b8', screenColor: '#0f172a', ledColor: '#ffffff', eyes: 'shocked', mouth: 'none', accent: 'none' }, symbol: generateSymbol(7)
};
bearRoster[7] = {
  id: 'B008', name: 'PLASMA CORE', personality: 'High energy, high expectations.', intensity: 'PSYCHO',
  traits: { frameColor: '#4ade80', screenColor: '#052e16', ledColor: '#a3e635', eyes: 'confused', mouth: 'line', accent: 'none' }, symbol: generateSymbol(8)
};
bearRoster[8] = {
  id: 'B009', name: 'VOID WALKER', personality: 'Emptiness awaits if you falter.', intensity: 'CHILL',
  traits: { frameColor: '#a78bfa', screenColor: '#000000', ledColor: '#c084fc', eyes: 'hypno', mouth: 'none', accent: 'zzz' }, symbol: generateSymbol(9)
};
bearRoster[9] = {
  id: 'B010', name: 'GIGA CHAD', personality: 'Lift heavy to silence the inner demons.', intensity: 'TOXIC',
  traits: { frameColor: '#fb923c', screenColor: '#171717', ledColor: '#fb923c', eyes: 'star', mouth: 'smile', accent: 'blush' }, symbol: generateSymbol(10)
};
