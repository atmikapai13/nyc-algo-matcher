"use client";

import { motion } from "framer-motion";
import FadeInSection from "./FadeInSection";

const milestones = [
  {
    year: 2012,
    title: "Local Law 11",
    subtitle: "Open Data Law",
    description: "NYC mandates all public data be made freely available on a single web portal",
  },
  {
    year: 2015,
    title: "Expansion",
    subtitle: "Open Data Growth",
    description: "NYC Open Data portal expands significantly with hundreds of new datasets",
  },
  {
    year: 2018,
    title: "AI Awareness",
    subtitle: "Growing Concerns",
    description: "Increased public awareness of algorithmic decision-making in city operations",
  },
  {
    year: 2021,
    title: "Local Law 35",
    subtitle: "Algorithmic Transparency",
    description: "NYC becomes first major city to require agencies to report on algorithmic tools",
  },
  {
    year: 2023,
    title: "Annual Reports",
    subtitle: "Ongoing Transparency",
    description: "Agencies continue annual reporting on algorithmic tools and their impacts",
  },
];

export default function Timeline() {
  return (
    <div className="w-full py-4">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-teal-900 transform md:-translate-x-1/2"></div>

        {/* Milestones */}
        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeInSection key={milestone.year} index={index}>
                <div className="relative flex items-center w-full">
                  {/* Left side spacer for odd indices */}
                  {!isEven && <div className="hidden md:block w-1/2"></div>}

                  {/* Left side card (even indices: 0, 2, 4) */}
                  {isEven && (
                    <div className="w-full md:w-1/2 md:pr-4 text-left">
                      <div
                        className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                          milestone.year === 2012 || milestone.year === 2021
                            ? "border-teal-600"
                            : "border-teal-400"
                        } md:mr-4`}
                      >
                        <div className="text-3xl font-bold text-teal-900 mb-2">
                          {milestone.year}
                        </div>
                        <div className="text-xl font-semibold text-teal-800 mb-1">
                          {milestone.title}
                        </div>
                        <div className="text-sm text-teal-600 mb-2 font-medium">
                          {milestone.subtitle}
                        </div>
                        <div className="text-gray-700">{milestone.description}</div>
                      </div>
                    </div>
                  )}

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:-translate-x-1/2 z-10">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                        milestone.year === 2012 || milestone.year === 2021
                          ? "bg-teal-600"
                          : "bg-teal-400"
                      }`}
                    ></div>
                  </div>

                  {/* Right side card (odd indices: 1, 3) */}
                  {!isEven && (
                    <div className="w-full md:w-1/2 md:pl-4 text-left">
                      <div
                        className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                          milestone.year === 2012 || milestone.year === 2021
                            ? "border-teal-600"
                            : "border-teal-400"
                        } md:ml-4`}
                      >
                        <div className="text-3xl font-bold text-teal-900 mb-2">
                          {milestone.year}
                        </div>
                        <div className="text-xl font-semibold text-teal-800 mb-1">
                          {milestone.title}
                        </div>
                        <div className="text-sm text-teal-600 mb-2 font-medium">
                          {milestone.subtitle}
                        </div>
                        <div className="text-gray-700">{milestone.description}</div>
                      </div>
                    </div>
                  )}

                  {/* Right side spacer for even indices */}
                  {isEven && <div className="hidden md:block w-1/2"></div>}
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}

