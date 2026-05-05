let records = JSON.parse(localStorage.getItem("attendance_records")) || [];

function refreshTable() {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  records.forEach(function(record, index) {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.name}</td>
      <td>${record.status}</td>
      <td>${record.time}</td>
      <td><button onclick="deleteRecord(${index})">Remove</button></td>
    `;

    tableBody.appendChild(row);
  });
}

function recordAttendance(status) {
  let input = document.getElementById("studentInput");
  let name = input.value.trim();

  if (!name) return alert("Please enter a name");

  let exists = records.find(r => r.name.toLowerCase() === name.toLowerCase());
  if (exists) return alert("Already added");

  let time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  records.push({ name, status, time });

  localStorage.setItem("attendance_records", JSON.stringify(records));

  input.value = "";
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

refreshTable();


