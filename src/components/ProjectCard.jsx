const ProjectCard = ({ project }) => {
  const {
    title,
    tag,
    image,
    overview,
    technologies,
    workingPrinciple,
    features,
    cssStructure,
    designStyle,
    contributions,
    learningFocus,
    skills,
    repository,
  } = project;

  const sectionStyle = 'mt-4';
  const sectionTitleStyle = 'text-xs uppercase tracking-wide text-zinc-400 mb-2';
  const listStyle = 'list-disc list-inside text-zinc-300 space-y-1';

  return (
    <article className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">
      {image ? (
        <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <img
            src={image}
            alt={`${title} project`}
            className="w-full h-56 md:h-64 object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h3 className="text-2xl font-bold">{title}</h3>
        {tag ? (
          <span className="text-xs uppercase tracking-wide text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full w-fit">
            {tag}
          </span>
        ) : null}
      </div>

      <p className="text-zinc-200 mt-4 leading-relaxed">{overview}</p>

      {technologies?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Technologies</h4>
          <ul className={listStyle}>
            {technologies.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {workingPrinciple?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Working Principle</h4>
          <ul className={listStyle}>
            {workingPrinciple.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {features?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Features</h4>
          <ul className={listStyle}>
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {cssStructure?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>CSS Structure</h4>
          <ul className={listStyle}>
            {cssStructure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {designStyle?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Design Style</h4>
          <ul className={listStyle}>
            {designStyle.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {contributions?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Work Done</h4>
          <ul className={listStyle}>
            {contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {learningFocus?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Learning Focus</h4>
          <ul className={listStyle}>
            {learningFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {skills?.length ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Skills Demonstrated</h4>
          <ul className={listStyle}>
            {skills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {repository ? (
        <section className={sectionStyle}>
          <h4 className={sectionTitleStyle}>Repository</h4>
          <a
            href={repository}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-300 hover:text-indigo-200 transition break-all"
          >
            {repository}
          </a>
        </section>
      ) : null}
      <div className="mt-6 pt-5 border-t border-zinc-800">
        <h4 className={sectionTitleStyle}>Overall Technical Stack</h4>
        <p className="text-zinc-300 leading-relaxed">
          Hardware / Embedded Systems · Frontend Development · Backend Basics · Development Tools (GitHub, repositories, code sharing, project structuring)
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;