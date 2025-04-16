"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import start from "../../public/star.png"
import Image from "next/image";


export const NavBar = () => {
    const navLinksSM = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/' },
        { title: 'Projects', href: '/' },
        { title: 'Contact', href: '/' },
    ]
    const navLinks = [
        { title: 'Home', href: '/' },
        { title: 'About', href: '/' },

    ];
    const navLinks2 = [
        { title: 'Projects', href: '/' },
        { title: 'Contact', href: '/' },
    ]
    const [menu, setMenu] = useState(false);
    const [openMenu, setopenMenu] = useState(false);

    return (
        <>

            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:flex justify-start p-3  my-5 text-white rounded-full w-fit backdrop-blur-md bg-white/8 border border-white/10 mx-auto"
                onMouseEnter={() => { setopenMenu(true) }}
                onMouseLeave={() => { setopenMenu(false) }}
            >
                <motion.div
                    className="flex items-center "
                    animate={{ gap: openMenu ? "1.25rem" : "0" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <AnimatePresence>
                        {openMenu && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: "auto" , transition : { duration : 0.2 } }}

                                className="flex items-center gap-4 "
                            >
                                {navLinks2.map((value, key) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Link
                                            href={value.href}
                                            className="bg-white/10 p-2 px-5  w-[100px] text-center inline-block rounded-full border-1 border-white transition-all duration-300 hover:bg-gradient-to-r from-purple-600/20 to-black/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                                        >
                                            {value.title}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <motion.div
                        whileHover={{ rotate: 180 }}
                    >
                        <Image src={start} alt="start" width={40} height={40} className="hover:shadow-lg " />
                    </motion.div>

                    <AnimatePresence>
                        {openMenu && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: "auto" , transition : { duration : 0.2 } }}

                                className="flex items-center gap-4 "
                            >
                                {navLinks.map((value, key) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <Link
                                            href={value.href}
                                            className="bg-white/10 p-2  w-[100px] text-center inline-block rounded-full border-1 border-white transition-all duration-300 hover:bg-gradient-to-r from-purple-600/20 to-black/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                                        >
                                            <p>
                                                {value.title}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
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
                            {navLinksSM.map((link, index) => (
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