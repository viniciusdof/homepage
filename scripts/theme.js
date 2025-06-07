export function toggleTheme(darkMode) {
  document.documentElement.style.setProperty("--bg", darkMode ? "black" : "#003B8B");
  document.documentElement.style.setProperty("--fg", darkMode ? "lime" : "white");
  document.documentElement.style.setProperty("--border", darkMode ? "magenta" : "lightblue");
}
