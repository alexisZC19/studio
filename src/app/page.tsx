"use client";

import { useEffect, useState } from "react";
import { fetchAndActivate, getString } from "firebase/remote-config";
import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { animePlaceholders as animes } from "@/lib/placeholder-images";
import { useRemoteConfig } from "@/firebase";

export default function Home() {
  const remoteConfig = useRemoteConfig();
  const [title, setTitle] = useState("Discover Your Next Favorite Anime");

  useEffect(() => {
    if (remoteConfig) {
      fetchAndActivate(remoteConfig)
        .then(() => {
          const remoteTitle = getString(remoteConfig, "home_page_title");
          if (remoteTitle) {
            setTitle(remoteTitle);
          }
        })
        .catch((err) => {
          console.error("Error fetching remote config:", err);
        });
    }
  }, [remoteConfig]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter text-center font-headline">
        {title}
      </h1>
      <AnimeGrid animes={animes} />
    </div>
  );
}
