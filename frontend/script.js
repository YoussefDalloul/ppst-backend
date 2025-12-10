const backendURL = "https://ppst-backend.onrender.com"; // your backend URL

document.getElementById("reminderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeID = document.getElementById("employeeID").value;
    const employeeName = document.getElementById("employeeName").value;
    const returnDate = document.getElementById("returnDate").value;
    const type = document.getElementById("type").value;

    const response = await fetch(`${backendURL}/add-reminder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            employeeID,
            employeeName,
            returnDate,
            type
        })
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById("message").innerHTML =
            "✅ Reminder added successfully!";
    } else {
        document.getElementById("message").innerHTML =
            "❌ Error: " + result.error;
    }
});
