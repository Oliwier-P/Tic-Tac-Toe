import { TurnType } from "./TurnType";

export type GameDataType = {
  roomCode: number | null;
  status: "GAME" | "WAIT" | "END";
  turn: TurnType;
};
