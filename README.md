#Приложение банковской системы для операций с криптовалютами.

Приложение реализовано с использованием сборщика Webpack, SCSS, библиотек: Сhoices.js, just-validate. Адаптивная, кроссбраузерная верстка. Данные по счетам пользователя получены по API. Данные по изменениям курса валют получены по Websocket. Для тестирования использованы jest.js и cypress.

##Запуск
Для запуска Приложения необходимо установить репозиторий и в терминале последовательно ввести команды npm init, npm run dev. Так же необходимо запустить сервер в папке js-advanced-diploma (отдельная инструкция внутри).

###Страницы Приложения и реализованый функционал.
#### Страница входа:
- вход авторизованного пользвателя с валидацией полей формы входа с использованием валидатора;

#### Страница списка счетов:
- отображение списка счетов с возможностью фильтрации по балансу, дате последней операции и номеру счета (по умолчанию);
- добавление нового счета с произвольным номером;
- просмотр детальной информации по счету.

#### Страница подробностей по счету:
- форма перевода между счетами. В автодополнении все счета пользователя и счета, получаемые с бэкенда;
- график баланса по счету за последние 6 месяцев;
- список последних 10 транзакций по счету. Входящие - зеленым и со знаком +, исходящие - красным со знаком -.
При нажатии на график или таблицу - переход на страницу истории операций.

#### Страница истории операций:
- график баланса по счету за последние 12 месяцев;
- график баланса по счету за последние 12 месяцев с разбивкой на входящие и исходящие операции;
- список последних 25 транзакций по счету. Входящие - зеленым и со знаком +, исходящие - красным со знаком -.

#### Страница валют:
- список валют пользователя, с не нулевым балансом;
- список валют и изменение курса в реальном времени;
- форма перевода между доступными валютами. С валидацией полей после ответа от сервера.

#### Страница карты банкоматов:
- координаты меток расположения банкоматов получены от сервера.

##Тестирование
Для проведения unit-тестов необходимо в терминале ввести команду npm test.
Тесты проверяют создание шапки сайта, компонента main и формы входа. Также есть тест для проверки авторизации пользователя по логину и паролю на сервере.

Для проведения е2е тестов необходимо запустить сервер и приложение, как описано выше и ввести в терминале команду npx cypress open. Тестами проверена навигация по ссылкам в шапке сайта и авторизация пользователя при правильном и не правильном логине/пароле.
