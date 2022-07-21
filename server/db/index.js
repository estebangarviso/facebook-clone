import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({ path: './../.env' });

export default class Db {
  instance = null;
  constructor() {
    this.url = process.env.DB_URL;
    this.databaseName = process.env.DB_NAME;
  }

  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  connect(callback) {
    MongoClient.connect(this.url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(this.databaseName);
      callback(dbo);
      db.close();
    });
  }

  getAllDocuments = (collectionName) =>
    new Promise((resolve, reject) => {
      this.connect((dbo) => {
        dbo
          .collection(collectionName)
          .find()
          .toArray(function (err, result) {
            if (err) reject(err);
            resolve(result);
          });
      });
    });

  getDocumentById = (collectionName, id) =>
    new Promise((resolve, reject) => {
      this.connect((dbo) => {
        dbo.collection(collectionName).findOne({ _id: ObjectId(id) }, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      });
    });

  insertDocument = (collectionName, data) => {
    data.createdAt = new Date().getTime();
    //   {
    //     $currentDate: {
    //       createtime: true
    //     }
    // }
    return new Promise((resolve, reject) => {
      this.connect((dbo) => {
        dbo.collection(collectionName).insertOne(data, function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('Inserted 1 document into the collection', collectionName, 'with id', result.insertedId);
          resolve(result);
        });
      });
    });
  };

  updateDocumentById(collectionName, id, data, callback) {
    this.connect((dbo) => {
      dbo.collection(collectionName).updateOne({ _id: ObjectId(id) }, data, function (err, result) {
        if (err) throw err;
        callback(result);
      });
    });
  }

  deleteDocumentById(collectionName, id, callback) {
    this.connect((dbo) => {
      dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) throw err;
        callback(result);
      });
    });
  }

  getOne = (collectionName, query) =>
    new Promise((resolve, reject) => {
      this.connect((dbo) => {
        dbo.collection(collectionName).findOne(query, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      });
    });

  //   dbo.collection('orders').aggregate([
  //     { $lookup:
  //        {
  //          from: 'products',
  //          localField: 'product_id',
  //          foreignField: '_id',
  //          as: 'orderdetails'
  //        }
  //      }
  //     ]).toArray(function(err, res) {
  //     if (err) throw err;
  //     console.log(JSON.stringify(res));
  //     db.close();
  //   });
  getWithRelations = (collectionName, query) =>
    new Promise((resolve, reject) => {
      this.connect((dbo) => {
        dbo
          .collection(collectionName)
          .aggregate(query)
          .toArray(function (err, result) {
            if (err) reject(err);
            resolve(result);
          });
      });
    });
}
