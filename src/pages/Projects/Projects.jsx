import { useEffect, useMemo, useState } from "react";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import {
  CodeBracketIcon,
  EyeIcon,
  FolderIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Amine-Triki/projects-data/main/projects.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setError("Could not load projects right now. Please try again later.");
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const allCategories = projects
      .map((project) => project.category)
      .filter(Boolean);

    return ["all", ...new Set(allCategories)];
  }, [projects]);

  const filteredProjects = (category) =>
    projects.filter(
      (project) => category === "all" || project.category === category
    );

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-7 shadow-sm">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-cyan-500" />
          <p className="mt-4 text-sm font-medium text-slate-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <p className="font-semibold text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-cyan-50 to-white py-12">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl" />

      <section className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-cyan-700 backdrop-blur">
            <SparklesIcon className="h-4 w-4" />
            Selected Work
          </div>
          <h2 className="text-balance text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            My Projects
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            A curated collection of apps and experiments across multiple stacks.
          </p>
        </div>

        <TabGroup>
          <TabList className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 backdrop-blur">
            {categories.map((category) => (
              <Tab
                key={category}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 outline-none transition hover:bg-slate-100 data-[selected]:bg-slate-900 data-[selected]:text-white"
              >
                {category === "all" ? "All Works" : category}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {categories.map((category) => {
              const visibleProjects = filteredProjects(category);

              return (
                <TabPanel key={category} className="outline-none">
                  {visibleProjects.length === 0 ? (
                    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                      <FolderIcon className="mx-auto mb-3 h-8 w-8 text-slate-400" />
                      <p className="text-slate-600">No projects found in this category yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
                      {visibleProjects.map((project, index) => (
                        <Transition
                          key={`${project.title}-${index}`}
                          show={true}
                          appear={true}
                          enter="transition duration-300"
                          enterFrom="opacity-0 translate-y-4"
                          enterTo="opacity-100 translate-y-0"
                        >
                          <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative overflow-hidden">
                              <img
                                src={project.imageSrc}
                                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                                alt={project.title}
                              />
                              <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                                {project.category}
                              </span>
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                              <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                                {project.description}
                              </p>

                              <div className="mt-5 flex gap-3">
                                {project.category !== "Wordpress" && project.github && (
                                  <a
                                    href={project.github}
                                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <CodeBracketIcon className="h-4 w-4" />
                                    GitHub
                                  </a>
                                )}

                                {project.link && (
                                  <a
                                    href={project.link}
                                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                    Preview
                                  </a>
                                )}
                              </div>
                            </div>
                          </article>
                        </Transition>
                      ))}
                    </div>
                  )}
                </TabPanel>
              );
            })}
          </TabPanels>
        </TabGroup>
      </section>
    </main>
  );
};

export default Projects;
