
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