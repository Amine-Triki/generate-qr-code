import { useEffect, useMemo, useState } from "react";
import {
  CodeBracketIcon,
  EyeIcon,
  FolderIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";

const externalLinkProps = {
  rel: "noreferrer",
  target: "_blank",
};

const ProjectCard = ({ project, featured, onOpenGallery }) => {
  const hasVariants = Array.isArray(project.variants) && project.variants.length > 0;
  const hasScreenshots = Array.isArray(project.screenshots) && project.screenshots.length > 0;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "lg:w-1/2" : ""}`}>
        <img
          src={project.imageSrc}
          className={`${featured ? "h-64" : "h-48"} w-full object-cover transition duration-300 group-hover:scale-105`}
          alt={project.title}
        />
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:p-7" : ""}`}>
        <h3 className={`${featured ? "text-xl" : "text-lg"} font-bold text-slate-900`}>
          {project.title}
        </h3>
        <p className={`mt-2 text-sm leading-6 text-slate-600 ${featured ? "lg:text-base" : "flex-1"}`}>
          {project.description}
        </p>

        {!hasVariants && project.technologies?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        {hasVariants ? (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.variants.map((variant) => (
              <div key={variant.stack} className="flex items-center overflow-hidden rounded-full border border-cyan-200 bg-cyan-50">
                <a
                  href={variant.link}
                  className="px-3 py-1.5 text-xs font-semibold text-cyan-800 transition hover:bg-cyan-100"
                  {...externalLinkProps}
                >
                  {variant.stack}
                </a>
                {variant.github && (
                  <a
                    href={variant.github}
                    className="border-l border-cyan-200 p-2 text-cyan-800 transition hover:bg-cyan-100"
                    aria-label={`Open ${variant.stack} source code on GitHub`}
                    {...externalLinkProps}
                  >
                    <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                {...externalLinkProps}
              >
                <EyeIcon className="h-4 w-4" />
                Live Preview
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50"
                {...externalLinkProps}
              >
                <CodeBracketIcon className="h-4 w-4" />
                GitHub
              </a>
            )}
            {hasScreenshots && (
              <button
                type="button"
                onClick={() => onOpenGallery(project)}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-300 bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-100"
              >
                <EyeIcon className="h-4 w-4" />
                View Screenshots
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [galleryProject, setGalleryProject] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Amine-Triki/projects-data/main/projects.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setError("Could not load projects right now. Please try again later.");
        setLoading(false);
      });
  }, []);

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured === true),
    [projects]
  );

  const allProjects = useMemo(
    () => projects.filter((project) => project.featured !== true),
    [projects]
  );

  const categories = useMemo(() => {
    const allCategories = allProjects
      .map((project) => project.category)
      .filter(Boolean);

    return ["all", ...new Set(allCategories)];
  }, [allProjects]);

  const filteredProjects = allProjects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  const openGallery = (project) => {
    setGalleryProject(project);
    setActiveScreenshot(0);
  };

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

        {featuredProjects.length > 0 && (
          <section className="mb-14 text-left">
            <h3 className="mb-5 text-2xl font-bold text-slate-900">Featured Projects</h3>
            <div className="grid grid-cols-1 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} featured onOpenGallery={openGallery} />
              ))}
            </div>
          </section>
        )}

        <section className="text-left">
          <h3 className="mb-5 text-2xl font-bold text-slate-900">Other Projects</h3>
          <div className="mb-8 flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 backdrop-blur">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category === "all" ? "All Works" : category}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <FolderIcon className="mx-auto mb-3 h-8 w-8 text-slate-400" />
              <p className="text-slate-600">No projects found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} onOpenGallery={openGallery} />
              ))}
            </div>
          )}
        </section>
      </section>

      {galleryProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${galleryProject.title} screenshots`}
          onClick={() => setGalleryProject(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl rounded-2xl bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setGalleryProject(null)}
              className="absolute right-6 top-6 z-10 rounded-full bg-slate-900/70 p-2 text-white transition hover:bg-slate-900"
              aria-label="Close screenshots"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <img
              src={galleryProject.screenshots[activeScreenshot]}
              alt={`${galleryProject.title} screenshot ${activeScreenshot + 1}`}
              className="max-h-[65vh] w-full rounded-xl object-contain"
            />
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {galleryProject.screenshots.map((screenshot, index) => (
                <button
                  key={screenshot}
                  type="button"
                  onClick={() => setActiveScreenshot(index)}
                  className={`shrink-0 overflow-hidden rounded-lg ${
                    activeScreenshot === index ? "ring-2 ring-cyan-500 ring-offset-2" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show screenshot ${index + 1}`}
                >
                  <img src={screenshot} alt="" className="h-16 w-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;
