export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <svg className="h-10 w-10 animate-spin " viewBox="0 0 50 50" fill="none">
        <circle
          className="stroke-current"
          cx="25"
          cy="25"
          r="20"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90,150"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
}
