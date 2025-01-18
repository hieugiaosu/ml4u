import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBaseRepository } from '../../../common/base.interface';
import { BaseRepository } from '../../../common/base.repository';
import { GpuActivity } from '../schemas/gpu-activity.schema';

export interface IGpuActivityRepository extends IBaseRepository<GpuActivity> {}

@Injectable()
export class GpuActivityRepository
  extends BaseRepository<GpuActivity>
  implements IGpuActivityRepository
{
  constructor(@InjectModel(GpuActivity.name) private gpuActivityModel: Model<GpuActivity>) {
    super(gpuActivityModel);
  }
}
