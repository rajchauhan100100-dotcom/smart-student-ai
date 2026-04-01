export default function sitemap() {
  const baseUrl = "https://ai.quicktexttool.in";
  const currentDate = new Date();

  // All tool URLs
  const tools = [
    'word-counter',
    'text-summarizer',
    'paraphrasing',
    'grammar-corrector',
    'bio-generator',
    'resume-generator',
    'percentage-calculator',
    'study-planner',
    'todo-list',
    'pomodoro-timer'
  ];

  const toolUrls = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolUrls
  ];
}
