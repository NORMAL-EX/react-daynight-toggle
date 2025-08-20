# React Day Night Toggle

<p align="center">
  <img src="https://img.shields.io/npm/v/react-day-night-toggle" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/react-day-night-toggle" alt="npm downloads" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
</p>

A beautiful and smooth animated day/night toggle component for React applications with TypeScript support.

## ✨ Features

- 🌞 Smooth sun to moon transition
- ☁️ Animated floating clouds
- ⭐ Twinkling stars effect
- 🎨 Fully customizable size
- 📱 Responsive design
- 🔄 System theme detection
- ⚡ High performance animations
- 📦 Lightweight (~10KB gzipped)
- 🔧 TypeScript support
- 🎯 Zero dependencies (except React)

## 📦 Installation

```bash
npm install react-day-night-toggle
# or
yarn add react-day-night-toggle
# or
pnpm add react-day-night-toggle
```

## 🚀 Quick Start

```tsx
import { useState } from 'react';
import { DayNightToggle } from 'react-day-night-toggle';
import 'react-day-night-toggle/dist/style.css'; // Don't forget to import CSS!

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // Apply theme to your app
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <DayNightToggle
      theme={theme}
      scale={3}
      onChange={handleThemeChange}
    />
  );
}
```

## 📖 API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark'` | `'light'` | Current theme state |
| `scale` | `number` | `3` | Size scale factor (1-5 recommended) |
| `onChange` | `(theme: 'light' \| 'dark') => void` | - | Callback when theme changes |
| `className` | `string` | `''` | Additional CSS class for styling |

## 💡 Examples

### Basic Usage
```tsx
<DayNightToggle />
```

### With Theme Management
```tsx
function ThemeProvider() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Apply theme to body
    document.body.style.backgroundColor = 
      theme === 'dark' ? '#1a1a1a' : '#ffffff';
  }, [theme]);

  return (
    <div className="app">
      <header>
        <DayNightToggle
          theme={theme}
          onChange={setTheme}
          scale={2.5}
        />
      </header>
      {/* Your app content */}
    </div>
  );
}
```

### Custom Styling
```tsx
<DayNightToggle
  theme={theme}
  onChange={setTheme}
  scale={4}
  className="my-custom-toggle"
/>
```

```css
.my-custom-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
```

### With LocalStorage Persistence
```tsx
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <DayNightToggle
      theme={theme}
      onChange={handleThemeChange}
    />
  );
}
```

## 🎨 Customization

### Scale Examples
- `scale={1}` - Tiny (60px × 23px)
- `scale={2}` - Small (120px × 47px)
- `scale={3}` - Medium (180px × 70px) - Default
- `scale={4}` - Large (240px × 93px)
- `scale={5}` - Extra Large (300px × 117px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

MIT © dddffgg

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/NORMAL-EX/react-day-night-toggle/issues).