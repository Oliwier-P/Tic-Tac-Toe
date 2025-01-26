import "./BoxStyle.scss";

export function Box() {
  return (
    <div className={`turn_box flex`}>
      <span>Turn:</span>
      <span style={{ fontSize: "2rem" }}>O</span>
    </div>
  );
}
