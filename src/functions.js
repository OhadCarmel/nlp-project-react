function generateUniqueRandomNumbers(n, range) {
  const randomNumbers = new Set();

  while (randomNumbers.size < n) {
    const randomNum = Math.floor(Math.random() * range);
    randomNumbers.add(randomNum);
  }

  return Array.from(randomNumbers);
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
} // this function creates a random subject code using the characters listed above
