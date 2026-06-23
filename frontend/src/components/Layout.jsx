import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import { Toaster } from "sonner";
import { track, EVENTS } from "@/lib/analytics";

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    let fired = false;
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight || 1);
      if (!fired && scrolled > 0.75) { fired = true; track(EVENTS.SCROLL_75, { path: pathname }); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[rgb(var(--js-text))]">
      <Navbar />
      <main className="flex-1 pb-24 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default Layout;
