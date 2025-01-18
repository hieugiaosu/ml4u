import { Test, TestingModule } from '@nestjs/testing';
import { GpuReserveService } from './gpu-reserve.service';

describe('GpuReserveService', () => {
  let service: GpuReserveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpuReserveService],
    }).compile();

    service = module.get<GpuReserveService>(GpuReserveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
