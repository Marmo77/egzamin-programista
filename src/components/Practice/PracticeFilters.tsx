// src/components/Practice/PracticeFilters.tsx
import { Card, CardContent } from "../ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { PracticeFilterOptions } from "@/types/types";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

interface PracticeFiltersProps {
  filters: PracticeFilterOptions;
  onFilterChange: (key: keyof PracticeFilterOptions, value: string) => void;
  resetFilters: () => void;
}

const PracticeFilters = ({
  filters,
  onFilterChange,
  resetFilters,
}: PracticeFiltersProps) => {
  return (
    <Card className="my-4">
      <CardContent className="px-6">
        <section className="flex gap-4 flex-wrap lg:flex-nowrap">
          <div className="flex max-lg:flex-col justify-center items-center gap-4 w-full">
            {/* WYSZUKAJ */}
            {/* <div className="flex-[3] min-w-[300px] max-lg:w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Wyszukaj egzamin... (min. 3 znaki)"
                  className="w-full pl-10"
                  value={filters.search}
                  onChange={(e) => onFilterChange("search", e.target.value)}
                />
              </div>
            </div> */}

            {/* KWALIFIKACJE */}
            <div className="flex-1 min-w-[180px] max-lg:w-full">
              <Select
                value={filters.subject}
                onValueChange={(value) => onFilterChange("subject", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz kwalifikacje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kwalifikacje</SelectLabel>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="inf03">INF.03</SelectItem>
                    <SelectItem value="inf04">INF.04</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* JĘZYK PROGRAMOWANIA */}
            <div className="flex-1 min-w-[180px] max-lg:w-full">
              <Select
                value={filters.languages}
                onValueChange={(value) => onFilterChange("languages", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz język programowania" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Język programowania</SelectLabel>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* SORTOWANIE */}
            <div className="flex-1 min-w-[160px] max-lg:w-full">
              <Select
                value={filters.sort}
                onValueChange={(value) => onFilterChange("sort", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sortuj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sortuj</SelectLabel>
                    <SelectItem value="newest">Najnowsze</SelectItem>
                    <SelectItem value="oldest">Najstarsze</SelectItem>
                    <SelectItem value="title">Alfabetycznie</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* ROK EGZAMINU */}
            <div className="flex-1 min-w-[140px] max-lg:w-full">
              <Select
                value={filters.year}
                onValueChange={(value) => onFilterChange("year", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz rok" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rok</SelectLabel>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button variant={"outline"} onClick={resetFilters}>
              <RefreshCw />
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default PracticeFilters;
