let records = JSON.parse(localStorage.getItem("attendance_records")) || [];

function generateID() {
  return "ID-" + Math.floor(Math.random() * 100000);
}

function refreshTable() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  records.forEach(function(record, index) {
    let row = document.createElement("tr");

    // ID
    let idCell = document.createElement("td");
    idCell.textContent = record.id;

    // Name
    let nameCell = document.createElement("td");
    nameCell.textContent = record.name;

    // Phone
    let phoneCell = document.createElement("td");
    phoneCell.textContent = record.phone || "N/A";

    // Status
    let statusCell = document.createElement("td");
    statusCell.textContent = record.status;
    statusCell.style.color = record.status === "Present" ? "green" : "red";

    // Time
    let timeCell = document.createElement("td");
    timeCell.textContent = record.time;

    // Action
    let actionCell = document.createElement("td");
    let btn = document.createElement("button");
    btn.textContent = "Remove";

    btn.onclick = function () {
      deleteRecord(index);
    };

    actionCell.appendChild(btn);


    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(phoneCell);
    row.appendChild(statusCell);
    row.appendChild(timeCell);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  updateCount();
}

function recordAttendance(status) {
  let nameInput = document.getElementById("studentInput");
  let phoneInput = document.getElementById("phoneInput");

  let name = nameInput.value.trim();
  let phone = phoneInput.value.trim();

  if (!name) {
    alert("Please enter a name");
    return;
  }

  let exists = records.find(r => r.name.toLowerCase() === name.toLowerCase());

  if (exists) {
    alert("Already added");
    return;
  }

  let time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  records.push({
    id: generateID(),
    name: name,
    phone: phone || "N/A",
    status: status,
    time: time
  });

  localStorage.setItem("attendance_records", JSON.stringify(records));

  nameInput.value = "";
  phoneInput.value = "";

  refreshTable();
}

function deleteRecord(index) {
  records.splice(index, 1);
  localStorage.setItem("attendance_records", JSON.stringify(records));
  refreshTable();
}

function clearAll() {
  if (confirm("Delete all records?")) {
    records = [];
    localStorage.removeItem("attendance_records");
    refreshTable();
  }
}

function updateCount() {
  let present = 0;
  let absent = 0;

  for (let i = 0; i < records.length; i++) {
    if (records[i].status === "Present") present++;
    else absent++;
  }

  let countEl = document.getElementById("count");

  if (countEl) {
    countEl.textContent =
      "Present: " + present + " | Absent: " + absent;
  }
}

window.onload = function () {
  let input = document.getElementById("studentInput");

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      recordAttendance("Present");
    }
  });

  refreshTable();
};
