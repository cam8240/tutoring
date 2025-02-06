// Function to encode the input code (Base64 encoding)
function encodeCode(code) {
    return btoa(code); // Encode input to Base64
}

// Precomputed access codes (hashed in Base64)
const validCodes = {
    "U0cxMjNB": "files/study_guide.pdf", // "SG123A" -> Base64
    "QUxHNTQ2Qg==": "https://www.youtube.com/watch?v=o3oQrrL9AIw", // "ALG546B" -> Base64
    "UFc3ODlD": "files/addition_worksheet.pdf" // "PW789C" -> Base64
};

function verifyCode(inputId, linkId) {
    const userInput = document.getElementById(inputId).value.trim();
    const encodedInput = encodeCode(userInput); // Encode user input

    if (validCodes[encodedInput]) {
        const resourceItem = document.getElementById(inputId).parentElement;

        // Hide input field and unlock button
        resourceItem.querySelector("input").style.display = "none";
        resourceItem.querySelector("button").style.display = "none";

        // Hide error message if incorrect before
        const errorMsg = resourceItem.querySelector(".error");
        if (errorMsg) {
            errorMsg.style.display = "none";
        }

        // Show the download link dynamically
        const downloadLink = document.getElementById(linkId);
        downloadLink.href = validCodes[encodedInput]; // Set the correct file link
        downloadLink.style.display = "inline-block"; // Make the button visible
    } else {
        // Show error message
        document.getElementById(`error${inputId.replace("code", "")}`).style.display = "block";
    }
}
