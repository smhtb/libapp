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

# User API
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
<strong>Login</strong><br>
Method: Post <br>
Address: http://localhost:3000/api/v1/auth/login <br>
Body Params: <br>
<ul>
    <li>email (required)</li>
    <li>password (required)</li>
</ul>
Response: A token that you will need for other requests. <br>
<hr>
<strong>Logout</strong><br>
Method: Get <br>
Address: http://localhost:3000/api/v1/auth/logout <br>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>

# Book API
<strong>Add new book</strong><br>
Method: Post <br>
Address: http://localhost:3000/api/v1/book/ <br>
Body Params: <br>
<ul>
    <li>title (required)</li>
    <li>author (required)</li>
    <li>quantity (required. must be greater than zero)</li>
    <li>description (optional)</li>
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>
<strong>Get list of books</strong><br>
Method: Get <br>
Address: http://localhost:3000/api/v1/book/list/1/10 <br>
Query Params: <br>
<ul>
    <li>First param is number of page. (required)</li> 
    <li>Second param is number of book in page. (optional. default value is 10. max value is 20)</li>    
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>
<strong>Get one book</strong><br>
Method: Get <br>
Address: http://localhost:3000/api/v1/book/get/5e5fbfdbe0a94d3f30f9baa1 <br>
Query Params: <br>
<ul>
    <li>First param is book id. (required)</li>   
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>
<strong>Update one book</strong><br>
Method: Put <br>
Address: http://localhost:3000/api/v1/book/5e5fbfdbe0a94d3f30f9baa1 <br>
Query Params: <br>
<ul>
    <li>First param is book id. (required)</li>   
</ul>
Body Params: <br>
<ul>
    <li>title (optional)</li>
    <li>author (optional)</li>
    <li>quantity (optional)</li>
    <li>description (optional)</li>
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>
<strong>Delete one book</strong><br>
Method: Delete <br>
Address: http://localhost:3000/api/v1/book/5e5fbfdbe0a94d3f30f9baa1 <br>
Query Params: <br>
<ul>
    <li>First param is book id. (required)</li>   
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>

# Customer API
<strong>Buy one book</strong><br>
Method: Post <br>
Address: http://localhost:3000/api/v1/buy <br>
Body Params: <br>
<ul>
    <li>book (required. book id)</li>
    <li>quantity (required. must be greater than zero)</li>
</ul>
Header Params: <br>
<ul>
    <li>jwttoken (required. After login you have earned it)</li>    
</ul>
<hr>