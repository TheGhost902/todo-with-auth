const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});
let dbClient;
const nameAppDb = 'todo-app-db';

mongoClient.connect((err, client) => {
    if (err) return console.log(err);
    console.log('DB: Connected to mongodb');

    dbClient = client;
});

process.on('SIGING', () => {
    console.log('DB: Disconnected from mongodb');
    dbClient.close();
    process.exit();
});

//при создании требует имя коллекции
//ВАЖНО: СОЗДАВАТЬ КЛАСС НАДО ТОЛЬКО ПОСЛЕ ПОДКЛЮЧЕКИЯ К БАЗЕ ДАННЫХ(минимум задержка 2-3 секунды)
class Db {
    constructor(collectionName) {
        this.dataBase = dbClient.db(nameAppDb);
        this.collection = this.dataBase.collection(collectionName);
    }

    find(findSettings) {
        return new Promise((resolve, reject) => {
            this.collection.findOne(findSettings, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    add(addObj) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(addObj, (err, result) => {
                if (err) return reject(err);
                resolve(result.ops[0]);
            });
        });
    }

    //принимает объект который надо обновить и совйство которое надо обновить(в виде объекта)
    //возвращает промис с обновлённым объектом
    update(updateObj, updateProp) {
        return new Promise((resolve, reject) => {
            this.collection.findOneAndUpdate(
                updateObj,
                {$set: updateProp},
                {returnOriginal: false},
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.value);
                }
            );
        });
    }
}

module.exports = Db;