/** Speech bubble with a smile, as on the hosted application page's chat launcher. */
export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.5 3h13A2.5 2.5 0 0 1 21 5.5V21l-3.6-2.7H5.5A2.5 2.5 0 0 1 3 15.8V5.5A2.5 2.5 0 0 1 5.5 3z"
      />
      <path
        d="M7.5 12.6c2.6 1.9 6.4 1.9 9 0"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
