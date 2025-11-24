import { AnimeGrid } from "@/components/anime/AnimeGrid";
import { animePlaceholders as animes } from "@/lib/placeholder-images";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter text-center font-headline">
        Discover Your Next Favorite Anime
      </h1>
      <AnimeGrid animes={animes} />
    </div>
  );
}
