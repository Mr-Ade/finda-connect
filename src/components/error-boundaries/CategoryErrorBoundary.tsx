
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BaseErrorBoundary } from "./BaseErrorBoundary";

interface Props {
  children: ReactNode;
}

export class CategoryErrorBoundary extends BaseErrorBoundary {
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
          <Button onClick={this.handleReset}>
            Reload Categories
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
