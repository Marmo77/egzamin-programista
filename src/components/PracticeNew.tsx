import { getPracticeExams } from "@/hooks/getPracticeExams";
import { type PracticeFilterOptions, type PracticeType } from "@/types/types";
import { useEffect, useState } from "react";
import PracticeCardNew from "./Practice/PracticeCardNew";
import PracticeFilters from "./Practice/PracticeFilters";

const PracticeNew = () => {
  const [exams, setExams] = useState<PracticeType[]>([]);
  const [totalCount, setTotalCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data, count } = await getPracticeExams(filters);
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
  }, [filters]);

  // useEffect(() => {
  //   console.log(filters);
  // }, [filters]);

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
        <div>
          <PracticeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
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
        <div className="grid justify-center max-lg:grid-cols-2 max-md:grid-cols-1 grid-cols-3 gap-4">
          {exams.map((exam) => (
            <PracticeCardNew key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeNew;
