// import data from '../data/reride_dummy_bikes_20.json' assert{ type: "json" };
//<h3 class="text-4xl">${bike.vehicle_brand} ${bike.vehicle_model}</h3>

let dataList = [];
const listcount = document.getElementById("listcount");

fetch("./data/reride_dummy_bikes_80_updated.json")
    .then(res => res.json())
    .then((data) => {
        dataList = data;
        listcount.innerText = `Found ${dataList.length} Bikes`;
        displayList(dataList);
});



// function displayList(data){
//     const container = document.getElementById("ulist");
//     const loadMoreBtn = document.getElementById("loadMoreBtn");
//     container.innerHTML = "";

//     let currentIndex = 0;
//     const itemsPerPage = 9;

//     data.forEach(bike => {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     card.innerHTML = `<li class="flex flex-col border-2 border-gray-300 rounded-xl bg-white w-[300px] h-fit m-2">
//     <div class='flex flex-col h-fit' id='liBike'>
//         <div class='flex justify-center items-center relative'>
//             <p class='absolute flex bg-white rounded-full right-1 top-1 p-1 opacity-60'><i data-lucide='heart' class='text-black opacity-100'></i></p>
//             <img src="${bike.vehicle_image}" alt="${bike.vehicle_brand}" class="w-fit object-fill rounded-t-xl">
//         </div>
//         <div class='p-2 flex flex-col justify-between content-between'>
//             <div class='flex flex-row justify-between h-fit py-1'>
//                 <div class='flex flex-col justify-start'>
//                     <p class='text-md font-md text-left'>${bike.vehicle_brand}</p>
//                     <p class='bikeName text-2xl font-semibold'>${bike.vehicle_model}</p>
//                 </div>
//                 <div class='flex justify-center items-center'>
//                     <p class='flex justify-center items-center gap-2 px-2 py-1 bg-yellow-100 rounded-xl'>
//                         <i data-lucide="star" class="w-4 rounded-xl  text-yellow-500"></i>
//                     ${bike.vehicle_rating}
//                     </p>
//                 </div>
//             </div>
//             <div class='flex gap-3 items-center py-1 text-gray-500'>
//                 <p class='flex justify-center items-center gap-1 text-sm'><i data-lucide='calendar-days' class="w-4 rounded-xl"></i>${bike.vehicle_model_year}</p>
//                 <p class='flex justify-center items-center gap-1 text-sm'><i data-lucide='gauge' class="w-4 rounded-xl"></i>${bike.vehicle_mileage} km</p>
//                 <p class='flex justify-center items-center gap-1 text-sm'><i data-lucide='radar' class="w-4 rounded-xl"></i>${bike.vehicle_type}</p>
//             </div>
//             <div class='flex flex-row justify-between py-2'>
//                 <div class='flex flex-col'>
//                     <p class='text-sm text-gray-500'>Price :</p>
//                     <p class='text-3xl p-0'>₹${bike.vehicle_selling_price}</p>
//                 </div>
//                 <div class='flex justify-center items-end'>
//                     <button class='px-5 py-2 border-2 border-secondary bg-white rounded-xl font-bold'>View</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </li>
//     `;

//     const nextItems = card.slice(currentIndex, currentIndex + itemsPerPage);

//     nextItems.forEach(item => {
//         container.appendChild(card);
//     });
//     currentIndex += itemsPerPage;
//     if (currentIndex >= products.length) {
//         loadMoreBtn.style.display = "none";
//     }

//     // container.appendChild(card);
//     lucide.createIcons();
//     });
// }


let currentIndex = 0;
const itemsPerPage = 9;

