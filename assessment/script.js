function validateName(name) {
  return /^[A-Za-z\s]+$/.test(name.trim());
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value);
}

function getSelectedRadio(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : null;
}

function showAlert(message) {
  alert(message);
}

function validateEmployeeForm(e) {
  e.preventDefault();

  const name = document.getElementById("empName").value;
  const email = document.getElementById("empEmail").value;
  const dept = document.getElementById("empDept").value;
  const gender = getSelectedRadio("empGender");
  const joinDate = document.getElementById("empJoinDate").value;
  const skills = getCheckedValues("empSkills");

  if (!validateName(name)) return showAlert("Employee name must contain only letters.");
  if (!validateEmail(email)) return showAlert("Invalid employee email format.");
  if (!gender) return showAlert("Please select employee gender.");
  if (!dept) return showAlert("Please select a department.");
  if (!joinDate) return showAlert("Please enter the joining date.");
  if (skills.length === 0) return showAlert("Please select at least one skill.");

  showAlert("✅ Employee added successfully!");
  e.target.reset();
}

function validateStudentForm(e) {
  e.preventDefault();

  const name = document.getElementById("stuName").value;
  const email = document.getElementById("stuEmail").value;
  const course = document.getElementById("stuCourse").value;
  const gender = getSelectedRadio("stuGender");
  const dob = document.getElementById("stuDOB").value;
  const hobbies = getCheckedValues("stuHobbies");

  if (!validateName(name)) return showAlert("Student name must contain only letters.");
  if (!validateEmail(email)) return showAlert("Invalid student email format.");
  if (!gender) return showAlert("Please select student gender.");
  if (!dob) return showAlert("Please enter date of birth.");
  if (hobbies.length === 0) return showAlert("Please select at least one hobby.");

  showAlert("✅ Student added successfully!");
  e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const empForm = document.querySelectorAll("form")[0];
  const stuForm = document.querySelectorAll("form")[1];

  empForm.addEventListener("submit", validateEmployeeForm);
  stuForm.addEventListener("submit", validateStudentForm);
});
