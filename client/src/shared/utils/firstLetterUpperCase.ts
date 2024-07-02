export function firstLetterUpperCase(str: string|null) {
  if (!str) return str; // 빈 문자열 또는 null/undefined 처리
  return str.charAt(0).toUpperCase() + str.slice(1);
}
