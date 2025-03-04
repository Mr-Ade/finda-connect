
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SearchErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Search error:', error, errorInfo);
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
            Search Feature Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble with the search feature. Please try again.
          </p>
          <Button onClick={this.handleRetry}>
            Retry Search
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
