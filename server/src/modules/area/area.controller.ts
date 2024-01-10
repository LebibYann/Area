import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AreaService } from "./area.service";
import { AuthGuard } from "@nestjs/passport";
import { RequestWithUser } from "src/common/interfaces/requestwithUser.interface";
import { CreateAreaDto } from "./createArea.dto";
import { Area } from "./area.entity";

@ApiTags("area")
@Controller("area")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Get all user's areas" })
  @ApiOkResponse({ description: "The areas have been fetched", type: Area, isArray: true })
  @ApiUnauthorizedResponse({ description: "Invalid access token" })
  async findByUser(@Request() req: RequestWithUser) : Promise<Area[]> {
    return await this.areaService.findByUser(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @ApiBody({ type: CreateAreaDto })
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Create an area" })
  @ApiCreatedResponse({ description: "The area has been created", type: Area })
  @ApiUnauthorizedResponse({ description: "Invalid access token" })
  @ApiBadRequestResponse({ description: "Invalid trigger or action" })
  async create(
    @Request() req: RequestWithUser,
    @Body() crateAreaDto: CreateAreaDto
  ) : Promise<Area | null> {
    return await this.areaService.create(
      req.user.id,
      crateAreaDto.triggerId,
      crateAreaDto.actionId
    );
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Delete an area" })
  @ApiOkResponse({ description: "The area has been deleted" })
  @ApiUnauthorizedResponse({ description: "Invalid access token" })
  @ApiBadRequestResponse({ description: "Invalid area" })
  async delete(
    @Param("id") areaId: number,
    @Request() req: RequestWithUser
  ) : Promise<void> {
    const area = await this.areaService.findById(areaId);
    if (area == null || area.userId !== req.user.id) {
      throw new BadRequestException("Invalid area");
    }
    return await this.areaService.delete(areaId);
  }
}
