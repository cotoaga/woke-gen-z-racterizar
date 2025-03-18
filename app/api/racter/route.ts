import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input') || '';
  const style = searchParams.get('style') || 'genz-woke';

  if (style === 'genz-woke') {
    const buzzwords = ['stan', 'rizz', 'sus', 'bussin’', 'frfr', 'slay', 'drip', 'yeet', 'vibes', 'synergy', 'praxis', 'disrupt'];
    const contexts = ['aesthetic void', 'TikTok multiverse', 'capitalist dystopia', 'shadow of the algorithm', 'fractured metaverse'];
    const actions = ['spins into chaos', 'drops the mic on', 'ghosts the vibe of', 'shatters the ego', 'whispers rebellion'];

    const base = input.split(' ').map(word => Math.random() < 0.5 ? `${word} ${buzzwords[Math.floor(Math.random() * buzzwords.length)]}` : word).join(' ');
    const rant = `${base} ${actions[Math.floor(Math.random() * actions.length)]} in the ${contexts[Math.floor(Math.random() * contexts.length)]}! ${buzzwords[Math.floor(Math.random() * buzzwords.length)]} ignites the ${contexts[Math.floor(Math.random() * contexts.length)]}! Slay or be slayed, fam!`;
    return new Response(rant);
  } else if (style === 'agile-values') {
    const buzzwords = ['timebox', 'velocity', 'sprint', 'backlog', 'ceremony', 'self-organization', 'Scrum Guide', 'purity', 'kanban', 'retro'];
    const contexts = ['sacred Scrum framework', 'holy sprint cycle', 'temple of self-organization', 'dogma of the Scrum Guide', 'agile vortex'];
    const actions = ['violates the sacred', 'shatters the purity of', 'corrupts the ceremony of', 'defies the timebox of', 'desecrates the flow of'];

    const base = input.split(' ').map(word => Math.random() < 0.5 ? `${word} ${buzzwords[Math.floor(Math.random() * buzzwords.length)]}` : word).join(' ');
    const rant = `HERESY DETECTED! ${base} ${actions[Math.floor(Math.random() * actions.length)]} ${contexts[Math.floor(Math.random() * contexts.length)]}! ${buzzwords[Math.floor(Math.random() * buzzwords.length)]}-ALIGNED PURITY RESTORED OR EXILE! 📜`;
    return new Response(rant);
  }

  return new Response('Oops, vibes are off—try again!');
}
