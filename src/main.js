const elForm = document.querySelector(".js-form"),
  elinput = elForm.querySelector(".js-input"),
  elSelect = elForm.querySelector(".js-select");
const elRenderList = document.querySelector(".js-data-render");
const elTemplate = document.querySelector(".js-template").content;
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inputValue = elinput.value.trim();
  let selectValue = elSelect.value;
  if (selectValue == "all") {
    let BASE_URL = `http://www.omdbapi.com/?apikey=7bdb534f&s=${inputValue}`;
    fetchData(BASE_URL, inputValue);
  } else {
    let BASE_URL = `http://www.omdbapi.com/?apikey=7bdb534f&s=${inputValue}&type=${selectValue}`;
    fetchData(BASE_URL, inputValue);
  }
  //   elinput.value = "";
});

async function fetchData(url, searchValue) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    let dataInf = await data.Search;
    dataRenderListFn(dataInf, elRenderList, searchValue);
  } catch (error) {
    console.error(error);
  }
}

function highlightText(text, searchValue) {
  const regex = new RegExp(`(${searchValue})`, "gi");
  return text.replace(
    regex,
    `<span style="background-color: #feec29b8;">$1</span>`
  );
}

function dataRenderListFn(arr, node, searchValue) {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();
  arr.forEach((item) => {
    let clone = elTemplate.cloneNode(true);
    clone.querySelector(".js-img").src = item.Poster;
    clone.querySelector(".js-title").alt = item.Title;
    clone.querySelector(".js-title").innerHTML = highlightText(
      item.Title,
      searchValue
    );

    clone.querySelector(".js-type").textContent = item.Type;
    clone.querySelector(".js-year").textContent = item.Year;
    clone.querySelector(
      ".js-imdbid"
    ).href = `https://www.imdb.com/title/${item.imdbID}/`;
    docFrg.appendChild(clone);
  });
  node.appendChild(docFrg);
}