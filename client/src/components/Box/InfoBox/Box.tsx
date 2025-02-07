import "./BoxStyle.scss";

type BoxProps = {
  info: string;
  value: string;
};

export function Box({ info, value }: BoxProps) {
  return (
    <div className={`box flex`}>
      <span>{info}:</span>
      <span
        style={{
          color: value === "O" ? "var(--secondary)" : "inherit",
          fontSize: "2rem",
        }}
      >
        {value}
      </span>
    </div>
  );
}
