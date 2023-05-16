// const BASE_URL = "https://rickandmortyapi.com/api";

async function listApp() {
  let page = 1;

  async function fetchChars() {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const response = await data.json();
    console.log(response);
    return response;
  }

  function createCharacter(data) {
    const list = document.getElementById("list");

    //tworzymy kartę
    const card = document.createElement("div");
    list.appendChild(card);

    //obraz
    const img = document.createElement("img");
    img.src = data.image;
    img.alt = data.name;
    card.appendChild(img);

    //pole opis
    const container = document.createElement("div");
    card.appendChild(container);

    //imie
    const name = document.createElement("h4");
    name.innerHTML = data.name;
    container.appendChild(name);

    //gatunek
    const species = document.createElement("p");
    species.innerHTML = data.species;
    container.appendChild(species);
  }
  //paginacja

  let info = null;

  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");

  btnPrev.addEventListener("click", () => {
    if(info.prev === null){
        alert("to pierwsza strona")
        return
    }
    page--;
    displayList();
  });

  btnNext.addEventListener("click", () => {
    if(info.next === null){
        alert("to ostatnia strona")
        return
    }
    page++;
    displayList();
  })

  //generowanie listy
  const displayList = async () => {
    const characters = await fetchChars(); // przechowujemy postacie

    info = characters.info;
    const list = document.getElementById("list");
    list.innerHTML = "";

    const allPages = document.getElementById("allPages");
    allPages.innerHTML = characters.info.pages;

    const currentPage = document.getElementById("currentPage");
    currentPage.innerHTML = page;

    characters.results.forEach((character) => createCharacter(character));
  };
  displayList();
}
listApp();
