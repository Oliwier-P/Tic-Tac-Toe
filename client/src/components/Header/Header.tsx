import "./HeaderStyle.scss";

import { ButtonsContainerType } from "../../types/ButtonsContainersType";

import { HomeButton } from "./HomeButton/HomeButton";
import { Title } from "./Title/Title";

type HeaderProps = {
  onClick: (value: ButtonsContainerType) => void;
};

export function Header({ onClick }: HeaderProps) {
  return (
    <div className="header flex">
      <HomeButton onClick={onClick} />
      <Title />
    </div>
  );
}
