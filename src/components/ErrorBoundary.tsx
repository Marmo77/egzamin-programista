import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  RotateCcw,
  Trash2,
} from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Here you could send error to monitoring service like Sentry
    // reportError(error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private clearStorageAndRetry = () => {
    try {
      // Clear potentially corrupted localStorage data
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (
          key.startsWith("results_") ||
          key.includes("quiz") ||
          key.includes("exam")
        ) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }
    this.handleRetry();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center  py-12 justify-center p-4 bg-gray-50">
          <Card className="p-8 border-border bg-card max-w-2xl">
            {/* Header */}
            <div className="text-center space-y-6 mb-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-foreground">Ups! Coś poszło nie tak</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Wystąpił nieoczekiwany błąd podczas działania aplikacji.
                  Przepraszamy za niedogodności.
                </p>
              </div>
            </div>

            {/* Error details - only show in development */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-8 space-y-4">
                <Badge variant="destructive" className="text-xs">
                  Szczegóły błędu (tryb developerski)
                </Badge>
                <Card className="p-4 bg-muted/50 border-border">
                  <div className="space-y-3">
                    <div className="text-destructive font-medium">
                      {this.state.error.name}: {this.state.error.message}
                    </div>
                    <pre className="whitespace-pre-wrap text-xs text-muted-foreground overflow-auto max-h-40 font-mono">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </Card>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <Button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Spróbuj ponownie
              </Button>

              <Button
                onClick={this.clearStorageAndRetry}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Wyczyść dane i ponów
              </Button>

              <Button
                onClick={this.handleRefresh}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Odśwież stronę
              </Button>

              <Button
                onClick={this.handleGoHome}
                variant="secondary"
                className="flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Strona główna
              </Button>
            </div>

            {/* Help text */}
            <div className="space-y-4 border-t border-border pt-6">
              <p className="text-muted-foreground text-center">
                Jeśli problem się powtarza, spróbuj:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Wyczyścić pamięć podręczną przeglądarki (Ctrl+Shift+R)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Sprawdzić połączenie internetowe
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Spróbować w trybie incognito
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Zaktualizować przeglądarkę do najnowszej wersji
                </li>
              </ul>
            </div>

            {/* Footer */}
            <div className="text-center text-muted-foreground mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-center gap-2">
                <span>Pass the Programist Exam</span>
                <Badge variant="outline" className="text-xs">
                  v1.0
                </Badge>
              </div>
              <p className="text-xs mt-1 opacity-70">Błąd ID: {Date.now()}</p>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
