let CARS = JSON.parse(DATA)
// console.log(CARS);
const showcaseEl = document.getElementById('showcase')
const sortSelectEl = document.getElementById('sortSelect')
const searchFormEl = document.getElementById('searchForm')
// console.dir(showcaseEl);
if (!localStorage.getItem('wishCars')) {
    localStorage.setItem('wishCars', JSON.stringify([]));
}

const wishCars = JSON.parse(localStorage.getItem('wishCars'));

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

showcaseEl.addEventListener('click', e => {
    const btn = e.target.closest('.wish-btn')
    if (btn) {
        const id = btn.closest('.card').dataset.id
        // console.log(btn.closest('.card').dataset)
        // console.log(id);
        const wishCarIdx = wishCars.findIndex(wishCarId => wishCarId === id);
        console.log(wishCarIdx);
        const icon = btn.firstElementChild;
        if (wishCarIdx === -1) {
            wishCars.push(id);
            icon.classList.remove('far')
            icon.classList.add('fas')
        } else {
            wishCars.splice(wishCarIdx, 1);
            icon.classList.remove('fas')
            icon.classList.add('far')
        }
        localStorage.setItem('wishCars', JSON.stringify(wishCars))
    }
})



searchFormEl.addEventListener('submit', e => {
    e.preventDefault()
    const query = e.target.search.value.trim().toLowerCase().split(' ').filter(Boolean)
    console.log(query);
    const searchFields = ['make', 'model', 'year']
    CARS = JSON.parse(DATA).filter(car => { 
        return query.every(word => {
            return searchFields.some(field => {
                return String(car[field]).toLowerCase().includes(word)
            })
        })
    })
    console.table(CARS);
    renderCards(showcaseEl, CARS)
})

sortSelectEl.addEventListener('change', e => {
    console.log(e.target.value);
    const [key, order] = e.target.value.split('/')
    CARS.sort((car1, car2) => {
        return String(car1[key]).localeCompare(String(car2[key]), undefined, { numeric: true }) * order
    })
    renderCards(showcaseEl, CARS)
})

// document.addEventListener('click', e => {
//     console.log(e);
// })

function renderCards(showcaseEl = document, carsArray = []) {
    showcaseEl.innerHTML = createCardTemplateList(carsArray).join('')
}

function createCardTemplateList(carsArray = []) {
    return carsArray.map(carData => createCardTemplate(carData))
}

function createCardTemplate(carData = {}) {
    return `<div class="card box" data-id=${carData.id}>
    <div class="card-img-wrap">
               ${carData.top ? ` <span class="card-badge top">TOP!</span>` : ''}
                <img class="card-img" src="${carData.img}" alt="${carData.make} ${carData.model}" width="1" height="1" loading="lazy" decoding="async">
            </div>
    <div class="card-body">
        <h2>${carData.make} ${carData.model} ${carData.engine_volume}L (${carData.year})</h2>
        <h3>${carData.price}$</h3>
        <h4 class="card-rating">${createStarsRating(carData.rating)} ${carData.rating}</h4>  
        ${carData.vin ? `<p>VIN:${carData.vin}</p>` : ''}
        ${carData.vin ? `<p>VIN проверен: ${carData.vin_check ? "Да" : "Нет"}</p>` : ''}
        <a href="tel:${carData.phone}" class="card-btn">${carData.seller}</a>
        <button class="card-btn wish-btn">
             <i class="${wishCars.includes(carData.id) ? 'fas' : 'far'} fa-star"></i>
        </button>
    </div>
</div>` 
}

function createStarsRating(rating) {
    let stars = ''
    for (let i = 0; i < 5; i++) {
        if (i + 0.5 < rating) {
            stars += '<i class="fas fa-star star"></i>'
        } else if (i < rating) {
            stars += '<i class="fas fa-star-half-alt star"></i>'
        } else {
            stars += '<i class="far fa-star star"></i>'
        }
    }
    return stars
}



// const arr = [{ a: 1, b: 2, c: 3 }, { a: 3, b: 2, c: 2 }, { a: 2, b: 1, c: 1 }, { a: 1, b: 1, c: 3 }, { a: 3, b: 1, c: 2 }, { a: 2, b: 1, c: 1 }]

// console.table([...arr]);

// arr.sort((obj1, obj2) => obj1.a - obj2.a || obj1.b - obj2.b)

// console.table([...arr]);


// document.addEventListener('click', () => {
//     console.log('Click on document!');
// })

// testBtn.addEventListener('click', () => {
//     console.log('Click on button!');
// })

// const buttons = document.querySelectorAll('.test-btn')
// console.log(buttons);
// buttons.forEach((button) => {
//     button.addEventListener('click', () => {
//         console.log('click on btn!');
//     })
// })
document.addEventListener('click', (event) => {
    const btn = event.target.closest('.test-btn')
    if (btn) {
        console.log('click on btn');
    }
})



// const nums = [1,5,12,15,2,15,23,65,4]

// const nums10 = nums.filter(num => num > 10)
// console.log(nums10);