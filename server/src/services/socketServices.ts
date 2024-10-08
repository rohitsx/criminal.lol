import { Server } from "socket.io";
import socketDatabaseHelper from "./socketServiceHelper";
import makePair from "../utils/makePair";

export default class socketServices {
  private io: Server;
  private dbHelper: socketDatabaseHelper;

  constructor(io: Server) {
    this.io = io;
    this.dbHelper = new socketDatabaseHelper();
  }

  private emitWaitingStatus(socketId: string): void {
    this.io.to(socketId).emit("waitingForOtherToJoin");
  }

  async handleUserJoin(socketId: string, username: string): Promise<void> {
    try {
      console.log('send request', username);
      
      const checkSocketUpdate = await this.dbHelper.updateActiveUser(
        username,
        socketId
      );

      const activeUsersLen = await this.dbHelper.getActiveUsersLength();

      if (!activeUsersLen) return;

      if (Number(activeUsersLen) === 0) {
        await this.dbHelper.addToActiveUsers(socketId, username);
      } else {
        await makePair(username, socketId, activeUsersLen, this.io);
      }
    } catch (error) {
      console.error("Error in handleUserJoin:", error);
      throw error;
    }
  }

  async handleUserSkip(
    pairedId: string,
    socketId: string,
    username: string
  ): Promise<void> {
    try {
      await this.handleUserJoin(socketId, username);
      this.io.to(pairedId).emit("strangerLeft");
    } catch (error) {
      console.error("Error in handleUserLeave:", error);
      throw error;
    }
  }

  async handleCallEnd(pairedId: string, username: string, socketId : string): Promise<void> {
    console.log("handel tab close working", pairedId);

    try {
      pairedId && this.io.to(pairedId).emit("strangerLeft");
      await this.dbHelper.deleteFromActiveUsers(username, socketId);
    } catch (err) {
      console.log(err);
    }
  }
}
