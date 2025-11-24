"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnimePlaceholder } from "@/lib/placeholder-images";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

interface AnimeCardProps {
  anime: AnimePlaceholder;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  
  const handleCardClick = () => {
    analytics.then(an => {
      if (an) {
        logEvent(an, 'select_content', {
          content_type: 'anime',
          item_id: anime.id,
        });
      }
    });
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 ease-in-out transform-gpu hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${anime.title}`}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative w-full">
          <Image
            src={anime.imageUrl}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={anime.imageHint}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="font-headline tracking-tight">{anime.title}</CardTitle>
        <CardDescription className="line-clamp-2">{anime.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
