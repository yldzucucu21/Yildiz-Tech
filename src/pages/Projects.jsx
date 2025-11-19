import React from 'react';
import GithubProjects from '../components/GithubProjects';
import { useI18n } from '../i18n/i18n';

const Projects = () => {
  const { t } = useI18n();
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{t('projects_title')}</h1>
      <p className="text-gray-300">{t('projects_desc')}</p>
      <GithubProjects />
    </section>
  );
};

export default Projects;
