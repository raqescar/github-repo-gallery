//profile information
const overview = document.querySelector(".overview");
//GitHub username 
const username = "raqescar";
//list of repo titles 
const repoTitles = document.querySelector(".repo-list");
//section where repo data will appear 
const repoSection = document.querySelector(".repos");
//section where individual repo data will appear
const individualRepo = document.querySelector(".repo-data");
// back to repos gallery button
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



//fetch information from GitHub profile
const profileInfo = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const gitData = await data.json();
    console.log(gitData);
    displayUserInfo(gitData);
};
profileInfo();

//display user information
const displayUserInfo = function (gitData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
    <figure>
    <img alt="user avatar" src=${gitData.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${gitData.name}</p>
    <p><strong>Bio:</strong> ${gitData.bio}</p>
    <p><strong>Location:</strong> ${gitData.location}</p>
    <p><strong>Number of public repos:</strong> ${gitData.public_repos}</p>
  </div> 
  `;
  overview.append(userInfo);
  repoInfo();
};

//fetch repos
const repoInfo = async function () {
    const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepo.json();
    console.log(repoData);
    displayRepos(repoData);
};
//repoInfo();

//display repo titles 
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoTitles.append(repoItem);
    }
  };

  const repoList = addEventListener ("click", function (e) {
    if (e.target.matches("h3")) {
      const repoName = e.target.innerText;
      //console.log(repoName);
      individualRepoData(repoName);
    }
  });

//get individual repo info
  const individualRepoData = async function (repoName) {
    indivRepoFetch = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await indivRepoFetch.json();
    console.log(repoInfo);
    //fetch languages from repo info
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    //append language data to array
    const languages = [];
    for (const type of languages) {
    languages.append(languageData);
    console.log(languages);
    }
    displayRepoData(repoInfo,languages);
  };

//display individual repo data 
const displayRepoData = function (repoInfo,languages) {
  individualRepo.innerHTML = "";
  individualRepo.classList.remove("hide");
  repoSection.classList.add("hide");
  viewReposButton.classList.remove("hide");

  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  individualRepo.append(repoDiv);
  
};

viewReposButton.addEventListener("click", function () {
  repoSection.classList.remove("hide");
  individualRepo.classList.add("hide");
  viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
  const searchInput = e.target.value; 
  console.log(searchInput);
  const repos = document.querySelectorAll(".repo");
  const searchLowerCase = searchInput.toLowerCase();
  for (const repo of repos) {
    const repoLowerCase = repo.innerText.toLowerCase();
    if (!repoLowerCase.includes(searchLowerCase)) {
      repo.classList.add("hide");
    } else {
      repo.classList.remove("hide");
    }
  }
});