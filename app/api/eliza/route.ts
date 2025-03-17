import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input') || '';
  const style = searchParams.get('style') || 'genz-woke';

  const patterns: { [key: string]: { pattern?: RegExp; response: (input: string) => string; default?: boolean }[] } = {
    'genz-woke': [
      { pattern: /feel (sad|down|depressed)/i, response: (input) => `Oh no, bestie! 😢 Feeling ${input.match(/feel (sad|down|depressed)/i)?.[1]}? Let’s manifest some joy—try a self-care ritual! ✨` },
      { pattern: /lost/i, response: (input) => `Lost? Babe, we’re plotting a glow-up journey—tell me where you’re at, and I’ll guide your vibes! 🌟` },
      { pattern: /stressed|anxious/i, response: (input) => `Stress or anxiety? Yikes, fam! Let’s yeet that energy with a mindfulness break—breathe with me! 🧘‍♀️` },
      { pattern: /happy|excited/i, response: (input) => `Yaaas, bestie! 😍 Feeling ${input.match(/happy|excited/i)?.[0]}? Let’s amplify that vibe—share the tea! 🎉` },
      { default: true, response: (input) => `Spill more tea, fam—what’s the universe serving you today? I’m here to vibe-check! 💅` }
    ]
  };

  const match = patterns[style]?.find(p => p.pattern?.test(input)) || patterns[style]?.find(p => p.default);
  return new Response(match?.response(input) || 'Oops, bestie—vibes are off—try again!');
}
