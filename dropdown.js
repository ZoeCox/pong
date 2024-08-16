const dropDown = document.querySelector(".drop-icon");
const instruction = document.querySelector(".instruction");
instruction.style.display = "none";
dropDown.style.transform = "rotate(180deg)";
let dropDownExpanded = false;

function openDropdown() {
  {
    instruction.style.display = "flex";
    dropDown.style.transform = "rotate(180deg)";
    dropDownExpanded = true;
  }
}

function closeDropdown() {
  instruction.style.display = "none";
  dropDown.style.transform = "rotate(180deg)";
  dropDownExpanded = false;
}

dropDown.addEventListener("click", function () {
  if (!dropDownExpanded) {
    openDropdown();
  }
  //  else if (dropDownExpanded);
  // closeDropdown();
});
