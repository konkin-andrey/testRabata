
import { Inbox } from "mailinator-inbox"

export class Utils {







  async createMailBox(mailName: string) {
    const inbox = new Inbox(mailName);
  }
}