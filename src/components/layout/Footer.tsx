"use client";

import { Button } from "@/components/ui/button";

export function Footer() {

  const causeCrash = () => {
    console.log("Intentionally causing a crash for testing purposes.");
    // This will cause a runtime TypeError that Crashlytics can report.
    let obj: any = undefined;
    try {
        obj.crash();
    } catch (error) {
        console.error("Caught intentional crash:", error);
    }
  };

  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            © {new Date().getFullYear()} AnimeVerse. All rights reserved.
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={causeCrash}>
            Test Crash
        </Button>
      </div>
    </footer>
  );
}
