
let body = document.querySelector("body");
let nav = document.querySelector("nav");
let section = document.querySelector("section");
let main = document.querySelector("main");
let button = document.querySelector("button");
let img = document.querySelector("img");
let h1 = document.querySelector("h1");
let pictures = document.querySelector(".pictures");
let sectionUl = document.querySelector("section ul");
h1.textContent = "";

//---------------------GÖR STOR FÖRSTA BOKSTAV------------------------//
function big(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function small(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
};


function listAllBreeds(){
  let currentBreed = window.location.hash.substring(1);
    axios.get('https://dog.ceo/api/breeds/list/all')
    .then(function (response) {
      renderAllBreeds(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
}
listAllBreeds();



function renderAllBreeds(data){
  let ul = document.createElement("ul");
  nav.appendChild(ul);
  for (let dog in data){
    let li = document.createElement("li");
    li.textContent = big(dog);
    li.addEventListener("click", function(e){
      window.location.hash = small(e.target.textContent);
      pictures.innerHTML = "";
      getBreedImg();
      listSubBreeds();
    });
    ul.appendChild(li);

  };
};




function listSubBreeds(){
  let currentBreed = window.location.hash.substring(1);
    axios.get('https://dog.ceo/api/breed/' + currentBreed + '/list')
    .then(function (response){
      console.log(response);
      renderSubBreeds(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderSubBreeds(data){
  if (data.length > 0){
    sectionUl.innerHTML = "";
    let currentBreed = window.location.hash.substring(1);
    // let ul = document.createElement("ul");
    // section.appendChild(ul);

    for (let key of data){
      let li = document.createElement("li");
      li.textContent = big(key);
      sectionUl.appendChild(li);

        li.addEventListener('click', function (e) {
          window.location.hash = currentBreed + "/" + small(e.target.textContent);
          pictures.innerHTML = "";
          getBreedImg();
            });
        }
      } else {
        sectionUl.innerHTML = "";
      }
}


function getRandomImg(){
  console.log("hej");
  let currentBreed = window.location.hash.substring(1);
    axios.get('https://dog.ceo/api/breeds/image/random/3')
    .then(function (response) {

      renderRandomImg(response.data.message);
      console.log(response);
    })
    .catch(function (error) {
      console.log("error");
    });
};


function renderRandomImg(response){
    for (let images of response){
      let img = document.createElement("img");
      img.setAttribute("src", images);
      pictures.appendChild(img);
    }
};


button.addEventListener("click", () => {
  if (window.location.hash !== "") {
      pictures.innerHTML = "";
      getBreedImg();
      listSubBreeds();
  } else {
      pictures.innerHTML = "";
      getRandomImg();
  }
});

function getBreedImg(){
  let currentBreed = window.location.hash.substring(1);
    axios.get("https://dog.ceo/api/breed/"+currentBreed+"/images/random/3")
    .then(function (response){
      renderBreedImg(response.data.message);
    })
    .catch(function (error) {
      console.log(error);
    });
};

function renderBreedImg(response){
  for (let images of response){
    let img = document.createElement("img");
    img.setAttribute("src", images);
    pictures.appendChild(img);
  }
  setCurrentBreed();
};


function setCurrentBreed() {
  let hash = window.location.hash.substring(1).split("/");
  h1.textContent = "";
  if (hash.length === 2) {
    h1.textContent = big(hash[0]) + " (" + big(hash[1]) + ")";
  } else {
    h1.textContent = big(hash[0]);
  }
}



if (window.location.hash !== "") {
  pictures.innerHTML = "";
  listSubBreeds();
  getBreedImg();

} else {
  pictures.innerHTML = "";
  getRandomImg();
}
