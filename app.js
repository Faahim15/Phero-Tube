
const loadData = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    )
    const data = await response.json();
     return data;
    
  } catch (err) {
     return 'An error has occured'
  }
};
const container = document.getElementById("button-container")
let btn;


//DYNAMIC BUTTON 
loadData().then(data=> data.data.forEach((pd) => {
      btn = document.createElement('button');
      btn.classList.add('category-btn');
      btn.setAttribute('href','#')
      btn.innerText =`${pd.category}`
      container.appendChild(btn);
      btn.addEventListener('click', () => {
         display(`${pd.category_id}`)
         
         
  });
}));
const cards = document.getElementById("cards-boxes")
let cardsDiv;
const drawingDiv = document.getElementById('drawing-div');

//static state  ALL button design 
function staticDesign(){
  fetch('https://openapi.programming-hero.com/api/videos/category/1000')
  .then(res => res.json()) 
  .then(data => data.data.forEach(ele =>{
   drawingDiv.innerHTML=" ";
   const verifiedIcon = ele.authors[0]?.verified ? '<span id="verification"><i class="fa-solid fa-certificate"></i></span>' : '';
   cardsDiv = document.createElement('div'); 
   cardsDiv.classList.add('category-cards');
   
   // Use optional chaining to handle undefined or non-numeric value
   const postedDateInSeconds = parseInt(ele.others.posted_date)?.valueOf() ?? 0;

   // Calculate hours, minutes, and format time
   const hours = Math.floor(postedDateInSeconds / 3600);
   const minutes = Math.floor((postedDateInSeconds % 3600) / 60);
   const formattedTime = (postedDateInSeconds > 0) ? `${hours} hrs, ${minutes}min ago` : '';

   cardsDiv.innerHTML = `
   <div>
   <img class="card-img" src="${ele.thumbnail}" alt="No picture"> 
   ${formattedTime ? `<span id ='formatTime'>${formattedTime}</span>` : ''}
   </div>
 
   <div class='card-content'>
    <div> <img class="profilePic" src="${ele.authors[0].profile_picture}" alt="No picture"> 
    </div>
    <div> 
    <h4>${ele.title}</h4>
    <small>${ele.authors[0].profile_name
    }</small>
    <span>${verifiedIcon}</span> <br>
    <span>${ele.others.views} views</span>
    </div>
   </div>
   ` 
   cards.appendChild(cardsDiv)
  }))
}
 
 
// DYNAMIC CARD 

const display = (id) => {
  cards.innerHTML = " ";
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
      .then(res => res.json())
      .then(data => {
          if (data.data.length === 0) {
              drawingDiv.innerHTML = `
                <img src="./IMAGES/Icon.png" alt=""> 
                <h2>Oops! Sorry, There is no Content here!</h2>
            `;
          }

          data.data.forEach((ele) => {
              drawingDiv.innerHTML = " ";
              cardsDiv = document.createElement('div');
              cardsDiv.classList.add('category-cards');

              const verifiedIcon = ele.authors[0]?.verified ? '<span id="verification"><i class="fa-solid fa-certificate"></i></span>' : '';

              // Use optional chaining to handle undefined or non-numeric value
              const postedDateInSeconds = parseInt(ele.others.posted_date)?.valueOf() ?? 0;

              // Calculate hours, minutes, and format time
              const hours = Math.floor(postedDateInSeconds / 3600);
              const minutes = Math.floor((postedDateInSeconds % 3600) / 60);
              const formattedTime = (postedDateInSeconds > 0) ? `${hours} hrs, ${minutes}min ago` : '';

              cardsDiv.innerHTML = `
                <div>
                    <img class="card-img" src="${ele.thumbnail}" alt="No picture"> 
                    ${formattedTime ? `<span id ='formatTime'>${formattedTime}</span>` : ''}
                </div>
                <div class='card-content'>
                    <div> 
                        <img class="profilePic" src="${ele.authors[0]?.profile_picture}" alt="No picture"> 
                    </div>
                    <div> 
                        <h4>${ele.title}</h4>
                        <small>${ele.authors[0]?.profile_name}</small>
                        ${verifiedIcon} <br>
                        <span>${ele.others.views} views</span>
                    </div>
                </div>
            `;

              cards.appendChild(cardsDiv);
          });
      });
};








//Highest to lowest views
function Views() {
  cards.innerHTML = " ";
  fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    .then(res => res.json())
    .then(data => {
      

      data.data.sort((a, b) => {
        const viewsA = parseInt(a.others.views, 10);
        const viewsB = parseInt(b.others.views, 10);
        return viewsB - viewsA;
      });

      renderSortedData(data.data);
    });
}

function renderSortedData(sortedData) {
  drawingDiv.innerHTML = " ";
  sortedData.forEach(ele => {
    cardsDiv = document.createElement('div');
    cardsDiv.classList.add('category-cards'); 
    const verifiedIcon = ele.authors[0]?.verified ? '<span id="verification"><i class="fa-solid fa-certificate"></i></span>' : '';
    cardsDiv.innerHTML = `
      <div>
        <img class="card-img" src="${ele.thumbnail}" alt="No picture"> 
      </div>
      <div class='card-content'>
        <div>
          <img class="profilePic" src="${ele.authors[0].profile_picture}" alt="No picture">
        </div>
        <div> 
          <h4>${ele.title}</h4>
          <small>${ele.authors[0].profile_name}</small>
          <span>${verifiedIcon}</span> <br>
          <span>${ele.others.views} views</span>
        </div>
      </div>
    `;
    cards.appendChild(cardsDiv);
  });
}

//Static Design CALLING
staticDesign();


