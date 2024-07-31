// Description: Semester 1 Final Sprint for JavaScript course. Create a .json file and output information to html.
// The records used in the .json file are examples of forum users from a small and long-running forum for general purposes.
// Author: Vanessa Maher
// Dates: 07/31/2024


// Function to fetch user data.
function fetchUser() {
    return fetch('data.json')
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
}


// Function to output almost-raw data to the html.
function createUserHTML(record) {
    return `
    <center>
        <div>
            <p>Username: ${record.login_id}</p>
            <p>Unique ID: ${record.unique_id}</p>
            <p>Account Created: ${record.account_created}</p>
            <p>Email: ${record.email}</p>
            <p>Followers: ${record.followers}</p>
            <p>Following: ${record.following}</p>
            <p>Posts Created: ${record.posts_created}</p>
            <p>Account Status: ${record.account_status}</p>
            <p>Administrator Status: ${record.admin}</p>
            <p>Biography: ${record.profile_info.bio}</p>
            <p>Location: ${record.profile_info.location}</p>
            <p>Interests: ${record.interests.join(', ')}</p>
        </div>
    </center>
    `
}

// Function to output a temperate literal string about the user before displaying relevant data. This will print before the above function to give a summary.
function createSummary(record) {
    return `
    <center>
        <h2>${record.login_id} is an account that was created on ${record.account_created}. It has a unique identifier of ${record.unique_id}
        and the email address on file is ${record.email}. ${record.login_id} has ${record.followers} followers and is following ${record.following} people.
        They have created ${record.posts_created} posts on the forum and their account is currently ${record.account_status}. Their administrator status,
        biography, location and interests are listed below.</h2>
    </center>
    `
}

// Function to output a string detailing the age of the forum account.
function getAccountAge(record) {
    const creationDate = new Date(record.account_created);
    const today = new Date();
    const diffTime = Math.abs(today - creationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `
    <center>
        <h2>The account was created ${diffDays} days ago.</h2>
    </center>
    `;
}

// Function to output a string detailing the user's activity ratio (posts per day).
function getActivityRatio(record) {
    const creationDate = new Date(record.account_created);
    const today = new Date();
    const diffTime = Math.abs(today - creationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const activityRatio = (record.posts_created / diffDays).toFixed(2);
    return `
    <center>
        <h2>The account has an activity ratio of ${activityRatio} posts per day.</h2>
    </center>
    `;
}


// Function to render all user records at once to the HTML using a forEach loop
function compileUsers(data) {
    const userList = document.getElementById('user-list');
    data.forEach(record => {
        const userHTML = createUserHTML(record);
        const summaryHTML = createSummary(record);
        const ageHTML = getAccountAge(record);
        const activityRatioHTML = getActivityRatio(record);
        userList.innerHTML += summaryHTML + ageHTML + activityRatioHTML + userHTML;
    });
}


// Run the functions
fetchUser().then(data => {
    compileUsers(data);
    console.log(data);
})