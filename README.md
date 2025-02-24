# 📋 Управление учетными записями

> **Vue 3 + TypeScript + Pinia + Element Plus**  
> Форма для управления учетными записями с валидацией, сохранением состояния и удобным UI.

---

## 🚀 Стек технологий

- **Vue.js 3** + Composition API *(фреймворк)*
- **TypeScript** *(язык программирования)*
- **Pinia** *(стейт-менеджер)*
- **Element Plus** *(UI-компоненты)*

---

## 📝 Функциональность формы

### 🔹 **Форма состоит из:**
✔ Заголовка и кнопки **"+"** для добавления учетной записи  
✔ Подсказки для поля **Метка**  
✔ Списка учетных записей с **названиями полей**  

### 🔹 **Структура учетной записи**
Каждая учетная запись включает в себя следующие поля:

| Поле       | Описание |
|------------|----------|
| **Метка**  | *Необязательное поле* (до **50 символов**). Вводятся текстовые метки через `;`, преобразуются в массив объектов. |
| **Тип записи** | *Обязательное поле*.<br>Выпадающий список с вариантами: <br> **Локальная** – показывает поле "Пароль" <br> **LDAP** – скрывает поле "Пароль" (значение `null`). |
| **Логин**  | *Обязательное поле* (до **100 символов**). |
| **Пароль** | *Обязательное поле* (до **100 символов**).<br>Отображается **только** если выбран тип **"Локальная"**. |
| **Удаление** | Кнопка для удаления учетной записи. |

---

## 🔧 Логика работы формы

### ➕ **Добавление учетной записи**
- По нажатию на **"+"** в конец списка добавляется новая пустая запись.

### ❌ **Удаление учетной записи**
- По нажатию на **🗑** (значок корзины) запись полностью удаляется.

### ✅ **Валидация и сохранение**
- **Логин и пароль** – обязательны (обводятся красной рамкой при ошибке).  
- **Метка** – преобразуется в массив объектов формата:  
  ```json
  [{ "text": "метка1" }, { "text": "метка2" }]


## 📦 Установка и запуск

### 1️⃣ Клонируем репозиторий

```
git clone https://github.com/Tokimikichika/SaaSoft-test.git
cd SaaSoft-test
```

### 2️⃣ Устанавливаем зависимости

```
npm install
```

### 3️⃣ Запускаем локально

```
npm run dev
```

Открой в браузере: http://localhost:5173