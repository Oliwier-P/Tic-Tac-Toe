import "./FormButtonsStyle.scss";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";

import { socket } from "../../../socket";

export function FormButtons() {
  const handleCreateRoom = () => {
    socket.emit("create_room");
  };

  const handleJoinRoom = () => {
    socket.emit("join_room");
  };

  return (
    <div className="form_container flex">
      <form className="form flex">
        <Button text="Join" width="130px" fontSize="1rem" onClick={handleJoinRoom} />
        <Input width="130px" />
        <Button text="Create" width="280px" fontSize="1rem" onClick={handleCreateRoom} />
      </form>
    </div>
  );
}
