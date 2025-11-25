import React from "react";
import { motion } from "framer-motion";
import Section from "./common/Section";
import portfolioData from "../data/portfolioData.json";
import { ExternalLink, Award } from "lucide-react";

const Certificates: React.FC = () => {
  const { certificates } = portfolioData;

  // Function to get preview thumbnail from Google Drive link
  const getPreviewImage = (link: string, fallbackImage?: string): string => {
    if (!link) return fallbackImage || "";

    // Extract Google Drive file ID
    const driveMatch = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      const fileId = driveMatch[1];
      // Generate Google Drive thumbnail preview URL
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }

    // If not a Google Drive link, use fallback image
    return fallbackImage || "";
  };

  const certificateCount = certificates.length;

  return (
    <Section
      id="certificates"
      title="Certifications"
      subtitle="Continuous Learning & Achievement"
    >
      <div
        className={`flex flex-wrap justify-center gap-8 ${certificateCount === 1 ? "max-w-md mx-auto" : ""
          }`}
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`group relative bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors ${certificateCount === 1
                ? "w-full max-w-md"
                : "w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
              }`}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={getPreviewImage(cert.link, cert.image)}
                alt={cert.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to original image if preview fails
                  if (cert.image && e.currentTarget.src !== cert.image) {
                    e.currentTarget.src = cert.image;
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform"
                  aria-label={`View ${cert.title} certificate`}
                >
                  <ExternalLink size={24} />
                </a>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award size={20} />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-full">
                  {cert.date}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground dark:text-white mb-1 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Certificates;
