import "./ResetStyle.scss";

import reset from "../../../assets/reset.svg";

type ResetProps = {
  onClick: () => void;
};

export function Reset({ onClick }: ResetProps) {
  return (
    <button className="reset_button" onClick={onClick}>
      <img src={reset} />
    </button>
  );
}
