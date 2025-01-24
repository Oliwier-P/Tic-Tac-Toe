import "./ModeButtonsStyle.scss";

import { Button } from "../../Button/Button";

import { ButtonsContainerType } from "../../../types/ButtonsContainersType";

type ModeButtonsProps = {
  onClick: (value: ButtonsContainerType) => void;
};

export function ModeButtons({ onClick }: ModeButtonsProps) {
  return (
    <div className="mode_container flex">
      <Button
        text={"Player vs Player"}
        width="200px"
        fontSize="1rem"
        onClick={() => onClick("FORM")}
      />
      <Button
        text="Player vs AI"
        width="200px"
        fontSize="1rem"
        onClick={() => onClick("DIFFICULTY")}
      />
    </div>
  );
}
