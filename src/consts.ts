import type { Author, Metadata, Site, Socials, WorkExperience } from "@types";

export const SITE: Site = {
  TITLE: "Fausto Moya",
  DESCRIPTION:
    "Fausto Moya's blog and portfolio: tech insights, coding tips, and innovative projects in one place. Explore and connect with a passionate developer!",
  EMAIL: "hola@moyis.dev",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const AUTHOR: Author = {
  NAME: "Fausto Moya",
  EMAIL: "hola@moyis.dev",
  JOB_TITLE: "Software Engineer",
  JOB_TITLE_ES: "Ingeniero de Software",
  LOCATION: "The Netherlands",
  BIO: "Software Engineer passionate about building scalable solutions and sharing knowledge with the Spanish-speaking developer community.",
  BIO_ES:
    "Ingeniero de Software apasionado por construir soluciones escalables y compartir conocimiento con la comunidad de desarrolladores hispanohablantes.",
  IMAGE: "/fausto-moya.jpg",
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "A passionate developer sharing tech insights and innovative projects.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION:
    "Artículos en español sobre desarrollo de software, buenas prácticas, code smells y arquitectura. Escrito por Fausto Moya para la comunidad hispanohablante.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const EXPERIENCE: Metadata = {
  TITLE: "Experience",
  DESCRIPTION:
    "Fausto Moya's software engineering career: building scalable backend systems across fintech, logistics, and e-commerce at companies from startups to global platforms.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/moyis",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/fausto-moya",
  },
];

export const WORK_EXPERIENCE: WorkExperience = [
  {
    company: "Ahold Delhaize",
    role: "Software Engineer",
    technologies: ["Kotlin", "Spring", "MongoDB", "Kafka"],
    description:
      "I led the modernization of the workforce management tool, building a new integration with modern languages and techniques. I drove improvements in code quality, promoting good coding practices and a test-driven development mindset.\nI helped the team adopt agile methodologies, improving meeting efficiency and sharing agile knowledge to streamline processes. By fostering close collaboration between the business and development teams, I enabled better requirements gathering and greater ownership of projects.",
    start: new Date("2024-08-01"),
    end: null,
    link: "",
  },
  {
    company: "Routescanner",
    role: "Software Engineer",
    technologies: [
      "Kotlin",
      "Spring",
      "Postgres",
      "Neo4j",
      "ActiveMQ",
      "AWS",
      "Github Actions",
    ],
    description:
      "I led the design and implementation of a Trade Lane reporting and optimization tool. I optimized API response times to a uniform 200 milliseconds for all data sets, down from 2 seconds for small sets and 10 seconds for large sets.\nI migrated 29 services to AWS, establishing infrastructure as code and new CI/CD pipelines that cut operational costs by 30%. I also reduced deployment times by 25% through improvements to the testing suite, the GitHub Actions pipeline, and AWS Fargate integration.",
    start: new Date("2022-05-01"),
    end: new Date("2024-08-01"),
    link: "",
  },
  {
    company: "Mercado Libre",
    role: "Software Engineer",
    technologies: ["Java", "Kotlin", "SparkJava", "Lucene", "SQL"],
    description:
      "I designed and implemented scalable, maintainable systems using modern technologies and agile methodologies. Working with cross-functional teams, we established and enforced best practices focused on performance and continuous improvement.\nNotably, I improved store refresh speed by 50%, resulting in faster store indexing and a better customer experience.",
    start: new Date("2021-05-01"),
    end: new Date("2022-05-01"),
    link: "",
  },
  {
    company: "Ualá",
    role: "Software Engineer",
    technologies: [
      "Java",
      "AWS Lambda",
      "AWS SQS",
      "AWS SNS",
      "AWS Api Gateway",
      "AWS DynamoDB",
    ],
    description:
      "As a Java Software Engineer, I built scalable software on a full serverless infrastructure in AWS, working with my team using agile methodologies.\nI helped define development standards and best practices to improve the team's performance, and wrote clean, efficient code to keep our solutions running reliably.",
    start: new Date("2020-09-01"),
    end: new Date("2021-05-01"),
    link: "",
  },
  {
    company: "Rappi",
    role: "Software Engineer",
    technologies: ["Kotlin", "Spring", "Postgres", "ActiveMQ", "RxJava"],
    description:
      "As a Kotlin Software Engineer, I developed new features, improved existing code, and fixed bugs, collaborating closely with Scrum Masters and Project Managers to keep projects on track. I integrated the app with various service providers, enabling offerings like Home Services, Video Conference Doctors, Games, and Sports Betting.\nAlongside my development work, I provided technical guidance to colleagues and mentored new team members.",
    start: new Date("2019-08-01"),
    end: new Date("2020-09-01"),
    link: "",
  },
];
