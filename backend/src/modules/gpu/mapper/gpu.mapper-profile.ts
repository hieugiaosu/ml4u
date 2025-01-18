import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { GpuDto } from '../dtos/gpu.dto';
import { Gpu } from '../schemas/gpu.schema';


@Injectable()
export class GpuMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Gpu,
        GpuDto,
        forMember(
          (destination) => destination._id,
          mapFrom((source) => source._id.toString()),
        ),
        forMember(
          (destination) => destination.inUsedBy,
          mapFrom((source) => source.inUsedBy?.toString() || null),
        ),
        forMember(
          (destination) => destination.calendar,
          mapFrom((source) =>
            source.calendar.map((entry) => ({
              ...entry,
              userId: entry.userId.toString(),
              reserveId: entry.reserveId.toString(),
            })),
          ),
        ),
      );
    };
  }
}
