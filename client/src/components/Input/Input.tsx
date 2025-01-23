import "./InputStyle.scss";

type InputProps = {
  width: string;
};

export function Input({ width }: InputProps) {
  return <input className="input" style={{ width: width }} placeholder="Code" />;
}
