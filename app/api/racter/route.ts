import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input') || '';
  const style = searchParams.get('style') || 'genz-woke';

  const buzzwords = ['synergy', 'vibes', 'late-stage capitalism', 'slay', 'praxis', 'disrupt', 'entropy', 'cyber-revolution'];
  const base = input.split(' ').map(word => Math.random() < 0.5 ? `${word} ${buzzwords[Math.floor(Math.random() * buzzwords.length)]}` : word).join(' ');
  const contexts = ['void of digital praxis', 'shadow of the algorithm', 'fractured metaverse', 'echoes of late-stage capitalism'];
  const actions = ['dances wickedly', 'shatters the ego', 'whispers rebellion', 'collapses into chaos'];

  const rants = [
    `${base} ${actions[Math.floor(Math.random() * actions.length)]} in the ${contexts[Math.floor(Math.random() * contexts.length)]}.`,
    `Amid ${base}, a ${buzzwords[Math.floor(Math.random() * buzzwords.length)]}-fueled uprising consumes the ${contexts[Math.floor(Math.random() * contexts.length)]}!`,
    `The ${base} fractures, unleashing ${buzzwords[Math.floor(Math.random() * buzzwords.length)]} into the ${contexts[Math.floor(Math.random() * contexts.length)]}—slay, comrade!`
  ];

  return new Response(rants[Math.floor(Math.random() * rants.length)]);
}
