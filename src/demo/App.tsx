import { useState } from 'react'; // 修复：删除未使用的 React 导入
import { DayNightToggle } from '../components';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#424242' : 'aliceblue';
    document.body.style.transition = 'background-color 0.5s ease';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <DayNightToggle
        theme={theme}
        scale={3}
        onChange={handleThemeChange}
      />
    </div>
  );
}

export default App;