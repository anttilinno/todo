import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

(BigInt.prototype as any).toJSON = function () {
  return Number(this)
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todos (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/todos');

    console.log(result.body);

    return true;

  });
});
