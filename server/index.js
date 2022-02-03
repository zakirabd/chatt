const express = require("express");
const app = express();
const mysql = require('mysql');
const con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "slide"
 });
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let orders = [];
http.listen(3001);

 io.on('connection', (socket) => {
      socket.on('not', () => {
         io.emit('acceptNotification')
      })
      socket.on('sendOrder', (data) => {
         con.connect(function(err) {
            var sql = "INSERT INTO `orders`(`topic`, `pageNumber`, `number`) VALUES (?, ?, ?)";
            con.query(sql,[data.topic, data.page, data.number], function (err, result) {  
               io.emit('errorOrder', err)  
            });
            con.query("SELECT * FROM `orders`", function (err, result, fields) {
                io.emit("fetchOrders",result)
              });
        });
      }) 

     socket.on('disconnect', () => {
        //  console.log('leave a user')
     })
     socket.on('fetchAllOrders', () => {
         con.query("SELECT * FROM `orders`", function (err, result, fields) {
             io.emit("fetchOrders",result)
         });
     })
   //   con.query("SELECT * FROM `orders`", function (err, result, fields) {
   //       io.emit("fetchOrders",result)
   //    });
 })
