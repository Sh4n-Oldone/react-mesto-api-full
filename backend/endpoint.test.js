const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('Проверяем запросы', () => {
  // it ('Проверяет логин', () => {
  //   return request.post('/signin').send({email: 'test1test1@yandex.ru', password: 'qweqweqwe'}).then((response) => {
  //     expect(response.status).toBe(200);
  //     expect(response.cookie).toBe('access_token', '06de15281f90a21a9518539ae039543ea7b32a2f52dc742793a78b35f0becf24', {
  //       httpOnly: true,
  //       expires: '7d',
  //     })
  //   })
  // });
  it ('Тестим тесты', () => {
    expect(2).toBe(2);
  });
});