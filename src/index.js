let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch("http://localhost:3000/toys")
  .then((r)=>r.json())
  .then((toys)=>
    toys.forEach(toy => addToysToPage(toy))
   )

function addToysToPage(toy){
  const toyCollection = document.getElementById("toy-collection");
  const toyDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button")
  
  toyDiv.classList.add("card");
  button.classList.add("like-btn");
  img.classList.add("toy-avatar");
  button.setAttribute('id', toy.id);

  toyCollection.appendChild(toyDiv);

  toyDiv.appendChild(h2).textContent = toy.name;
  toyDiv.appendChild(img).src = toy.image;
  toyDiv.appendChild(p).textContent = toy.likes
  toyDiv.appendChild(button).textContent = "Like ❤️"

  button.addEventListener("click", function() {
    p.textContent = (toy.likes += parseInt(1)); 
    let newNumberOfLikes = p.textContent;

    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "likes": newNumberOfLikes,
      })
    })

  })

}

const toyForm = document.querySelector(".add-toy-form");

toyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameVal = e.target.name.value;
  const imgVal = e.target.image.value;

  let newToy = {
    name: nameVal,
    image: imgVal,
    likes: 0,
  }

  fetch("http://localhost:3000/toys",{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body:JSON.stringify(newToy)
})

.then(r => r.json())
.then(newToy => addToysToPage(newToy))

})


