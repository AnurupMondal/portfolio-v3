import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Projects from '../components/Projects';
import ResumePreview from '../components/ResumePreview';
import Contact from '../components/Contact';

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Skills />
            <Experience />
            <Certificates />
            <Projects />
            <ResumePreview />
            <Contact />
        </div>
    );
};

export default Home;
