function runFunction() {}

// Functions below here

// Random Number generator for length of data in case new animes are added.
function generateRandomNumberFromList(arrLength) {
  let number = Math.floor(Math.random() * arrLength);

  // Only done to get rid of Itachi Uchia anime since it is not an anime
  while (number == 7) {
    number = Math.floor(Math.random() * arrLength);
  }
  return number;
}

// Function for capitilizing the name of the anime
function capitilizeAnimeTitles(animeName) {
  let upperAnimeName = animeName.map((item) => {
    // console.log(item);
    return item[0].toUpperCase() + item.substring(1);
  });
  const animeNameCap = upperAnimeName.join(' ');
  return animeNameCap;
}

// Function for fetching list of animes
function getAllDrinks(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.data);
      const randomNum = generateRandomNumberFromList(data.data.length);
      const animeNameCap = capitilizeAnimeTitles(
        data.data[randomNum].anime_name.split('_')
      );
      const animeImg = data.data[randomNum].anime_img;
      getFunFact(
        `https://anime-facts-rest-api.herokuapp.com/api/v1/${data.data[randomNum].anime_name}`
      );

      document.querySelector('.anime-name').innerText = animeNameCap;
      document.querySelector('img').src = animeImg;
    })
    .catch((err) => {
      console.log(`error: ${err}`);
    });
}

// Function for getting fun fact
function getFunFact(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      let randNum = generateRandomNumberFromList(data.data.length);
      const animeFunFact = data.data[randNum].fact;
      document.querySelector('.fun-fact').innerText = animeFunFact;
    });
}
