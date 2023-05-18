  const SWAPI_URL = "https://swapi.dev/api/";

//stan aplikacji

let page = 1;

//fetch głównych danych

const getButtons = async () => {
  const response = await fetch(SWAPI_URL);
  const data = await response.json();
  console.log("getButtons data", data);
  return data;
};

//fetch zawartości

const getData = async (category, page) => {
  const response = await fetch(`${SWAPI_URL}/${category}/?pages${page}`);
  const data = await response.json();
  const results = data.results;
  return results;
};

//generowanie przycisków

const generateButton = async () => {
  //1
  const buttons = document.getElementById("buttons");
  const data = await getButtons();
  const names = Object.keys(data);

  for (let i = 0; i < names.length; i++) {
    let navButton = document.createElement("button");
    let navTitle = document.createTextNode(names[i]);
    navButton.appendChild(navTitle);

    //logika po wciśnieciu przycisku

    navButton.addEventListener("click", async () => {
      const fetchData = await getData(names[i], page);
      console.log("fetchData", fetchData);
      //rendering
      printChart(fetchData);
    });

    buttons.appendChild(navButton);
  }
};

//funkcja rednderująca tablicę
const printChart = (val) => {
  const chart_container = document.getElementById("chart_container");

  chart_container.innerHTML = "";

  let html = "";
  val.forEach((element, index) => {//element poj obiekt z tabicy
    html += fillCategotyWithData(element, index);
  });
  chart_container.innerHTML = html
};

generateButton();

//klasy
class Person {
  constructor({ name, birth_year, gender, height, created }, index) {
    this.index = index;
    this.name = name;
    this.birth_year = birth_year
    this.gender = gender
    this.height = height
    this.created = created
  }
  //metoda tzn funkcja która jest w obiekcie 
  toHTML(){
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.birth_year}</td>
    <td>${this.gender}</td>
    <td>${this.height}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
        this.index
    }">details</button><button class="delete person index${
        this.index
    }">delete</button></td>
    </tr>`
  }
}

//funkcja wprowadzająca dane
const fillCategotyWithData = (val, index) => {
    let html = ""
    const person = new Person(val, index)
    return (html += person.toHTML())
};
