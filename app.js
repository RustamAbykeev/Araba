const CARS = JSON.parse(DATA)
// console.log(CARS);
const showcaseEl = document.getElementById('showcase')
// console.dir(showcaseEl);
renderCards(showcaseEl, CARS)
// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "https://images.unsplash.com/photo-1523983302122-73e869e1f850?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vin_check": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": null,
//     "odo": 394036,
//     "consume": {
//       "city": 12.3,
//       "mixed": 8.4
//     }
//   },




function renderCards(showcaseEl = document, carsArray = []) {
    showcaseEl.innerHTML = createCardTemplateList(carsArray).join('')
}

function createCardTemplateList(carsArray = []) {
    return carsArray.map(carData => createCardTemplate(carData))
}

function createCardTemplate(carData = {}) {
    return `<div class="card box">
    <div class="card-img-wrap">
               ${carData.top ? ` <span class="card-badge top">TOP!</span>` : ''}
                <img class="card-img" src="${carData.img}" alt="${carData.make} ${carData.model}" width="1" height="1" loading="lazy" decoding="async">
            </div>
    <div class="card-body">
        <h2>${carData.make} ${carData.model} ${carData.engine_volume}L (${carData.year})</h2>
        <h3>${carData.price}$</h3>
        <p>VIN:${carData.vin}</p>
        <p>VIN проверен: ${carData.vin_check ? "Да" : "Нет"}</p>
        <a href="tel:${carData.phone}" class="card-btn">${carData.seller}</a>
        
    </div>
</div>`
}