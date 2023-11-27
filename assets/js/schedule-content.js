document.addEventListener('DOMContentLoaded', function () {
    makeTableSortable();
});

function makeTableSortable() {
    const table = document.getElementById('contentTable').getElementsByTagName('tbody')[0];
    new Sortable(table, {
        animation: 150,
        ghostClass: 'draggable-ghost',
        onEnd: function (evt) {
            const rows = Array.from(table.getElementsByTagName('tr'));
            rows.forEach((row, index) => {
                row.classList.remove('draggable');
                if (index % 2 === 0) {
                    row.style.backgroundColor = '#fff';
                } else {
                    row.style.backgroundColor = '#f2f2f2';
                }
            });
        }
    });
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Changes the color indicator depending on the status
document.addEventListener("DOMContentLoaded", function () {
    // Initial status (you can set this based on your logic or retrieve from user input)
    let initialStatus = "queued"; // Change this to "queued" for orange color
    setStatus(initialStatus);
});

/*--------------------------------------------------------------
# Settings Status
--------------------------------------------------------------*/
function setStatus(status) {
    const indicator = document.getElementById("status-indicator");
    const statusText = document.getElementById("status-text");

    // Remove existing status classes
    indicator.className = "status-indicator";

    // Add the appropriate status class based on status-text
    if (statusText.textContent.toLowerCase() === "success") {
        indicator.classList.add("success");
    } else if (statusText.textContent.toLowerCase() === "queued") {
        indicator.classList.add("queued");
    }

    // Set the status text
    statusText.textContent = status.charAt(0).toUpperCase() + status.slice(1);
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Sortable
    new Sortable(document.getElementById("tablebody"), {
        animation: 150, // Optional animation duration (milliseconds)
    });
});

/*--------------------------------------------------------------
# Charcater Count
--------------------------------------------------------------*/
// Character count for title
document.getElementById("title").addEventListener("input", function () {
    const titleCount = document.getElementById("titleCount");
    titleCount.textContent = this.value.length + " characters";
});

// Character count for description
document.getElementById("description").addEventListener("input", function () {
    const descriptionCount = document.getElementById("descriptionCount");
    descriptionCount.textContent = this.value.length + " characters";
});

// Character count for title2
document.getElementById("Title").addEventListener("input", function () {
    const titleCount = document.getElementById("TitleCount");
    titleCount.textContent = this.value.length + " characters";
});

// Character count for description2
document.getElementById("Description").addEventListener("input", function () {
    const DescriptionCount = document.getElementById("DescriptionCount");
    DescriptionCount.textContent = this.value.length + " characters";
});

/*--------------------------------------------------------------
# Browse File Manager
--------------------------------------------------------------*/
function handleFileSelect() {
    var fileInput = document.getElementById('contentFile');
    var durationDisplay = document.getElementById('durationDisplay');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];

        // Check if the selected file is a video or audio file
        if (selectedFile.type.startsWith('audio/') || selectedFile.type.startsWith('video/')) {
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                var mediaElement = document.createElement(selectedFile.type.startsWith('audio/') ? 'audio' : 'video');
                mediaElement.src = e.target.result;

                mediaElement.addEventListener('loadedmetadata', function () {
                    var durationInSeconds = Math.floor(mediaElement.duration);
                    var durationDisplayText = 'Duration: ' + formatTime(durationInSeconds);
                    durationDisplay.textContent = durationDisplayText;
                });
            };

            fileReader.readAsDataURL(selectedFile);
        } else {
            durationDisplay.textContent = 'Duration: Not available';
        }
    } else {
        durationDisplay.textContent = 'Duration: Not available';
    }
}

// Duration Count2
function handleFileSelect() {
    var fileInput = document.getElementById('ContentFile');
    var DurationDisplay = document.getElementById('DurationDisplay');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];

        // Check if the selected file is a video or audio file
        if (selectedFile.type.startsWith('audio/') || selectedFile.type.startsWith('video/')) {
            var fileReader = new FileReader();

            fileReader.onload = function (e) {
                var mediaElement = document.createElement(selectedFile.type.startsWith('audio/') ? 'audio' : 'video');
                mediaElement.src = e.target.result;

                mediaElement.addEventListener('loadedmetadata', function () {
                    var DurationInSeconds = Math.floor(mediaElement.duration);
                    var DurationDisplayText = 'Duration: ' + formatTime(DurationInSeconds);
                    DurationDisplay.textContent = DurationDisplayText;
                });
            };

            fileReader.readAsDataURL(selectedFile);
        } else {
            DurationDisplay.textContent = 'Duration: Not available';
        }
    } else {
        DurationDisplay.textContent = 'Duration: Not available';
    }
}

// Helper function to format time in HH:MM:SS
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(remainingSeconds).padStart(2, '0')
    );
}


function validateForm() {
    // Validate genre selection
    var genreRadios = document.getElementsByName('genre');
    var genreSelected = false;
    for (var i = 0; i < genreRadios.length; i++) {
        if (genreRadios[i].checked) {
            genreSelected = true;
            break;
        }
    }

    if (!genreSelected) {
        alert('Please choose a genre.');
        return false;
    }

    // Validate current date
    var currentDate = document.getElementById('currentDate').value;
    if (!currentDate) {
        alert('Please select the current date.');
        return false;
    }

    // Validate title
    var title = document.getElementById('title').value;
    if (!title) {
        alert('Please enter a title.');
        return false;
    }

    // Validate description
    var description = document.getElementById('description').value;
    if (!description) {
        alert('Please enter a short description.');
        return false;
    }

    return true; // Form is valid
}

function scheduleContent() {
    // Validate the form before scheduling
    if (validateForm()) {
        // Perform scheduling logic here
        alert('Content scheduled successfully!');
    }
}