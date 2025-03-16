const LAMBDA_API_URL = "https://giw16ldj9k.execute-api.us-east-2.amazonaws.com/getSignedUrl"; // Replace with your actual API Gateway URL

async function verifyCode(inputId, linkId, expectedFile, unlockSectionId) {
    const userCode = document.getElementById(inputId).value.trim();
    const errorElement = document.getElementById(`error${inputId.slice(-1)}`);
    const linkElement = document.getElementById(linkId);
    const unlockSection = document.getElementById(unlockSectionId);

    if (!userCode) {
        errorElement.style.display = "block";
        return;
    }

    console.log("Sending code:", userCode);
    console.log("Expected file:", expectedFile);

    // Send the access code along with the expected file name
    const requestBody = JSON.stringify({
        accessCode: userCode,
        expectedFile: expectedFile
    });

    console.log("Request body:", requestBody);

    try {
        const response = await fetch(LAMBDA_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Response body:", data);

        if (response.ok && data.url) {
            errorElement.style.display = "none";

            // Hide the unlock section if it exists
            if (unlockSection) {
                unlockSection.style.display = "none";
            }

            linkElement.href = data.url;
            linkElement.style.display = "inline-block";
        } else {
            throw new Error("Invalid access code for this resource");
        }
    } catch (error) {
        console.error("Error:", error);
        errorElement.style.display = "block";
    }
}

function verifyFreeCode() {
    const userCode = document.getElementById("code").value.trim();
    const errorElement = document.getElementById("error");
    const linkElement = document.getElementById("link");
    const unlockSection = document.getElementById("unlock-section2"); 

    const correctCode = "FREEVIDEO";

    if (userCode === correctCode) {
        errorElement.style.display = "none";

        if (unlockSection) {
            unlockSection.style.display = "none";
        }

        linkElement.style.display = "inline-block";
    } else {
        errorElement.style.display = "block";
        linkElement.style.display = "none";
    }
}

function handleEnter(event, inputId, linkId, fileType, unlockSectionId) {
    if (event.key === "Enter") {
        verifyCode(inputId, linkId, fileType, unlockSectionId);
    }
}

function handleFreeEnter(event) {
    if (event.key === "Enter") {
        verifyFreeCode();
    }
}

// Ensure Enter key works for all input fields dynamically
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("code1")?.addEventListener("keypress", (event) => handleEnter(event, "code1", "link1", "study_guide.pdf", "unlock-section1"));
    document.getElementById("code2")?.addEventListener("keypress", (event) => handleEnter(event, "code2", "link2", "addition_worksheet.pdf", "unlock-section2"));
    document.getElementById("code")?.addEventListener("keypress", handleFreeEnter);
});
