import { Header } from "../components/Header/Header";

import { ModeButtons } from "../components/ButtonContainers/ModeButtons/ModeButtons";
import { DifficultyButtons } from "../components/ButtonContainers/DifficultyButtons/DifficultyButtons";
import { FormButtons } from "../components/ButtonContainers/FormButtons/FormButtons";

export function Home() {
  return (
    <>
      <Header />
      <ModeButtons />
    </>
  );
}
