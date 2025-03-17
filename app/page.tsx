"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  console.log('Home component rendering');

  const [style, setStyle] = useState('genz-woke');
  console.log('Style initialized:', style);

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  console.log('Messages initialized:', messages);

  const [input, setInput] = useState('');
  console.log('Input initialized:', input);

  useEffect(() => {
    console.log('useEffect triggered for style:', style);
    setMessages([{ sender: 'eliza', text: 'Bestie! ✨ Ready to vibe-check your soul?' }]);
    console.log('Messages set in useEffect:', messages);
  }, [style]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit triggered');
    e.preventDefault();
    console.log('Form prevented default');

    if (!input.trim()) {
      console.log('Input empty, returning');
      return;
    }
    console.log('Input trimmed, proceeding:', input);

    setMessages(prev => {
      console.log('Setting initial messages:', prev);
      return [...prev, { sender: 'user', text: input }];
    });
    console.log('User message added to state');

    const elizaRes = await fetch(`/api/eliza?input=${encodeURIComponent(input)}&style=${style}`).then(res => res.text());
    console.log('ELIZA response:', elizaRes);

    const racterRes = await fetch(`/api/racter?input=${encodeURIComponent(input)}&style=${style}`).then(res => res.text());
    console.log('RACTER response:', racterRes);

    setMessages(prev => {
      console.log('Setting final messages:', prev);
      return [
        ...prev,
        { sender: 'eliza', text: elizaRes },
        { sender: 'racter', text: racterRes },
        { sender: 'eliza', text: Math.random() < 0.3 ? 'Um, Racter, your energy’s giving chaos—chill, king!' : '' }
      ].filter(msg => msg.text);
    });
    console.log('All messages set in state');

    setInput('');
    console.log('Input cleared');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <select
        value={style}
        onChange={e => setStyle(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
      >
        <option value="genz-woke">GenZ Woke</option>
      </select>
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
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
