import "./BoxStyle.scss";

type BoxProps = {
  value: string;
  animation: boolean;
  onClick: () => void;
};

export function Box({ value, animation, onClick }: BoxProps) {
  return (
    <div
      className="game_box flex"
      style={{ cursor: value ? "default" : "pointer" }}
      onClick={onClick}
    >
      <div
        id="game_box"
        className={`${value == "O" ? "circle" : value == "X" ? "cross" : ""} ${
          animation ? "pulse glow" : ""
        }`}
      ></div>
    </div>
  );
}
