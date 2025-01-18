import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GpuController } from './gpu.controller';
import { GpuActivityMapperProfile } from './mapper/gpu-activity.mapper-profile';
import { GpuMapperProfile } from './mapper/gpu.mapper-profile';
import { GpuActivityRepository } from './repository/gpu-activity.repository';
import { GpuRepository } from './repository/gpu.repository';
import { GpuActivity, GpuActivitySchema } from './schemas/gpu-activity.schema';
import { Gpu, GpuSchema } from './schemas/gpu.schema';
import { GpuReserveService } from './services/gpu-reserve.service';
import { GpuService } from './services/gpu.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Gpu.name, schema: GpuSchema},
      {name: GpuActivity.name, schema: GpuActivitySchema}
    ])
  ],
  controllers: [GpuController],
  providers: [
    GpuReserveService, 
    GpuService,
    GpuMapperProfile,
    GpuActivityMapperProfile,
    {
      provide: "IGpuActivityRepository",
      useClass: GpuActivityRepository
    },
    {
      provide: "IGpuRepository",
      useClass: GpuRepository
    }
  ]
})
export class GpuModule {}
