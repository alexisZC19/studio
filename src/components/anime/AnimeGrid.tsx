"use client";

import { useEffect } from "react";
import type { AnimePlaceholder } from "@/lib/placeholder-images";
import { AnimeCard } from "./AnimeCard";
import { useAnalytics } from "@/firebase";
import { logEvent } from "firebase/analytics";

interface AnimeGridProps {
  animes: AnimePlaceholder[];
}

export function AnimeGrid({ animes }: AnimeGridProps) {
  const analytics = useAnalytics();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'screen_view', {
        firebase_screen: 'HomePage',
        firebase_screen_class: 'AnimeGrid'
      });
    }
  }, [analytics]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {animes.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
