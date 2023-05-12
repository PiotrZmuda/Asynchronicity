
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
  // console.log("object", object);
  // console.log("key", key);
  // console.log("data", data);

  const keys = key.split(".");
  let currentObject = object;

  if (!data.results) {
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
    $buttons.classList.add("radomClass")
    // console.log("key", key);
    // console.log("value", value);
  });
}
// lista2
function displayList(collectionKey) {
  const $list = document.getElementById("list");
  $list.innerHTML = "";

  const data = state.collectionsData[collectionKey];
  if (data) {
    const $ul = document.createElement("ul");

    data.forEach((item) => {
      const $li = document.createElement("li");
      $li.innerText = item.name || item.title;
      $ul.appendChild($li);
    });

    $list.appendChild($ul);
  }
}

// function displayList(collectionKey) {
//   const $list = document.getElementById("list");
//   $list.innerHTML = "";

//   const data = state.collectionsData[collectionKey];
//   if (data) {
//     const $ul = document.createElement("ul");

//     data.forEach((item) => {
//       const $li = document.createElement("li");
//       const $pre = document.createElement("pre");

//       for (let prop in item) {
//         const $prop = document.createElement("p");
//         $prop.innerText = `${prop}: ${item[prop]}`;
//         $pre.appendChild($prop);
//       }

//       $li.appendChild($pre);
//       $ul.appendChild($li);
//     });

//     $list.appendChild($ul);
//   }
// }

(async function main() {
  await fetchData(BASE_URL, "collections");
  displayButtons(state.collections);
})();
