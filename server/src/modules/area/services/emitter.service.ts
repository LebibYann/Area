import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';
import { services } from "../../about/about.const";
import axios from "axios";
import { DiscordSendMessagesDto } from "../dtos/discordActions.dto";
// import { google } from 'googleapis';

@Injectable()
export class ServiceEmitter {

  @OnEvent(services[0].reactions[0].name)
  handleGmail0(data: any) {
    // makeSendEmail("","","","","");
    console.log(services[0].reactions[0].name, 'triggered');
  }

  @OnEvent(services[3].reactions[0].name)
  handleSpotify0(data: any) {
    makePlaySpotify("");
    console.log(services[3].reactions[0].name, 'triggered');
  }

  @OnEvent(services[5].reactions[0].name)
  handleTwitter0(data: any) {
    makeTweet("","");
    console.log(services[5].reactions[0].name, 'triggered');
  }

  @OnEvent(services[6].reactions[0].name)
  handleGithub0(data: any) {
    makeCreateIssue("","","","","");
    console.log(services[6].reactions[0].name, 'triggered');
  }

  @OnEvent('')
  handleTimer(data: any) {
  }
}

async function makePlaySpotify(accessToken:string): Promise<any> {
    const url = 'https://api.spotify.com/v1/me/player/play';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
        const response = await axios.put(url, { headers });
        if (response.status >= 200 && response.status < 300) {
          console.log('Action done');
        }
    } catch (error) {
        console.log(`API call failed (Spotify): ${error.message}`);
        return false;
    }
    return false;
}

async function makeTweet(accessToken:string, text:string): Promise<any> {
    const url = 'https://api.twitter.com/2/tweets/compose';

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const data = {
      status: text,
    };

    try {
        const response = await axios.post(url, data, { headers });

        if (response.status >= 200 && response.status < 300) {
          console.log('Tweet created successfully');
        }
      } catch (error) {
        console.log(`API call failed (Tweeter): ${error.message}`);
        return false;
      }

      return false;
}

async function makeDiscrodMesage(accessToken:string, text:string): Promise<any> {
  const url = 'https://discord.com/api/webhooks/1194974339469148211/pZdLvt2LfgfTXnsImu3iSizmbDla4uMrDkB4knBw4Es9Achkv571IiRaT4vO8rdWVtWD';

  try {
      const response = await axios.post(url, {
        content: text,
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('Discord Message send created successfully');
      }
    } catch (error) {
      console.log(`API call failed (Discord): ${error.message}`);
      return false;
    }

    return false;
}

async function makeCreateIssue(accessToken:string, repos:string, owner:string, title:string, body:string, ): Promise<any> {
    const url = `https://api.github.com/repos/${repos}/${owner}/issues`;

    const headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    };

    const data = {
      title: title,
      body: body
    };

    try {
      const response = await axios.post(url, data, { headers });
      if (response.status >= 200 && response.status < 300) {
        console.log('Issue created successfully');
      }
    } catch (error) {
      console.log(`API call failed (GitHub): ${error.message}`);
      return false;
    }

    return false;
}

// async function makeSendEmail(accessToken:string, from:string, to:string, subject:string, body:string): Promise<any> {
//     const gmail = google.gmail({version: 'v1', auth: accessToken});

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
// }