"use client";
import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Footer = memo(() => {
    const contactRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, [hasAnimated]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");
        
        // Simulate form submission
        setTimeout(() => {
            setFormStatus("success");
            setFormData({ name: "", email: "", message: "" });
            
            // Reset form status after 3 seconds
            setTimeout(() => setFormStatus("idle"), 3000);
        }, 1500);
    };

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
        { name: "LinkedIn", url: "https://linkedin.com/in/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    ];

    const contactMethods = [
        { title: "Email", value: "rayen@example.com", icon: "M0 4v16h24V4H0zm21.518 2L12 12.713 2.482 6h19.036zm-19.518 12V7.183l10 6.8 10-6.8V18H2z" },
        { title: "Phone", value: "+1 (000) 000-0000", icon: "M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" },
        { title: "Location", value: "Tunisia", icon: "M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" },
    ];

    return (
        <section className="relative pt-20 pb-8 px-8 overflow-hidden bg-gradient-to-b from-transparent to-black/30 mt-16 z-10" ref={contactRef}>
            <div className="relative z-5 max-w-[1400px] mx-auto">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.5fr] gap-12 mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl font-bold mb-2 text-gradient">Contact <span className="text-gradient">Me</span></h2>
                        <p className="text-[#a1a1aa] text-base w-fit">Let's connect and create something amazing together</p>
                    </div>

                    <div className="hidden md:flex flex-col gap-6">
                        <h3 className="text-xl font-semibold mb-4 text-white">Contact Info</h3>
                        <ul className="flex flex-col gap-4">
                            {contactMethods.map((method, index) => (
                                <motion.li 
                                    key={method.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    className="flex items-center gap-3 mb-4"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-[#8158C9]">
                                            <path d={method.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white/80 text-sm">{method.title}</h4>
                                        <p className="text-white font-medium">{method.value}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:flex md:flex-col gap-6 ">
                        <h3 className="text-xl font-semibold mb-2 text-white">Send Me a Message</h3>
                        <p className="text-[#a1a1aa] text-base mb-4">I'll get back to you as soon as possible</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name" 
                                    className="w-full px-4 py-3 rounded-[10px] bg-white/5 border border-white/10 text-white transition-all duration-300 focus:outline-none focus:border-[#8158C9] focus:ring-2 focus:ring-[#8158C9]/30"
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your email address" 
                                    className="w-full px-4 py-3 rounded-[10px] bg-white/5 border border-white/10 text-white transition-all duration-300 focus:outline-none focus:border-[#8158C9] focus:ring-2 focus:ring-[#8158C9]/30"
                                    required
                                />
                            </div>
                            <div>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your message" 
                                    className="w-full px-4 py-3 rounded-[10px] bg-white/5 border border-white/10 text-white transition-all duration-300 focus:outline-none focus:border-[#8158C9] focus:ring-2 focus:ring-[#8158C9]/30 min-h-[100px] resize-none"
                                    required
                                ></textarea>
                            </div>
                            <motion.button 
                                type="submit"
                                disabled={formStatus === "sending"}
                                className="newsletter-button bg-gradient-to-r from-[#8158C9] to-[#5e3d9c] text-white px-6 py-2 rounded-[10px] font-medium w-full"
                                whileHover={{ 
                                    scale: 1.05, 
                                    boxShadow: '0 0 20px rgba(129, 88, 201, 0.6)',
                                    background: 'linear-gradient(to right, #9169d8, #6e4aaf)'
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {formStatus === "idle" && "Send Message"}
                                {formStatus === "sending" && "Sending..."}
                                {formStatus === "success" && "Message Sent!"}
                                {formStatus === "error" && "Try Again"}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                <motion.div 
                    className="my-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-xl font-semibold mb-6 text-white">Connect With Me</h3>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {socialLinks.map((social, index) => (
                            <motion.a 
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] bg-white/5 border border-white/10 text-white hover:bg-[#8158C9]/20 hover:border-[#8158C9] transition-all duration-300 gap-2"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                whileHover={{ 
                                    y: -5, 
                                    boxShadow: '0 10px 25px rgba(129, 88, 201, 0.4)',
                                    scale: 1.1
                                }}
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-[#8158C9]">
                                    <path d={social.icon} />
                                </svg>
                                {social.name}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-[20%] left-0 w-[30%] h-px bg-gradient-to-r from-[#8158C9]/30 to-transparent"></div>
                    <div className="absolute bottom-[30%] right-0 w-[40%] h-px bg-gradient-to-l from-[#8158C9]/30 to-transparent"></div>
                    <div className="absolute top-[10%] right-[10%] w-[200px] h-[200px] rounded-full bg-[#8158C9]/20 opacity-30 blur-lg"></div>
                    <div className="absolute bottom-[20%] left-[5%] w-[150px] h-[150px] rounded-full bg-[#8158C9]/20 opacity-20 blur-lg"></div>
                </div>

                <motion.div 
                    className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6 mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div className="text-[#a1a1aa] text-sm">
                        <p>© {new Date().getFullYear()} Rayen. All rights reserved.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
})

export default Footer;