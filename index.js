// Base URL for the API: https://dragonball-api.com/api/characters
// The API returns a list of characters from the Dragon Ball series.
const URL = "https://dragonball-api.com/api/characters";
// Where the data will be displayed
const box = document.getElementById("box");


// Buttons for navigation
const next = document.getElementById("next");
const prev = document.getElementById("prev");

// Function to show all characters
const showAllCharacters = (characters) => {
  let content = "";
  characters.forEach((character) => {
    content += `<h2>${character.name}</h2>`;
    content += " ";
    content += `<img src="${character.image}" alt="${character.name}">`;
    content += " ";
    content += '' +`<p>${character.description}</p>`;
    content += ' ';
    content += `<p>Gender: ${character.gender}</p>`;
    content += " ";
    content += `<p>Species: ${character.species}</p>`;
    content += " ";
    content += `<p>Ki: ${character.ki}</p>`;
    content += " ";
    content += `<p>MaxKi: ${character.maxKi}</p>`;
    content += " ";
    content += `<p>Affiliation: ${character.affiliation}</p>`;
    content += " ";
  });
  // Display the content in the box element on the page 
  box.innerHTML = content;
};

// Function to display a single character
const showACharacter = (character) => {
  let content = "";
  let image = document.createElement("img");
  image.src = character.image;
  content += `<h2>${character.name}</h2>`;
  content += " ";
  content += `<img src="${character.image}" alt="${character.name}">`;
  content += " ";
  content += '' +`<p>${character.description}</p>`;
  content += ' ';
  content += `<p>Gender: ${character.gender}</p>`;
  content += " ";
  content += `<p>Species: ${character.species}</p>`;
  content += " ";
  content += `<p>Ki: ${character.ki}</p>`;
  content += " ";
  content += `<p>MaxKi: ${character.maxKi}</p>`;
  content += " ";
  content += `<p>Affiliation: ${character.affiliation}</p>`;
  content += " ";

  // Display the content in the box element on the page
  box.innerHTML = content;
};


// Function to parse the data and display it on the page
const parseData = (data) => {

    let characters = data.items;
    let current = 0;

    let character = characters[current];

    showACharacter(character);
    // showAllCharacters(characters);

    // Event listeners for the next and previous buttons
    next.addEventListener("click", () => {
      if (current < characters.length - 1) {
        current++;
      } else {
        current = 0;
      }
      character = characters[current];
      showACharacter(character);
      console.log("Next button clicked!");
    });
    
    prev.addEventListener("click", () => {
      if (current > 0) {
        current--;
      } else if (current === 0) {
        current = characters.length - 1;
      }
      character = characters[current];
      showACharacter(character);
      console.log("Previous button clicked!");
    });

}

// Function to fetch the data from the API
const getCharacters = async (URL) => {
  let limit = 58;
  let page = 1;
  try {
    let response = await fetch(`${URL}?limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    console.log("Data fetched successfully!");
    console.log(data);

    console.log("Characters From Data:", data.items);
    console.log("Links From Data:", data.links);
    console.log("Next From Links:", data.links.next);
    console.log("First From Links:", data.links.first);
    console.log("Last From Links:", data.links.last);
    console.log("Prev From Links:", data.links.previous);

    let links = data.links;

    parseData(data);

    return data;
  } catch (error) {
    console.error("Error:", error);
    box.innerHTML = `<h2>Error occurred while fetching data.</h2> <br> <p>Please try again later ${error}.</p>`;
  }
};


// Call the getCharacters function
getCharacters(URL);


