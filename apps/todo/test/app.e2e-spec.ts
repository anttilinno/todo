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

    expect(result.body).toMatchObject({ title: 'My first todo', content: 'First todo description' });
  });

  it('/todos (GET)', async () => {
    const todo = await testUtils.createTodo({ title: 'Test todo', content: 'Long description of test todo' });
    const result = await request(app.getHttpServer()).get('/todos');

    expect(result.body).toContainEqual(todo);
  });

  it('/todos/:id (GET)', async () => {
    const todo = await testUtils.createTodo({ title: 'Test todo', content: 'Long description of test todo' });
    const result = await request(app.getHttpServer()).get(`/todos/${todo.id}`);

    expect(result.body).toEqual(todo);
  });

  it('/todos/:id (PATCH)', async () => {
    const todo = await testUtils.createTodo({ title: 'Test todo', content: 'Long description of test todo' });
    const result = (await request(app.getHttpServer()).patch(`/todos/${todo.id}`).send({ title: 'My first patched todo', content: 'First todo patched description' }));

    expect(result.body).toEqual({ id: todo.id, title: 'My first patched todo', content: 'First todo patched description' });
  });

  it('/todos/:id (DELETE)', async () => {
    const todo = await testUtils.createTodo({ title: 'Test todo', content: 'Long description of test todo' });
    const result = (await request(app.getHttpServer()).delete(`/todos/${todo.id}`));

    expect(result.body).toEqual(todo);
  });
});
