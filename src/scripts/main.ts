const aboutButton = document.getElementById("about") as HTMLButtonElement;
const projectsButton = document.getElementById("projects") as HTMLButtonElement;
const mainContent = document.querySelector(".main-content") as HTMLDivElement;
const aboutSection = mainContent.innerHTML;

const getRepositories = async () => {
  const response = await fetch("https://api.github.com/users/torresds/repos");
  return response.json();
};

aboutButton.addEventListener("click", () => {
  if (aboutButton.classList.contains("unselected-button")) {
    aboutButton.classList.remove("unselected-button");
    aboutButton.classList.add("selected-button");
    projectsButton.classList.remove("selected-button");
    projectsButton.classList.add("unselected-button");
    mainContent.innerHTML = aboutSection;
  }
});

projectsButton.addEventListener("click", async () => {
  if (projectsButton.classList.contains("unselected-button")) {
    const repositories = await getRepositories();
    const projectDivs = [];
    for (const repository of repositories) {
      const project = document.createElement("div");
      project.classList.add("project");
      project.innerHTML = `
            <h2>${repository.name}</h2>
            <p>${repository.description || "Sem descrição"}</p>
            <p>Linguagem: ${repository.language || "Sem linguagem"}</p>
            <a target="_blank" href="${repository.html_url}">Ver no Github</a>
            `;
      projectDivs.push(project);
    }
    mainContent.innerHTML = "";
    const projectsWrapper = document.createElement("div");
    projectsWrapper.classList.add("projects-wrapper");
    mainContent.appendChild(projectsWrapper);
    projectDivs.forEach((project) => {
      projectsWrapper.appendChild(project);
    });
    projectsButton.classList.remove("unselected-button");
    projectsButton.classList.add("selected-button");
    aboutButton.classList.remove("selected-button");
    aboutButton.classList.add("unselected-button");
  }
});
