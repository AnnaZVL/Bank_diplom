import { autorization } from '../../js/server';

describe('Авторизация пользователя', () => {
  it('Авторизация пользователя при правильном логине/пароле', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ payload: 'token' }),
    }));

    const login = 'developer';
    const password = 'skillbox';

    await expect(autorization(login, password)).resolves.not.toThrow();
  });

  it('Авторизация пользователя при не правильном логине/пароле', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ error: 'No such user' }),
    }));

    const login = 'invalidLogin';
    const password = 'invalidPassword';

    await expect(autorization(login, password)).rejects.toThrow('No such user');
  });

  it('Проверка на ожидаемые данные по запросу', async () => {
    const login = 'developer';
    const password = 'skillbox';
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        body: {
          login,
          password,
        },
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    }));

    await autorization(login, password);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/login', {
      body: JSON.stringify({
        login,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
