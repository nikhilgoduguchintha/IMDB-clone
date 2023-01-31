const form = document.querySelector(".form");
const input = document.querySelector("#title");
// add none to loading class to hide it when there is no loading
document.querySelector(".loading").classList.add("none");
// add submit event listner to get the data from input text and call the getMovies to fetch the data from API
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("Enter a movie name to search ");
  }
  document.querySelector(".movies").innerHTML = "";
  getMovies();
});

// add refresh functionality
const mainLogo = document.querySelector(".main-logo");
mainLogo.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.reload();
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "163a100428msh4c992ac7158bd66p14276djsn88b843dfca3b",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

// fetch handling function
function getMovies() {
  // remove none to display the loading text in the screen
  document.querySelector(".loading").classList.remove("none");
  const title = input.value;
  fetch(`https://imdb8.p.rapidapi.com/title/find?q=${title}`, options)
    // get the response and convert to JSON
    .then((response) => response.json())
    // use the data and store it to use later
    .then((data) => {
      const list = data.results;
      // add none class to loading so it is hidden as the data is fetched from API
      document.querySelector(".loading").classList.add("none");
      // loop over the array and add inner HTML to movies div
      list.map((item) => {
        const name = item.title;
        const image = item.image.url;
        const movie = `<li><img src="${image}"> <h2>${name}</h2></li>`;
        document.querySelector(".movies").innerHTML += movie;
      });
    })
    .catch((err) => console.error(err));
}
