"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGA, logPageView } from "@/lib/ga";

export default function GAProvider(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    try {
      initGA();
      // Log initial pageview
      logPageView(window.location.pathname + window.location.search);
    } catch (e) {
      // fail silently in case GA isn't available in the environment
      // (keeps SSR and local dev safe)
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    try {
      logPageView(window.location.pathname + window.location.search);
    } catch (e) {
      // ignore
    }
  }, [pathname]);

  return null;
}
