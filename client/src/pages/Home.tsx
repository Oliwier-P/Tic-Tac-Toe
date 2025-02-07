import { useState } from "react";

import { ButtonsContainerType } from "../types/ButtonsContainersType";

import { Header } from "../components/Header/Header";
import { ModeButtons } from "../components/ButtonContainers/ModeButtons/ModeButtons";
import { DifficultyButtons } from "../components/ButtonContainers/DifficultyButtons/DifficultyButtons";
import { FormButtons } from "../components/ButtonContainers/FormButtons/FormButtons";

export function Home() {
  const [buttonsContainer, setButtonsContainer] = useState<ButtonsContainerType>("MODE");

  const handleChangeButtons = (value: ButtonsContainerType) => {
    setButtonsContainer(() => value);
  };

  return (
    <>
      <Header onClick={handleChangeButtons} />
      {buttonsContainer == "MODE" && <ModeButtons onClick={handleChangeButtons} />}
      {buttonsContainer == "FORM" && <FormButtons />}
      {buttonsContainer == "DIFFICULTY" && <DifficultyButtons />}
    </>
  );
}
