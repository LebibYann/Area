import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';
import axios from "axios";
// import { google } from 'googleapis';

@Injectable()
export class ServiceEmitter {
    @OnEvent('Timer')
    handleTimer(data: any) {
        console.log('Event triggered');
    }

    @OnEvent('Weather')
    handleWeather(data: any) {
        console.log('Event triggered');
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