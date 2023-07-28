# Fashion Store API

This project is based on an API that allows users to view and purchase products within a fashion store.The api is built with ruby on rails and working with postgreSQL database.

It's is a server side application which contains categories, products, orders, reviews, users, roles and payments. Access to various endpoints are determined based on the users' roles whereby the main roles are customer and Admin.


The relationship of the models is shown on the ERD model below 

  ![ERD](./screens/Fashion_store_ERD.png?raw=true "ERD")


The routes available to all users include :

- GET /products and /products/id
- GET /categories and /categories/id
- GET /reviews and reviews/id
- POST /create_account
- POST /login_account

The routes for logged-in users i.e. customers include :

- All orders and payments routes
- GET and PATCH /users/id
- POST, PATCH and DELETE /reviews

The Admin user has control over the following routes : 

- All UserRoles routes
- All roles routes 
- POST ,PATCH and DELETE /products
- POST , PATCH and DELETE /categories



## Tools Used
This project was built with the following tools:

- [Ruby ~ v2.7.4](https://www.ruby-lang.org/en/)


## Pre-requisites
In order to use this repo you need to have the following installed:

- OS [either: Windows 10+, Linux or MacOS(running on x86 or arm architecture)]
- Ruby - 2.7.4

## Installation

To use this repo on your machine requires some simple steps

### Alternative One

- Open a terminal / command line interface on your computer
- Clone the repo by using the following:

        git clone https://github.com/Lorraineken/fashion-store

- Be patient as it creates a copy on your local machine for you.
- Change directory to the repo folder:

        cd fashion-store/server

- (Optional) Open it in ``Visual Studio Code``

        code .

- (Alternate Option) Open it in any editor of your choice.



## Running the application

 You can use the following steps to run the app.

- Install required dependencies using bundle

      bundle install

- Run the application 

       rails s 

- Use any API platform such as postman to interact with the APIs.


# Authors
This project was contributed to by:
- [Lorraine Kupa](https://github.com/Lorraineken)
- [Mathew Mageto](https://github.com/Skanner33)
- [Shuaib Shaban](https://github.com/ShuaibShaban)
- [Sheema Shamil](https://github.com/sheema-shamil)
- [Emmanuel Barsu](https://github.com/Barsu5489)
- [Claris Njogu](https://github.com/Cla-d)

# License
The project is licensed under Apache 2.0.
