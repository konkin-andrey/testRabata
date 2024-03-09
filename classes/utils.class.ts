
import MailosaurClient from "mailosaur";

export class Utils {


  async getMailLink(apiKey: string, mail: string) {
    const mailosaur = new MailosaurClient(apiKey);
    const criteria = {
      sentTo: mail + "@mailosaur.net"
    }
    const email = await mailosaur.messages.get(mail, criteria)
    return email.html.links.find(el => el.href.includes("verif"));
  }
}


export const delay = ms => new Promise(r => setTimeout(r, ms));

export function getRandomInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}