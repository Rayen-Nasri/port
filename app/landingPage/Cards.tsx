"use client";
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useMemo, memo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import card1 from '../../public/card1.png'
import card2 from '../../public/card2.png'
import card3 from '../../public/card3.svg'

// Animation variants
const variants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    },
    card: {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 22, mass: 1.2 }
        }
    },
    content: {
        hidden: { opacity: 0, scale: 0.97 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 150, damping: 18, delay: 0.3 }
        }
    },
    image: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }
        }
    }
};

const TechStackColumn = memo(({ columnIndex, techStack }: { columnIndex: number, techStack: string[] }) => (
    <div className='relative h-[250px] md:h-[380px] overflow-hidden w-1/2'>
        <motion.div
            className="absolute inset-0 z-10 "
            style={{
                background: 'linear-gradient(to bottom, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0) 15%, rgba(15,15,15,0) 85%, rgba(15,15,15,0.95) 100%)'
            }}
        />
        <motion.div
            initial={{ y: columnIndex === 0 ? 0 : '-50%' }}
            animate={{ y: columnIndex === 0 ? '-50%' : '0%' }}
            transition={{
                y: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'mirror'
                }
            }}
            className='flex flex-col gap-4'
        >
            {techStack.map((tech, index) => (
                <div key={index} className='bg-gradient-to-br from-[#1A1A1A] to-[#252525] rounded-lg p-4 md:p-6 text-center border border-white/5 shadow-lg'>
                    <span className='font-medium text-white/90'>{tech}</span>
                </div>
            ))}
        </motion.div>
    </div>
));

