const form = document.querySelector(".form");
const input = document.querySelector("#title");
document.querySelector(".loading").classList.add("none");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("Enter a movie name to search ");
  }
  document.querySelector(".movies").innerHTML = "";
  getMovies();
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "163a100428msh4c992ac7158bd66p14276djsn88b843dfca3b",
    "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
  },
};

function getMovies() {
  document.querySelector(".loading").classList.remove("none");
  const title = input.value;
  fetch(`https://imdb8.p.rapidapi.com/title/find?q=${title}`, options)
    .then((response) => response.json())
    .then((data) => {
      const list = data.results;
      document.querySelector(".loading").classList.add("none");
      list.map((item) => {
        const name = item.title;
        const image = item.image.url;
        const movie = `<li><img src="${image}"> <h2>${name}</h2></li>`;
        document.querySelector(".movies").innerHTML += movie;
      });
    })
    .catch((err) => console.error(err));
}
