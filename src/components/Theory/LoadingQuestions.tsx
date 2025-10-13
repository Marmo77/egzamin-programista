import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LoadingQuestions = ({ exam_type }: { exam_type: string }) => {
  return (
    <section className="mx-auto max-w-4xl py-12">
      <div className="flex flex-col gap-4 items-center py-4">
        <h1 className="text-2xl font-semibold mb-2">
          Przygotowywanie testu...
        </h1>
        <p className="text-lg text-muted-foreground">
          Losujemy 40 pytań z kwalifikacji {exam_type.toUpperCase()}
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

export default LoadingQuestions;
