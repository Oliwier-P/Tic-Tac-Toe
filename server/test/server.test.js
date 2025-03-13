import { beforeAll, afterAll, describe, it, expect, beforeEach } from "vitest";
import { createServer } from "node:http";
import { io as ioc } from "socket.io-client";
import { Server } from "socket.io";

function waitFor(socket, event) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe("Socket IO Tests", () => {
  const roomData = new Map();
  const roomCode = "room1";
  let io, serverSocket, clientSocket, port;

  beforeAll(() => {
    return new Promise((resolve) => {
      const httpServer = createServer();
      io = new Server(httpServer);

      httpServer.listen(() => {
        port = httpServer.address().port;
        clientSocket = ioc(`http://localhost:${port}`);

        io.on("connection", (socket) => {
          serverSocket = socket;
        });

        clientSocket.on("connect", resolve);
      });
    });
  });

  beforeEach(() => {
    // Clear roomData to ensure test isolation
    roomData.clear();

    // Register the listener once before each test
    serverSocket.on("create_room", (roomCode, callback) => {
      const roomExists = roomData.has(roomCode);

      if (!roomExists) {
        roomData.set(roomCode, new Set());
        roomData.get(roomCode).add(clientSocket.id);
      }

      callback(roomExists);
    });
    serverSocket.on("join_room", (roomCode, callback) => {
      const roomExists = !roomData.has(roomCode) ? "non-existent" : Array.from(roomData.get(roomCode)).length < 2 ? "join" : "full";

      if (roomExists == "join") roomData.get(roomCode).add(serverSocket.id);

      callback(roomExists);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  it("Should create a new room if it doesn't exist", () => {
    return new Promise((resolve, reject) => {
      clientSocket.emit("create_room", roomCode, (roomExists) => {
        try {
          expect(roomExists).toBe(false);
          expect(roomData.has(roomCode)).toBe(true);
          expect(roomData.get(roomCode).has(clientSocket.id)).toBe(true);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  it("Should not create an existing room", () => {
    return new Promise((resolve, reject) => {
      roomData.set(roomCode, new Set([clientSocket.id]));

      clientSocket.emit("create_room", roomCode, (roomExists) => {
        try {
          expect(roomExists).toBe(true);
          expect(roomData.has(roomCode)).toBe(true);
          expect(roomData.get(roomCode).has(clientSocket.id)).toBe(true);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  it("Should allow a second player to join a room", async () => {
    const clientSocket2 = ioc(`http://localhost:${port}`);

    roomData.set(roomCode, new Set([clientSocket.id]));

    await new Promise((resolve) => {
      clientSocket2.on("connect", resolve);
    });

    await new Promise((resolve) => {
      clientSocket.emit("join_room", roomCode, (roomExists) => {
        try {
          expect(roomExists).toBe("join");
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });

    clientSocket2.disconnect();
  });

  it("Should not allow a third player to join a room", () => {
    roomData.set(roomCode, new Set(["userid1", "userid2"]));

    return new Promise((resolve, reject) => {
      clientSocket.emit("join_room", roomCode, (roomExists) => {
        try {
          expect(roomExists).toBe("full");
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });

  it("Should find that the room does not exist", () => {
    return new Promise((resolve, reject) => {
      clientSocket.emit("join_room", roomCode, (roomExists) => {
        try {
          expect(roomExists).toBe("non-existent");
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  });
});
