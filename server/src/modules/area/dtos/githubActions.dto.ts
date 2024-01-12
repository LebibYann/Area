import { ApiProperty } from "@nestjs/swagger";

export class GithubCreateIssuesDto {
  @ApiProperty({
    example: "gtgbhfijbsdiuvoriubivbfd",
    description: "The acces token of github",
  })
  token: string;

  @ApiProperty({
    example: "test",
    description: "The repos where the issue will be created",
  })
  repos: string;

  @ApiProperty({
    example: "Test",
    description: "The owner of the repos",
  })
  owner: string;

  @ApiProperty({
    example: "Call api",
    description: "The title of the issue",
  })
  title: string;

  @ApiProperty({
    example: "All call api are needed",
    description: "The body of the issue",
  })
  body: string;
}