function displayList(data) {
    const container = document.getElementById("ulist");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    container.innerHTML = "";
    currentIndex = 0;


    function loadItems() {
        const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);

        nextItems.forEach(bike => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
            <li class="flex flex-col border-2 border-gray-300 rounded-xl bg-white w-[300px] h-fit m-2">
                <div class='flex flex-col h-fit'>
                    <div class='flex justify-center items-center relative'>
                        <p class='absolute flex bg-white rounded-full right-1 top-1 p-1 opacity-60'>
                            <i data-lucide='heart'></i>
                        </p>
                        <img src="${bike.vehicle_image}" 
                             alt="${bike.vehicle_brand}" 
                             class="w-fit object-fill rounded-t-xl">
                    </div>

                    <div class='p-2 flex flex-col justify-between'>
                        <div class='flex flex-row justify-between py-1'>
                            <div>
                                <p class='text-md text-left'>${bike.vehicle_brand}</p>
                                <p class='text-2xl font-semibold'>
                                    ${bike.vehicle_model}
                                </p>
                            </div>

                            <p class='flex items-center gap-2 px-2 py-1 bg-yellow-100 rounded-xl'>
                                <i data-lucide="star" class="w-4 text-yellow-500"></i>
                                ${bike.vehicle_rating}
                            </p>
                        </div>

                        <div class='flex gap-3 py-1 text-gray-500'>
                            <p class='flex gap-1 text-sm'>
                                <i data-lucide='calendar-days' class="w-4"></i>
                                ${bike.vehicle_model_year}
                            </p>
                            <p class='flex gap-1 text-sm'>
                                <i data-lucide='gauge' class="w-4"></i>
                                ${bike.vehicle_mileage} km
                            </p>
                            <p class='flex gap-1 text-sm'>
                                <i data-lucide='radar' class="w-4"></i>
                                ${bike.vehicle_type}
                            </p>
                        </div>

                        <div class='flex justify-between py-2'>
                            <div>
                                <p class='text-sm text-gray-500'>Price :</p>
                                <p class='text-3xl'>₹${bike.vehicle_selling_price}</p>
                            </div>

                            <button class='px-5 py-2 border-2 border-secondary rounded-xl font-bold'>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            `;

            container.appendChild(card);
            // currentIndex += itemsPerPage;
        
        });

        currentIndex += itemsPerPage;
        
        if(currentIndex >= data.length) {
            loadMoreBtn.style.display = "none";
            currentIndex = 0;
        }

        lucide.createIcons();
    }

    loadItems();

    loadMoreBtn.onclick = loadItems;
}

// loadMoreBtn.onclick = loadItems;

function searchBuy(){
    const search_input = document.getElementById('searchBuy');
    let filter = search_input.value.toUpperCase();
    let ul = document.getElementById("ulist");
    let li = ul.getElementsByTagName("li");
    let bikeName ,count = 0;
    for (i = 0; i < li.length; i++) {
        bikeName = li[i].querySelector(".bikeName");
        console.log(bikeName.value);
        txtValue = bikeName.textContent || bikeName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "flex";
            count++;
        } else {
            li[i].style.display = "none";
        }
    }
    if(search_input.value !== ''){
        listcount.innerHTML = `${count} out of ${dataList.length} found`;
    }

    else{
        listcount.innerText = `Found ${dataList.length} Bikes`;
    }
}

const sortSelect = document.getElementById("sortBuy");

sortSelect.addEventListener("change", function () {
  let valueSort = this.value;

    let bikes;
  if (valueSort === "vehicle_model_year_htl") {
    bikes = [...dataList].sort((a, b) => b.vehicle_model_year - a.vehicle_model_year);
  } 
  if (valueSort === "vehicle_model_year_lth") {
    bikes = [...dataList].sort((a, b) => a.vehicle_model_year - b.vehicle_model_year);
  } 
  if (valueSort === "vehicle_selling_price_lth") {
    bikes = [...dataList].sort((a, b) => a.vehicle_selling_price - b.vehicle_selling_price);
  }
  if (valueSort === "vehicle_selling_price_htl") {
    bikes = [...dataList].sort((a, b) => b.vehicle_selling_price - a.vehicle_selling_price);
  }
  if (valueSort === "rating_htl") {
    bikes = [...dataList].sort((a, b) => b.vehicle_rating - a.vehicle_rating);
  }
  displayList(bikes);

});


// const priceRadios = document.querySelectorAll('input[name="price"]');
const brandChecks = document.querySelectorAll('input[name="brand"]');
const yearChecks = document.querySelectorAll('input[name="year"]');
const colorChecks = document.querySelectorAll('input[name="color"]');
const clearFilterBtn = document.getElementById('clearFilterBtn');
const priceChecks = document.querySelectorAll('input[name="price"]');

clearFilterBtn.addEventListener("click", function(){
    document
    .querySelectorAll('input[type="checkbox"]')
    .forEach(input => input.checked = false);
    displayList(dataList);
    listcount.innerText = `Found ${dataList.length} Bikes`;
});

function getSelectedValue(radios) {
  const selected = [...radios].find(radio => radio.checked);
  return selected ? selected.value : "";
}

function getCheckedValue(checks) {
  return [...checks]
    .filter(cb => cb.checked)
    .map(cb => cb.value);
}

function applyFilters() {
    // const selectedPrice = getSelectedValue(priceRadios);
    const selectedPrice = getCheckedValue(priceChecks);
    const selectedBrand = getCheckedValue(brandChecks);
    const selectedYear = getCheckedValue(yearChecks);
    const selectedColor = getCheckedValue(colorChecks);

    let filteredData = [];
    filteredData = [...dataList].filter(bike => {

    let brandMatch = selectedBrand.length === 0 || selectedBrand.includes(bike.vehicle_brand);
    let colorMatch = selectedColor.length === 0 || selectedColor.includes(bike.vehicle_colour);
    let priceMatch = true;
    let yearMatch = true;

    // if (selectedPrice !== "") {
    //     let [min, max] = selectedPrice.split("-");
    //     priceMatch = bike.vehicle_selling_price >= Number(min) && bike.vehicle_selling_price <= Number(max);
    // }

    if (selectedPrice.length > 0) {
        priceMatch = selectedPrice.some(range => {
            let [min, max] = range.split("-");
            return (
            bike.vehicle_selling_price >= Number(min) &&
            bike.vehicle_selling_price <= Number(max)
            );
        });
    }

    if (selectedYear.length > 0) {
        yearMatch = selectedYear.some(range => {
            let [min, max] = range.split("-");
            return (
            bike.vehicle_model_year >= Number(min) &&
            bike.vehicle_model_year <= Number(max)
            );
        });
    }

    return priceMatch && brandMatch && yearMatch && colorMatch;
    });
    if(filteredData !== ''){
        listcount.innerHTML = `${filteredData.length} out of ${dataList.length} found`;
    }

    else{
        listcount.innerText = `Found ${dataList.length} Bikes`;
    }
    displayList(filteredData);
}

// [...priceRadios].forEach(radio => {
//     radio.addEventListener("change", applyFilters);
// });
priceChecks.forEach(cb => {
    cb.addEventListener("change", applyFilters);
});

brandChecks.forEach(cb => {
    cb.addEventListener("change", applyFilters);
});

yearChecks.forEach(cb => {
    cb.addEventListener("change", applyFilters);
});

colorChecks.forEach(cb => {
    cb.addEventListener("change", applyFilters);
});

