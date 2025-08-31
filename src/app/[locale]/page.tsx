"use client";

import { Button, Container } from "@/components";
import person from "@public/assets/person.jpg";
import Image from "next/image";
import { motion } from "framer-motion";

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

  return (
    <div className="h-screen w-full overflow-hidden relative flex flex-col justify-center">
      <Container className="h-full relative">
        <motion.div
          className="flex flex-col w-2/3 h-full justify-center relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <span className="italic text-primary">PPPOKER</span> FUN CLUB
          </motion.h1>
          <motion.p
            className="mt-6"
            variants={itemVariants}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            Наш клуб объединяет людей, которые просто любят покер: кто-то
            приходит за эмоциями, кто-то за общением, а кто-то — чтобы прокачать
            своё мастерство. Это лёгкая, дружеская среда, где ценится сам
            процесс и энергия игры.
          </motion.p>
          <motion.p
            className="mt-4"
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
            className="mt-8 flex items-center gap-2"
            variants={buttonVariants}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <Button variant="default">Присоединиться</Button>
            <Button variant="outline">Группа ВКонтакте</Button>
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
            className="h-full w-full object-cover object-top"
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
        </div>
      </Container>
    </div>
  );
}
