import type { CSSProperties } from "react";

// Logos are inlined as data URIs so the preview is one self-contained file.
const LOGOS = import.meta.glob("../../public/logos/*.png", {
  eager: true,
  query: "?inline",
  import: "default",
}) as Record<string, string>;

const BY_PATH: Record<string, string> = Object.fromEntries(
  Object.entries(LOGOS).map(([file, uri]) => [`/logos/${file.split("/").pop()}`, uri]),
);

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

export default function Image({ src, alt, width, height, className, style, priority }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BY_PATH[src] ?? src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
    />
  );
}
