import "./HomeButtonStyle.scss";

import home from "../../assets/home.svg";

export function HomeButton() {
  return (
    <button className="home_button">
      <img src={home} />
    </button>
  );
}
