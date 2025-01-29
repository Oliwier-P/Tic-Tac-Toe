export type GameDataType = {
  roomCode: number | null;
  status: "GAME" | "WAIT" | "END";
  turn: string;
};
