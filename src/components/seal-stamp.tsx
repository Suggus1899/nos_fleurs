import { cn } from "@/lib/utils";

export function SealStamp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "text-brass transition-transform duration-500 ease-out group-hover:rotate-12",
        className,
      )}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text
        x="50"
        y="46"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-fraunces)"
        fontStyle="italic"
        fontSize="13"
      >
        Nos
      </text>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-fraunces)"
        fontStyle="italic"
        fontSize="13"
      >
        Fleurs
      </text>
    </svg>
  );
}
