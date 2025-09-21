"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MainPage } from "@/components/main-page";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleRedirect() {
      try {
        setLoading(true);

        const response = await fetch(`/api/redirect/${id}`);
        const data = await response.json();

        if (response.ok && data.url) {
          window.location.href = data.url;
        } else {
          setError(data.error || "Ссылка не найдена");
          setLoading(false);
        }
      } catch (err) {
        setError("Произошла ошибка при обработке ссылки");
        setLoading(false);
      }
    }

    if (id) {
      handleRedirect();
    }
  }, [id]);

  return <MainPage />;
}
