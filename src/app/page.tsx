"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainPage } from "@/components/main-page";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDefaultLink() {
      try {
        setLoading(true);

        // Получаем дефолтную ссылку
        const response = await fetch("/api/default");
        const data = await response.json();

        if (response.ok && data.url) {
          // Выполняем редирект на дефолтную ссылку
          window.location.href = data.url;
        } else {
          setError(data.error || "Дефолтная ссылка не настроена");
          setLoading(false);
        }
      } catch (err) {
        setError("Произошла ошибка при получении дефолтной ссылки");
        setLoading(false);
      }
    }

    fetchDefaultLink();
  }, []);

  return <MainPage />;
}
