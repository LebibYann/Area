import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
// import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(GoogleService.name);

  async isLastMailRead(accessToken:string): Promise<any> {
    const apiGmailGetLastMail = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=-from%3Ame&access_token=${accessToken}`;

    try {
      const response = await firstValueFrom(this.httpService.get(apiGmailGetLastMail));
      if (response.status !== 200) {
        throw new Error(`API call failed (Google): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Google): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Google): ${error.message}`);
      return 0;
    }
  }

  async sendMail(accessToken:string, from:string, to:string, subject:string, body:string): Promise<any> {
    // const gmail = google.gmail({version: 'v1', auth: accessToken});

//     const email = `
//       From: ${from}
//       To: ${to}
//       Subject: ${subject}

//       ${body}
//     `;

//     const base64EncodedEmail = Buffer.from(email).toString('base64');

//     try {
//       const response = await gmail.users.messages.send({
//         userId: 'me',
//         requestBody: {
//           raw: base64EncodedEmail,
//         },
//       });
//       if (response.status >= 200 && response.status < 300) {
//         console.log('Issue created successfully');
//       }
//     } catch (error) {
//       console.log(`API call failed (GitHub): ${error.message}`);
//       return false;
//     }
  }
}