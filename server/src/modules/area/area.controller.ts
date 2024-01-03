import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "src/common/interfaces/requestwithUser.interface";

@ApiTags("area")
@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Create an area" })
  // TODO: Add swagger decorators
  async create(@Request() req: RequestWithUser, @Body() crateAreaDto: any) {
    return await this.areaService.create(
      req.user.id,
      crateAreaDto.serviceId,
      crateAreaDto.actionId
    );
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get all user's areas" })
  // TODO: Add swagger decorators
  async findByUser(@Request() req: RequestWithUser) {
    return await this.areaService.findByUser(req.user.id);
  }
}