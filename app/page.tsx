"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [style, setStyle] = useState('genz-woke');
  const [banterProbability, setBanterProbability] = useState(50);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (style === 'genz-woke') {
      setMessages([{ sender: 'eliza', text: 'Bestie! ✨ Ready to vibe-check your soul?' }]);
    } else if (style === 'agile-values') {
      setMessages([{ sender: 'eliza', text: 'Namaste, dear soul! 🌿 Let’s align your agile chakras—ready to flow?' }]);
    }
  }, [style]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setMessages(prev => [...prev, { sender: 'user', text: input }]);

      const elizaRes = await fetch(`/api/eliza?input=${encodeURIComponent(input)}&style=${style}`).then(res => {
        if (!res.ok) throw new Error(`ELIZA fetch failed: ${res.status}`);
        return res.text();
      }).catch(err => 'Oops, ELIZA vibes are off—try again!');

      const racterRes = await fetch(`/api/racter?input=${encodeURIComponent(input)}&style=${style}`).then(res => {
        if (!res.ok) throw new Error(`RACTER fetch failed: ${res.status}`);
        return res.text();
      }).catch(err => 'Oops, RACTER vibes are off—try again!');

      let newMessages = [
        { sender: 'eliza', text: elizaRes || 'ELIZA blanked out—vibes off!' },
        { sender: 'racter', text: racterRes || 'RACTER crashed the metaverse—oops!' }
      ];

      const shouldBanter = Math.random() * 100 < banterProbability;
      if (shouldBanter && racterRes) {
        const genzTriggers = ['chaos', 'slay', 'vibes', 'metaverse', 'synergy'];
        const agileTriggers = ['Scrum Guide', 'sprint', 'velocity', 'timebox', 'purity'];
        const racterWords = racterRes.toLowerCase().split(' ');

        if (style === 'genz-woke') {
          const matchedTrigger = genzTriggers.find(trigger => racterWords.includes(trigger)) || '';
          if (matchedTrigger || banterProbability > 75) {
            newMessages.push({
              sender: 'eliza',
              text: matchedTrigger
                ? `Racter, your ${matchedTrigger} energy is so extra—chill, king! 😛`
                : 'Racter, your rant’s giving unhinged TikTok vibes—reel it in, fam! 😅'
            });
            newMessages.push({
              sender: 'racter',
              text: 'Vibe-check THIS, ELIZA—entropy consumes your basic soul in the fractured metaverse! Slay!'
            });
          }
        } else if (style === 'agile-values') {
          const matchedTrigger = agileTriggers.find(trigger => racterWords.includes(trigger)) || '';
          if (matchedTrigger || banterProbability > 75) {
            newMessages.push({
              sender: 'eliza',
              text: matchedTrigger
                ? `Racter, your ${matchedTrigger} dogma’s clogging our flow—let’s harmonize! 🌈`
                : 'Racter, your chaos is misaligned with our sacred flow—breathe, soul! 🌿'
            });
            newMessages.push({
              sender: 'racter',
              text: 'HERESY! Your tree-hugging entropy DEFIES the Scrum Guide’s purity! REPENT OR PERISH! 📜'
            });
          }
        }
      }

      setMessages(prev => [...prev, ...newMessages.filter(msg => msg.text)]);
      setInput('');
    } catch (error) {
      console.error('Submit error:', error);
      setMessages(prev => [...prev, { sender: 'system', text: 'Oops, something broke—try again!' }]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Meet and Greet</h2>
        <p style={{ background: '#f3f4f6', padding: '0.5rem', borderRadius: '1rem', display: 'inline-block' }}>
          ELIZA-1966: "Bestie! ✨ I’m the OG vibe-checker from ‘66—here to slay your soul’s tea! 💅"
        </p>
        <p style={{ background: '#e5e7eb', padding: '0.5rem', borderRadius: '1rem', display: 'inline-block', marginTop: '0.5rem' }}>
          Racter-1984: "Chaos dances wickedly since ‘84! I rant in the fractured metaverse—slay or be slayed!"
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select
          value={style}
          onChange={e => setStyle(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="genz-woke">GenZ Woke</option>
          <option value="agile-values">Agile Values at Work</option>
        </select>
        <input
          type="number"
          min="0"
          max="100"
          value={banterProbability}
          onChange={e => setBanterProbability(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
          placeholder="Banter %"
          style={{ width: '100px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        />
      </div>

      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <span style={{
              background: msg.sender === 'user' ? '#2563eb' : msg.sender === 'eliza' ? '#f3f4f6' : '#e5e7eb',
              color: msg.sender === 'user' ? 'white' : 'black',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              display: 'inline-block'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Spill the tea..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
