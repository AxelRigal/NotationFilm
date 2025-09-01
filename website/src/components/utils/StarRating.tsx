export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.3rem",
        fontSize: "2rem",
        cursor: "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => onChange(i)}
          style={{
            color: i <= value ? "#ffd700" : "#ccc",
            transition: "color 0.2s",
            userSelect: "none",
          }}
          aria-label={`${i} étoile${i > 1 ? "s" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
