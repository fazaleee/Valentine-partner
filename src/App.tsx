import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Proposal from './components/Proposal';
import Success from './components/Success';
import HeartParticles from './components/HeartParticles';
import './index.css';

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className={`scene ${accepted ? 'bg-success' : 'bg-proposal'}`}>
      <HeartParticles />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <Proposal key="proposal" onYes={() => setAccepted(true)} />
        ) : (
          <Success key="success" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
