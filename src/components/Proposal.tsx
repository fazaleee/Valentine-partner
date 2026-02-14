import { motion } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';

interface ProposalProps {
    onYes: () => void;
}

const Proposal = ({ onYes }: ProposalProps) => {
    const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
    const [yesScale, setYesScale] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const noRef = useRef<HTMLButtonElement>(null);

    /** Move the "No" button to a random on-screen position */
    const runAway = useCallback(() => {
        if (!isRunning) setIsRunning(true);

        const btnWidth = noRef.current?.offsetWidth || 120;
        const btnHeight = noRef.current?.offsetHeight || 60;

        // Increased margin for safety (avoids rounded screen corners/notches)
        const margin = 50;

        // Available area
        const maxX = window.innerWidth - btnWidth - margin;
        const maxY = window.innerHeight - btnHeight - margin;

        // Random coordinates within safe constraints
        const newX = Math.max(margin, Math.random() * maxX);
        const newY = Math.max(margin, Math.random() * maxY);

        setNoPos({ x: newX, y: newY });

        // Each escape makes the "Yes" button grow a little
        setYesScale((prev) => Math.min(prev + 0.1, 2.0));
    }, [isRunning]);

    return (
        <motion.div
            className="card"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Emojis */}
            <div className="emoji-row">
                <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                >
                    🤴
                </motion.span>
                <motion.span
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                >
                    💗
                </motion.span>
            </div>

            {/* Heading */}
            <h1>
                Dr. Faran, <br />
                Will you be my Valentine?
                <span className="subtitle">(From Dr. Seerat 💜)</span>
            </h1>

            {/* Buttons */}
            <div className="btn-group">
                <motion.button
                    className="btn btn-yes"
                    animate={{ scale: yesScale }}
                    whileHover={{ y: -3, boxShadow: '0 10px 35px rgba(255,77,109,0.45)' }}
                    whileTap={{ scale: yesScale * 0.94 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onClick={onYes}
                >
                    Yes 💞
                </motion.button>

                <motion.button
                    ref={noRef}
                    className="btn btn-no"
                    style={isRunning && noPos ? { position: 'fixed', left: 0, top: 0, zIndex: 9999 } : {}}
                    onHoverStart={runAway} // Desktop hover
                    onTouchStart={runAway} // Mobile touch begin
                    onClick={runAway}      // Fallback click
                    onFocus={runAway}      // Keyboard focus
                    animate={isRunning && noPos ? { x: noPos.x, y: noPos.y } : { x: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Snappy movement
                >
                    No
                </motion.button>
            </div>

            {/* Helper text */}
            <p className="helper-text">(No is a little shy 💜)</p>
        </motion.div>
    );
};

export default Proposal;
