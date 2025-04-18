// Name: Kyjah Savery
// Date created: March 5, 2025
// Date last edited: March 5, 2025
// Version: 1.1
// Description: Homework 2 JS Patient Form

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

//slider js code
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value; 

slider.oninput = function() {
    output.innerHTML = this.value;
};
// dob validation
function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date().setFullYear(new Date().getFullYear() - 120);

    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be in the future";
        dob.value = "";
        return false;
    } else if (date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = 
        "Date can't be more than 120 years ago";
        dob.value = "";
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
    let formoutput = "<table class='output'><th colspan='3'>Review Your Information:</th>";
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
});