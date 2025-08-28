'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ThemeSettings() {
  const { colors, mode, setThemeColor, resetTheme, setThemeMode } = useTheme();
  const [previewColors, setPreviewColors] = useState(colors);

  // Update preview colors when theme colors change
  useEffect(() => {
    setPreviewColors(colors);
  }, [colors]);

  const handleThemeModeChange = (newMode: 'light' | 'dark') => {
    setThemeMode(newMode);
  };

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setPreviewColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyChanges = () => {
    Object.entries(previewColors).forEach(([key, value]) => {
      setThemeColor(key as keyof typeof colors, value);
    });
    alert('Theme colors updated successfully!');
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>Theme Settings</h1>
          <p style={{ color: `${colors.text}99` }}>Customize your application theme colors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.background }}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Theme Mode</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeModeChange('light')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    mode === 'light' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: mode === 'light' ? colors.primary : 'transparent',
                    color: mode === 'light' ? 'white' : colors.text,
                    borderColor: colors.text,
                    borderWidth: mode === 'light' ? 0 : 1,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  Light
                </button>
                <button
                  onClick={() => handleThemeModeChange('dark')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    mode === 'dark' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: mode === 'dark' ? colors.primary : 'transparent',
                    color: mode === 'dark' ? 'white' : colors.text,
                    borderColor: colors.text,
                    borderWidth: mode === 'dark' ? 0 : 1,
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  Dark
                </button>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Color Customization</h2>
            
            {Object.entries(previewColors).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-sm font-medium mb-2 capitalize" style={{ color: colors.text }}>
                    {key} Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                      className="h-10 w-20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof colors, e.target.value)}
                      className="border rounded px-3 py-2 w-32"
                      style={{ color: colors.text, borderColor: `${colors.text}33` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={applyChanges}
                  className="px-4 py-2 text-white rounded hover:opacity-90"
                  style={{ backgroundColor: previewColors.primary }}
                >
                  Apply Changes
                </button>
                <button
                  onClick={resetTheme}
                  className="px-4 py-2 border rounded hover:opacity-90"
                  style={{ 
                    borderColor: colors.text,
                    color: colors.text,
                  }}
                >
                  Reset to Default
                </button>
              </div>
            </div>
            
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: colors.background }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: colors.text }}>Preview</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg" style={{ backgroundColor: previewColors.background }}>
                <h3 className="font-medium mb-2" style={{ color: previewColors.text }}>Background & Text</h3>
                <p style={{ color: previewColors.text }}>This shows how your background and text colors will look.</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: previewColors.primary }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: previewColors.secondary }}
                >
                  Secondary Button
                </button>
                <button
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: previewColors.accent }}
                >
                  Accent Button
                </button>
              </div>
              
              <div className="p-4 border rounded-lg" style={{ borderColor: previewColors.primary }}>
                <h3 className="font-medium mb-2" style={{ color: previewColors.primary }}>
                  Primary Color Text & Border
                </h3>
                <p>This shows how your primary color looks on borders and text.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}