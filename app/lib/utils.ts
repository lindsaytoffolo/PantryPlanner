import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge to manage and merge Tailwind CSS class names.
 * 
 * @param args - Arguments to pass to clsx.
 * @returns The merged class names string.
 */
export const classNames = (...args: ClassValue[]): string => {
  return twMerge(clsx(...args));
};


export function getSnippet(longString: string, query: string, maxSnippetLength: number): string {
  if (!query || maxSnippetLength <= 0) return '';

  const lowerString = longString.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const queryStart = lowerString.indexOf(lowerQuery);

  if (queryStart === -1) return '';
  const queryEnd = queryStart + query.length
  const paddingSize = Math.floor((maxSnippetLength - query.length) / 2)

  const roughStart = Math.max(0, queryStart - paddingSize);
  const roughEnd = Math.min(longString.length, queryEnd + paddingSize);

  // to get complete words - pad with space for edge cases
  const snippetStart = ` ${longString}`.indexOf(' ', roughStart - 1);
  const snippetEnd = `${longString} `.lastIndexOf(' ', roughEnd)

  let snippet = longString.slice(snippetStart, snippetEnd);
  if (snippetStart > 0) snippet = '... ' + snippet;
  if (snippetEnd < longString.length) snippet += ' ...';

  return snippet;
}

export const formatTime = (hours?: number, minutes?: number) => {
  if (hours && minutes) {
    return `${hours}h ${minutes}mins`;
  } else if (hours) {
    return `${hours}h`;
  }
  return `${minutes}mins`;
};