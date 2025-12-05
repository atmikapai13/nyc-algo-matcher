import RSSParser from 'rss-parser';

const parser = new RSSParser({
  customFields: {
    item: ['media:content', 'content:encoded']
  }
});

export async function GET(request) {
  try {
    // Multiple search queries for comprehensive coverage
    const queries = [
      'NYC+algorithm+governance',
      'NYC+artificial+intelligence+governance',
      'New+York+City+algorithmic+transparency',
      'NYC+AI+policy',
      'NYC+automated+decision+making'
    ];

    const allArticles = [];

    // Fetch articles from multiple RSS feeds
    for (const query of queries) {
      try {
        const feedUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;
        const feed = await parser.parseURL(feedUrl);
        
        if (feed.items && feed.items.length > 0) {
          // Process and deduplicate articles
          feed.items.forEach(item => {
            // Check if article already exists (by title)
            const exists = allArticles.some(article => article.title === item.title);
            if (!exists && item.title) {
              allArticles.push({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                contentSnippet: item.contentSnippet || '',
                source: item.source?.name || 'Google News'
              });
            }
          });
        }
      } catch (error) {
        console.error(`Error fetching feed for query "${query}":`, error);
        // Continue with other queries even if one fails
      }
    }

    // Sort by date (newest first) and limit to 20 articles
    const sortedArticles = allArticles
      .sort((a, b) => {
        const dateA = new Date(a.pubDate || 0);
        const dateB = new Date(b.pubDate || 0);
        return dateB - dateA;
      })
      .slice(0, 20);

    return Response.json({ articles: sortedArticles });
  } catch (error) {
    console.error('Error fetching news:', error);
    return Response.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

