import React, { useState } from 'react';
import './Settings.css';

/**
 * Settings Page
 * 
 * Demonstrates:
 * - Lazy loaded component (with configurable delay)
 * - Form handling
 * - Local state management
 * - Settings UI patterns
 */
export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailAlerts: false,
    autoSave: true,
    itemsPerPage: 10,
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    console.log('Saving settings:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings({
      theme: 'light',
      notifications: true,
      emailAlerts: false,
      autoSave: true,
      itemsPerPage: 10,
      language: 'en',
    });
    setSaved(false);
  };

  return (
    <div className="settings">
      <header className="settings-header">
        <h1>⚙️ Settings</h1>
        <p className="settings-subtitle">
          Customize your Task Hub experience
        </p>
      </header>

      {saved && (
        <div className="settings-alert settings-alert-success">
          <span className="alert-icon">✓</span>
          <span className="alert-text">Settings saved successfully!</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Appearance Settings */}
        <div className="settings-card">
          <h2>🎨 Appearance</h2>
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="theme-select" className="setting-label">
                  Theme
                </label>
                <p className="setting-description">
                  Choose your preferred color scheme
                </p>
              </div>
              <select
                id="theme-select"
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="language-select" className="setting-label">
                  Language
                </label>
                <p className="setting-description">
                  Select your preferred language
                </p>
              </div>
              <select
                id="language-select"
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="settings-card">
          <h2>🔔 Notifications</h2>
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="notifications-toggle" className="setting-label">
                  Enable Notifications
                </label>
                <p className="setting-description">
                  Receive in-app notifications for task updates
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  id="notifications-toggle"
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="email-toggle" className="setting-label">
                  Email Alerts
                </label>
                <p className="setting-description">
                  Get email notifications for important updates
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  id="email-toggle"
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="settings-card">
          <h2>🎯 Preferences</h2>
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="autosave-toggle" className="setting-label">
                  Auto-save
                </label>
                <p className="setting-description">
                  Automatically save changes as you work
                </p>
              </div>
              <label className="toggle-switch">
                <input
                  id="autosave-toggle"
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleChange('autoSave', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="items-select" className="setting-label">
                  Default Items Per Page
                </label>
                <p className="setting-description">
                  Number of tasks to display per page
                </p>
              </div>
              <select
                id="items-select"
                value={settings.itemsPerPage}
                onChange={(e) => handleChange('itemsPerPage', Number(e.target.value))}
                className="setting-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-card">
          <h2>💾 Data Management</h2>
          <div className="settings-section">
            <div className="data-actions">
              <button className="data-button data-button-primary">
                <span className="button-icon">📥</span>
                <span className="button-text">Export Data</span>
              </button>
              <button className="data-button data-button-secondary">
                <span className="button-icon">📤</span>
                <span className="button-text">Import Data</span>
              </button>
              <button className="data-button data-button-danger">
                <span className="button-icon">🗑️</span>
                <span className="button-text">Clear All Data</span>
              </button>
            </div>
            <p className="data-warning">
              <strong>⚠️ Warning:</strong> Clearing data will permanently delete all your tasks. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="settings-actions">
        <button onClick={handleReset} className="settings-button settings-button-secondary">
          Reset to Defaults
        </button>
        <button onClick={handleSave} className="settings-button settings-button-primary">
          Save Changes
        </button>
      </div>

      <div className="settings-footer">
        <p>
          <strong>Note:</strong> These settings are for demonstration purposes. 
          In a production environment, settings would be persisted to a backend 
          or browser localStorage.
        </p>
      </div>
    </div>
  );
};

