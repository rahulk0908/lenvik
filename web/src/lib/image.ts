// Sanity's CDN resizes on the fly; local files are returned unchanged
export function sized(url: string, width: number) {
  if (!url.includes('cdn.sanity.io')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}w=${width}&auto=format&fit=max&q=75`
}
