"use client";

import {motion} from "framer-motion";

export const HomePage = () => {
    return (
        <section className="text-white flex items-start md:h-screen lg:relative lg:bottom-20 2xl:bottom-0  ">
            <div className="w-full md:grid grid-cols-1 lg:grid-cols-2 ">
                <div className="flex flex-col justify-center space-y-5 md:space-y-7 text-center lg:text-left px-4 lg:px-8">
                    <div>
                        <p className="uppercase font-light tracking-wider text-[14px] md:text-[16px] text-gray-300">
                            Crafting Modern Web Experiences with Next.js
                        </p>
                    </div>
                    <div >
                        <h1 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-tight  text-white">
                            Transforming Concepts into
                            Seamless <span className="text-[#8158C9]">User Experiences</span>
                        </h1>
                    </div>
                    <div >
                        <p className="text-base md:text-lg text-gray-300">
                            Hi! I'm Rayen, a passionate Full Stack Developer crafting digital solutions from Tunisia. 🚀
                        </p>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative hidden lg:block items-start mt-8 lg:mt-0"
                >
                    <script
                        type="module"
                        src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js"
                        async
                    ></script>
                    <div
                        className="h-[670px] w-full"
                        dangerouslySetInnerHTML={{
                            __html: '<spline-viewer url="https://prod.spline.design/gdAGhcuJi835JTZe/scene.splinecode"></spline-viewer>',
                        }}
                    ></div>
                </motion.div>
            </div>
        </section>
    )
}