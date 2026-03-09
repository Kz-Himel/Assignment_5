const loadIssues = () => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        // console.log(json.data);
        showIssues(json.data);
    })
}

// ShowIssues() --- For display all Issues
const showIssues = (issues) => {

    // 1. get the container
    const issueContainer = document.getElementById("issue-container");
    // Empty the container
    issueContainer.innerHTML = "";

    //2. Start a loop for getting issues
    issues.forEach(issue => {
        
        // 3. Create a html element
        const card = document.createElement("div");

        // Color boder based on status
        let borderColor = ""

        // Condiotons for borderr color
        if(issue.status == "open") {
            borderColor = "border-green-500";
        }
        else {
            borderColor = "border-purple-600";
        }

        card.className = `bg-white p-4 rounded shadow border-t-4 ${borderColor}`;

        // Innerhtml of the issue cards
        card.innerHTML = `
                <div class="upper flex flex-col gap-3 p-4">
          <div class="flex justify-between">
        <img class="h-[24px] w-auto" src="assets/Open-Status.png" alt="">
        <p class="bg-red-200 font-bold uppercase px-5 py-1 text-red-500 rounded-[18px]">${issue.priority}</p>
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

loadIssues();
