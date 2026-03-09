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
            <h2 class="text-lg font-bold">${issue.title}</h2>

            <p class="text-sm text-gray-600 mt-2">
                ${issue.description}
            </p>

            <div class="mt-3 text-sm">
                <p><b>Status:</b> ${issue.status}</p>
                <p><b>Author:</b> ${issue.author}</p>
                <p><b>Priority:</b> ${issue.priority}</p>
                <p><b>Label:</b> ${issue.label}</p>
            </div>

            <p class="text-xs text-gray-400 mt-3">
                ${issue.createdAt}
            </p>
        `

        // 4. Append the child
        issueContainer.append(card);
    });
}

loadIssues();