export default function getCookie(key: string): string | undefined {
  const result = document.cookie
    .split("; ")
    .find(row => row.startsWith(`${key}=`))
    ?.split("=")[1];
  return result;
}
