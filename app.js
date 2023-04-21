//2
const BASE_URL = "https://swapi.dev/api/";

//robimy sobie stan aplikacji
const state = {
  collections: null,
  collectionsData: {},
};

//4 teraz 1
//dodajemy do fetchData key by za każdym razem zachowywać sobie dane
async function fetchData(url,key) { 
  const respons = await fetch(url);
  const data = await respons.json();

  displayButtons(data);
  state.collections === data; // prypisujemy dane do kolekcji state powyżej
}

//3
function displayButtons(collectionList) {
  const $buttons = document.getElementById("buttons"); // kotwica do buttons
  Object.entries(collectionList).forEach(([key, value]) => {
    // funkcja która przyjmuje object i wyciąga z niego wpis któym jest para klucz wartośc
    const $btn = document.createElement("button");
    $btn.innerHTML = key;
    $btn.addEventListener("click", () => {
      // w momencie kiedy klikniemyu na button wywoła się funkcja nr 4 teraz 1 (jest ona asynhroniczna)
    });
    $buttons.appendChild($btn);

    console.log("key", key);
    console.log("value", value);
  });
}

fetchData(BASE_URL)




// //1
// //jeżeli używamy fetch to musimy użyć 2 then
// // themy robimy wtedy gdzy mamy promise i czekamy na jakieś dane asynchorniczne które nie wiadomo ile będą trwały
// const promise = fetch(BASE_URL)
//   .then((respons) => respons.json())
//   .then((data) => {
//     displayButtons(data)
//     state.collections === data})  // prypisujemy dane do kolekcji state powyżej
//   .catch((error) => {
//     console.log("error", error);
//   });

// //106
