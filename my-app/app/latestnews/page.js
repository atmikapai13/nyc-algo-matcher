"use client";

import { useEffect, useState } from "react";
import FadeInSection from "../../components/ui/FadeInSection";

export default function LatestNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [readArticles, setReadArticles] = useState(new Set());

  // Load read articles from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("readArticles");
    if (stored) {
      try {
        setReadArticles(new Set(JSON.parse(stored)));
      } catch (e) {
        // If parsing fails, start with empty set
      }
    }
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const markAsRead = (articleLink) => {
    setReadArticles((prev) => {
      const updated = new Set(prev);
      updated.add(articleLink);
      // Save to sessionStorage
      sessionStorage.setItem("readArticles", JSON.stringify(Array.from(updated)));
      return updated;
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <FadeInSection index={0}>
        <h2 className="text-5xl font-bold text-teal-900 text-center">
          Latest News
        </h2>
        <p className="text-2xl text-center text-teal-900 mt-6">
          Stay informed about algorithmic transparency, AI governance, and
          automated decision-making systems in New York City.
        </p>
      </FadeInSection>

      {loading && (
        <div className="text-center py-12">
          <p className="text-xl text-teal-900">Loading news articles...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-xl text-red-600">
            Error loading news: {error}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Please try refreshing the page.
          </p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-teal-900">
            No articles found at this time.
          </p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="space-y-6">
          {articles.slice(0, visibleCount).map((article, index) => {
            const isRead = readArticles.has(article.link);
            return (
              <FadeInSection key={index} index={index + 1}>
                <article
                  className={`border-l-4 pl-6 py-4 hover:bg-gray-50 transition-colors ${
                    isRead
                      ? "border-gray-400 opacity-75"
                      : "border-teal-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <h3
                      className={`text-2xl font-bold mb-2 flex-1 ${
                        isRead ? "text-gray-600" : "text-teal-900"
                      }`}
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => markAsRead(article.link)}
                        className={`hover:text-teal-700 transition-colors ${
                          isRead ? "line-through" : ""
                        }`}
                      >
                        {article.title}
                      </a>
                    </h3>
                    {isRead && (
                      <span className="text-teal-600 font-semibold text-sm mt-1">
                        ✓ Read
                      </span>
                    )}
                  </div>
                  {article.contentSnippet && (
                    <p
                      className={`text-lg mb-3 line-clamp-2 ${
                        isRead ? "text-gray-500" : "text-gray-700"
                      }`}
                    >
                      {article.contentSnippet}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {article.pubDate && (
                      <span>{formatDate(article.pubDate)}</span>
                    )}
                    {article.source && (
                      <span className="font-medium">{article.source}</span>
                    )}
                  </div>
                </article>
              </FadeInSection>
            );
          })}
          
          {articles.length > visibleCount && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount(articles.length)}
                className="px-6 py-3 bg-teal-900 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
