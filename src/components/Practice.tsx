// src/components/Practice.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getFilteredExams } from "@/hooks/getExams";
import type { ExamType } from "@/types/types";
import PracticeCard from "./Practice/PracticeCard";
import PracticeFilters from "./Practice/PracticeFilters";

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import PaginationPractice from "./Practice/Pagination";

export type FilterOptions = {
  // search: string;
  subject: string;
  technologies: string;
  sort: string;
  year: string;
};

const Practice = () => {
  const [allExams, setAllExams] = useState<ExamType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 9;
  const [filters, setFilters] = useState<FilterOptions>({
    // search: "",
    subject: "",
    technologies: "",
    sort: "",
    year: "",
  });

  // Track previous filters to detect changes
  const prevFiltersRef = useRef<string>("");
  // Memoize filter key to detect when filters actually change
  // const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    const fetchExams = async () => {
      const currentFilterKey = JSON.stringify(filters);
      const filtersChanged = prevFiltersRef.current !== currentFilterKey;

      if (filtersChanged) {
        setCurrentPage(1); // Reset page on filter change
        prevFiltersRef.current = currentFilterKey;
      }

      setIsLoading(true);
      try {
        // Fetch ALL matching exams (no pagination on fetch)
        const { data, count } = await getFilteredExams(filters, 1, 10000);
        setAllExams(data);
        setTotalCount(count);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExams();
    // const timeoutId = setTimeout(
    //   () => {
    //     fetchExams();
    //   },
    //   filters.search.length > 0 && filters.search.length < 3 ? 0 : 500
    // );

    // return () => clearTimeout(timeoutId);
  }, [filters]); // Only depend on filters

  // Memoize current page exams
  const currentExams = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return allExams.slice(startIndex, endIndex);
  }, [allExams, currentPage]);

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > Math.ceil(totalCount / limit)) return;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalCount, limit]
  );

  // Redirect to work in progress
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/work-in-progress");
  // }, []);

  return (
    <section className="flex flex-col max-w-6xl mx-auto min-h-screen max-lg:px-8">
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

        <PracticeFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {!isLoading && totalCount > 0 && (
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
          totalExams={totalCount}
          limit={limit}
          handlePageChange={handlePageChange}
        />

        <div className="grid justify-center max-lg:grid-cols-2 max-md:grid-cols-1 grid-cols-3 gap-4">
          {isLoading ? (
            <>
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
              <PracticeSkeletonCard />
            </>
          ) : currentExams.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Nie znaleziono egzaminów spełniających kryteria wyszukiwania
            </div>
          ) : (
            currentExams.map((exam) => (
              <PracticeCard key={exam.id} exam={exam} />
            ))
          )}
        </div>

        <PaginationPractice
          currentPage={currentPage}
          totalExams={totalCount}
          limit={limit}
          handlePageChange={handlePageChange}
        />
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
