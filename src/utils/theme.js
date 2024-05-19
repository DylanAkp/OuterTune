export function switchTheme () {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark')
  }
  const newTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'
  localStorage.setItem('theme', newTheme)
  applyTheme(newTheme)
}

export function initTheme () {
  applyTheme(getTheme())
}

function applyTheme (theme) {
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--main-color', '#191b1f')
    document.documentElement.style.setProperty('--secondary-color', '#0d1116')
    document.documentElement.style.setProperty('--third-color', '#2e2f36')
    document.documentElement.style.setProperty('--text-color', '#dcdde4')
  } else {
    document.documentElement.style.setProperty('--main-color', '#f1f0f7')
    document.documentElement.style.setProperty('--secondary-color', '#e3e2e9')
    document.documentElement.style.setProperty('--third-color', '#dcdde4')
    document.documentElement.style.setProperty('--text-color', '#1b1a21')
  }
}

export function getTheme () {
  return localStorage.getItem('theme') || 'dark'
}
