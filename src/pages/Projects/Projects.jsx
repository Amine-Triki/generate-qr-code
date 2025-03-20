import { useState } from "react";
import projects from "./AllProjects";
import "./Projects.css";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const switchCategories = (category) => {
    setActiveCategory(category);
  };

  return (
    <main>
      <section className="text-center py-5">
        <div className="container">
          <div className="font-bold my-5 relative">
            <h2 className="text-4xl my-3">My Projects</h2>
            <p>What I build</p>
          </div>
          <ul className="switcher my-10 - bg-amber-500 text-white flex flex-col py-3 justify-around px-0 flex-wrap md:flex-row">
            {["all", "JavaScript", "Wordpress", "React"].map((category) => (
              <li
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => switchCategories(category)}
              >
                {category === "all" ? "All works" : category}
              </li>
            ))}
          </ul>
          <div className="gallery text-start">
            <div className="gap-5 flex justify-center flex-wrap items-stretch">
              {projects
                .filter((project) => activeCategory === "all" || project.category === activeCategory)
                .map((project, index) => (
                  <div className={`post ${project.category} flex flex-col mb-3`} key={index}>
                    <div className="max-w-sm flex flex-col h-full rounded overflow-hidden shadow-lg" style={{ width: "18rem" }}>
                      <img src={project.imageSrc} className="w-full" alt={project.title} />
                      <div className="px-6 py-4 flex-grow">
                        <h5 className="font-bold text-xl mb-2">{project.title}</h5>
                        <p className="text-gray-700 text-base">{project.description}</p>
                        <div className="flex justify-around my-3">
                          {project.category !== "Wordpress" && (
                            <a
                              href={project.github}
                              className="bg-pink-500 p-3 rounded-2xl"
                              rel="noreferrer"
                              target="_blank"
                            >
                              Github
                            </a>
                          )}
                          <a
                            href={project.link}
                            className="bg-cyan-500 p-3 rounded-2xl"
                            rel="noreferrer"
                            target="_blank"
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;