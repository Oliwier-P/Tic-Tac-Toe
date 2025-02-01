import "./BoxStyle.scss";

type BoxProps = {
  value: string;
  onClick: () => void;
};

export function Box({ value, onClick }: BoxProps) {
  return (
    <div
      className="game_box flex"
      style={{ cursor: value ? "default" : "pointer" }}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
