
import { FaNodeJs, FaReact, FaDocker, FaAws, FaNetworkWired, FaServer, FaCode, FaGitAlt, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiPostgresql, SiTypescript, SiMongodb, SiGooglecloud, SiKubernetes, SiExpress, SiTailwindcss, SiJavascript, SiFigma, SiRedis, SiFastapi } from "react-icons/si";

export const getTechIcon = (tech: string, className: string = "") => {
    const baseClass = className;
    switch (tech.toLowerCase()) {
        // Frontend
        case "react": return <FaReact className={`text-[#61DAFB] ${baseClass}`} />;
        case "typescript": return <SiTypescript className={`text-[#3178C6] ${baseClass}`} />;
        case "javascript": return <SiJavascript className={`text-[#F7DF1E] ${baseClass}`} />;
        case "html5": return <FaHtml5 className={`text-[#E34F26] ${baseClass}`} />;
        case "css3": return <FaCss3Alt className={`text-[#1572B6] ${baseClass}`} />;
        case "tailwind css": return <SiTailwindcss className={`text-[#06B6D4] ${baseClass}`} />;

        // Backend
        case "node.js": return <FaNodeJs className={`text-[#339933] ${baseClass}`} />;
        case "express": return <SiExpress className={`text-gray-500 ${baseClass}`} />;
        case "python": return <FaPython className={`text-[#3776AB] ${baseClass}`} />;
        case "fastapi": return <SiFastapi className={`text-[#009688] ${baseClass}`} />;

        // Database
        case "postgresql": return <SiPostgresql className={`text-[#4169E1] ${baseClass}`} />;
        case "mongodb": return <SiMongodb className={`text-[#47A248] ${baseClass}`} />;
        case "redis": return <SiRedis className={`text-[#DC382D] ${baseClass}`} />;

        // DevOps & Cloud
        case "docker": return <FaDocker className={`text-[#2496ED] ${baseClass}`} />;
        case "kubernetes": return <SiKubernetes className={`text-[#326CE5] ${baseClass}`} />;
        case "aws": return <FaAws className={`text-[#FF9900] ${baseClass}`} />;
        case "gcp": return <SiGooglecloud className={`text-[#4285F4] ${baseClass}`} />;

        // Tools
        case "git": return <FaGitAlt className={`text-[#F05032] ${baseClass}`} />;
        case "figma": return <SiFigma className={`text-[#F24E1E] ${baseClass}`} />;
        case "vs code": return <FaCode className={`text-[#007ACC] ${baseClass}`} />;

        // Domain Specific
        case "opcua": return <FaNetworkWired className={`text-gray-500 ${baseClass}`} />;
        case "software defined networks": return <FaNetworkWired className={`text-blue-400 ${baseClass}`} />;
        case "network controllers": return <FaServer className={`text-gray-400 ${baseClass}`} />;
        case "apis": return <FaCode className={`text-yellow-500 ${baseClass}`} />;
        case "web scraping": return <FaCode className={`text-green-500 ${baseClass}`} />;

        default: return <FaCode className={`text-gray-400 ${baseClass}`} />;
    }
};
