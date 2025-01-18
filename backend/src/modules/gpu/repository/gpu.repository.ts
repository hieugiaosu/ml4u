import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBaseRepository } from '../../../common/base.interface';
import { BaseRepository } from '../../../common/base.repository';
import { Gpu } from '../schemas/gpu.schema';

export interface IGpuRepository extends IBaseRepository<Gpu> {}

@Injectable()
export class GpuRepository
  extends BaseRepository<Gpu>
  implements IGpuRepository
{
  constructor(@InjectModel(Gpu.name) private gpuModel: Model<Gpu>) {
    super(gpuModel);
  }
}
