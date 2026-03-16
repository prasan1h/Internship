let dataList = [];
let searchData = [];
let filteredData = [];

const listcount = document.getElementById("listcount");
const sortSelect = document.getElementById("sortBuy");

const brandChecks = document.querySelectorAll('input[name="brand"]');
const yearChecks = document.querySelectorAll('input[name="year"]');
const colorChecks = document.querySelectorAll('input[name="color"]');
const clearFilterBtn = document.getElementById("clearFilterBtn");
const priceChecks = document.querySelectorAll('input[name="price"]');

let currentIndex = 0;
const itemsPerPage = 9;

fetch("./data/reride_dummy_bikes_80_realistic.json")
  .then((res) => res.json())
  .then((data) => {
    dataList = data;
    updateDisplay();
  });

priceChecks.forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

brandChecks.forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

yearChecks.forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

colorChecks.forEach((cb) => {
  cb.addEventListener("change", applyFilters);
});

sortSelect.addEventListener("change", sortAll);
clearFilterBtn.addEventListener("click", clearAll);

function displayList(data) {
  const container = document.getElementById("ulist");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  container.innerHTML = "";
  currentIndex = 0;

  if (data.length === 0) {
    loadMoreBtn.style.display = "none";
    return;
  }

  loadMoreBtn.style.display = "block";

  function loadItems() {
    const nextItems = data.slice(currentIndex, currentIndex + itemsPerPage);

    nextItems.forEach((bike) => {
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
                                <p class='bikeName text-2xl font-semibold'>
                                    ${bike.vehicle_model}
                                </p>
                            </div>

                            <p class='flex items-center gap-2 px-2 py-0 bg-yellow-100 rounded-xl h-fit'>
                                <i data-lucide="star" class="w-4 text-yellow-500"></i>
                                ${bike.vehicle_rating}
                            </p>
                        </div>

                        <div class='flex items-center gap-3 py-1 text-gray-500'>
                            <p class='flex items-center gap-1 text-sm'>
                                <i data-lucide='calendar-days' class="w-4"></i>
                                ${bike.vehicle_model_year}
                            </p>
                            <p class='flex items-center gap-1 text-sm'>
                                <i data-lucide='gauge' class="w-4"></i>
                                ${bike.vehicle_mileage} km
                            </p>
                            <p class='flex items-center gap-1 text-sm'>
                                <i data-lucide='radar' class="w-4"></i>
                                ${bike.vehicle_type}
                            </p>
                        </div>

                        <div class='flex justify-between items-end py-2'>
                            <div>
                                <p class='text-sm text-gray-500'>Price :</p>
                                <p class='text-3xl'>₹${bike.vehicle_selling_price}</p>
                            </div>

                            <button class='px-5 h-12 py-1 text-md  flex items-center justify-center  border-2 border-secondary rounded-xl font-bold'>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </li>
            `;

      container.appendChild(card);
    });

    currentIndex += itemsPerPage;

    if (currentIndex >= data.length) {
      loadMoreBtn.style.display = "none";
    }

    lucide.createIcons();
  }

  loadItems();

  loadMoreBtn.onclick = loadItems;
}

document.getElementById("searchBuy").addEventListener("mouseout", blankSearch);

function blankSearch() {
  const search_value = document.getElementById("searchBuy").value;
  if (search_value == "") {
    displayList(dataList);
    listcount.innerText = `Found ${dataList.length} Bikes`;
    clearAll();
  } else {
    return;
  }
}

function searchBuy() {
  const search_input = document.getElementById("searchBuy");
  let filter = search_input.value.toUpperCase();

  if (filter === "") {
    searchData = [];
  } else {
    searchData = dataList.filter((bike) => {
      return (
        bike.vehicle_model.toUpperCase().includes(filter) ||
        bike.vehicle_brand.toUpperCase().includes(filter)
      );
    });
  }

  applyFilters();
}

function getCurrentData() {
  if (filteredData.length > 0) {
    return filteredData;
  } else if (searchData.length > 0) {
    return searchData;
  } else if (searchData.length === 0 && isSearchActive()) {
    return [];
  } else {
    return dataList;
  }
}

function isSearchActive() {
  const search_input = document.getElementById("searchBuy");
  return search_input.value.trim() !== "";
}

function isFilterActive() {
  const selectedPrice = getCheckedValue(priceChecks);
  const selectedBrand = getCheckedValue(brandChecks);
  const selectedYear = getCheckedValue(yearChecks);
  const selectedColor = getCheckedValue(colorChecks);

  return (
    selectedPrice.length > 0 ||
    selectedBrand.length > 0 ||
    selectedYear.length > 0 ||
    selectedColor.length > 0
  );
}

function sortAll() {
  updateDisplay();
}

function updateDisplay() {
  let currentData = getDataToDisplay();
  let sortedData = applySorting(currentData);
  
  displayList(sortedData);
  updateListCount(sortedData.length);
}

function getDataToDisplay() {
  const search_input = document.getElementById("searchBuy");
  let filter = search_input.value.toUpperCase().trim();
  let workingData = dataList;

  if (filter !== "") {
    workingData = dataList.filter((bike) => {
      return (
        bike.vehicle_model.toUpperCase().includes(filter) ||
        bike.vehicle_brand.toUpperCase().includes(filter)
      );
    });
  }

  const selectedPrice = getCheckedValue(priceChecks);
  const selectedBrand = getCheckedValue(brandChecks);
  const selectedYear = getCheckedValue(yearChecks);
  const selectedColor = getCheckedValue(colorChecks);

  if (
    selectedPrice.length > 0 ||
    selectedBrand.length > 0 ||
    selectedYear.length > 0 ||
    selectedColor.length > 0
  ) {
    workingData = workingData.filter((bike) => {
      let brandMatch =
        selectedBrand.length === 0 || selectedBrand.includes(bike.vehicle_brand);
      let colorMatch =
        selectedColor.length === 0 ||
        selectedColor.includes(bike.vehicle_colour);
      let priceMatch = true;
      let yearMatch = true;

      if (selectedPrice.length > 0) {
        priceMatch = selectedPrice.some((range) => {
          let [min, max] = range.split("-");
          return (
            bike.vehicle_selling_price >= Number(min) &&
            bike.vehicle_selling_price <= Number(max)
          );
        });
      }

      if (selectedYear.length > 0) {
        yearMatch = selectedYear.some((range) => {
          let [min, max] = range.split("-");
          return (
            bike.vehicle_model_year >= Number(min) &&
            bike.vehicle_model_year <= Number(max)
          );
        });
      }

      return priceMatch && brandMatch && yearMatch && colorMatch;
    });
  }

  return workingData;
}

function applySorting(data) {
  let valueSort = sortSelect.value;

  if (valueSort === "vehicle_model_year_htl") {
    return [...data].sort(
      (a, b) => b.vehicle_model_year - a.vehicle_model_year
    );
  }
  if (valueSort === "vehicle_model_year_lth") {
    return [...data].sort(
      (a, b) => a.vehicle_model_year - b.vehicle_model_year
    );
  }
  if (valueSort === "vehicle_selling_price_lth") {
    return [...data].sort(
      (a, b) => a.vehicle_selling_price - b.vehicle_selling_price
    );
  }
  if (valueSort === "vehicle_selling_price_htl") {
    return [...data].sort(
      (a, b) => b.vehicle_selling_price - a.vehicle_selling_price
    );
  }
  if (valueSort === "rating_htl") {
    return [...data].sort((a, b) => b.vehicle_rating - a.vehicle_rating);
  }

  return [...data];
}

function updateListCount(count) {
  if (count === dataList.length) {
    listcount.innerText = `Found ${dataList.length} Bikes`;
  } else {
    listcount.innerHTML = `${count} out of ${dataList.length} found`;
  }
}

function clearAll() {
  document
    .querySelectorAll('input[type="checkbox"]')
    .forEach((input) => (input.checked = false));

  filteredData = [];

  updateDisplay();
}

function getCheckedValue(checks) {
  return [...checks].filter((cb) => cb.checked).map((cb) => cb.value);
}

function applyFilters() {
  updateDisplay();
}