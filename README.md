<h1 align="center">uklam-express-backend</h1>

## Introduction
<p>Backend for https://github.com/fastaman993/UklamApps/ project</p> 
  
## Installation
  - Clone the git repository for this project
  - Get into the project directory with terminal/command prompt
  - Run command : npm start
  
## Endpoints Sample : 
  ### GET users
    Endpoint : /api/user/
    Method : GET
    Response : {
    "status": 200,
    "response": [
        {
            "_id": "5da33c53316af649a8ec3ffb",
            "email": "susi@gmail.com",
            "profile": {
                "name": "susanti",
                "address": "disitu",
                "phone": "81387654321"
            },
            "photo": "https://i1.wp.com/blackyouthproject.com/wp-content/uploads/2019/09/ryan-russell.jpg?fit=1200%2C550",
            "password": "312433c28349f63c4f387953ff337046e794bea0f9b9ebfcb08e90046ded9c76",
            "balance": 8160010,
            "currentOrder": {
                "user": "susi@gmail.com",
                "package": {
                    "_id": "5da696bc199939544c19a45a",
                    "name": "Petik Apel",
                    "photo": "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&w=1000&q=80",
                    "description": "jalan keliling kebon",
                    "price": 500000,
                    "guide": "mastur@gmail.com",
                    "type": "tour"
                },
                "orderDate": "Oct 19 2019 ",
                "status": "pending"
            }
        },
        {
            "_id": "5da3573a316af649a8ec3ffc",
            "email": "anton@gmail.com",
            "profile": {
                "name": "ontan",
                "address": "kemari",
                "phone": "01234567890"
            },
            "photo": "http://res.cloudinary.com/dr7qxuft5/image/upload/v1571039268/pt7vmor6sql2parmmbbk.jpg",
            "password": "312433c28349f63c4f387953ff337046e794bea0f9b9ebfcb08e90046ded9c76",
            "balance": 930006,
            "currentOrder": {
                "user": "anton@gmail.com",
                "package": {
                    "_id": "5da696bc199939544c19a45a",
                    "name": "Petik Apel",
                    "photo": "https://images.unsplash.com/photo-1500322969630-a26ab6eb64cc?ixlib=rb-1.2.1&w=1000&q=80",
                    "description": "jalan keliling kebon",
                    "price": 500000,
                    "guide": "mastur@gmail.com",
                    "type": "tour"
                },
                "orderDate": "Oct 20 2019 ",
                "status": "pending"
            }
        }
     ]
  ### Register
    Endpoint : /api/register/
    Method : POST
    Body : {
              "email":"Reyna@gmail.com",
              "name":"Reyna",
              "role":"user",
              "password":"asdf1234"
            }
    Response : {
    "status": 200,
    "response": {
        "email": "Reyna@gmail.com",
        "password": "312433c28349f63c4f387953ff337046e794bea0f9b9ebfcb08e90046ded9c76",
        "profile": {
            "name": "Reyna",
            "address": "Address",
            "phone": "Phone"
        },
        "photo": "https://image.flaticon.com/icons/png/512/44/44948.png",
        "balance": 0,
        "currentOrder": {},
        "_id": "5db59ff43a52f1366e3234e9"
    }
}
  ### Login
    Endpoint : /api/login/
    Method : POST
    Body : {
              "email":"Reyna@gmail.com",
              "role":"user",
              "password":"asdf1234"
            }
    Response : {
    "status": 200,
    "response": {
        "guide": {
            "profile": {
                "name": "Reyna",
                "address": "Address",
                "phone": "Phone"
            },
            "email": "Reyna@gmail.com",
            "photo": "https://image.flaticon.com/icons/png/512/44/44948.png",
            "balance": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGI1OWZmNDNhNTJmMTM2NmUzMjM0ZTkiLCJlbWFpbCI6IlJleW5hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMzEyNDMzYzI4MzQ5ZjYzYzRmMzg3OTUzZmYzMzcwNDZlNzk0YmVhMGY5YjllYmZjYjA4ZTkwMDQ2ZGVkOWM3NiIsInByb2ZpbGUiOnsibmFtZSI6IlJleW5hIiwiYWRkcmVzcyI6IkFkZHJlc3MiLCJwaG9uZSI6IlBob25lIn0sInBob3RvIjoiaHR0cHM6Ly9pbWFnZS5mbGF0aWNvbi5jb20vaWNvbnMvcG5nLzUxMi80NC80NDk0OC5wbmciLCJiYWxhbmNlIjowLCJjdXJyZW50T3JkZXIiOnt9LCJpYXQiOjE1NzIxODQxOTF9.pEMsgMHZs8_S08zuWvfGFvv_tehwPM0N1**********"
    }
}
  
  ### Complete Docs : [Uklam Postman Collection](https://documenter.getpostman.com/view/8457404/SVtWwSJu?version=latest#intro) 

    
  
 
## Contributors

<table border="0">
  <tr>
    <td align="center">
      <a href="https://github.com/fastaman993">
        <img width="110" src="https://avatars1.githubusercontent.com/fastaman993" alt="Adhy F. Khoirot"><br/>
          <sub><b>Adhy F. Khoirot</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/mahendragalih26">
        <img width="110" src="https://avatars1.githubusercontent.com/mahendragalih26" alt="Galih Mahendra W"><br/>
          <sub><b>Galih Mahendra W</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Gimindika">
        <img width="110" src="https://avatars1.githubusercontent.com/Gimindika" alt="Gerrit Indika Mulya"><br/>
          <sub><b>Gerrit Indika Mulya</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/fikribasa">
        <img width="110" src="https://avatars1.githubusercontent.com/fikribasa" alt="M Fikri Basa"><br/>
          <sub><b>M Fikri Basa</b></sub>
      </a>
    </td>
  </tr>
</table>
