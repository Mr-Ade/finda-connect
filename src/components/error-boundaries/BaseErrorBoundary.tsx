import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class BaseErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show error toast
    toast({
      title: "An error occurred",
      description: error.message,
      variant: "destructive"
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });

    // Call onReset prop if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            We apologize for the inconvenience. Please try again or contact support if the problem persists.
          </p>
          {this.state.error && (
            <div className="mb-6 p-4 bg-red-50 rounded text-sm text-red-800 font-mono max-w-md overflow-auto">
              {this.state.error.message}
            </div>
          )}
          <Button 
            onClick={this.handleReset}
            size="lg"
            className="min-w-[200px]"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}