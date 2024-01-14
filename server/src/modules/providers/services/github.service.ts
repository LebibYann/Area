import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { OnEvent } from "@nestjs/event-emitter";
import { services } from "../../about/about.const";
import { GithubCreateIssuesDto, GithubGetIssuesDto, GithubCreateRepoDto } from "src/modules/area/dtos/githubActions.dto";
import { Credential } from "src/modules/auth/entities/credential.entity";

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService
  ) { }

  logger = new Logger(GithubService.name);

  @OnEvent(services[6].actions[0].name)
  async isTriggered (data: GithubGetIssuesDto): Promise<boolean> {
    const currentIssues = await this.getGithubIssues(data.token);
    return currentIssues >= data.issues;
  }

  async getGithubIssues(accessToken:string): Promise<any> {
    const apiGithubGetIssues = 'https://api.github.com/issues';

    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
    try {
      const response = await firstValueFrom(this.httpService.get(apiGithubGetIssues, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Github): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Github): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Github): ${error.message}`);
      return 0;
    }
  }




  @OnEvent(services[6].actions[1].name)
  async isNewFollower (data: {credentials: Credential, parameters: any}): Promise<boolean> {
    const nbFollowers = await this.getNbFollowers(data.credentials.accessToken);
    if (nbFollowers > data.parameters.param1) {
      return true;
    }
    return false;
  }

  async getNbFollowers (accessToken: string): Promise<number> {
    const apiEndpoint = "https://api.github.com/user";
    // this.logger.debug(`Github accessToken: ${accessToken}`);
    try {
      const response = await firstValueFrom(this.httpService.get(apiEndpoint,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${accessToken}`,
          }
        }
        ));
      if (response.status !== 200) {
        throw new Error(`API call failed (Github): ${response.statusText}`);
      }
      return response.data.followers;
    } catch (error) {
      console.log(`API call failed (Github): ${error.message}`);
      return 0;
    }
  }




  @OnEvent(services[6].reactions[0].name)
  handleGithub0(data: {credentials: any, parameters: GithubCreateIssuesDto}) {
    console.log(services[6].reactions[0].name, 'triggered');
    this.makeCreateIssue(data.credentials.access_token, data.parameters.param1, data.parameters.param2, data.parameters.param3, data.parameters.param4);
  }

  async makeCreateIssue(accessToken:string, owner:string, repos:string, title:string, body:string): Promise<any> {
    const createIssue = `https://api.github.com/repos/${owner}/${repos}/issues`;

    const headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${accessToken}`
    };

    const data = {
      title: title,
      body: body
    };

    try {
      const response = await firstValueFrom(this.httpService.post(createIssue, data, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Github): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Github): ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`API call failed (Github): ${error.message}`);
      return 0;
    }
  }

  @OnEvent(services[6].reactions[1].name)
  handleGithub1(data: {credentials: any, parameters: GithubCreateRepoDto}) {
    console.log(services[6].reactions[1].name, 'triggered');
    this.makeCreateRepo(data.credentials.accessToken, data.parameters.param1, data.parameters.param2);
  }

  async makeCreateRepo(accessToken:string, name:string, description:string): Promise<any> {
    const createRepo = `https://api.github.com/user/repos`;

    const headers = {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${accessToken}`
    };

    const data = {
      name: name,
      description: description
    };

    try {
      const response = await firstValueFrom(this.httpService.post(createRepo, data, {headers}));
      if (response.status !== 200) {
        throw new Error(`API call failed (Github): ${response.statusText}`);
      }
      this.logger.debug(`API call success (Github): ${response.data}`);
      return 1;
    } catch (error) {
      this.logger.error(`API call failed (Github): ${error.message}`);
      return 0;
    }
  }
}