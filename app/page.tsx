"use client";
import { useState } from 'react';
import ConsultingBot from './components/ConsultingBot';
import ElizaRacterBot from './components/ElizaRacterBot';

export default function Home() {
  const [botType, setBotType] = useState<'elizaRacter' | 'consulting'>('elizaRacter');

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Crazy Consultants</h2>
        <p style={{ background: '#f3f4f6', padding: '0.5rem', borderRadius: '1rem', display: 'inline-block' }}>
          Experience the absurdity of consultant-speak through our friendly AI bots
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <select
          value={botType}
          onChange={e => setBotType(e.target.value as 'elizaRacter' | 'consulting')}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="elizaRacter">ELIZA-Racter Dynamic Duo</option>
          <option value="consulting">Consulting Bot Suite</option>
        </select>
      </div>

      {botType === 'elizaRacter' ? <ElizaRacterBot /> : <ConsultingBot />}
    </div>
  );
}