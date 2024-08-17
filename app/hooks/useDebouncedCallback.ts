import { useState, useCallback, useRef } from 'react';

// Custom hook to debounce a callback function
const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
    // Ref to store the timeout ID
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Use useCallback to memoize the debounced function
    const debouncedCallback = useCallback((...args: any[]) => {
        // Clear the previous timeout if it exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedCallback;
};

export default useDebouncedCallback;
