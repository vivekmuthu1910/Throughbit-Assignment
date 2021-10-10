var MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGO_URL);

async function getAllCoins() {
  try {
    await client.connect();
    const database = client.db("admin");
    const coinsCol = database.collection("coins");
    let coins = await coinsCol.find({}).toArray();
    return coins.map((val) => {
      delete val._id;
      return val;
    });
  } catch (err) {
    throw err;
  } finally {
    await client.close();
  }
}

async function getCoin(name) {
  let coin;
  try {
    await client.connect();
    const database = client.db("admin");
    const coins = database.collection("coins");
    const query = { name };
    coin = await coins.findOne(query);
    delete coin._id;
  } finally {
    await client.close();
  }
  return coin;
}

async function postCoin(coin) {
  try {
    await client.connect();
    const database = client.db("admin");
    const coins = database.collection("coins");
    let isCoinThere = await coins.findOne({ name: coin.name });
    if (isCoinThere) {
      throw "Coin already exists";
    }
    coin = await coins.insertOne(coin);
    return coin;
  } finally {
    await client.close();
  }
}

async function putCoin(name, coin) {
  try {
    await client.connect();
    const database = client.db("admin");
    const coins = database.collection("coins");
    const filter = { name };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        ...coin,
      },
    };
    coin = await coins.updateOne(filter, updateDoc, options);
    return coin;
  } finally {
    await client.close();
  }
}

async function createUser(user) {
  try {
    await client.connect();
    const database = client.db("admin");
    const usersCol = database.collection("users");
    await usersCol.insertOne(user);
    return true;
  } finally {
    await client.close();
  }
}

async function getUser(username) {
  try {
    await client.connect();
    const database = client.db("admin");
    const usersCol = database.collection("users");
    return await usersCol.findOne({ username });
  } finally {
    await client.close();
  }
}

module.exports = {
  getCoin,
  putCoin,
  getAllCoins,
  postCoin,
  createUser,
  getUser,
};
