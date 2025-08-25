// === state === //
const bankNumber = [];
const oddNumber = [];
const evenNumber = [];

// updating state bankNumber //
function addNumber(num) {
  bankNumber.push(num);
  render(); // updating the ui //
}

function placeInBucket(num) {
  if (num % 2 === 0) {
    evenNumber.push(num); // For Even numbers category //
  } else {
    oddNumber.push(num); // For Odd numbers category //
  }
}

// Sort 1 //
function sortOne() {
  if (bankNumber.length === 0) return; // Edge case if nothing entered //
  const num = bankNumber.shift();
  placeInBucket(num);
  render();
}

// sortAll //
function sortAll() {
  while (bankNumber.length > 0) {
    const num = bankNumber.shift();
    placeInBucket(num);
  }
  render();
}

// Components - creating a form and dispaying in the UI //
function BankForm() {
  const $form = document.createElement("form"); // form element //

  const $input = document.createElement("input");
  $input.type = "text"; // number gives you a toggle so updated as text //
  $input.placeholder = "Enter a number";
  $input.required = true;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add number";
  addBtn.type = "submit";

  const sort1Btn = document.createElement("button");
  sort1Btn.textContent = "Sort 1";
  sort1Btn.type = "button";

  const sortAllBtn = document.createElement("button");
  sortAllBtn.textContent = "Sort All";
  sortAllBtn.type = "button";

  // Event Listner: adding a number to state //
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = Number($input.value);
    if ($input.value !== "" && Number.isFinite(value)) {
      addNumber(value);
      $input.value = "";
    }
  });

  sort1Btn.addEventListener("click", () => {
    sortOne();
  });

  sortAllBtn.addEventListener("click", () => {
    sortAll();
  });

  $form.append($input, addBtn, sort1Btn, sortAllBtn);
  return $form;
}

function NumberList(title, numbers) {
  const $section = document.createElement("section");

  const $h2 = document.createElement("h2");
  $h2.textContent = `${title} (${numbers.length})`;

  const $ul = document.createElement("ul");
  for (const n of numbers) {
    const $li = document.createElement("li");
    $li.textContent = String(n);
    $ul.appendChild($li);
  }

  $section.append($h2, $ul);
  return $section;
}

function App() {
  const $app = document.createElement("div");

  const $title = document.createElement("h2");
  $title.textContent = "Odds & Evens";

  $app.append(
    $title,
    BankForm(),
    NumberList("Number Bank", bankNumber),
    NumberList("Even", evenNumber),
    NumberList("Odd", oddNumber)
  );
  return $app;
}

// === Render === //
function render() {
  const $root = document.querySelector("#app");
  $root.innerHTML = "";
  $root.appendChild(App());
}
render();
