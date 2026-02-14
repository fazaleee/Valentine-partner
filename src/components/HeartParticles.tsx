import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Heart {
    id: number;
    x: number;       // vw position
    size: number;     // font-size in px
    delay: number;    // animation delay
    duration: number; // animation duration
    emoji: string;
}

const EMOJIS = ['❤️', '💕', '💗', '💖', '💞', '🩷', '♥️', '🌹', '✨'];

const HeartParticles = () => {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        const generated: Heart[] = Array.from({ length: 35 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 14 + Math.random() * 24,
            delay: Math.random() * 8,
            duration: 5 + Math.random() * 10,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        }));
        setHearts(generated);
    }, []);

    return (
        <div className="hearts-container">
            {hearts.map((h) => (
                <motion.div
                    key={h.id}
                    className="heart-particle"
                    style={{
                        left: `${h.x}vw`,
                        fontSize: `${h.size}px`,
                    }}
                    initial={{ y: '110vh', x: -20, opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-10vh',
                        x: [0, 25, -25, 0], // Swaying motion
                        opacity: [0, 0.8, 0.8, 0],
                        rotate: [0, 20, -20, 0],
                    }}
                    transition={{
                        duration: h.duration,
                        repeat: Infinity,
                        delay: h.delay,
                        ease: 'linear',
                        x: {
                            duration: h.duration * 0.7, // Sway at different speed
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "mirror"
                        }
                    }}
                >
                    {h.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default HeartParticles;
