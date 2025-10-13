import type { QuestionType } from "@/types/types";
import supabase from "../utils/supabase";

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

  // tworzymy nowy obiekt (imageUrl?: string | null), jeśli istnieje image to tworzymy link do tego obrazu
  const questionsWithUrls = limited?.map((question) => ({
    ...question,
    imageUrl: question?.image ? getQuestionImageUrl(question.image) : null,
  }));

  return questionsWithUrls;
};

// Pobieramy link do obrazu z Supabase Storage
export const getQuestionImageUrl = (
  filename: string | null | undefined
): string | null => {
  if (!filename) return null;

  // Get public URL from Supabase Storage
  const { data } = supabase.storage
    .from("questions_images")
    .getPublicUrl(filename);

  // console.log(data.publicUrl);
  return data.publicUrl;
};

// Preloadujemy obrazy
export const preloadQuestionImages = async (questions: QuestionType[]) => {
  // bierze 40 losowych pytań wylosowanych, i filtrujemy tylko te które mają obraz
  const imagePromises = questions
    .filter((q) => q.imageUrl)
    .map((q) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.error("Failed to preload image:", q.imageUrl);
          reject();
        };
        img.src = q.imageUrl!;
      });
    });
  await Promise.all(imagePromises);
};

// https://zawodowe.edu.pl/technik-informatyk/INF.03/ scrape to database
