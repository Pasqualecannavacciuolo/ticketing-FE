"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function WhatWeDo() {
  return (
    <>
      <Navbar />
      <main className="">
        <LampContainer className="m-0 p-0">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            What we do
          </motion.h1>
          <motion.p
            className="text-white bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent"
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis fugit quo distinctio nam dolorum doloribus obcaecati
            excepturi, nihil quasi aliquid maiores illo doloremque velit, sequi
            temporibus, tenetur sit rem voluptatum!
          </motion.p>
        </LampContainer>
      </main>
    </>
  );
}
