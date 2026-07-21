// Rating bintang (tampilan). value 0..5
interface StarRatingProps {
  value?: number;
  count?: number;
  size?: number;
}

export default function StarRating({ value = 0, count, size = 15 }: StarRatingProps) {
  const full = Math.round(value);
  return (
    <span className="stars" aria-label={`Rating ${value} dari 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={n <= full ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={1.5}
          className={n <= full ? 'star is-on' : 'star'}
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
        </svg>
      ))}
      {typeof count === 'number' && <span className="stars-count">({count})</span>}
    </span>
  );
}
