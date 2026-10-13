import { lazy, Suspense, type ComponentType } from "react";

// next/dynamic stand-in for the preview build: React.lazy plus an empty fallback.
export default function dynamic<P extends object>(loader: () => Promise<ComponentType<P>>) {
  const Lazy = lazy(async () => ({ default: await loader() }));
  return function DynamicComponent(props: P) {
    return (
      <Suspense fallback={null}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}
