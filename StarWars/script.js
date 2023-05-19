const SWAPI_URL = "https://swapi.dev/api/";

//stan aplikacji

let page = 1;
let hederAdded = false;

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
      printChart(fetchData, names[i]);
    });

    buttons.appendChild(navButton);
  }
};

//funkcja rednderująca tablicę
const printChart = (val, category) => {
  const chart_container = document.getElementById("chart_container");

  chart_container.innerHTML = "";
  hederAdded = false // --------------------------------

  let html = "";
  val.forEach((element, index) => {
    //element poj obiekt z tabicy
    html += fillCategotyWithData(element, index, category);
  });
  chart_container.innerHTML = html;
};

generateButton();

//klasy
class Person {
  constructor({ name, birth_year, gender, height, created }, index) {
    this.index = index;
    this.name = name;
    this.birth_year = birth_year;
    this.gender = gender;
    this.height = height;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
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
    </tr>`;
  }
}

class Planets {
  constructor({ name, climate, terrain, diameter, created }, index) {
    this.index = index;
    this.name = name;
    this.climate = climate;
    this.terrain = terrain;
    this.diameter = diameter;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.climate}</td>
    <td>${this.terrain}</td>
    <td>${this.diameter}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
      this.index
    }">details</button><button class="delete person index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

class Films {
  constructor({ title, director, producer, release_date, created }, index) {
    this.index = index;
    this.title = title;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.title}</td>
    <td>${this.director}</td>
    <td>${this.producer}</td>
    <td>${this.release_date}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
      this.index
    }">details</button><button class="delete person index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

class Species {
  constructor(
    { name, average_lifespan, skin_colors, language, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.average_lifespan = average_lifespan;
    this.skin_colors = skin_colors;
    this.language = language;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.average_lifespan}</td>
    <td>${this.skin_colors}</td>
    <td>${this.language}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
      this.index
    }">details</button><button class="delete person index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

class Vehicles {
  constructor({ name, model, length, crew, created }, index) {
    this.index = index;
    this.name = name;
    this.model = model;
    this.length = length;
    this.crew = crew;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.model}</td>
    <td>${this.length}</td>
    <td>${this.crew}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
      this.index
    }">details</button><button class="delete person index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

class Starships {
  constructor(
    { name, length, max_atmosphering_speed, passengers, created },
    index
  ) {
    this.index = index;
    this.name = name;
    this.length = length;
    this.max_atmosphering_speed = max_atmosphering_speed;
    this.passengers = passengers;
    this.created = created;
  }
  //metoda tzn funkcja która jest w obiekcie
  toHTML() {
    return `<tr id="rowPerson${this.index}">
    <td>${this.index}</td>
    <td>${this.name}</td>
    <td>${this.length}</td>
    <td>${this.max_atmosphering_speed}</td>
    <td>${this.passengers}</td>
    <td>${new Date(this.created).toLocaleDateString()}</td>
    <td><button class="details person index"${
      this.index
    }">details</button><button class="delete person index${
      this.index
    }">delete</button></td>
    </tr>`;
  }
}

//funkcja wprowadzająca dane
const fillCategotyWithData = (val, index, category) => {
  let html = "";

  const addHeader = (flag) => {//flaga logiczna nagłówek
    if(!flag){
      switch (true) {
        case category === "people":
          html += `<tr> 
      <th>id</th>
      <th>name</th>
      <th>birth</th>
      <th>gender</th>
      <th>heigth</th>
      <th>created</th>
      <tr>`;
          break;
        case category === "planets":
          html += `<tr> 
        <th>id</th>
        <th>name</th>
        <th>climate</th>
        <th>terrain</th>
        <th>diameter</th>
        <th>created</th>
        <tr>`;
          break;
        case category === "films":
          html += `<tr> 
        <th>id</th>
        <th>title</th>
        <th>director</th>
        <th>producer</th>
        <th>release_date</th>
        <th>created</th>
        <tr>`;
          break;
          case category === "species":
          html += `<tr> 
        <th>id</th>
        <th>name</th>
        <th>average_lifespan</th>
        <th>skin_colors</th>
        <th>language</th>
        <th>created</th>
        <tr>`;
          break;
        case category === "vehicles":
          html += `<tr> 
          <th>id</th>
          <th>name</th>
          <th>model</th>
          <th>length</th>
          <th>crew</th>
          <th>created</th>
          <tr>`;
          break;
        case category === "starships":
          html += `<tr> 
            <th>id</th>
            <th>name</th>
            <th>length</th>
            <th>max_atmosphering_speed</th>
            <th>passengers</th>
            <th>created</th>
            <tr>`;
          break;
      }
    }
  
      hederAdded = true;
    };
  
    switch (true) {
      case category === "people":
        const people = new Person(val, index);
        addHeader(hederAdded);
        return (html += people.toHTML());
      case category === "planets":
        const planets = new Planets(val, index);
        addHeader(hederAdded);
        return (html += planets.toHTML());
      case category === "films":
        const films = new Films(val, index);
        addHeader(hederAdded);
        return (html += films.toHTML());
      case category === "species":
        const species = new Species(val, index);
        addHeader(hederAdded);
        return (html += species.toHTML());
      case category === "vehicles":
        const vehicles = new Vehicles(val, index);
        addHeader(hederAdded);
        return (html += vehicles.toHTML());
      case category === "starships":
        const starships = new Starships(val, index);
        addHeader(hederAdded);
        return (html += starships.toHTML());
    }
  };
  

    