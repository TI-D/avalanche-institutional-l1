export function AvalancheMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="15" fill="#E84142" />
      <path
        d="M16.1 7.2 22.8 21.4h-3.3l-1.2-2.6h-4.6l-1.2 2.6H9.2L16.1 7.2Zm0 5.1-1.7 3.7h3.4L16.1 12.3Z"
        fill="#ffffff"
      />
    </svg>
  );
}
