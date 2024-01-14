import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { google } from 'googleapis';
import { OnEvent } from "@nestjs/event-emitter";
import { services } from "../../about/about.const";
import { GoogleSendMailDto } from "src/modules/area/dtos/googleActions.dto";
import { Credential } from "src/modules/auth/entities/credential.entity";
import { log } from "console";

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(GoogleService.name);

  @OnEvent(services[6].actions[0].name)
  async isTriggered (data:string): Promise<boolean> {
    const currentstate = await this.isLastMailRead(data);
    return currentstate;
  }

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

  @OnEvent(services[0].reactions[0].name)
  handleGoogle0(data: { credentials: Credential, parameters: GoogleSendMailDto }): void {
    this.logger.debug(`Sending mail triggered`);

    this.sendMail(
      data.credentials.accessToken,
      data.parameters.param1,
      data.parameters.param2,
      data.parameters.param3,
      data.parameters.param4,
    );
  }

  async sendMail(accessToken:string, from:string, to:string, subject:string, body:string): Promise<any> {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({access_token: accessToken});
    const gmail = google.gmail({version: 'v1', auth: oauth2Client});

    const email = `From: ${from}\r\nTo: ${to}\r\nSubject: ${subject}\r\n\r\n${body}`;

    const base64EncodedEmail = Buffer.from(email).toString('base64');

    try {
      const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: base64EncodedEmail,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        this.logger.debug(`API call success (GMail): ${response.data}`);
        return true;
      }
    } catch (error) {
      this.logger.error(`API call failed (GMail): ${error.message}`);
      return false;
    }
  }
}