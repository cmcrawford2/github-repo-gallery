// The div where my profile info will appear
const profileInfo = document.querySelector(".overview");
const username = "cmcrawford2";

const getProfileInfo = async function () {
  const result = await fetch(`https://api.github.com/users/${username}`);
  const profileData = await result.json();
  // console.log(profileData);
  displayProfileData(profileData);
}

getProfileInfo();

const displayProfileData = function(profileData) {
const newDiv = document.createElement("user-info");
newDiv.innerHTML = `
  <figure>
    <img alt="user avatar" src=${profileData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${profileData.login}</p>
    <p><strong>Bio:</strong> ${profileData.bio}</p>
    <p><strong>Location:</strong> ${profileData.location}</p>
    <p><strong>Number of public repos:</strong> ${profileData.public_repos}</p>
  </div>
  `;
profileInfo.append(newDiv);
}