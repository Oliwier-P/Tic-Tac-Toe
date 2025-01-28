import "./ButtonStyle.scss";

type ButtonProps = {
  text: string;
  width: string;
  fontSize: string;
  onClick: (code?: number) => void;
};

export function Button({ text, width, fontSize, onClick }: ButtonProps) {
  return (
    <button onClick={() => onClick()} style={{ width: width, fontSize: fontSize }}>
      {text}
    </button>
  );
}
