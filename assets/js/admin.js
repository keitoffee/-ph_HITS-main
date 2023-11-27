document.addEventListener('DOMContentLoaded', function(){

/*--------------------------------------------------------------
# Admin Page Functions
--------------------------------------------------------------*/

/**
 * for fetching users data to reflect on content manager list
 */

$(document).ready(function() {
    $('#sample_data').DataTable({
        ajax: {
            url: '/fetchData',
            type: 'GET'
        },
        columns: [
            { data: 'ID' },
            { data: 'First Name' },
            { data: 'Last Name' },
            { data: 'Username' },
            { data: 'Password' },
            { data: 'Status' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<button class="edit-button">Edit</button>&nbsp;<button class="delete-button">Delete</button>&nbsp;<button class="enable-button">Enable</button>&nbsp;<button class="disable-button">Disable</button>';
                }
            }
        ]
    });

    /**
     * Event handling for edit, delete, and disable buttons
     *  */ 

    // For edit account credentials for existing content managers
    $('#sample_data').on('click', '.edit-button', function() {

        // Retrieves the cselected tupple
        let selectedRow = $(this).closest('tr');
        let rowData = $('#sample_data').DataTable().row(selectedRow).data();

        // Retrieve the userID from the row data and stores only for updating data
        const userID = rowData['ID']

        // Populates the edit popup with the row data
        document.getElementById('edit-admin-firstname').value = rowData['First Name'];
        document.getElementById('edit-admin-lastname').value = rowData['Last Name'];
        document.getElementById('edit-admin-username').value = rowData['Username'];
        document.getElementById('edit-admin-password').value = rowData['Password'];

        // Displays the edit-popup 
        document.querySelector('.edit-popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'flex';

        // When saving changes, includes the userID in the update request
        document.getElementById('save-changes').addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Retrieve the existing data
            const editedFirstName = document.getElementById('edit-admin-firstname').value;
            const editedLastName = document.getElementById('edit-admin-lastname').value;
            const editedUsername = document.getElementById('edit-admin-username').value;
            const editedPassword = document.getElementById('edit-admin-password').value;

            // Construct the updated data object with userID
            const updatedData = {
                userID: userID,
                firstName: editedFirstName,
                lastName: editedLastName,
                username: editedUsername,
                password: editedPassword
            };

            // Send the updated data to the server for processing
            fetch('/update-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Client-side: Account updated successfully:', data);

                // Close the edit popup and overlay
                document.querySelector('.edit-popup').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';

                // Refresh the table with the updated data
                $('#sample_data').DataTable().ajax.reload();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    });
    
    // For deleting account credentials for existing content managers
    $('#sample_data').on('click', '.delete-button', function() {

        let selectedRow = $(this).closest('tr');
        let rowData = $('#sample_data').DataTable().row(selectedRow).data();

        // Retrieves the userID from the row data and store it
        const userID = rowData['ID'];

        document.querySelector('.delete-popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'flex';

        // for confirm button click for deletion of the user
        document.getElementById('confirm-button').addEventListener('click', function () {
            selectedRow.remove();
            document.querySelector('.delete-popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';

            // Performs fetch request to delete the user by userID
            fetch(`/delete-account/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('User deleted successfully:', data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        });

        // for no button; cancels deletion
        document.getElementById('cancel-button').addEventListener('click', function () {
            document.querySelector('.delete-popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        });
    });

    /**
     * To disable a content manager account
     */
    $('#sample_data').on('click', '.disable-button', function() {
        let selectedRow = $(this).closest('tr');
        let rowData = $('#sample_data').DataTable().row(selectedRow).data();
        const userID = rowData['ID'];
    
        const updatedData = {
            userID: userID,
            status: 'DISABLED' // Sets the status to 'DISABLED'
        };
    
        fetch(`/update-status/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User status updated successfully:', data);
    
            // Refresh the table with the updated data
            $('#sample_data').DataTable().ajax.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });

    /**
     * To enable a content manager account
     */
    $('#sample_data').on('click', '.enable-button', function() {
        let selectedRow = $(this).closest('tr');
        let rowData = $('#sample_data').DataTable().row(selectedRow).data();
        const userID = rowData['ID'];
    
        const updatedData = {
            userID: userID,
            status: 'ONLINE' // Sets the status to 'ONLINE'
        };
    
        fetch(`/update-status/${userID}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('User status updated successfully:', data);
    
            // Refresh the table with the updated data
            $('#sample_data').DataTable().ajax.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });

});

    let selectedRow, rowFirstName, rowLastName, rowUsername, rowPassword;

    document.getElementById('createAccountForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const formData = new FormData(this);
    
        fetch('/create-account', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response if needed
            console.log('Account created successfully:', data);
            // Perform any necessary actions after account creation
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
    
});
