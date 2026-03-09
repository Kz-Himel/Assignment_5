let allIssues = [];

const loadIssues = () => {

    showLoader(true); // Show loader while loading
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        // console.log(json.data);
        allIssues = json.data;
        showIssues(allIssues);
        showLoader(false); // Hide loader after load data
    });
}

// Changing tab function
const changeTab = (status) => {

    // remove active class from all tabs
    document.getElementById("tab-all").classList.remove("btn-primary");
    document.getElementById("tab-open").classList.remove("btn-primary");
    document.getElementById("tab-closed").classList.remove("btn-primary");

    // add active class to selected tab
    document.getElementById("tab-" + status).classList.add("btn-primary");

    let filteredIssues = [];

    if(status === "all"){
        filteredIssues = allIssues;
    }
    else{
        filteredIssues = allIssues.filter(issue => issue.status === status);
    }

    showIssues(filteredIssues);

}

// ShowIssues() --- For display all Issues
const showIssues = (issues) => {

    // 1. get the container
    const issueContainer = document.getElementById("issue-container");
    // Empty the container
    issueContainer.innerHTML = "";

    // For showing Isssue count dynamically
    document.getElementById("issue-count").innerText = issues.length + " Issues";

    //2. Start a loop for getting issues
    issues.forEach(issue => {
        
        // 3. Create a html element
        const card = document.createElement("div");

        // Color boder based on status
        let borderColor = ""

        // Condiotons for borderr color
        if(issue.status == "open") {
            borderColor = "border-green-500";
            // status bases img
            img = "assets/Open-Status.png"
        }
        else {
            borderColor = "border-purple-600";
            // status bases img
            img = "assets/Closed-Status.png"
        }

        card.className = `bg-white p-4 rounded shadow border-t-4 ${borderColor}`;

        // Condition for priority and their color
        let priorityColor = "";

        if(issue.priority === "high"){
            priorityColor = "bg-red-200 text-red-500";
        }
        else if(issue.priority === "medium"){
            priorityColor = "bg-yellow-100 text-yellow-500";
        }
        else if(issue.priority === "low"){
            priorityColor = "bg-gray-200 text-gray-500";
        }

        // Innerhtml of the issue cards
        card.innerHTML = `
                <div class="upper flex flex-col gap-3 p-4">
          <div class="flex justify-between">
        <img class="h-[24px] w-auto" src="${img}" alt="">
        <p class="${priorityColor} font-bold uppercase px-5 py-1 rounded-[18px]">${issue.priority}</p>
      </div>

      <div class="">
        <h2 class="text-lg font-bold">${issue.title}</h2>

            <p class="text-sm text-gray-600 mt-2">
                ${issue.description}
            </p>

            <div class="mt-3 text-sm flex gap-2 items-center">
                <p class="bg-red-100 font-bold uppercase px-3 py-1 text-red-500 rounded-[18px] border border-red-500">
                  <i class="ri-bug-line"></i>
                  BUG</p>
                <p class="bg-orange-100 font-bold uppercase px-3 py-1 text-orange-500 rounded-[18px] border border-orange-500">
                  <i class="ri-donut-chart-line"></i>
                  Help Wanted</p>
            </div>
      </div>

        </div>

        <hr class="text-gray-400">
        
        <div class="lower p-4 space-y-2">
              <p class="text-gray-500">${issue.author}</p>
              <p class="text-gray-500">${issue.createdAt}</p>
            </div>
        `

        // 4. Append the child
        issueContainer.append(card);
    });
}

// function for search 
const searchIssues = () => {
    // Get the input
    const searchText = document.getElementById('search-input').value.toLowerCase();
    // Filter the issues
    const filterIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchText) ||
        issue.description.toLowerCase().includes(searchText)
    );

    showIssues(filterIssues);
}
// Function for loader
function showLoader(state){
    // Get the loader
    const loader=document.getElementById("loader")

    if(state){
        loader.classList.remove("hidden")
    }
    else{
    loader.classList.add("hidden")
    }
}

loadIssues();
