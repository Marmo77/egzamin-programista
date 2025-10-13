import supabase, { supabaseBucketKey } from "../utils/supabase";

//```
//
// Get random questions from whole database (inf03 or inf04 based on 'subject' param)
// , shuffle them and return first 'limit' questions amount.
//
//```

export const getRandomQuestions = async (
  subject: string,
  limit: number = 40
) => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("subject", subject);
  if (error) {
    console.log(error);
  }
  const shuffled = data?.sort(() => Math.random() - 0.5);
  const limited = shuffled?.slice(0, limit);
  return limited;
  // return data;
};

// export const getQuestionImage = async (questionNumber: number) => {
//   const { data, error } = await supabase.storage
//     .from("questions_images")
//     .info(supabaseBucketKey);
//   if (error) {
//     console.log(error);
//   }
//   return data;
// };

export const getQuestionImageUrl = (
  filename: string | null | undefined
): string | null => {
  if (!filename) return null;

  // Get public URL from Supabase Storage
  const { data } = supabase.storage
    .from("questions_images")
    .getPublicUrl(filename);

  return data.publicUrl;
};
// https://zawodowe.edu.pl/technik-informatyk/INF.03/ scrape to database
