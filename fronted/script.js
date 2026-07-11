const API_URL = 'http://localhost:5000/api/students';

const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');

// Fetch and render all students
async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  renderStudents(students);
}

function renderStudents(students) {
  studentTableBody.innerHTML = '';
  students.forEach((s) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${s.name}</td>
      <td>${s.rollNumber}</td>
      <td>${s.course}</td>
      <td>${s.email}</td>
      <td><button class="delete-btn" data-id="${s._id}">Delete</button></td>
    `;
    studentTableBody.appendChild(row);
  });
}

// Add new student
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newStudent = {
    name: document.getElementById('name').value,
    rollNumber: document.getElementById('rollNumber').value,
    course: document.getElementById('course').value,
    email: document.getElementById('email').value,
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newStudent),
  });

  studentForm.reset();
  fetchStudents();
});

// Delete student (event delegation)
studentTableBody.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  }
});

// Initial load
fetchStudents();