"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

export const SkillsShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [activeCategory, setActiveCategory] = useState("frontend");

    // Optimize intersection observer with useCallback
    const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
        }
    }, [hasAnimated]);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, { 
            threshold: 0.3,
            rootMargin: '50px'
        });

        const currentContainer = containerRef.current;
        if (currentContainer) {
            observer.observe(currentContainer);
        }

        return () => {
            if (currentContainer) {
                observer.unobserve(currentContainer);
            }
        };
    }, [observerCallback]);

    // Memoize skill categories to prevent unnecessary re-renders
    const skillCategories = useMemo(() => [
        {
            id: "frontend",
            title: "Frontend",
            skills: [
                { name: "React", level: 90 },
                { name: "Next.js", level: 85 },
                { name: "CSS", level: 88 },
                { name: "Tailwind", level: 92 },
                { name: "JavaScript", level: 90 },
                { name: "TypeScript", level: 85 },
            ],
        },
        {
            id: "backend",
            title: "Backend",
            skills: [
                { name: "Node.js", level: 88 },
                { name: "Express", level: 85 },
                { name: "MongoDB", level: 82 },
                { name: "SQL", level: 60 },
                { name: "Auth", level: 85 },
                { name: "Security", level: 95 },
            ],
        },
        {
            id: "design",
            title: "Design",
            skills: [
                { name: "Figma", level: 85 },
                { name: "UI/UX", level: 88 },
                { name: "Animation", level: 90 },
                { name: "Responsive", level: 92 },
                { name: "Prototyping", level: 55 },
                { name: "Wireframing", level: 87 },
            ],
        },
    ], []);

    // Memoize the active skills to prevent recalculation on every render
    const activeSkills = useMemo(() => {
        return skillCategories.find(category => category.id === activeCategory)?.skills || [];
    }, [skillCategories, activeCategory]);

    // Memoize animation variants for better performance
    const headerAnimations = useMemo(() => ({
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }), []);

    const subtitleAnimations = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }), []);

    // Optimize category tab click handler
    const handleCategoryChange = useCallback((categoryId: string) => {
        setActiveCategory(categoryId);
    }, []);

    // Optimize particle rendering with useMemo


    return (
        <section className="skills-showcase w-[100vw] h-[100vh]" ref={containerRef}>


            <div className="skills-category-tabs">
                {skillCategories.map((category, index) => (
                    <motion.button
                        key={category.id}
                        className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                        {category.title}
                    </motion.button>
                ))}
            </div>

            <div className="skills-display">
                <motion.div 
                    className="skills-content-wrapper"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >

                <div className="skills-grid md:overflow-x-auto sm:overflow-x-auto md:flex sm:flex md:flex-nowrap sm:flex-nowrap md:grid-none sm:grid-none">
                    {activeSkills.map((skill, index) => (
                        <motion.div 
                            key={skill.name}
                            className="skill-item md:min-w-[260px] sm:min-w-[240px] md:flex-shrink-0 sm:flex-shrink-0"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={isInView ? { 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { 
                                    duration: 0.5, 
                                    delay: 0.1 * index,
                                    type: "spring",
                                    stiffness: 100
                                }
                            } : {}}
                            whileHover={{ 
                                y: -8, 
                                boxShadow: '0 15px 35px rgba(129, 88, 201, 0.4)',
                                scale: 1.03
                            }}
                        >
                            <div className="skill-item-glow"></div>
                            <div className="skill-info">
                                <h3 className="skill-name">{skill.name}</h3>
                                <span className="skill-percentage">{skill.level}%</span>
                            </div>
                            <div className="skill-bar-container">
                                <motion.div 
                                    className="skill-bar"
                                    initial={{ width: '0%' }}
                                    animate={{ 
                                        width: isInView ? `${skill.level}%` : '0%',
                                    }}
                                    transition={{ 
                                        duration: 1.5, 
                                        delay: 0.2 + index * 0.1,
                                        ease: [0.17, 0.67, 0.83, 0.67]
                                    }}
                                >
                                    <div className="skill-glow"></div>
                                </motion.div>
                            </div>
                            <div className="skill-icon-bg">
                                <span className="skill-icon">{skill.name.charAt(0)}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="skills-3d-cube">
                    <div className={`cube ${isInView ? 'animate' : ''}`}>
                        <div className="cube-face front">Frontend</div>
                        <div className="cube-face back">Backend</div>
                        <div className="cube-face right">Design</div>
                        <div className="cube-face left">Mobile</div>
                        <div className="cube-face top">DevOps</div>
                        <div className="cube-face bottom">Tools</div>
                    </div>
                    <div className="cube-shadow"></div>
                </div>
                </motion.div>
                
                <div className="skills-decoration">
                    <div className="decoration-line line-1"></div>
                    <div className="decoration-line line-2"></div>
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>
                </div>
            </div>
        </section>
    );
};