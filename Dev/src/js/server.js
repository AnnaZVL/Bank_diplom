// Авторизация пользователя
export async function autorization(login, password) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then((data) => data.json());

  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}

// Получение списка счетов по токену
export async function getAccounts(token) {
  const response = await fetch('http://localhost:3000/accounts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());

  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}

// Получение подробных данных по счету по токену
export async function getAccount(id, token) {
  const response = await fetch(`http://localhost:3000/account/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());

  if (response.error) {
    throw new Error(response.error);
  }

  // console.log('res', response);
  return response;
}

// Создание нового счета
export async function createdAccount(token) {
  const response = await fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
}

// Перевод денег между счетами
export async function getTransfer(token, from, to, amount) {
  // console.log('tok', token);
  const response = await fetch('http://localhost:3000/transfer-funds', {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
}

// Получение данных по валютам
export async function getCurrencies(token) {
  const response = await fetch('http://localhost:3000/currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }
  // console.log('res', data);
  return response;
}

// Получение данных по текущему курсу
// export async function getWesocketCurrencies() {
// export const socket = new WebSocket('ws://localhost:3000/currency-feed');
// return socket;
// , {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     authorization: `Basic ${token}`,
//   },
// }).then((res) => res.json());

// if (response.error) {
//   throw new Error(response.error);
// }
// console.log('resWeb', response);
// return response;
// }

// Получение данных по всем используемым валютам
export async function getAllCurrencies() {
  const response = await fetch('http://localhost:3000/all-currencies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }
  // console.log('res', data);
  return response;
}

// Перевод валют
export async function getCurrencyBuy(token, from, to, amount) {
  const response = await fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Basic ${token}`,
    },
  }).then((data) => data.json());

  if (response.error) {
    throw response.error;
  }

  return response;
}

// Получение списка точек банкоматов
export async function getBanks() {
  const response = await fetch('http://localhost:3000/banks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  if (response.error) {
    throw new Error(response.error);
  }
  return response;
}
