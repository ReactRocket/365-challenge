document.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('dataList');
  const list = [
      {
          title: "Day 1: Interactive Portfolio Website",
          description: "Create a personal portfolio showcasing your projects, skills, and experience. Include animations, interactive elements, and a contact form.",
          link: "./1-Interactive Portfolio Website/index.html"
      },
      {
          title: "Day 2: Weather App",
          description: "Build a simple weather application that fetches data from a weather API.",
          link: "./2-Weather App/index.html"
      },
      {
          title: "Day 3: Quiz App",
          description: "Develop a quiz application with multiple categories and a scoring system.",
          link: "./3-Quiz App/index.html"
      },
  ];

  const fragment = document.createDocumentFragment();

  list.forEach(item => {
      const dataItem = document.createElement('div');
      
      const title = document.createElement('h3');
      title.textContent = item.title;
      
      const description = document.createElement('p');
      description.textContent = item.description;

      const link = document.createElement('a');
      link.href = item.link;
      link.textContent = "View Project";

      dataItem.appendChild(title);
      dataItem.appendChild(description);
      dataItem.appendChild(link);

      fragment.appendChild(dataItem);
  });

  dataList.appendChild(fragment);
});
