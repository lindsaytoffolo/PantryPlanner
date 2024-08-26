import { Revenue } from './definitions';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


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
  if (snippetStart > 0) snippet = '...' + snippet;
  if (snippetEnd < longString.length) snippet += '...';

  return snippet;
}
