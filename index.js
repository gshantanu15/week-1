if (document.readyState !== "loading") {
  initializeCode();
  console.log("initializeCode() called!");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
    console.log("initializeCode() called!");
  });
}

function initializeCode() {
  
  const container = document.createElement("div")
  container.className = "container"
  container.appendChild(addWikiItem("Affenpinscher"));
  container.appendChild(addWikiItem("Beagle"));
  container.appendChild(addWikiItem("Doberman"));
  container.appendChild(addWikiItem("Husky"));
  container.appendChild(addWikiItem("Pug"));
  document.body.appendChild(container);

  // getText("Chihuahua_dog")
}

async function logImage(dogBreed) {
  let apiString = "https://dog.ceo/api/breed/"+dogBreed.toLowerCase()+"/images/random"
  const response = await fetch(apiString);
  const image = await response.json();
  const imageURL = image.message
  // console.log(imageURL)
  return imageURL
}
async function getText(dogBreed) {
  let apiString = "https://en.wikipedia.org/api/rest_v1/page/summary/"+dogBreed.toLowerCase()
  const response = await fetch(apiString);
  const jsonResponse = await response.json();
  const dogText = jsonResponse.extract
  console.log(dogText)
  return dogText
}

function addWikiItem(dogBreed) {

  const wikiItem = document.createElement("div");
  wikiItem.className = "wiki-item";
  const wikiText = document.createElement("div");
  wikiText.className = "wiki-content";
  const imgBox = document.createElement("div");
  imgBox.className = "img-container";
  
  const wikiBox = document.createDocumentFragment();
  const img = wikiBox
    .appendChild(wikiItem)
    .appendChild(wikiText)
    .appendChild(imgBox);

  const image = document.createElement("img")
  const imageURL = logImage(dogBreed);
  imageURL.then((imageURL) => {
    image.src = imageURL;
    image.className = "wiki-img"
  })
  img.appendChild(image);
  
  const header = document.createElement("h1")
  header.textContent = dogBreed
  header.className = "wiki-header"
  wikiItem.insertBefore(header,wikiText);
  
  const dogText = document.createElement("p")
  const breedInfo = getText(dogBreed);
  breedInfo.then((breedInfo) =>{
    dogText.textContent = breedInfo;
    dogText.className = "wiki-text"
  })
  wikiText.insertBefore(dogText,imgBox);

  return wikiItem;
}
