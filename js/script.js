//profile information
const overview = document.querySelector(".overview");
const username = "raqescar";
const repoList = document.querySelector(".repo-list");

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

const displayRepos = function (repos) {
    for (const repo of repos) {
      const repoItem = document.createElement("li");
      repoItem.classList.add("repo");
      repoItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(repoItem);
    }
  };
