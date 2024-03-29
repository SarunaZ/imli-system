import { Component, ErrorInfo, ReactNode } from "react";
import ErrorHandler from "./index";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  componentWillUnmount() {
    this.setState({ hasError: false });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorHandler error="Sorry.. there was an error" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
