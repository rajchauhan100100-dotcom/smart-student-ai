'use client'

import { ToolCard } from './ToolCard';
import { tools } from '../lib/toolsData';

export function RelatedTools({ currentToolId, category, limit = 4 }) {
  // Get related tools from same category
  const relatedTools = tools
    .filter(tool => tool.id !== currentToolId && tool.category === category)
    .slice(0, limit);

  // If not enough in same category, fill with other tools
  if (relatedTools.length < limit) {
    const additionalTools = tools
      .filter(tool => tool.id !== currentToolId && !relatedTools.find(t => t.id === tool.id))
      .slice(0, limit - relatedTools.length);
    relatedTools.push(...additionalTools);
  }

  if (relatedTools.length === 0) return null;

  return (
    <section className="py-12 px-4 border-t border-border/40 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
