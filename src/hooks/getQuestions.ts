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
    console.error("Failed to load questions:", error);
    return [];
  }
  const shuffled = data?.sort(() => Math.random() - 0.5);
  const limited = shuffled?.slice(0, limit);

  const questionsWithUrls = limited?.map((question) => ({
    ...question,
    imageUrl: question?.image
      ? getQuestionImageUrl(question.image, subject)
      : null,
  }));
  // tworzymy nowy obiekt (imageUrl?: string | null), jeśli istnieje image to tworzymy link do tego obrazu
  // const questionsWithUrls = limited?.map((question) => ({
  //   ...question,
  //   imageUrl: question?.image ? getQuestionImageUrl(question.image) : null,
  // }));

  // return questionsWithUrls;
  return questionsWithUrls;
};

// cache for images
const imageCache = new Set<string>();

export const getQuestionImageUrl = (
  filename: string | null | undefined,
  subject: string
): string | null => {
  if (!filename) return null;
  // Local images stored in /public/inf03-images/
  // Vite serves /public as root, so we access directly
  return `/${subject}-images/${filename}`;
};
// Pobieramy link do obrazu z Supabase Storage
// export const getQuestionImageUrl = (
//   filename: string | null | undefined
// ): string | null => {
//   if (!filename) return null;

//   // Get public URL from Supabase Storage
//   const { data } = supabase.storage
//     .from("questions_images")
//     .getPublicUrl(filename);

//   return data.publicUrl;
// };
export const preloadQuestionImages = (questions: QuestionType[]) => {
  const imagePromises = questions
    .filter((q) => q.imageUrl)
    .map((q) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imageCache.add(q.imageUrl!);
          resolve();
        };
        img.onerror = () => {
          console.error("Failed to preload image:", q.imageUrl);
          reject();
        };
        img.src = q.imageUrl!;
      });
    });
  return Promise.all(imagePromises);
};
// Preloadujemy obrazy
// export const preloadQuestionImages = async (questions: QuestionType[]) => {
//   // bierze 40 losowych pytań wylosowanych, i filtrujemy tylko te które mają obraz
//   const imagePromises = questions
//     .filter((q) => q.imageUrl)
//     .map((q) => {
//       return new Promise<void>((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve();
//         img.onerror = () => {
//           console.error("Failed to preload image:", q.imageUrl);
//           reject();
//         };
//         img.src = q.imageUrl!;
//       });
//     });
//   await Promise.all(imagePromises);
// };
// export const preloadQuestionImages = async (questions: QuestionType[]) => {
//   const imagePromises = questions
//     .filter((q) => q.image)
//     .map((q) => {
//       return new Promise<void>((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => resolve();
//         img.onerror = () => {
//           console.error("Failed to preload image:", q.image);
//           reject();
//         };
//         img.src = q.image!;
//       });
//     });
//   await Promise.all(imagePromises);
// };

// https://zawodowe.edu.pl/technik-informatyk/INF.03/ scrape to database
