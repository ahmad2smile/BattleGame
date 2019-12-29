import { Test, TestingModule } from '@nestjs/testing';
import { AttacksService } from './attacks.service';

describe('AttacksService', () => {
  let service: AttacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttacksService],
    }).compile();

    service = module.get<AttacksService>(AttacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
