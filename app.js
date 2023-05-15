const BASE_URL = "https://swapi.dev/api/";

const state = {
  collections: null,
  collectionsData: {},
};

async function fetchData(url, key) {
  const response = await fetch(url);
  const data = await response.json();
  addToState(state, key, data);
  console.log("state", state);
}

function addToState(object, key, data) {
  console.log("object", object);
  console.log("key", key);
  console.log("data", data);

  const keys = key.split("."); //key na pojedyncze klucze za pomocą metody split() i zapisanie ich do tablicy keys
  let currentObject = object; //ustawiana jest na obiekt object.

  if (!data.results) {
    //Jeśli dane przekazane do funkcji nie zawierają klucza results funkcja iteruje po wszystkich kluczach keys
    keys.forEach((k, i) => {
      console.log(k, i);
      if (!currentObject[k]) {
        currentObject[k] = {};
      }
      console.log();
      if (i === keys.length - 1) {
        currentObject[k] = data;
      }
    });
  } else if (data.results) {
    currentObject.collectionsData[key] = data.results;
  }
}

function displayButtons(collectionList) {
  const $buttons = document.getElementById("buttons");
  Object.entries(collectionList).forEach(([key, value]) => {
    const $btn = document.createElement("button");
    $btn.innerHTML = key;
    $btn.addEventListener("click", async () => {
      await fetchData(value, key);
      displayList(key);
    });
    $buttons.appendChild($btn);
    // $buttons.classList.add("radomClass")
    // console.log("key", key);
    // console.log("value", value);
  });
}

function displayList(collectionKey) {
  const $list = document.getElementById("list");
  $list.innerHTML = "";

  const data = state.collectionsData[collectionKey];
  if (data) {
    const $ul = document.createElement("ul");

    data.forEach((item) => {
      const $li = document.createElement("li");
      $li.innerText = item.name || item.title;
      console.log("item", item)

      const $detailsBtn = document.createElement("button")
      $detailsBtn.innerText = "info";
      $detailsBtn.addEventListener("click", () => {
        displayDetails(item)
      })
      $li.appendChild($detailsBtn);
      $ul.appendChild($li);
    });
    $list.appendChild($ul);
  }
}

function displayDetails(item) {
  const $details = document.getElementById("details");
  $details.innerHTML = "";

  const $h2 = document.createElement("h2");
  $h2.innerText = item.name || item.title;
  $details.appendChild($h2);

  const $table = document.createElement("table");
  const keys = Object.keys(item);
  keys.forEach((key) => {
    const $tr = document.createElement("tr");
    const $td1 = document.createElement("td");
    $td1.innerText = key;
    const $td2 = document.createElement("td");
    $td2.innerText = item[key];
    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $table.appendChild($tr);
  });
  $details.appendChild($table);
}


(async function main() {
  await fetchData(BASE_URL, "collections");
  displayButtons(state.collections);
})();
