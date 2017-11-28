const { SHA256 } = require("crypto-js");

const message = "I am user number 4";
const hash = SHA256(message).toString();

console.log(`message: ${message}`);
console.log(`hash: ${hash}`);

const data = {
  id: 4,
};

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + "somesecret").toString(),
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

const resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

if (resultHash === token.hash) {
  console.log("Data was not changed");
} else {
  console.log("Data was changed. Don't trust!");
}
