# libapp
This is a small project for the node training class <br>
In this project we have three user, book and customer entities.<br>
Users can sign up, sign in, or sign out.<br>
A logged-in user can perform CRUD operations for books. He can also order a number from a book to buy.

# Requirement
nodejs <br>
npm <br>
mongodb

# Install
npm install<br>
npm start

# API
<strong>Register new user</strong><br>
Method: Post <br>
Address: http://localhost:3000/api/v1/auth/register <br>
Body Params: <br>
<ul>
    <li>name (required)</li>
    <li>family (required)</li>
    <li>email (required. must be unique)</li>
    <li>password (required. Min length is 6 character)</li>
    <li>age (optional. min value is 18)</li>
    <li>avatar (optional. Only files with the extension png, jpg, gif and jpeg are acceptable)</li>
</ul>
<hr>