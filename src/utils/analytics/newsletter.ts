// Newsletter Analytics Utilities
// Handles tracking, conversion events, and CRM integration

export interface NewsletterEvent {
  email?: string;
  leadSource: string;
  campaignId?: string;
  variant: string;
  page: string;
  timestamp: string;
  userAgent?: string;
  sessionId?: string;
  userId?: string;
}

export interface ConversionData extends NewsletterEvent {
  subscriptionId?: string;
  conversionValue?: number;
  attribution?: AttributionData;
}

export interface AttributionData {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
  referrer?: string;
  landingPage?: string;
  sessionDuration?: number;
  pageViews?: number;
}

export class NewsletterAnalytics {
  private trackingEnabled: boolean;
  private debugMode: boolean;
  private sessionId: string;
  
  constructor(options: { trackingEnabled?: boolean; debugMode?: boolean } = {}) {
    this.trackingEnabled = options.trackingEnabled ?? true;
    this.debugMode = options.debugMode ?? false;
    this.sessionId = this.generateSessionId();
  }
  
  /**
   * Track newsletter form impression
   */
  trackImpression(data: Omit<NewsletterEvent, 'timestamp'>): void {
    if (!this.trackingEnabled) return;
    
    const eventData: NewsletterEvent = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };
    
    this.sendEvent('newsletter_impression', eventData);
  }
  
  /**
   * Track user engagement with form (focus, input)
   */
  trackEngagement(data: Omit<NewsletterEvent, 'timestamp'>, engagementType: 'focus' | 'input' | 'validation'): void {
    if (!this.trackingEnabled) return;
    
    const eventData: NewsletterEvent = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };
    
    this.sendEvent(`newsletter_engagement_${engagementType}`, eventData);
  }
  
  /**
   * Track subscription attempt
   */
  trackAttempt(data: Omit<NewsletterEvent, 'timestamp'>): void {
    if (!this.trackingEnabled) return;
    
    const eventData: NewsletterEvent = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId
    };
    
    this.sendEvent('newsletter_attempt', eventData);
  }
  
  /**
   * Track successful subscription
   */
  trackSuccess(data: Omit<ConversionData, 'timestamp'>): void {
    if (!this.trackingEnabled) return;
    
    const conversionData: ConversionData = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      attribution: this.getAttributionData()
    };
    
    this.sendEvent('newsletter_success', conversionData);
    this.updateConversionMetrics(conversionData);
  }
  
  /**
   * Track subscription error
   */
  trackError(data: Omit<NewsletterEvent, 'timestamp'>, error: string): void {
    if (!this.trackingEnabled) return;
    
    const eventData = {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      error
    };
    
    this.sendEvent('newsletter_error', eventData);
  }
  
  /**
   * Send event to multiple analytics providers
   */
  private sendEvent(eventName: string, data: any): void {
    // Google Analytics 4
    this.sendToGoogleAnalytics(eventName, data);
    
    // Custom analytics
    this.sendToCustomAnalytics(eventName, data);
    
    // Future: CRM analytics
    this.sendToCRM(eventName, data);
    
    // Debug logging
    if (this.debugMode) {
      console.log(`📊 Newsletter Analytics: ${eventName}`, data);
    }
  }
  
  /**
   * Send to Google Analytics 4
   */
  private sendToGoogleAnalytics(eventName: string, data: any): void {
    if (typeof gtag === 'undefined') return;
    
    try {
      gtag('event', eventName, {
        event_category: 'newsletter',
        event_label: data.leadSource,
        custom_parameter_1: data.variant,
        custom_parameter_2: data.campaignId,
        custom_parameter_3: data.page,
        value: this.getEventValue(eventName)
      });
    } catch (error) {
      console.warn('Google Analytics tracking failed:', error);
    }
  }
  
  /**
   * Send to custom analytics system
   */
  private sendToCustomAnalytics(eventName: string, data: any): void {
    try {
      // Store in localStorage for now (replace with real analytics later)
      const analyticsData = this.getStoredAnalytics();
      
      if (!analyticsData.events) {
        analyticsData.events = [];
      }
      
      analyticsData.events.push({
        event: eventName,
        data,
        timestamp: Date.now()
      });
      
      // Keep only last 100 events to prevent storage bloat
      if (analyticsData.events.length > 100) {
        analyticsData.events = analyticsData.events.slice(-100);
      }
      
      localStorage.setItem('newsletter_analytics', JSON.stringify(analyticsData));
      
      // Send to server analytics endpoint (future implementation)
      // await fetch('/api/analytics/track', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ event: eventName, data })
      // });
      
    } catch (error) {
      console.warn('Custom analytics tracking failed:', error);
    }
  }
  
  /**
   * Send to CRM system (future implementation)
   */
  private sendToCRM(eventName: string, data: any): void {
    // Placeholder for future CRM integration
    if (eventName === 'newsletter_success') {
      // This will be implemented when CRM API is ready
      console.log('🎯 CRM Lead:', {
        email: data.email,
        source: data.leadSource,
        campaign: data.campaignId,
        score: this.calculateLeadScore(data),
        metadata: data
      });
    }
  }
  
  /**
   * Calculate lead score based on engagement
   */
  private calculateLeadScore(data: any): number {
    let score = 10; // Base score
    
    // Source scoring
    const sourceScores: Record<string, number> = {
      'footer': 5,
      'sidebar': 10,
      'article-inline': 15,
      'modal': 8,
      'homepage': 12
    };
    
    score += sourceScores[data.leadSource] || 5;
    
    // Page scoring
    if (data.page.includes('/blog/')) score += 10;
    if (data.page === '/') score += 5;
    
    // Campaign scoring
    if (data.campaignId) score += 5;
    
    return Math.min(score, 100); // Cap at 100
  }
  
  /**
   * Get attribution data from various sources
   */
  private getAttributionData(): AttributionData {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
      source: urlParams.get('utm_source') || this.getTrafficSource(),
      medium: urlParams.get('utm_medium') || 'organic',
      campaign: urlParams.get('utm_campaign') || 'direct',
      content: urlParams.get('utm_content') || undefined,
      term: urlParams.get('utm_term') || undefined,
      referrer: document.referrer || undefined,
      landingPage: this.getLandingPage(),
      sessionDuration: this.getSessionDuration(),
      pageViews: this.getPageViews()
    };
  }
  
  /**
   * Determine traffic source from referrer
   */
  private getTrafficSource(): string {
    const referrer = document.referrer.toLowerCase();
    
    if (!referrer) return 'direct';
    if (referrer.includes('google')) return 'google';
    if (referrer.includes('facebook')) return 'facebook';
    if (referrer.includes('twitter')) return 'twitter';
    if (referrer.includes('linkedin')) return 'linkedin';
    if (referrer.includes('instagram')) return 'instagram';
    
    return 'referral';
  }
  
  /**
   * Get landing page from session
   */
  private getLandingPage(): string {
    return sessionStorage.getItem('landing_page') || window.location.pathname;
  }
  
  /**
   * Calculate session duration
   */
  private getSessionDuration(): number {
    const sessionStart = sessionStorage.getItem('session_start');
    if (!sessionStart) return 0;
    
    return Date.now() - parseInt(sessionStart);
  }
  
  /**
   * Get page views in current session
   */
  private getPageViews(): number {
    const pageViews = sessionStorage.getItem('page_views');
    return pageViews ? parseInt(pageViews) : 1;
  }
  
  /**
   * Get event value for analytics
   */
  private getEventValue(eventName: string): number {
    const values: Record<string, number> = {
      'newsletter_impression': 1,
      'newsletter_engagement_focus': 2,
      'newsletter_engagement_input': 3,
      'newsletter_attempt': 5,
      'newsletter_success': 10,
      'newsletter_error': 0
    };
    
    return values[eventName] || 1;
  }
  
  /**
   * Update conversion metrics
   */
  private updateConversionMetrics(data: ConversionData): void {
    try {
      const metrics = this.getStoredAnalytics();
      
      if (!metrics.conversions) {
        metrics.conversions = {
          total: 0,
          bySource: {},
          byVariant: {},
          byCampaign: {}
        };
      }
      
      // Update totals
      metrics.conversions.total += 1;
      
      // Update by source
      const source = data.leadSource;
      metrics.conversions.bySource[source] = (metrics.conversions.bySource[source] || 0) + 1;
      
      // Update by variant
      const variant = data.variant;
      metrics.conversions.byVariant[variant] = (metrics.conversions.byVariant[variant] || 0) + 1;
      
      // Update by campaign
      if (data.campaignId) {
        const campaign = data.campaignId;
        metrics.conversions.byCampaign[campaign] = (metrics.conversions.byCampaign[campaign] || 0) + 1;
      }
      
      // Store updated metrics
      localStorage.setItem('newsletter_analytics', JSON.stringify(metrics));
      
    } catch (error) {
      console.warn('Failed to update conversion metrics:', error);
    }
  }
  
  /**
   * Get stored analytics data
   */
  private getStoredAnalytics(): any {
    try {
      const stored = localStorage.getItem('newsletter_analytics');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }
  
  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  /**
   * Get conversion metrics for reporting
   */
  getConversionMetrics(): any {
    return this.getStoredAnalytics().conversions || {};
  }
  
  /**
   * Get recent events for debugging
   */
  getRecentEvents(limit: number = 10): any[] {
    const analytics = this.getStoredAnalytics();
    const events = analytics.events || [];
    return events.slice(-limit);
  }
  
  /**
   * Clear analytics data (for testing/privacy)
   */
  clearData(): void {
    localStorage.removeItem('newsletter_analytics');
    sessionStorage.removeItem('session_start');
    sessionStorage.removeItem('landing_page');
    sessionStorage.removeItem('page_views');
  }
}

// Initialize session tracking
if (typeof window !== 'undefined') {
  // Set session start time
  if (!sessionStorage.getItem('session_start')) {
    sessionStorage.setItem('session_start', Date.now().toString());
  }
  
  // Set landing page
  if (!sessionStorage.getItem('landing_page')) {
    sessionStorage.setItem('landing_page', window.location.pathname);
  }
  
  // Update page views
  const currentPageViews = parseInt(sessionStorage.getItem('page_views') || '0');
  sessionStorage.setItem('page_views', (currentPageViews + 1).toString());
}

// Export singleton instance
export const newsletterAnalytics = new NewsletterAnalytics({
  trackingEnabled: true,
  debugMode: import.meta.env.DEV
});

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).newsletterAnalytics = newsletterAnalytics;
}
