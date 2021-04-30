// The div where my profile info will appear
const profileInfo = document.querySelector(".overview");
// The div for the list of repos
const repoList = document.querySelector(".repo-list");

const username = "cmcrawford2";

const getProfileInfo = async function () {
  const result = await fetch(`https://api.github.com/users/${username}`);
  const profileData = await result.json();
  // console.log(profileData);
  displayProfileData(profileData);
}

getProfileInfo();

const displayProfileData = function(profileData) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
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

const getRepoList = async function() {
  const repoResult = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoResult.json();
  // console.log(repoData);
  displayRepoInfo(repoData);
}

getRepoList();

const displayRepoInfo = function (repoDataArray) {
  for (let repoData of repoDataArray) {
    li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repoData.name}</h3>`;
    repoList.append(li);
  }
}