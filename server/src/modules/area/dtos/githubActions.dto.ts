import { ApiProperty } from "@nestjs/swagger";

export class GithubCreateIssuesDto {
  @ApiProperty({
    example: "test",
    description: "The repos where the issue will be created",
  })
  param1: string;

  @ApiProperty({
    example: "Test",
    description: "The owner of the repos",
  })
  param2: string;

  @ApiProperty({
    example: "Call api",
    description: "The title of the issue",
  })
  param3: string;

  @ApiProperty({
    example: "All call api are needed",
    description: "The body of the issue",
  })
  param4: string;
}

export class GithubCreateRepoDto {
  @ApiProperty({
    example: "test",
    description: "The repos where the issue will be created",
  })
  param1: string;

  @ApiProperty({
    example: "Test",
    description: "The description of the repos",
  })
  param2: string;
}

export class GithubGetIssuesDto {
    @ApiProperty({
      example: "gtgbhfijbsdiuvoriubivbfd",
      description: "The acces token of github",
    })
    token: string;
  
    @ApiProperty({
      example: "70",
      description: "The number of issues",
    })
    issues: number;
  }