import "./HomeButtonStyle.scss";

import home from "../../../assets/home.svg";
import { ButtonsContainerType } from "../../../types/ButtonsContainersType";

type HomeButtonProps = {
  onClick: (value: ButtonsContainerType) => void;
};

export function HomeButton({ onClick }: HomeButtonProps) {
  return (
    <button className="home_button" onClick={() => onClick("MODE")}>
      <img src={home} />
    </button>
  );
}
