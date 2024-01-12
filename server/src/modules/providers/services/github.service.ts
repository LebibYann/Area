import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { OnEvent } from "@nestjs/event-emitter";
import { services } from "../../about/about.const";
import { GithubCreateIssuesDto, GithubGetIssuesDto } from "src/modules/area/dtos/githubActions.dto";

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

  @OnEvent(services[6].reactions[0].name)
  handleGithub0(data: GithubCreateIssuesDto) {
    console.log(services[6].reactions[0].name, 'triggered');
    this.makeCreateIssue(data.token, data.repos, data.owner, data.title, data.body);
  }

  async makeCreateIssue(accessToken:string, repos:string, owner:string, title:string, body:string): Promise<any> {
    const createIssue = `https://api.github.com/repos/${repos}/${owner}/issues`;

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
}