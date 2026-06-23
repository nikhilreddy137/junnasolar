import { IMG } from "@/lib/images";

/**
 * A "wow" gallery / showreel of REAL Junna Solar installations.
 * Mosaic of authentic captioned photos.
 */
export const Showreel = () => {
  const g = IMG.gallery;
  return (
    <section className="container-js py-20 lg:py-28">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">Junna · real installations</span>
          <h2 className="section-title mt-4">From farmhouse rooftops<br />to district courts.</h2>
        </div>
        <p className="text-sm text-[rgb(var(--js-muted))] max-w-md">
          A glimpse of Junna projects across Telangana, Andhra Pradesh and beyond — all built, installed and serviced in-house.
        </p>
      </div>

      <div className="mt-12 grid gap-3 sm:gap-4 lg:gap-5 lg:grid-cols-12 lg:grid-rows-2 lg:h-[680px]">
        <Tile className="lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto" src={g[3].src} caption={g[3].caption} big />
        <Tile className="lg:col-span-5 aspect-[16/9]" src={g[1].src} caption={g[1].caption} tone="accent" />
        <Tile className="lg:col-span-3 aspect-square" src={g[6].src} caption={g[6].caption} />
        <Tile className="lg:col-span-2 aspect-square" src={g[5].src} caption={g[5].caption} />
      </div>

      <div className="mt-4 sm:mt-5 grid gap-3 sm:gap-4 lg:gap-5 grid-cols-2 lg:grid-cols-4">
        <Tile className="aspect-[4/3]" src={g[0].src} caption={g[0].caption} />
        <Tile className="aspect-[4/3]" src={g[2].src} caption={g[2].caption} />
        <Tile className="aspect-[4/3]" src={g[4].src} caption={g[4].caption} />
        <Tile className="aspect-[4/3]" src={g[7].src} caption={g[7].caption} />
      </div>
    </section>
  );
};

const Tile = ({ src, caption, className = "", tone, big }) => (
  <figure className={`relative overflow-hidden rounded-[24px] bg-[rgb(var(--js-text))] group ${className}`}>
    <img
      src={src}
      alt={caption || "Junna Solar installation"}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
    {caption && (
      <figcaption className="absolute inset-x-4 bottom-4 text-white">
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11.5px] font-medium backdrop-blur ${
          tone === "accent" ? "bg-[rgb(var(--js-accent))]/90 text-white" : "bg-black/45 text-white"
        } ${big ? "sm:text-[13px] sm:px-4 sm:py-1.5" : ""}`}>
          {caption}
        </span>
      </figcaption>
    )}
  </figure>
);

export default Showreel;
