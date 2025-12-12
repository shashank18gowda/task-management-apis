# Task Management API

A simple Task Management backend with **User Authentication** and **CRUD operations** for tasks.

This API is fully deployed on **Render** and includes a **Postman Collection** with base URL and example requests already configured. Test data is also inserted for easy testing.

---

## 🚀 Live API Base URL

```
https://task-management-apis-v2ig.onrender.com
```

---

## 📮 Postman Collection

A Postman collection is included in the project repository. It contains:

* All endpoints
* Saved base URL
* Auth header setup
* Sample request bodies

Simply import it into Postman and start testing.

---

## 🧪 Test Data

Sample users and tasks are already present in the database. You can log in using the test accounts and directly try CRUD operations.

---

## 🔐 Authentication Routes

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/api/users/register` | Register a new user   |
| POST   | `/api/users/login`    | Login & get JWT token |

### Example URL

```
POST https://task-management-apis-v2ig.onrender.com/api/users/login
```

---

## 📝 Task Routes (Protected)

Send JWT token in the header:

```
Authorization: <token>
```

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/api/tasks/create`     | Create a new task     |
| GET    | `/api/tasks/list`     | Get all tasks         |
| GET    | `/api/tasks/single/:id` | Get single task by ID |
| PUT    | `/api/tasks/` | Update task           |
| DELETE | `/tasks/?task_id=<id>` | Delete task           |

### Example

```
GET https://task-management-apis-v2ig.onrender.com/api/tasks/list
```

---

## 📌 Request Body Examples

### Register

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Qwerty@123"
}
```

### Login

```json
{
  "email": "john@example.com",
  "password": "Qwert@123"
}
```

### Create / Update Task

```json
{
  "title": "Buy groceries",
  "description": "Milk, Eggs, Bread",
  "priority": "1"
}
```

---

## 📂 Folder Structure

```
taskmanagement-apis/
│── src/
│   ├── controllers/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── helper/
├── .env
├── index.js
├── package.json
└── README.md
```


## ⚠️ Notes

* Render free tier sleeps after inactivity.
* First request after sleep may take ~20–30 seconds.
* API will be fast once awakened.

---

If you have any questions or need clarification, feel free to reach out:
 
 📧 shashank18gowda@gmail.com