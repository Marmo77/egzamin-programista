import type { PracticeType } from "@/types/types";
import supabase from "@/utils/supabase";

export const getPracticeExams = async () => {
    const { data, error, count } = await supabase
        .from("practice")
        .select("*", { count: "exact" });

    if (error) {
        console.error(error);
        return { data: [], count: 0 };
    }

    return { data: data as PracticeType[], count: count ?? 0 };
};
