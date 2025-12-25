// Performance monitoring utilities for Oracle OS
import React from 'react';

export interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
  timestamp: number;
}

class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private isActive = false;
  private animationId?: number;

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.measure();
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private measure() {
    if (!this.isActive) return;

    const currentTime = performance.now();
    this.frameCount++;

    // Calculate FPS every second
    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;

      const metrics: PerformanceMetrics = {
        fps: this.fps,
        memoryUsage: this.getMemoryUsage(),
        renderTime: currentTime,
        timestamp: Date.now(),
      };

      this.notifyCallbacks(metrics);

      // Log warnings for poor performance
      if (this.fps < 30) {
        console.warn(`Low FPS detected: ${this.fps}fps`);
      }
    }

    this.animationId = requestAnimationFrame(() => this.measure());
  }

  private getMemoryUsage(): number | undefined {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return Math.round(memory.usedJSHeapSize / 1048576); // Convert to MB
    }
    return undefined;
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  private notifyCallbacks(metrics: PerformanceMetrics) {
    this.callbacks.forEach(callback => callback(metrics));
  }

  getCurrentFPS(): number {
    return this.fps;
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = (callback?: (metrics: PerformanceMetrics) => void) => {
  React.useEffect(() => {
    if (callback) {
      const unsubscribe = performanceMonitor.subscribe(callback);
      return unsubscribe;
    }
  }, [callback]);
};

// Utility to debounce expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Utility to throttle expensive operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Memory cleanup utility
export const cleanupMemory = () => {
  // Trigger garbage collection if available
  if (window.gc) {
    window.gc();
  }
  
  // Clear console in development to reduce memory
  if (process.env.NODE_ENV === 'development') {
    console.clear();
  }
};

// Performance warning system
export const checkPerformanceIssues = (metrics: PerformanceMetrics) => {
  const issues: string[] = [];

  if (metrics.fps < 30) {
    issues.push(`Low FPS: ${metrics.fps}fps (target: 60fps)`);
  }

  if (metrics.memoryUsage && metrics.memoryUsage > 100) {
    issues.push(`High memory usage: ${metrics.memoryUsage}MB`);
  }

  if (issues.length > 0) {
    console.warn('Performance issues detected:', issues);
  }

  return issues;
};
