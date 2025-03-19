export interface InformationProps {
  name: string;
  contact: { id: number; name: string; href: string; isEmail?: boolean }[];
  markdown?: string;
  imgSrc?: string;
}

export interface WorkExperienceProps {
  id: number;
  name: string;
  description?: string;
  position: string;
  period: string[];
  markdown?: string;
  imgSrc?: string;
}

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  webUrl?: string;
  notionUrl?: string;
  isTeam?: boolean;
  period: string[];
  stack: string[];
  markdown?: string;
  imgSrc?: string;
}

export interface AwardProps {
  id: number;
  name: string;
  date: string;
  organizer: string;
  description: string;
}

export interface StackData {
  id: number;
  category: string;
  name: string;
  content: string;
}

/** 전체 resume 데이터를 담는 인터페이스 */
export interface DataProps {
  resumeTitle: {
    title: string;
  };
  information: InformationProps;
  workExperience: WorkExperienceProps[];
  project: ProjectProps[];
  activity: {
    id: number;
    name: string;
    description: string;
    period: string[];
  }[];
  education: {
    id: number;
    name: string;
    description: string;
    period: string[];
  }[];
  certificate: {
    id: number;
    name: string;
    date: string;
    organizer: string;
  }[];
  award: AwardProps[];

  /** 추가: 기술 스택 배열 */
  stack: StackData[];
}
