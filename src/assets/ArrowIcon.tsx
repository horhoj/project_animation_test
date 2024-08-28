interface ArrowIconProps {
  isRight: boolean;
}

export const ArrowIcon = ({ isRight }: ArrowIconProps) => {
  const style: React.CSSProperties = isRight
    ? { transform: `rotateY(180deg)` }
    : {};

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <circle
        cx="25"
        cy="25"
        r="24.5"
        transform="matrix(-1 0 0 1 50 0)"
        stroke="#42567A"
        strokeOpacity="0.5"
      />
      <path
        d="M27.4999 18.75L21.2499 25L27.4999 31.25"
        stroke="#42567A"
        strokeWidth="2"
      />
    </svg>
  );
};
