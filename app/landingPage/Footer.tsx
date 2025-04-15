"use client";
import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Footer = memo(() => {
    const footerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    setIsInView(true);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, [hasAnimated]);

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/" },
        { name: "LinkedIn", url: "https://linkedin.com/in/" },
        { name: "Twitter", url: "https://twitter.com/" },
        { name: "Instagram", url: "https://instagram.com/" },
    ];

    const footerLinks = [
        { title: "About", url: "" },
        { title: "Projects", url: "" },
        { title: "Skills", url: "" },
        { title: "Contact", url: "" },
    ];

    return (
        <footer className="footer-container" ref={footerRef}>

            <div className="footer-content">
                <motion.div 
                    className="footer-main"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-brand">
                        <h2 className="footer-logo text-gradient">Rayen<span className="text-gradient"> Dev</span></h2>
                        <p className="footer-tagline">Transforming concepts into seamless user experiences</p>
                    </div>

                    <div className="footer-links-section">
                        <h3 className="footer-links-title">Quick Links</h3>
                        <ul className="footer-links">
                            {footerLinks.map((link, index) => (
                                <motion.li 
                                    key={link.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                >
                                    <Link href={link.url} className="footer-link">
                                        {link.title}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3 className="footer-newsletter-title">Stay Updated</h3>
                        <p className="footer-newsletter-text">Subscribe to my newsletter for the latest updates</p>
                        <div className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="newsletter-input"
                            />
                            <motion.button 
                                className="newsletter-button bg-gradient-to-r from-[#8158C9] to-[#5e3d9c] text-white px-6 py-2 rounded-full font-medium"
                                whileHover={{ 
                                    scale: 1.05, 
                                    boxShadow: '0 0 20px rgba(129, 88, 201, 0.6)',
                                    background: 'linear-gradient(to right, #9169d8, #6e4aaf)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="footer-social"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="social-title text-white">Connect With Me</h3>
                    <div className="social-links">
                        {socialLinks.map((social, index) => (
                            <motion.a 
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                whileHover={{ 
                                    y: -5, 
                                    boxShadow: '0 10px 25px rgba(129, 88, 201, 0.4)',
                                    scale: 1.1
                                }}
                            >
                                {social.name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <div className="footer-decoration">
                    <div className="decoration-line footer-line-1"></div>
                    <div className="decoration-line footer-line-2"></div>
                    <div className="decoration-circle footer-circle-1"></div>
                    <div className="decoration-circle footer-circle-2"></div>
                </div>

                <motion.div 
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="footer-copyright">
                        <p>© {new Date().getFullYear()} Rayen. All rights reserved.</p>
                    </div>
                    <div className="footer-legal">
                        <Link href="/" className="legal-link">Privacy Policy</Link>
                        <Link href="/" className="legal-link">Terms of Service</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
})

export default Footer;