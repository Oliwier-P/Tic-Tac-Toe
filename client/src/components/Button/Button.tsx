import "./ButtonStyle.scss";

type ButtonProps = {
  text: string;
  width: string;
  fontSize: string;
  onClick: () => void;
};

export function Button({ text, width, fontSize, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} style={{ width: width, fontSize: fontSize }}>
      {text}
    </button>
  );
}
