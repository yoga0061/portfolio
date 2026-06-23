// Google Analytics 4 Event Tracking Utility

interface TrackingEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Check if window.gtag exists
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'gtag' in window;
};

/**
 * Track an event with Google Analytics 4
 * Falls back to console logs in development or when blocked
 */
export const trackEvent = ({ action, category, label, value }: TrackingEvent) => {
  if (isGtagAvailable()) {
    try {
      // Send event to GA4
      (window as Window & { gtag?: (type: string, action: string, options: Record<string, unknown>) => void }).gtag?.('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } catch (error) {
      console.warn('[Analytics Error] Failed to dispatch GA4 event:', error);
    }
  }

  // Always log to console in a styled cybersecurity theme for demonstration
  console.log(
    `%c[SEC_TELEMETRY] ${category.toUpperCase()} ➔ ${action.toUpperCase()}${label ? ` (${label})` : ''}`,
    'color: #00ff66; font-weight: bold; background: #07090e; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(0,255,102,0.3);'
  );
};

// Hook events into links and buttons helper
export const analyticsActions = {
  resumeDownload: (format: string = 'PDF') => {
    trackEvent({
      action: 'download_resume',
      category: 'recruitment',
      label: `Resume - ${format}`,
    });
  },
  contactClick: (method: string) => {
    trackEvent({
      action: 'click_contact',
      category: 'recruitment',
      label: `Contact via ${method}`,
    });
  },
  socialClick: (platform: string) => {
    trackEvent({
      action: 'click_social',
      category: 'engagement',
      label: platform,
    });
  },
  projectLinkClick: (projectName: string, linkType: 'github' | 'live') => {
    trackEvent({
      action: `click_project_${linkType}`,
      category: 'portfolio',
      label: projectName,
    });
  },
  commandPaletteUsed: (commandName: string) => {
    trackEvent({
      action: 'use_command_palette',
      category: 'navigation',
      label: commandName,
    });
  }
};
