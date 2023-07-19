import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestUtils } from './utils/test.utils';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testUtils = new TestUtils(app);
  });

  it('/todos (POST)', async () => {
    const result = (await request(app.getHttpServer()).post('/todos').send({ title: 'My first todo', content: 'First todo description' }));

    console.log(result.body);

    return true;
  });

  it.only('/todos (GET)', async () => {
    const todo = await testUtils.createTodo({ title: 'Test todo', content: 'Long description of test todo' });

    const result = await request(app.getHttpServer()).get('/todos');
    expect(result.body).toContainEqual(todo);
  });

  it('/todos/:id (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/todos/7');

    console.log(result.body);

    return true;
  });

  it('/todos/:id (PATCH)', async () => {
    const result = (await request(app.getHttpServer()).patch('/todos/7').send({ title: 'My first patched todo', content: 'First todo patched description' }));

    console.log(result.body);

    return true;
  });

  it('/todos/:id (DELETE)', async () => {
    const result = (await request(app.getHttpServer()).delete('/todos/7'));

    console.log(result.body);

    return true;
  });
});
