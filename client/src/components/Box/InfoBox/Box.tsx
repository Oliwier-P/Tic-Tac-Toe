import "./BoxStyle.scss";

type BoxProps = {
  info: string;
  value: string;
};

export function Box({ info, value }: BoxProps) {
  return (
    <div className={`box flex`}>
      <span>{info}:</span>
      <span style={{ fontSize: "2rem" }}>{value}</span>
    </div>
  );
}
