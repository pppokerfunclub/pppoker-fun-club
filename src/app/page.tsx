"use client";

import { Button, Container } from "@/components";
import person from "@public/assets/person.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const router = useRouter();

  useEffect(() => {
    router.push("https://t.me/ilyaspokerbot?start=valueclub_targerbarlabs");
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden relative flex flex-col justify-center">
      <Container className="h-full relative">
        <motion.div
          className="flex flex-col w-full md:w-2/3 h-full justify-end md:justify-center relative pb-5 md:pb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="text-center md:text-left"
          >
            <span className="italic text-primary">PPPOKER</span> FUN CLUB
          </motion.h1>
          <motion.p
            className="mt-6 text-center md:text-left"
            variants={itemVariants}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Наш клуб объединяет людей, которые просто любят покер: кто-то
            приходит за эмоциями, кто-то за общением, а кто-то — чтобы прокачать
            своё мастерство. Это лёгкая, дружеская среда, где ценится сам
            процесс и энергия игры.
          </motion.p>
          <motion.p
            className="mt-4 hidden md:block"
            variants={itemVariants}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Фан-клуб любителей покера — это место для тех, кто получает
            удовольствие от самой игры. Здесь не про ставки и соперничество, а
            про атмосферу вечеров за картами, когда собираются друзья, спорят о
            стратегиях, учатся читать соперников и радуются каждой удачной
            раздаче.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col md:flex-row items-center gap-2"
            variants={buttonVariants}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <Link
              className="w-full md:w-auto"
              target="_blank"
              href={process.env.NEXT_PUBLIC_URL || "#"}
            >
              <Button variant="default" className="w-full md:w-auto">
                Присоединиться
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="z-[-1] w-2/3 blur-[300px] opacity-55 left-0 -bottom-2/3 aspect-square rounded-full bg-primary absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </motion.div>

        <div className="absolute inset-y-0 right-0 w-full max-w-[600px] z-[-2]">
          <Image
            src={person}
            alt="person"
            className="h-full w-full object-cover object-bottom md:object-center"
          />
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-[20px]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 2,
              ease: "easeOut",
              delay: 0.5,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:hidden" />
        </div>
      </Container>
    </div>
  );
}
