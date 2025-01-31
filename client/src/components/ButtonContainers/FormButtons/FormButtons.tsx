import "./FormButtonsStyle.scss";

import { useState } from "react";

import { socket } from "../../../socket";

import { useNavigate } from "react-router-dom";

import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input";

export function FormButtons() {
  const [roomCode, setRoomCode] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const attemptToCreateRoom = () => {
      const newCode = generateRandomRoomCode();

      socket.emit("create_room", newCode, (exists: boolean) => {
        if (exists) {
          attemptToCreateRoom();
        } else {
          navigate("/game", { state: { gameMode: "ONILNE", difficulty: "NONE" } });
        }
      });
    };

    attemptToCreateRoom();
  };

  const handleJoinRoom = (code: number) => {
    if (roomCode == null) {
      alert("Please enter a room code.");
      return;
    }

    socket.emit("join_room", code, (response: string) => {
      switch (response) {
        case "join":
          navigate("/game");
          break;
        case "non-existent":
          alert(`Room "${code}" does not exist.`);
          break;
        case "full":
          alert(`Room is currently full.`);
          break;
      }
    });
  };

  const handleChangeCode = (code: number | null) => {
    setRoomCode(code);
  };

  const generateRandomRoomCode = (): number => {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    return randomNumber;
  };

  return (
    <div className="form_container flex">
      <div className="form flex ">
        <Button
          text="Join"
          width="130px"
          fontSize="1rem"
          onClick={() => handleJoinRoom(roomCode!)}
        />
        <Input width="130px" value={roomCode} onChange={handleChangeCode} />
        <Button text="Create" width="280px" fontSize="1rem" onClick={handleCreateRoom} />
      </div>
    </div>
  );
}
