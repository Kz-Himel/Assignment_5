// Import Log in Button
const signInBtn = document.getElementById("signIn-btn");
signInBtn.addEventListener("click", () => {
    // Get the user input
    const user = document.getElementById("user-input");
    const userInput = user.value;
    console.log("Contact Number:", userInput);
    // Get the pass input
    const pass = document.getElementById("pass-input");
    const passInput = pass.value;
    console.log("Pin:", passInput);
    
    // condional statement
    if(userInput == "admin" && passInput == "admin123") {
        // When login is true go to the home page
        window.location.assign("dashboard.html");
    }
    else {
        alert("Invalid Credentials")
        return;
    }
});