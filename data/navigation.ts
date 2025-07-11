import React from 'react'

export interface NavItem {
  icon: React.ReactNode
  label: string
  active: boolean
}

export const navItems: NavItem[] = [
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M12 1.696L6.5 7.196V19.5h3v-5h2v5h3V7.196L12 1.696zm0-1.696l7 7v12.5h-4v-5h-6v5H5V7L12 0z' })
    ),
    label: 'Home',
    active: true
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z' })
    ),
    label: 'Explore',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.234l-1.141-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z' })
    ),
    label: 'Notifications',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.636V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z' })
    ),
    label: 'Messages',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z' })
    ),
    label: 'Grok',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z' })
    ),
    label: 'Lists',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z' })
    ),
    label: 'Bookmarks',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z' })
    ),
    label: 'Communities',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z' })
    ),
    label: 'Profile',
    active: false
  },
  {
    icon: React.createElement('svg', { viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' })
    ),
    label: 'More',
    active: false
  }
]
