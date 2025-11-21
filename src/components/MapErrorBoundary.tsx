import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  language?: 'bn' | 'en';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const content = {
  bn: {
    title: 'ম্যাপ লোডিং সমস্যা',
    message: 'ম্যাপ লোড করতে একটি সমস্যা হয়েছে',
    details: 'বিস্তারিত',
    retry: 'আবার চেষ্টা করুন',
    refresh: 'পেজ রিফ্রেশ করুন',
  },
  en: {
    title: 'Map Loading Error',
    message: 'There was a problem loading the map',
    details: 'Details',
    retry: 'Try Again',
    refresh: 'Refresh Page',
  }
};

export class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Map Error Boundary caught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, language = 'en' } = this.props;
    const t = content[language];

    if (hasError) {
      return (
        <Card className="p-8 bg-red-50 border-red-200">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <div>
              <h3 className={`text-xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.title}
              </h3>
              <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.message}
              </p>
            </div>
            
            {error && (
              <details className="text-left bg-white p-4 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-medium text-red-700 mb-2">
                  {t.details}
                </summary>
                <pre className="text-xs text-gray-700 overflow-auto max-h-32">
                  {error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t.retry}
              </Button>
              <Button
                onClick={this.handleRefresh}
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="w-4 h-4" />
                {t.refresh}
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return children;
  }
}
