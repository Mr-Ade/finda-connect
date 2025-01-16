import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CategoryErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Category error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          className="text-center py-8 px-4"
          role="alert"
          aria-live="polite"
        >
          <h2 className="text-xl font-semibold mb-4">
            Categories Temporarily Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the categories. Please try again.
          </p>
          <Button onClick={this.handleRetry}>
            Reload Categories
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}