async function register() {

    const pin = document.getElementById("newPin").value;

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
    });

    const data = await res.json();

    if (data.success) {
        alert("PIN Created Successfully ✅");
    } else {
        alert(data.message);
    }
}

async function login() {

    const pin = document.getElementById("pin").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
    });

    const data = await res.json();

    if (data.success) {

        alert("Login Successful 🎉");

        document.getElementById("diarySection").style.display = "block";

        loadEntries();

    } else {
        alert("Wrong PIN ❌");
    }
}

async function saveEntry() {

    const date = document.getElementById("date").value;
    const content = document.getElementById("content").value;

    if (!date || !content) {
        alert("Fill all fields");
        return;
    }

    await fetch("/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, content })
    });

    alert("Diary Saved 📔");

    document.getElementById("content").value = "";

    loadEntries();
}

async function loadEntries() {

    const res = await fetch("/entries");
    const entries = await res.json();

    document.getElementById("count").innerText = entries.length;

    let html = "";

    entries.forEach(entry => {

        html += `
        <div class="entry">
            <h3>📅 ${escapeHtml(entry.date)}</h3>
            <p>${escapeHtml(entry.content)}</p>
        </div>
        `;
    });

    document.getElementById("entries").innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.innerText = String(text);
    return div.innerHTML;
}
