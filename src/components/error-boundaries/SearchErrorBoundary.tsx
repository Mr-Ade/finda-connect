
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BaseErrorBoundary } from "./BaseErrorBoundary";

interface Props {
  children: ReactNode;
}

export class SearchErrorBoundary extends BaseErrorBoundary {
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
          <Button onClick={this.handleReset}>
            Retry Search
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
