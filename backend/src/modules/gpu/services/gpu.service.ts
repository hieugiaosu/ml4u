import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateGpuDto, GpuDto } from '../dtos/gpu.dto';
import { IGpuRepository } from '../repository/gpu.repository';
import { Gpu } from '../schemas/gpu.schema';

@Injectable()
export class GpuService {
    constructor(
        @Inject('IGpuRepository') private readonly gpuRepo: IGpuRepository,
        @InjectMapper()
        private mapper: Mapper,
    ){}

    async createGpu(body: CreateGpuDto): Promise<GpuDto> {
        const existGpu = await this.gpuRepo.findByConditions({name: body.name});
        if (existGpu) {
            throw new BadRequestException();
        }
        const gpuDocs = await this.gpuRepo.create({
            name: body.name,
            modelName: body.modelName
        })
        return this.mapper.map(gpuDocs,Gpu,GpuDto);
    }
}
