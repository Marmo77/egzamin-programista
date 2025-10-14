import { Loader2 } from "lucide-react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingSkeletons = ({
  exam_type,
  page,
  pageValues,
}: {
  exam_type?: string;
  page?: boolean;
  pageValues?: [title: string, description: string];
}) => {
  return (
    <>
      {page ? (
        <LoadingPageSkeleton
          title={pageValues?.[0]}
          description={pageValues?.[1]}
        />
      ) : (
        <LoadingQuestionsSkeleton exam_type={exam_type} />
      )}
    </>
  );
};
const LoadingPageSkeleton = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <section className="min-h-screen bg-background flex justify-center px-6">
      <div className="max-w-2xl w-full text-center py-12">
        {/* Animated Icon */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-primary">
            {title ?? "Ładowanie Strony"}
          </h1>
          <p className="text-muted-foreground">
            {description ?? "Proszę czekać..."}
          </p>
        </div>

        {/* Skeleton Content */}
        <div className="space-y-4 pt-4">
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </section>
  );
};

const LoadingQuestionsSkeleton = ({ exam_type }: { exam_type?: string }) => {
  return (
    <section className="mx-auto max-w-4xl py-12">
      <div className="flex flex-col gap-4 items-center py-4">
        <h1 className="text-2xl font-semibold mb-2">
          Przygotowywanie testu...
        </h1>
        <p className="text-lg text-muted-foreground">
          Losujemy 40 pytań z kwalifikacji {exam_type?.toUpperCase() || "..."}
        </p>
      </div>
      <Card className="p-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <div className="space-y-2 px-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default LoadingSkeletons;
