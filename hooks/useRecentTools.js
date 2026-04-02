'use client'

import { useState, useEffect, useCallback } from 'react';

export function useRecentTools() {
  const [recentTools, setRecentTools] = useState([]);

  useEffect(() => {
    // Load recent tools from localStorage
    const stored = localStorage.getItem('recentTools');
    if (stored) {
      try {
        setRecentTools(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent tools:', e);
      }
    }
  }, []);

  const addRecentTool = useCallback((toolSlug, toolData) => {
    setRecentTools((prev) => {
      // Remove duplicates and add to front
      const filtered = prev.filter((tool) => tool.slug !== toolSlug);
      const updated = [{ slug: toolSlug, ...toolData, visitedAt: Date.now() }, ...filtered].slice(0, 5);
      
      // Save to localStorage
      localStorage.setItem('recentTools', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { recentTools, addRecentTool };
}
