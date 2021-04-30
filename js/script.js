// The div where my profile info will appear
const profileInfo = document.querySelector(".overview");
// The div for the list of repos
const repoList = document.querySelector(".repo-list");
// Section where the repos appear
const reposSection = document.querySelector(".repos");
// Repo data section
const repoDataSection = document.querySelector(".repo-data");

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
  displayRepoList(repoData);
}

getRepoList();

const displayRepoList = function (repoDataArray) {
  for (let repoData of repoDataArray) {
    li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repoData.name}</h3>`;
    repoList.append(li);
  }
}

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    getRepoInfo(repoName);
  }
})

const getRepoInfo = async function (repoName) {
  const result = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await result.json();
  // console.log(repoInfo);
  const fetchLanguages = await fetch(`${repoInfo.languages_url}`);
  const languageData = await fetchLanguages.json();
  // console.log(languageData);
  // Loop through the language object. Languages are the keys.
  const langArray = [];
  for (let lang in languageData) {
    langArray.push(lang);
  }
  // console.log(langArray);
  displayRepoInfo(repoInfo, langArray);
}

const displayRepoInfo = function (repoInfo, languages) {
  repoDataSection.innerHTML = "";
  newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  repoDataSection.append(newDiv);
  repoDataSection.classList.remove("hide");
  reposSection.classList.add("hide");
}