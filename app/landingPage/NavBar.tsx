"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export const NavBar = () => {
    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
        { title: 'Projects', href: '/projects' },
        { title: 'Contact', href: '/contact' },
    ];
    const [menu, setMenu] = useState(false);
    
    return (
        <>
        
            <motion.nav 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:flex justify-center p-5 text-white rounded-full sm:mx-[15%] lg:my-4 md:mx-[20%] lg:mx-[25%] xl:mx-[30%] backdrop-blur-sm bg-white/5"
            >
                {navLinks.map((link, index) => (
                    <motion.div
                        key={index}
                    >
                        <Link href={link.href} className="px-10 py-1 rounded-full transition duration-300 hover:bottom-3 ">
                            {link.title}
                        </Link>
                    </motion.div>
                ))}
            </motion.nav>

                <Link href={""} className="text-white my-4 mx-4  justify-end  flex lg:hidden" onClick={() => { setMenu(!menu) }}>
                    {menu ? <X /> : <Menu />}
                </Link>

            <AnimatePresence>
                {menu && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-white topt right-0  block lg:hidden p4"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link 
                                        href={link.href}
                                        onClick={() => setMenu(false)}
                                        className="px-4 py-2  rounded-lg transition duration-300 text-center block"
                                    >
                                        {link.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};