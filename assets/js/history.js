document.addEventListener('DOMContentLoaded', function(){
/*--------------------------------------------------------------
    # History Page Functions
    --------------------------------------------------------------*/
    // Function to fetch history data from the server
    async function fetchHistoryData() {
        try {
            const response = await fetch('fetch_history.php');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching history data:', error.message);
            return [];
        }
    }

    // Function to render the history data
    function renderHistory(data) {
        var historyList = document.getElementById("historyList");
        historyList.innerHTML = '';

        data.forEach(function (item) {
            var streamDiv = document.createElement("div");
            streamDiv.className = "stream";

            var dateHeader = document.createElement("h4");
            dateHeader.className = "strm-date";
            dateHeader.textContent = item.date;

            var previewButton = document.createElement("button");
            previewButton.className = "prev-bt";
            previewButton.textContent = "PREVIEW";

            var playButton = document.createElement("img");
            playButton.src = "./assets/img/play-button.png";
            playButton.alt = "Preview button";
            playButton.onclick = previewButton("")

            previewButton.appendChild(playButton);
            streamDiv.appendChild(dateHeader);
            streamDiv.appendChild(previewButton);

            historyList.appendChild(streamDiv);
        });
    }

    // Event listener for page load
    window.addEventListener('load', async function () {
        // Fetch history data from the server on page load
        const historyData = await fetchHistoryData();
        renderHistory(historyData);
    });

    /*--------------------------------------------------------------
    # Search Function 
    --------------------------------------------------------------*/
    



    /*--------------------------------------------------------------
    # Search By Date Function  
    --------------------------------------------------------------*/
   // Event listener for the date input
   document.getElementById("dateInput").addEventListener("input", function () {
    var selectedDate = document.getElementById("dateInput").value;
    var filteredData = historyData.filter(function (item) {
        return item.date === selectedDate;
    });

    renderHistory(filteredData);    
    });


    /*--------------------------------------------------------------
    # Sort Function
    --------------------------------------------------------------*/
    document.getElementById("sortSelect").addEventListener("change", function () {
        var sortOrder = document.getElementById("sortSelect").value;

        if (sortOrder === "recent") {
            historyData.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        } else if (sortOrder === "oldest") {
            historyData.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
        }

        renderHistory(historyData);
    });
    


    /*--------------------------------------------------------------
    # Header Functions
    --------------------------------------------------------------*/

    function updateDateTime() {
        // Get the current date and time
        var currentDateTime = new Date();
    
        // Format the date
        var formattedDateTime = currentDateTime.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        });
    
        // Display the formatted date on the webpage
        document.getElementById('datetime').textContent = formattedDateTime;
    }
    
      // Update the date every second (1000 milliseconds)
      setInterval(updateDateTime, 1000);
    
      // Initial call to display the date immediately
      updateDateTime();
    
});