export const Cards = memo(() => {

    
    const techStack = useMemo(() => [
        "ReactJS", "NextJS", "Express", "MongoDB", "TypeScript",
        "Tailwind", "JavaScript", "Angular", "Bootstrap", "nodejs"
    ], []);

    const duplicatedStack = [...techStack, ...techStack]

    const controls = useAnimation();
    const ref = useRef(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentCard, setCurrentCard] = useState(0);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.2,
    });

    // Define cards for the carousel
    const cards = useMemo(() => [
        {
            id: 'animation',
            title: 'Currently building a JS Animation library',
            subtitle: 'The Inside Scoop',
            image: card1,
            imageAlt: 'Animation library preview'
        },
        {
            id: 'gui',
            title: 'GUI Focused on User Experience',
            subtitle: 'our Intuive make it incredibly easy to use',
            image: card2,
            imageAlt: 'User experience GUI'
        },
        {
            id: 'ai',
            title: 'Ai Support',
            subtitle: 'i can build simple AI agent to improve the user experience',
            image: card3,
            imageAlt: 'AI support'
        },
        {
            id: 'tech',
            title: 'My Tech Stack',
            subtitle: 'i constantly try to improve',
            isTechStack: true
        }
    ], []);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Navigate to next/previous card
    const navigateCard = (direction: number) => {
        const newIndex = currentCard + direction;
        if (newIndex >= 0 && newIndex < cards.length) {
            setCurrentCard(newIndex);
            // Smooth scroll to the card in the carousel
            if (carouselRef.current) {
                const cardElements = carouselRef.current.querySelectorAll('.card-item');
                if (cardElements[newIndex]) {
                    cardElements[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        }
    };

    // Common card hover animation
    const cardHoverProps = {
        whileHover: {
            boxShadow: "0 0 20px rgba(129,88,201,0.3)",
            transition: { duration: 0.3 }
        }
    };

    return (
            <section ref={ref} className="w-screen xl:h-[90vh]   2xl:h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden flex items-center justify-center">
                {/* Mobile and Tablet Navigation Controls */}
                <motion.div 
                    className="lg:hidden fixed z-50 bottom-8 left-1/2 -translate-x-1/2 flex gap-5 backdrop-blur-md bg-black/40 px-6 py-3 rounded-full border border-white/20 shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                >
                    <motion.button 
                        onClick={() => navigateCard(-1)}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#8158C9]/80 to-[#5e3d9c]/80 flex items-center justify-center ${currentCard === 0 ? 'opacity-50 grayscale' : 'opacity-100'} shadow-md shadow-purple-900/30`}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(129,88,201,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        disabled={currentCard === 0}
                    >
                        <FiChevronLeft className="text-white text-xl" />
                    </motion.button>
                    
                    <div className="flex gap-2 items-center px-2">
                        {cards.map((_, index) => (
                            <motion.div 
                                key={index}
                                className={`h-2.5 rounded-full ${currentCard === index ? 'bg-gradient-to-r from-[#8158C9] to-[#5e3d9c] w-6' : 'bg-white/40 w-2.5'}`}
                                animate={{ 
                                    opacity: currentCard === index ? 1 : 0.6,
                                    scale: currentCard === index ? 1.1 : 1,
                                    boxShadow: currentCard === index ? "0 0 8px rgba(129,88,201,0.6)" : "none"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => navigateCard(index - currentCard)}
                            />
                        ))}
                    </div>
                    
                    <motion.button 
                        onClick={() => navigateCard(1)}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#8158C9]/80 to-[#5e3d9c]/80 flex items-center justify-center ${currentCard === cards.length - 1 ? 'opacity-50 grayscale' : 'opacity-100'} shadow-md shadow-purple-900/30`}
                        whileTap={{ scale: 0.95 }}
                        disabled={currentCard === cards.length - 1}
                    >
                        <FiChevronRight className="text-white text-xl" />
                    </motion.button>
                </motion.div>
                
                {/* Mobile and Tablet Carousel View */}
                <div ref={carouselRef} className="lg:hidden  overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    <div className="flex w-max gap-6 px-auto py-2">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                className="card-item snap-center w-fit sm:w-fit h-[70vh] flex-shrink-0 rounded-2xl border border-[#FFFFFF]/20 overflow-hidden p-5  relative"
                                custom={index}
                                initial="hidden"
                                animate={currentCard === index ? "visible" : "visible"}
                                style={{
                                    boxShadow: currentCard === index ? "0 0 10px rgba(129,88,201,0.3)" : "none"
                                }}
                                {...cardHoverProps}
                            >
                                <motion.div 
                                    className="absolute top-0 left-0  w-full h-1 bg-gradient-to-r from-[#8158C9] to-transparent"
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: currentCard === index ? 1 : 0 }}
                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                />
                                {card.isTechStack ? (
                                    <div className='h-full flex flex-col gap-14'>
                                        <motion.div 
                                            variants={variants.content} 
                                            className='text-center bg-gradient-to-br from-black/40 to-transparent p-4 rounded-xl'
                                        >
                                            <p className='text-white/90 text-sm font-medium tracking-wide uppercase'>{card.subtitle}</p>
                                            <h1 className='text-2xl md:text-3xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>{card.title}</h1>
                                        </motion.div>
                                        <div className='flex gap-3 flex-1 overflow-hidden'>
                                            {[0, 1].map((columnIndex) => (
                                                <TechStackColumn key={columnIndex} columnIndex={columnIndex} techStack={duplicatedStack} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='h-full flex flex-col'>
                                        <motion.div 
                                            variants={variants.content} 
                                            className='mb-6 bg-gradient-to-br from-black/40 to-transparent p-4 rounded-xl'
                                        >
                                            <p className='text-white/90 text-sm font-medium tracking-wide uppercase'>{card.subtitle}</p>
                                            <h1 className='text-2xl font-bold mt-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>{card.title}</h1>
                                        </motion.div>
                                        <motion.div 
                                            variants={variants.image} 
                                            className="flex-1 flex items-center justify-center p-2"
                                            whileHover={{
                                                scale: 1.03,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                className='min-h-[30vh] w-auto object-contain drop-shadow-2xl'
                                            />
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* Desktop Grid Layout */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    className="hidden lg:grid lg:grid-cols-3 lg:grid-rows-4  gap-6 2xl:gap-6 xl:gap-4 text-white w-full max-w-7xl  xl:h-fit  2xl:h-fit mx-auto">
                    <motion.div
                        custom={0}
                        {...cardHoverProps}
                        className="col-span-2 flex flex-col md:flex-row lg:items-center row-span-2 bg-[#0F0F0F]/50 min-h-[300px] xl:h-[326] 2xl:h-[384px] rounded-2xl border border-[#FFFFFF]/31 relative overflow-hidden p-4 sm:p-6 shadow-lg hover:shadow-[0_0_15px_rgba(129,88,201,0.2)] transition-shadow duration-300">
                        <motion.div
                            variants={variants.content}
                            className="z-10 w-full md:w-1/2"
                        >
                            <div className='space-y-3 sm:space-y-5 md:ml-10 font-bold'>
                                <p className='text-white/60 text-sm sm:text-base'>The Inside Scoop</p>
                                <h1 className='text-xl sm:text-2xl md:text-4xl leading-tight'>
                                    Currently building a
                                    <br />
                                    JS Animation library
                                </h1>
                            </div>
                        </motion.div>
                        <motion.div
                        >
                         <Image
                            src={card1}
                            alt='Animation library preview'
                            className='absolute md:right-0 top-0'
                        />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        {...cardHoverProps}
                        className="row-span-2 col-start-3 bg-[#0F0F0F]/50 rounded-2xl z-10 border border-[#FFFFFF]/31 xl:h-[326] 2xl:h-[384px] p-6 flex items-center">
                        <motion.div
                            variants={variants.content}
                            className='w-full'>
                            <h1 className='text-center text-2xl md:text-3xl font-bold'>
                                GUI Focused on User Experience
                            </h1>
                            <p className='text-center my-3 text-white/78 px-4'>
                                our Intuive make it incredibly easy to use
                            </p>
                            <motion.div
                                variants={variants.image}
                            >
                                <Image
                                    src={card2}
                                    alt='card2'
                                    className='mx-auto max-h-[200px] object-contain' />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        custom={2}
                        {...cardHoverProps}
                        className="col-span-2 row-span-2 col-start-2 row-start-3 rounded-2xl bg-[#0F0F0F]/50 xl:h-[310] 2xl:h-[384px] z-10 border border-[#FFFFFF]/31">
                        <div className='p-8 h-full flex flex-col md:flex-row md:items-center gap-8'>
                            <motion.div
                                variants={variants.content}
                                className='md:w-1/2 text-center md:text-start'>
                                <p className='text-white/78'>
                                    i constantly try to improve
                                </p>
                                <h1 className='text-3xl md:text-4xl font-bold 2xl:text-5xl'>
                                    My Tech Stack
                                </h1>
                            </motion.div>

                            <div className='flex gap-4 xl:h-[300] 2xl:h-[378px]  md:gap-8 md:w-2/3 overflow-hidden'>
                                {[0, 1].map((columnIndex) => (
                                    <TechStackColumn key={columnIndex} columnIndex={columnIndex} techStack={duplicatedStack} />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={3}
                        {...cardHoverProps}
                        className="row-span-2 col-start-1 row-start-3 rounded-2xl bg-[#0F0F0F]/50 z-10 border border-[#FFFFFF]/31 xl:h-[310] 2xl:h-[384px] p-6 flex flex-col justify-center items-center">
                        <motion.div
                            className='w-full text-center'
                            variants={variants.content}
                        >
                            <h1 className='text-2xl md:text-3xl font-bold mb-3'>Ai Support</h1>
                            <p className='text-white/78 px-4'>
                                i can build simple AI agent to improve the user experience
                            </p>
                        </motion.div>
                        <motion.div
                            variants={variants.image}
                            whileHover={{
                                rotate: [0, -5, 5, -5, 0],
                                transition: { duration: 0.5 }
                            }}
                        >
                            <Image
                                src={card3}
                                alt='card3'
                                className='mx-auto mt-4 xl:max-h-[180px] 2xl:max-h-[200px] max-h-[200px] object-contain'
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
            );
});

            Cards.displayName = 'Cards';