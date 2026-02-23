let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}

calculateCount();

function toggleStyle(id) {
  // Reset all buttons
  allFilterBtn.classList.add("bg-white", "text-black");
  interviewFilterBtn.classList.add("bg-white", "text-black");
  rejectedFilterBtn.classList.add("bg-white", "text-black");

  allFilterBtn.classList.remove("bg-blue-500", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-500", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-500", "text-white");

  const selected = document.getElementById(id);
  currentStatus = id;

  selected.classList.remove("bg-white", "text-black");
  selected.classList.add("bg-blue-500", "text-white");

  if (id === "interview-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id === "rejected-filter-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderRejected();
  }
}

// Event delegation
mainContainer.addEventListener("click", function (event) {
  // Interview Button

  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".companyName").innerText;
    const jobRole = parentNode.querySelector(".jobRole").innerText;
    const timesalary = parentNode.querySelector(".timesalary").innerText;
    const details = parentNode.querySelector(".notes").innerText;
    const statusButton = parentNode.querySelector("#status");
    if (statusButton) statusButton.innerText = "Interview";

    const jobInfo = {
      companyName,
      jobRole,
      timesalary,
      status: "Interview",
      details,
    };

    const jobExist = interviewList.find(
      (item) => item.companyName === jobInfo.companyName,
    );

    if (!jobExist) {
      interviewList.push(jobInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== jobInfo.companyName,
    );

    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }

    calculateCount();
  }

  // Rejected Button
  else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".companyName").innerText;
    const jobRole = parentNode.querySelector(".jobRole").innerText;
    const timesalary = parentNode.querySelector(".timesalary").innerText;
    const details = parentNode.querySelector(".notes").innerText;
    const statusButton = parentNode.querySelector("#status");
    if (statusButton) statusButton.innerText = "Rejected";

    const jobInfo = {
      companyName,
      jobRole,
      timesalary,
      status: "Rejected",
      details,
    };

    const jobExist = rejectedList.find(
      (item) => item.companyName === jobInfo.companyName,
    );

    if (!jobExist) {
      rejectedList.push(jobInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== jobInfo.companyName,
    );

    if (currentStatus === "interview-filter-btn") {
      renderInterview();
    }

    calculateCount();
  }
});
