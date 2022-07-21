import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';

var url = 'mongodb://127.0.0.1:27017/';

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db('mydb');
//   var myobj = { name: 'Company Inc', address: 'Highway 37' };
//   dbo.collection('customers').insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     console.log('1 document inserted');
//     console.log(res);
//     db.close();
//   });
// });

//FIND ONE
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db('mydb');
  dbo.collection('customers').findOne({ _id: ObjectId('62d6ca555ac1b4af30b51d98') }, function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// //QUERY
// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   var dbo = db.db('mydb');
//   var query = { address: 'Park Lane 38' };
//   dbo
//     .collection('customers')
//     .find({ name: /.*Company.*/ }) //new RegExp('.*' + value + '.*')}
//     .toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
// });

// //SORT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var mysort = { name: -1 };
//   dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //DELETE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { address: 'Mountain 21' };
//   dbo.collection("customers").deleteOne(myquery, function(err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     db.close();
//   });
// });

// //UPDATE
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myquery = { address: "Valley 345" };
//   var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
//   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });

// //LIMIT
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").find().limit(5).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //JOIN
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});
