//profile information
const overview = document.querySelector(".overview");
const username = "raqescar";

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
  `
  overview.append(userInfo);
};