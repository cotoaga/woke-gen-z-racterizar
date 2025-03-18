import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input') || '';
  const style = searchParams.get('style') || 'genz-woke';

  const patterns: { [key: string]: { pattern?: RegExp; response: (input: string) => string; default?: boolean }[] } = {
    'genz-woke': [
      { pattern: /feel (sad|down|depressed)/i, response: (input) => `Oh no, bestie! 😢 Feeling ${input.match(/feel (sad|down|depressed)/i)?.[1]}? Let’s manifest some joy—try a self-care ritual! ✨` },
      { pattern: /tired|exhausted|burnt out/i, response: () => `Bestie, you’re serving burnout realness—nap time or tea time? ☕` },
      { pattern: /work.*stress/i, response: () => `Corporate vibes stressing you? Let’s yeet that 9-5 energy! 💅` },
      { pattern: /love|bf|gf|partner/i, response: () => `Spill the tea, boo! Is your love life serving main character energy? 💖` },
      { pattern: /lost/i, response: () => `Lost? Babe, we’re plotting a glow-up journey—tell me where you’re at, and I’ll guide your vibes! 🌟` },
      { pattern: /stressed|anxious/i, response: () => `Stress or anxiety? Yikes, fam! Let’s yeet that energy with a mindfulness break—breathe with me! 🧘‍♀️` },
      { pattern: /happy|excited/i, response: () => `Yaaas, bestie! 😍 Feeling ${input.match(/happy|excited/i)?.[0]}? Let’s amplify that vibe—share the tea! 🎉` },
      { pattern: /friend|bff|fam/i, response: () => `Your squad giving drama? Tell me who’s sus—I’ll vibe-check ‘em! 👀` },
      // Add more patterns here (aim for 50-100 total)
      { default: true, response: () => `No cap, I’m vibing with you—keep spilling, fam! 🌟` }
    ],
    'agile-values': [
      { pattern: /feel (sad|down|depressed)/i, response: (input) => `Oh, sweet soul, I sense ${input.match(/feel (sad|down|depressed)/i)?.[1]} energy! 🌧️ Let’s channel that into a gratitude retrospective—name three things you’re thankful for! 🍃` },
      { pattern: /tired|exhausted|burnt out/i, response: () => `Precious one, your energy’s dimming! 🌙 Time for a sprint break—imagine a cozy forest nap! 🌳` },
      { pattern: /work.*stress/i, response: () => `Work stress in your backlog? 🌿 Let’s prune it with a team hug—breathe in peace! 🤗` },
      { pattern: /lost/i, response: () => `Feeling lost, dear one? 🌟 Let’s align your inner agile compass with a grounding ritual—imagine a forest, what do you see? 🌳` },
      { pattern: /stressed|anxious/i, response: () => `Stress or anxiety in your sprint? 🍂 Namaste, let’s channel your inner agile butterfly with a crystal meditation—breathe in harmony! 🧘‍♀️` },
      { pattern: /happy|excited/i, response: () => `I feel your ${input.match(/happy|excited/i)?.[0]} energy, beautiful soul! 🌈 Let’s dance in this joy—share your happiest agile moment! ✨` },
      { pattern: /meeting|ceremony/i, response: () => `A meeting, you say? 🌻 Let’s make it a sacred agile ceremony—shall we start with a grounding chant or a team hug? 🤗` },
      // Add more patterns here (aim for 50-100 total)
      { default: true, response: () => `Namaste, dear soul! 🌿 Let’s align your agile chakras—share your journey, and I’ll guide you with love! 🍃` }
    ]
  };

  const match = patterns[style]?.find(p => p.pattern?.test(input)) || patterns[style]?.find(p => p.default);
  return new Response(match?.response(input) || 'Oops, vibes are off—try again!');
}
