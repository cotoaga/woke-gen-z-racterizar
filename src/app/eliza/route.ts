import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('ELIZA API called');
  const { searchParams } = new URL(request.url);
  console.log('Search params parsed:', searchParams.toString());
  const input = searchParams.get('input') || '';
  const style = searchParams.get('style') || 'genz-woke';
  console.log('Input:', input, 'Style:', style);

  const patterns: { [key: string]: { pattern?: RegExp; response: string; default?: boolean }[] } = {
    'genz-woke': [
      { pattern: /feel/i, response: 'Oof, bestie, let’s unpack that feel—how’s it vibing with your aura?' },
      { pattern: /lost/i, response: 'Lost? Babe, we’re manifesting a glow-up—where’s your energy at?' },
      { pattern: /stressed/i, response: 'Stress is giving toxic energy—let’s yeet that vibe, fam!' },
      { default: true, response: 'Spill more tea, fam—what’s the universe serving you today?' }
    ]
  };
  console.log('Patterns loaded for style:', style);

  const match = patterns[style]?.find(p => p.pattern?.test(input)) || patterns[style]?.find(p => p.default);
  console.log('Match found:', match);

  return new Response(match?.response || 'Oops, bestie—vibes are off, try again!');
}
