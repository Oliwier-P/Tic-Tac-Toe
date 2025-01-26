import "./FormButtonsStyle.scss";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";

import { socket } from "../../../socket";

export function FormButtons() {
  const handleJoinRoom = () => {
    console.log("Clicked");
    socket.emit("join_room");
  };

  return (
    <div className="form_container flex">
      <form className="form flex" action="/game">
        <Button text="Join" width="130px" fontSize="1rem" onClick={handleJoinRoom} />
        <Input width="130px" />
        <Button text="Create" width="280px" fontSize="1rem" onClick={handleJoinRoom} />
      </form>
    </div>
  );
}
