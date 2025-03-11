import SectionTitle from "../SectionTitle";
import ProjectItem from "./ProjectItem";

import { DataProps } from "@/types";

const Project = ({ project }: Pick<DataProps, "project">) => {
  // team 프로젝트는 id 오름차순 정렬
  const teamProjects = [...project]
    .filter((project) => project.isTeam)
    .sort((a, b) => a.id - b.id);

  // personal 프로젝트는 id 오름차순 정렬
  const personalProjects = [...project]
    .filter((project) => !project.isTeam)
    .sort((a, b) => a.id - b.id);

  return (
    <>
      <div>
        <SectionTitle>🚀Team Project</SectionTitle>
        <div className="flex flex-col gap-24">
          {teamProjects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
        </div>
      </div>
      <div>
        <SectionTitle>🚀Personal Project</SectionTitle>
        <div className="flex flex-col gap-24">
          {personalProjects.map((project) => (
            <ProjectItem key={project.id} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;
