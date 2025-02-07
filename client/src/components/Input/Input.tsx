import "./InputStyle.scss";

type InputProps = {
  width: string;
  value?: number | null;
  onChange: (code: number | null) => void;
};

export function Input({ width, value, onChange }: InputProps) {
  return (
    <input
      className="input"
      type="number"
      style={{ width: width }}
      placeholder="Code"
      value={value ?? ""}
      maxLength={5}
      onChange={(e) => {
        const inputValue = e.target.value;

        if (inputValue.length > 5) return;

        const parsedValue = inputValue === "" ? null : parseInt(inputValue, 10);

        onChange(isNaN(parsedValue!) ? null : parsedValue);
      }}
    />
  );
}
