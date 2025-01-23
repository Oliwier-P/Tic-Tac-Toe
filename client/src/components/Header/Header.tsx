import "./HeaderStyle.scss";

import { HomeButton } from "./HomeButton/HomeButton";
import { Title } from "./Title/Title";

export function Header() {
  return (
    <div className="header flex">
      <HomeButton />
      <Title />
    </div>
  );
}
