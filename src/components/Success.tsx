import { motion } from 'framer-motion';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

/* ===== EASY-TO-EDIT VARIABLES ===== */
const PERSON_NAME = 'Dr. Faran';
const MESSAGE_LINES = [
    `Congratulations, ${PERSON_NAME}!`,
    'This moment just became a beautiful memory ✨',
    'You are my today, my tomorrow, and my forever.',
    'Thank you for being my love.',
    'I love you endlessly ❤️💖',
    '- Dr. Seerat',
];

const Success = () => {
    /* Fire confetti on mount */
    useEffect(() => {
        const duration = 4000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffe6ea', '#c9184a'],
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffe6ea', '#c9184a'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
    }, []);

    return (
        <motion.div
            className="card card-success"
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {/* Emojis */}
            <div className="emoji-row">
                <motion.span
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                    🤗
                </motion.span>
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                >
                    🌸
                </motion.span>
                <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                    💞
                </motion.span>
            </div>

            {/* Title */}
            <h1 className="success-title">Yay! She said YES 💕</h1>

            {/* Message — each line fades in with a stagger */}
            <motion.div
                className="success-message"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.35 } },
                }}
            >
                {MESSAGE_LINES.map((line, i) => (
                    <motion.p
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 14 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: i === 0 ? 12 : 4, fontWeight: i === MESSAGE_LINES.length - 1 ? 600 : 400 }}
                    >
                        {i === 0 ? <strong>{line}</strong> : line}
                    </motion.p>
                ))}
            </motion.div>

            {/* Back link */}
            <a href="/" className="back-link" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                ← Back
            </a>
        </motion.div>
    );
};

export default Success;
