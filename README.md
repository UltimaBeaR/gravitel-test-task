Тестовое задание для https://www.gravitel.ru/

Небольшая заметка: по условиям задания токен авторизации сохраняется в локальном хранилище, однако делать так небезопасно, т.к. есть уязвимость к XSS (вражеский JS скрипт имеет доступ к локальному хранилищу и может прочитать токен).
Правильнее было бы делегировать авторизацию серверу приложений на том же домене что и фронт, чтобы он занимался (по rest api) авторизацией и выдавал jwt refresh token в HttpOnly cookie.
Подробнее тут https://habr.com/ru/company/ruvds/blog/512866/

В описании задачи абсолютно непонятна логика с ховерами на диаграмме - что где как подсвечивать по дизайну и тексту непонятно.
Также числа не сходятся с процентом заполнения диаграм в дизайне.