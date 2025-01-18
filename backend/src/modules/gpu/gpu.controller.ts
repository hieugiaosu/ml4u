import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRolesGuard } from '../auth/auth.guard';
import { CreateGpuDto, GpuDto } from './dtos/gpu.dto';
import { GpuReserveService } from './services/gpu-reserve.service';
import { GpuService } from './services/gpu.service';

@Controller('gpu')
@ApiTags('gpu')
export class GpuController {
    constructor(
        private readonly gpuService: GpuService,
        private readonly gpuActivityService: GpuReserveService
    ){}

    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Create a mew gpu',
        description: 'Create a new gpu with the given name',
    })
    @ApiResponse({
        status: 200,
        description: 'The gpu has been created successfully',
        type: GpuDto
    })
    @UseGuards(AdminRolesGuard)
    @HttpCode(HttpStatus.OK)
    @Post('')
    createNewGpu(
        @Body() body: CreateGpuDto
    ) { 
        return this.gpuService.createGpu(body);
    }
}
