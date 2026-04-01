'use client'

import { useRouter, usePathname } from 'next/navigation';

export function useScrollToSection() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId) => {
    // If we're already on the homepage
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to homepage first, then scroll
      router.push(`/#${sectionId}`);
      // Wait for navigation and scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return { scrollToSection };
}
