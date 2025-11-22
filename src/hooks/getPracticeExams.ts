import type { PracticeFilterOptions, PracticeType } from "@/types/types";
import supabase from "@/utils/supabase";

export const getPracticeExams = async (
  filters: PracticeFilterOptions
): Promise<{ data: PracticeType[]; count: number }> => {
  // filtering
  let query = supabase.from("practice").select("*", { count: "exact" });

  // Subject
  if (filters.subject && filters.subject !== "all") {
    query = query.eq("subject", filters.subject);
  }

  //   Year
  if (filters.year && filters.year !== "all") {
    query = query.ilike("data", `%${filters.year}%`);
  }
  // Languages
  if (filters.languages && filters.languages !== "all") {
    query = query.contains("languages", [filters.languages]);
  }

  // Sorting
  switch (filters.sort) {
    case "newest":
      query = query.order("data", { ascending: false });
      break;
    case "oldest":
      query = query.order("data", { ascending: true });
      break;
    case "title":
      query = query.order("name", { ascending: true });
      break;

    default:
      query = query.order("name", { ascending: false });
  }

  const { data, error, count } = await query;

  //   const { data, error, count } = await supabase
  //     .from("practice")
  //     .select("*", { count: "exact" })
  //     .order("data", { ascending: false });

  if (error) {
    console.error(error);
    return { data: [], count: 0 };
  }

  return { data: data as PracticeType[], count: count ?? 0 };
};
