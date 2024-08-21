
const dropDown = document.querySelector(".drop-icon");
const hideDropDown = document.querySelector(".hide-icon");
const instruction = document.querySelector(".instruction");
instruction.style.display = "none";
hideDropDown.style.display = "none";
dropDown.style.transform = "rotate(180deg)";
hideDropDown.style.transform = "rotate(360deg)";
let dropDownExpanded = false;

function openDropdown() {
  {
    instruction.style.display = "flex";
    dropDown.style.display = "none";
    hideDropDown.style.display = "flex";
    dropDownExpanded = true;
  }
}

function closeDropdown() {
  instruction.style.display = "none";
  hideDropDown.style.display = "none";
  dropDown.style.display = "flex";
  dropDownExpanded = false;
}

dropDown.addEventListener("click", function () {
  if (!dropDownExpanded) {
    openDropdown();
  }
});

hideDropDown.addEventListener("click", function () {
  if (dropDownExpanded) {
    closeDropdown();
  }
});


