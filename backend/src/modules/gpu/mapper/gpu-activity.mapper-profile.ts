import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GpuActivityDto } from '../dtos/gpu-activity.dto';
import { GpuActivity } from '../schemas/gpu-activity.schema';


@Injectable()
export class GpuActivityMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        GpuActivity,
        GpuActivityDto,
        forMember(
          (destination) => destination._id,
          mapFrom((source) => source._id.toString()),
        ),
        forMember(
          (destination) => destination.gpuId,
          mapFrom((source) => source.gpuId.toString()),
        ),
        forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.userId.toString()),
        ),
      );
    };
  }
}
