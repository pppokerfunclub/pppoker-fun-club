"use client";

import { Button, Container } from "@/components";
import person from "@public/assets/person.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainPage } from "@/components/main-page";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    async function fetchLink() {
      const response = await fetch("/api/links");
      const data = await response.json();
      if (data.url) {
        router.push(`${data.url}${id}`);
      }
    }
    fetchLink();
  }, []);

  return <MainPage />;
}
