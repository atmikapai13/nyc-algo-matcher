"use client";

import FadeInSection from "./FadeInSection";
import { motion } from "framer-motion";

const links = [
  {
    title: "NYC Open Data Portal",
    description: "Explore thousands of public datasets from NYC agencies",
    url: "https://opendata.cityofnewyork.us/",
    icon: "📊",
  },
  {
    title: "Local Law 35 Reports",
    description: "View annual reports on algorithmic tools used by NYC agencies",
    url: "https://data.cityofnewyork.us/City-Government/Algorithmic-Tools-Compliance-Report/jaw4-yuem/about_data",
    icon: "📋",
  },
  {
    title: "Algorithmic Tools Report",
    description: "Download the comprehensive 2024 Algorithmic Tools Report PDF",
    url: "https://www.nyc.gov/assets/oti/downloads/pdf/reports/2024-algorithmic-tools-report.pdf",
    icon: "📄",
  },
  {
    title: "NYC Office of Technology & Innovation",
    description: "Learn about NYC's technology initiatives and policies",
    url: "https://www.nyc.gov/content/oti/pages/",
    icon: "🏛️",
  },
];

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {links.map((link, index) => (
        <FadeInSection key={index} index={index}>
          <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full p-6 bg-white rounded-lg shadow-md border-2 border-teal-900 hover:border-teal-700 hover:shadow-lg transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start gap-4 h-full">
              <div className="text-4xl flex-shrink-0">{link.icon}</div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-teal-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-700 flex-grow">{link.description}</p>
                <div className="mt-3 text-sm text-teal-600 font-medium">
                  Visit site →
                </div>
              </div>
            </div>
          </motion.a>
        </FadeInSection>
      ))}
    </div>
  );
}

