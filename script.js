function login(event) {
  event.preventDefault();
  const enteredUsername = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  // Dummy authentication, replace with actual authentication logic
  if (enteredUsername === "aahana" && enteredPassword === "aahana") {
      window.location.href = "class.html";
  } else {
      document.getElementById("error-message").textContent = "Invalid username or password.";
  }
}
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle "Mark Attendance" button click
  document.getElementById('mark-attendance-btn').addEventListener('click', function() {
      var attendanceData = [];
      // Loop through each checkbox to determine attendance
      var checkboxes = document.getElementsByClassName('attendance-checkbox');
      for (var i = 0; i < checkboxes.length; i++) {
          var studentName = checkboxes[i].parentNode.previousElementSibling.innerText;
          var isPresent = checkboxes[i].checked;
          attendanceData.push({ name: studentName, present: isPresent });
      }
      // Here you can store attendanceData to local storage or send it to a server/database
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
      alert("Attendance marked successfully!");
  });

  // Get the current date and display it
  var currentDate = new Date();
  var dayOfMonth = currentDate.getDate();
  var month = currentDate.getMonth() + 1; // Months are zero-based
  var year = currentDate.getFullYear();
  var formattedDate = dayOfMonth + '/' + month + '/' + year;
  document.getElementById('current-date').innerText = formattedDate;
});

document.addEventListener('DOMContentLoaded', function() {
  // Retrieve stored attendance data from local storage
  var storedAttendanceData = JSON.parse(localStorage.getItem('attendanceData'));

  // Calculate total number of lectures
  var totalLectures = storedAttendanceData ? storedAttendanceData.length : 0;

  // Initialize an object to store attendance information for each student
  var studentAttendance = {};
  if (storedAttendanceData) {
      storedAttendanceData.forEach(student => {
          if (!studentAttendance.hasOwnProperty(student.name)) {
              studentAttendance[student.name] = [];
          }
          studentAttendance[student.name].push(student.present ? 'Present' : 'Absent');
      });
  }

  // Generate summary HTML
  var summaryHTML = '';
  for (var studentName in studentAttendance) {
      summaryHTML += `<div>${studentName}: `;
      studentAttendance[studentName].forEach(status => {
          summaryHTML += `${status}, `;
      });
      summaryHTML = summaryHTML.slice(0, -2); // Remove the last comma and space
      summaryHTML += `</div>`;
  }

  // Display summary HTML
  var summaryContainer = document.getElementById('summary-container');
  summaryContainer.innerHTML = summaryHTML;
});
