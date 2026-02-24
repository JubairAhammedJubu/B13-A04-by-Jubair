let interviewList = [];
let rejectedList = [];
let currentStatus = "all-filter-btn";

let total = document.getElementById("total");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");
const tabCount = document.getElementById("tabCount");

function calculateCount() {
  total.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
  console.log(currentStatus);

  if (currentStatus === "all-filter-btn") {
    tabCount.innerText = total.innerText + " jobs";
  }

  if (currentStatus === "interview-filter-btn") {
    tabCount.innerText =
      interviewCount.innerText +
      " of " +
      allCardSection.children.length +
      " jobs";
  }

  if (currentStatus === "rejected-filter-btn") {
    tabCount.innerText =
      rejectedCount.innerText +
      " of " +
      allCardSection.children.length +
      " jobs";
  }
}

calculateCount();

function toggleStyle(id) {
  // Reset buttons
  allFilterBtn.classList.add("bg-white", "text-black", "hover:text-blue-600");
  interviewFilterBtn.classList.add(
    "bg-white",
    "text-black",
    "hover:text-blue-600",
  );
  rejectedFilterBtn.classList.add(
    "bg-white",
    "text-black",
    "hover:text-blue-600",
  );

  allFilterBtn.classList.remove("bg-blue-500", "text-white");
  interviewFilterBtn.classList.remove("bg-blue-500", "text-white");
  rejectedFilterBtn.classList.remove("bg-blue-500", "text-white");

  const selected = document.getElementById(id);
  currentStatus = id;
  calculateCount();

  // active styles
  selected.classList.remove("bg-white", "text-black", "hover:text-blue-600");
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

mainContainer.addEventListener("click", function (event) {
  // Interview
  if (event.target.classList.contains("interview-btn")) {
    const card = event.target.closest(".card");

    const companyName = card.querySelector(".companyName").innerText;
    const jobRole = card.querySelector(".jobRole").innerText;
    const timesalary = card.querySelector(".timesalary").innerText;
    const details = card.querySelector(".notes").innerText;
    const statusButton = card.querySelector("#status");
    if (statusButton) {
      statusButton.innerText = "Interview";
      statusButton.classList.remove("bg-red-500", "text-white");
      statusButton.classList.add("bg-emerald-500", "text-white");
    }

    const parts = timesalary.split("•").map((item) => item.trim());
    const [location, jobType, salary] = parts;

    const jobInfo = {
      companyName,
      jobRole,
      location,
      jobType,
      salary,
      status: "Interview",
      details,
    };
    console.log(jobInfo);

    const jobExist = interviewList.find(
      (item) => item.companyName === jobInfo.companyName,
    );
    if (!jobExist) {
      interviewList.push(jobInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== jobInfo.companyName,
    );

    // Re-render if in "rejected" tab
    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }

    calculateCount();
  }

  // Rejected button clicked
  else if (event.target.classList.contains("rejected-btn")) {
    const card = event.target.closest(".card");

    const companyName = card.querySelector(".companyName").innerText;
    const jobRole = card.querySelector(".jobRole").innerText;
    const timesalary = card.querySelector(".timesalary").innerText;
    const details = card.querySelector(".notes").innerText;
    const statusButton = card.querySelector("#status");
    if (statusButton) {
      statusButton.innerText = "Rejected";
      statusButton.classList.remove("bg-emerald-500", "text-white");
      statusButton.classList.add("bg-red-500", "text-white");
    }

    const parts = timesalary.split("•").map((item) => item.trim());
    const [location, jobType, salary] = parts;

    const jobInfo = {
      companyName,
      jobRole,
      location,
      jobType,
      salary,
      status: "Rejected",
      details,
    };
    console.log(jobInfo);

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

  // Delete card
  else if (event.target.closest(".btn-delete")) {
    const card = event.target.closest(".card");

    const companyName = card.querySelector(".companyName").innerText;

    card.remove();

    interviewList = interviewList.filter(
      (job) => job.companyName !== companyName,
    );
    rejectedList = rejectedList.filter(
      (job) => job.companyName !== companyName,
    );

    if (currentStatus === "interview-filter-btn") renderInterview();
    if (currentStatus === "rejected-filter-btn") renderRejected();

    calculateCount();
  }
});

function renderInterview() {
  filterSection.innerHTML = "";

  if (interviewList.length === 0) {
    filterSection.innerHTML = `
      <div class="text-center py-18 border border-gray-200 rounded-lg">
        <img src="jobs.png" alt="No Jobs" class="w-24 mx-auto my-5" />
        <h2 class="text-2xl font-semibold text-[#002C5C]">No Jobs Available</h2>
        <p class="text-gray-500 lg:text-base text-sm">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  for (let job of interviewList) {
    const div = document.createElement("div");
    div.className = "card space-y-5 border border-gray-200 p-6 mb-6 rounded-lg";
    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <p class="companyName text-lg text-[#002C5C] font-semibold leading-6">${job.companyName}</p>
          <p class="jobRole mt-1.5 text-slate-500">${job.jobRole}</p>
        </div>
        <div class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
        <button class="btn-delete"><i class="fa-regular fa-trash-can text-slate-500 hover:text-red-600"></i></button>
      </div>
      </div>
        <div class="text-slate-500">
          <p class="timesalary flex flex-col lg:flex-row">
            ${job.location} <span class="mx-1.5">•</span> ${job.jobType} <span class="mx-1.5">•</span> ${job.salary}
          </p>
        </div>
        <div>
          <button class="bg-emerald-500 , text-white h-9 w-28 text-sm font-medium rounded-sm">${job.status} </button>
          <p class="notes mt-2 text-[#002C5C]">${job.details}</p>
        </div>
        <div class="flex gap-5 lg:justify-start justify-center">
          <button class="interview-btn text-sm font-semibold leading-6 text-emerald-500 h-9 w-25 border border-emerald-500 rounded-sm hover:bg-emerald-100">Interview</button>
          <button class="rejected-btn text-sm font-semibold leading-6 text-red-500 h-9 w-25 border border-red-500 rounded-sm hover:bg-red-100">Rejected</button>
        </div>
      
    `;
    filterSection.appendChild(div);
  }
}

// Render Rejected
function renderRejected() {
  filterSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filterSection.innerHTML = `
      <div class="text-center py-18 border border-gray-200 rounded-lg">
        <img src="jobs.png" alt="No Jobs" class="w-24 mx-auto my-5" />
        <h2 class="text-2xl font-semibold text-[#002C5C]">No Jobs Available</h2>
        <p class="text-gray-500 lg:text-base text-sm">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }

  for (let job of rejectedList) {
    const div = document.createElement("div");
    div.className = "card space-y-5 border border-gray-200 p-6 mb-6 rounded-lg";
    div.innerHTML = `
      <div class="flex justify-between">
        <div>
          <p class="companyName text-lg text-[#002C5C] font-semibold leading-6">${job.companyName}</p>
          <p class="jobRole mt-1.5 text-slate-500">${job.jobRole}</p>
        </div>
        <div class="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
        <button class="btn-delete"><i class="fa-regular fa-trash-can text-slate-500 hover:text-red-600"></i></button>
        </div>
      </div>
        <div class="text-slate-500">
          <p class="timesalary flex flex-col lg:flex-row">
            ${job.location} <span class="mx-1.5">•</span> ${job.jobType} <span class="mx-1.5">•</span> ${job.salary}
          </p>
        </div>
        <div>
          <button class="bg-red-500 , text-white , h-9 w-28 text-sm font-medium rounded-sm">${job.status}</button>
          <p class="notes mt-2 text-[#002C5C]">${job.details}</p>
        </div>
        <div class="flex gap-5 lg:justify-start justify-center">
          <button class="interview-btn text-sm font-semibold leading-6 text-emerald-500 h-9 w-25 border border-emerald-500 rounded-sm hover:bg-emerald-100">Interview</button>
          <button class="rejected-btn text-sm font-semibold leading-6 text-red-500 h-9 w-25 border border-red-500 rounded-sm hover:bg-red-100">Rejected</button>
        </div>
    `;
    filterSection.appendChild(div);
  }
}
