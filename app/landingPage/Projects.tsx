"use client";
import Link from "next/link";
import project1 from "../../public/ImgCard1.svg";
import stack1 from "../../public/project1.svg";
import stack2 from "../../public/project2.svg";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
const cardContent = [
    {
        img: project1,
        title: "E-commerce",
        paragraph: "A modern, fully responsive online furniture store designed to showcase and sell home decor products with an intuitive user experience.where i dont understand ",
        stack: stack1,
        link: "/"
    },
    {
        img: project1,
        title: "Banking System",
        paragraph: "A modern, fully responsive Banking System designed to showcase and sell home decor products with an smooth user experience and strong security system",
        stack: stack2,
        link: "/"
    },
]
export const Projects = () => {
    return (
        <>
            <section className="text-white flex items-start  lg:px-8 mt-20 ">
                <div className="space-y-3 z-4">
                    <p className="text-white/80 text-xl">MY WORK</p>
                    <h1 className="text-5xl">Projects.</h1>
                    <p className="text-white/80 text-xl">Here are some of my projects showcasing my expertise in multiple backend and frontend technologies.</p>
                </div>
            </section>
            <div className="grid lg:flex gap-5 lg:px-8 mr-10  mt-5 text-white ">
                {
                    cardContent.map((card , index) => (
                        <div className="border border-white/31 z-4 w-full rounded-sm" key={index}>
                            <div className="p-4 space-y-3 " >
                                <Image src={card.img} alt="project Image" className="w-full" />
                                <h1 className="text-2xl">{ card.title }</h1>
                                <p className="text-md md:text-lg xl:text-xl "> {card.paragraph} </p>
                                <div className="md:flex space-y-4">
                                    <Image src={card.stack} className="md:p-0 p-4 pl-0" alt="Tech Stack"/>
                                    <Link href={card.link} className="text-white/80 text-xl ml-auto my-auto">
                                        <div className="flex">
                                            <span>Check Live Site</span>
                                            <span><ArrowDownRight  className="rotate-[-80deg] m-1"/></span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}