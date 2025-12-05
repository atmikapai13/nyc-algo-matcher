"use client";

import { useState } from "react";
import FadeInSection from "./FadeInSection";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is algorithmic transparency?",
    answer:
      "Algorithmic transparency refers to the practice of making information about automated decision-making systems publicly available. This includes details about how algorithms work, what data they use, their purpose, and their potential impacts. NYC's Local Law 35 requires city agencies to report annually on their use of algorithmic tools, making this information accessible to all residents.",
  },
  {
    question: "How does Local Law 35 work?",
    answer:
      "Local Law 35, enacted in 2021, requires NYC agencies to annually report on their use of algorithmic tools. These reports must include descriptions of each tool's purpose, the datasets used, vendor information, and how the tool impacts decision-making. The reports are published publicly, allowing residents to understand how algorithms affect city services and their lives.",
  },
  {
    question: "What data is collected?",
    answer:
      "NYC agencies collect various types of data depending on their functions, including demographic information, mobility patterns, health records, public benefits usage, housing information, and more. Under Local Law 11 (Open Data Law), much of this public data is made available on the NYC Open Data portal. However, personal identifying information is typically anonymized or excluded to protect privacy.",
  },
  {
    question: "How can I access my data?",
    answer:
      "You can access public datasets through the NYC Open Data Portal (opendata.cityofnewyork.us). For personal data held by specific agencies, you may need to file a Freedom of Information Law (FOIL) request with the relevant agency. Additionally, you can review the annual algorithmic tools reports to see which algorithms might be processing information related to you based on your interactions with city services.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <FadeInSection key={index} index={index}>
          <div className="border-2 border-teal-900 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left bg-white hover:bg-teal-50 transition-colors flex items-center justify-between"
            >
              <span className="text-xl font-bold text-teal-900 pr-4">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 text-teal-600 text-2xl"
              >
                ▼
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-teal-50 text-gray-700 text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}

