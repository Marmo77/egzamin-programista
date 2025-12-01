import { getPracticeExams } from "@/hooks/getPracticeExams";
import { type PracticeFilterOptions, type PracticeType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import PracticeFilters from "./Practice/PracticeFilters";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import PaginationPractice from "./Practice/Pagination";
import PracticeCard from "./Practice/PracticeCard";

const Practice = () => {
  const [exams, setExams] = useState<PracticeType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<PracticeFilterOptions>({
    // search: "",
    subject: "",
    languages: "",
    sort: "",
    year: "",
  });

  const handleFilterChange = (
    key: keyof PracticeFilterOptions,
    value: string
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  const limit = 9;

  const prevFiltersRef = useRef<string>("");

  useEffect(() => {
    const filtersChanged = JSON.stringify(filters) !== prevFiltersRef.current;
    prevFiltersRef.current = JSON.stringify(filters);

    if (filtersChanged) {
      setCurrentPage(1);
    }

    const fetchExams = async () => {
      try {
        const { data, count } = await getPracticeExams(
          filters,
          currentPage,
          limit
        );
        setExams(data);
        setTotalCount(count);
        console.log("Fetched exams:", data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
  }, [filters, currentPage]);

  const resetFilters = () => {
    Object.keys(filters).forEach((key) => {
      handleFilterChange(key as keyof PracticeFilterOptions, "");
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalCount / limit)) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col max-w-6xl mx-auto min-h-screen max-lg:px-8 md:px-4">
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Arkusze egzaminacyjne
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Przeglądaj i filtruj poprzednie egzaminy praktyczne z wybranej
            kwalifikacji.
          </p>
        </div>
        <div>
          <PracticeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            resetFilters={resetFilters}
          />
        </div>
        {!isLoading && totalCount !== undefined && totalCount > 0 && (
          <div className="text-sm flex justify-end px-2 text-muted-foreground mb-4">
            Znaleziono {totalCount}{" "}
            {totalCount === 1
              ? "egzamin"
              : totalCount < 5
              ? "egzaminy"
              : "egzaminów"}
          </div>
        )}
        <PaginationPractice
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalExams={totalCount}
          limit={limit}
        />
        {!isLoading && totalCount == 0 && (
          <div className="col-span-full text-center flex flex-col gap-3 items-center py-12 text-muted-foreground">
            Nie znaleziono egzaminów spełniających kryteria wyszukiwania
            <Button variant={"questionButton"} onClick={resetFilters}>
              Resetuj filtry
            </Button>
          </div>
        )}
        <div className="grid justify-center max-lg:grid-cols-2 max-md:grid-cols-1 grid-cols-3 gap-4">
          {isLoading && (
            <>
              {Array.from({ length: 9 }).map((_, index) => (
                <PracticeSkeletonCard key={index} />
              ))}
            </>
          )}
          {!isLoading &&
            exams.map((exam) => <PracticeCard key={exam.id} exam={exam} />)}
        </div>
        {!isLoading && totalCount !== undefined && totalCount > 0 && (
          <div className="pt-4">
            <PaginationPractice
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalExams={totalCount}
              limit={limit}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const PracticeSkeletonCard = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex justify-between">
          <Skeleton className="w-10 h-6" />
          <Skeleton className="w-25 h-6" />
        </div>
        <div className="mt-2 flex flex-col gap-3">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-3/4 h-12" />
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-20 h-6" />
        </div>
        <div className="mt-4 flex gap-4">
          <Skeleton className="w-12 h-6" />
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-12 h-6" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Practice;
