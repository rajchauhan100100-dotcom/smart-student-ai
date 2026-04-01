'use client'

import { useState, useEffect, useRef } from 'react';

/**
 * Hook for managing API call cooldown to prevent quota issues
 * @param {number} cooldownSeconds - Cooldown period in seconds (default: 5)
 * @returns {Object} - { canMakeRequest, secondsRemaining, startCooldown }
 */
export function useApiCooldown(cooldownSeconds = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [canMakeRequest, setCanMakeRequest] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (secondsRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1);
      }, 1000);
    } else {
      setCanMakeRequest(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [secondsRemaining]);

  const startCooldown = () => {
    setSecondsRemaining(cooldownSeconds);
    setCanMakeRequest(false);
  };

  return { canMakeRequest, secondsRemaining, startCooldown };
}
