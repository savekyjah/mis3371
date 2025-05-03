// Name: Kyjah Savery
// Date created: May 2, 2025
// Date last edited: May 2, 2025
// Version: 1.1
// Description: Homework 4 JS Patient Form

//dynamic date js code
// const d = new Date();
// let text = d.toLocaleDateString();
// document.getElementById("today").innerHTML = text;

(async function(){
    const dateElements = document.getElementsByClassName("updateDate");
    let currentDate = new Date().toLocaleDateString();
    for(let i = 0;i < dateElements.length; i++){
        dateElements[i].textContent = currentDate;
    }
})();
document.addEventListener("DOMContentLoaded", function () {
    const dateSpan = document.querySelector('.updateDate');
    if (dateSpan) {
        const today = new Date().toLocaleDateString();
        dateSpan.textContent = today;
    }
});

// Set a cookie with expiry in hours
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // X hours from now
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Get a cookie by name
function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length));
        }
    }
    return "";
}

// Delete all cookies
function deleteAllCookies() {
    document.cookie.split(";").forEach(function(cookie) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}

// Display greeting message and logic for new/returning user
document.addEventListener("DOMContentLoaded", function () {
    const greetingDiv = document.getElementById("user-greeting");
    const firstNameCookie = getCookie("firstName");

    if (firstNameCookie) {
        greetingDiv.innerHTML = `
            <div style="background: #e6f7ff; padding: 10px; text-align: center; font-size: 1.2em;">
                Hello, ${firstNameCookie}!<br>
                <label><input type="checkbox" id="new-user-check"> Not ${firstNameCookie}? Click here to start as a new user.</label>
            </div>
        `;

        // Add event listener for "new user" checkbox
        document.getElementById("new-user-check").addEventListener("change", function () {
            if (this.checked) {
                deleteAllCookies();
                document.getElementById("fname").value = "";
                alert("Cookie cleared. You can now enter a new user.");
                location.reload(); // Refresh the page to remove old greeting
            }
        });
    } else {
        greetingDiv.innerHTML = `
            <div style="background: #e6f7ff; padding: 10px; text-align: center; font-size: 1.2em;">
                Hello, New User!
            </div>
        `;
    }

    // Save cookie when name is entered
    const fnameInput = document.getElementById("fname");
    if (fnameInput) {
        fnameInput.addEventListener("input", function () {
            if (fnameInput.value.trim() !== "") {
                setCookie("firstName", fnameInput.value.trim(), 48); // expires in 48 hours
            }
        });
    }
});


//slider js code
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value; 

slider.oninput = function() {
    output.innerHTML = this.value;
};
// dob validation
function validateDob() {
    const dob = document.getElementById("dob").value;
    const date = new Date(dob);
    const maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = "Date can't be in the future";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = "Date can't be more than 120 years ago";
        return false;
    } else {
        document.getElementById("dob-error").innerHTML = "";
        return true;
    }
}
//ssn validation
function validateSsn() {
    const ssn = document.getElementById("ssn").value;
    const ssnR = /^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/;

    if (!ssnR.test(ssn)) {
        document.getElementById("ssn-error").innerHTML = 
        "Please enter a valid SSN";
        return false;
    } else {
        document.getElementById("ssn-error").innerHTML = "";
        return true;
    }
}
//zipcode validation
function validateZcode() {
    const zipInput = document.getElementById("zcode");
    let zip = zipInput.value.replace(/[^\d-]/g, "");

    if (!zip) {
        document.getElementById("zcode-error").innerHTML = 
        "Zip code can't be blank";
        return false;
    }

    if (zip.length > 5) {
        zip = zip.slice(0, 5) + "-" + zip.slice(5, 9);
    } else {
        zip = zip.slice(0, 5);
    }

    zipInput.value = zip;
    document.getElementById("zcode-error").innerHTML = "";
    return true;
}
//email validation
var emailR = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//phone validaton
function formatAndValidatePhone(input) {
    // Remove any non-numeric characters
    let phone = input.replace(/\D/g, '');
    
    // Validate: Check if the phone number is empty or less than 10 digits
    if (phone === '') {
        return 'Phone number cannot be blank';
    }
    
    if (phone.length < 10) {
        return 'Phone number must be 10 digits';
    }
    
    // Format the phone number as 000-000-0000
    phone = phone.substring(0, 10); 
    let formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    
    return formattedPhone;
}
//user validation
function validateUid() {
    uid = document.getElementById("uid").value.toLowerCase();
    document.getElementById("uid").value = uid;

    if (uid.length == 0) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't be blank";
        return false;
    }

    if (!isNaN(uid.charAt(0))) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't start with a number";
        return false;
    }

    let regex = /^[a-zA-Z0-9_-]+$/;
    if (!regex.test(uid)) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can only have letters, numbers, underscores, and dashes";
        return false;
    } else if (uid.length < 5) {
        document.getElementById("uid-error").innerHTML = 
        "User ID must be at least 5 characters";
        return false;
    } else if (uid.length > 30) {
        document.getElementById("uid-error").innerHTML = 
        "User ID can't exceed 30 characters";
        return false;
    } else {
        document.getElementById("uid-error").innerHTML = "";
        return true;
    }
}
//pword validation
function validatePword() {
    const pword = document.getElementById("pword").value;
    const uid = document.getElementById("uid").value;
    let errorMessage = [];
    if (!pword.match(/[a-z]/)) errorMessage.push("Enter at least one lowercase letter");
    if (!pword.match(/[A-Z]/)) errorMessage.push("Enter at least one uppercase letter");
    if (!pword.match(/[0-9]/)) errorMessage.push("Enter at least one number");
    if (!pword.match(/[!\@#\$%&*\-_\\.+\(\)]/)) errorMessage.push("Enter at least one special character");
    if (pword.includes(uid)) errorMessage.push("Password can't contain user ID");

    if (errorMessage.length > 0) {
        document.getElementById("pword-error").innerHTML = errorMessage.join("<br>");
        return false;
    } else {
        document.getElementById("pword-error").innerHTML = "";
        return true;
    }
}

//cpword validation
function confirmPword() {
    const pword1 = document.getElementById("pword").value;
    const pword2 = document.getElementById("cpword").value;

    if (pword1 !== pword2) {
        document.getElementById("pword2-error").innerHTML = "Passwords don't match";
        return false;
    } else {
        document.getElementById("pword2-error").innerHTML = "";
        return true;
    }
}

//review button
function reviewInput() {
    console.log("Review button clicked"); // Debugging statement
    const formcontent = document.getElementById("signup");
    let formoutput = "<table class='output'><tr><th colspan='2'>Review Your Information:</th></tr>";
    for (let i = 0; i < formcontent.elements.length; i++) {
        if (formcontent.elements[i].value !== "") {
            console.log(formcontent.elements[i].name, formcontent.elements[i].value); // Debugging statement
            switch (formcontent.elements[i].type) {
                case "checkbox":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) {
                        formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
                    }
                    break;
                default:
                    formoutput += `<tr><td align='right'>${formcontent.elements[i].name}</td><td>${formcontent.elements[i].value}</td></tr>`;
            }
        }
    }
    formoutput += "</table>";
    document.getElementById("showInput").innerHTML = formoutput;
}

function removeReview() {
    document.getElementById("showInput").innerHTML = "";
}

// Ensure the review button is bound to the reviewInput function
document.getElementById("review").addEventListener("click", reviewInput);
document.getElementById("remove-review-button").addEventListener("click", removeReview);

// Form submission validation
document.querySelector("form").addEventListener("submit", function(event) {
    const uidValid = validateUid();
    const pwordValid = validatePword();
    const cpwordValid = confirmPword();
    const dobValid = validateDob();

    console.log("UID Valid:", uidValid); // Debugging statement
    console.log("Password Valid:", pwordValid); // Debugging statement
    console.log("Confirm Password Valid:", cpwordValid); // Debugging statement
    console.log("DOB Valid:", dobValid); // Debugging statement

    if (!uidValid || !pwordValid || !cpwordValid || !dobValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
    
// alert box
function showAlert() {
    var alertBox = document.getElementById("alert-box");
    var closeAlert = document.getElementById("close-alert");

    alertBox.style.display = "block";
    closeAlert.onclick = function() {
        alertBox.style.display = "none";
    };
}

//validate all
function validateEverything() {
    let valid = true;

    if (!validateFname()) valid = false;

    if (!validateMint()) valid = false;

    if (!validateLname()) valid = false;

    if (!validateDob()) valid = false;

    if (!validateSsn()) valid = false;

    if (!validateAddress1()) valid = false;

    if (!validateCity()) valid = false;

    if (!validateZcode()) valid = false;
    
    if (!validateEmail()) valid = false;

    if (!validatePhone()) valid = false;

    if (!validateUid()) valid = false;

    if (!validatePword()) valid = false;

    if (!confirmPword()) valid = false;


    if (valid) {
        document.getElementById("submit").disabled = false;
    } else {
        showAlert();
    }
}

// validate city
function validateCity() {
    city = document.getElementById("city").value.trim();

    if (!city) {
        document.getElementById("city-error").innerHTML = "City can't be blank";
        return false;
    } else {
        document.getElementById("city-error").innerHTML = "";
        return true;
    }
}
//first name validation
function validateFname() {
    fname = document.getElementById("fname").value.trim();
    var namePattern = /^[a-zA-Z' -]+$/;
    if (fname == ""){
        document.getElementById("fname-error").innerHTML = "First name field can't be empty";
        return false;
    } else if (fname != "") {
        if (!fname.match(namePattern)) { 
            document.getElementById("fname-error").innerHTML = "Letters, apostrophes, and dashes only";
            return false;
        } else if (fname.length < 2) {
            document.getElementById("fname-error").innerHTML = "First name can't be less than 2 characters";
            return false;
        } else if (fname.length > 30) {
            document.getElementById("fname-error").innerHTML = "First name can't be more than 30 characters";
            return false;
        } else {
            document.getElementById("fname-error").innerHTML = "";
            return true;
        } 
         
    }
}
    //last name validation
function validateLname() {
    fname = document.getElementById("lname").value.trim();
    var namePattern = /^[a-zA-Z' -]+$/;
    if (lname == ""){
        document.getElementById("lname-error").innerHTML = "Last name field can't be empty";
        return false;
    } else if (lname != "") {
        if (!lname.match(namePattern)) { 
            document.getElementById("lname-error").innerHTML = "Letters, apostrophes, and dashes only";
            return false;
        } else if (lname.length < 2) {
            document.getElementById("lname-error").innerHTML = "Last name can't be less than 2 characters";
            return false;
        } else if (lname.length > 30) {
            document.getElementById("lname-error").innerHTML = "Last name can't be more than 30 characters";
            return false;
        } else {
            document.getElementById("lname-error").innerHTML = "";
            return true;
        } 
         
    }
    function validateMint() {
        let mint = document.getElementById("mint").value;
        const namePattern = /^[A-Z]+$/;
    
        mint = mint.toUpperCase();
        document.getElementById("mint").value = mint;
    
        if (!mint.match(namePattern)) {
            document.getElementById("mint-error").innerHTML = 
            "Middle initial must be a single uppercase letter";
            return false;
        } else {
            document.getElementById("mint-error").innerHTML = "";
            return true;
        }
    }
}
});
