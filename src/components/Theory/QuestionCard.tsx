import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import QuestionReport from "./QuestionReport";
import type { QuestionType } from "@/types/types";
import { memo, useEffect, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const QuestionCard = memo(
  ({
    question,
    questionNumber,
    selectedAnswer,
    onSelect,
  }: {
    question: QuestionType[];
    questionNumber: number;
    selectedAnswer: string | null;
    onSelect: (answer: string) => void;
  }) => {
    const handleQuestionSelect = (answer: string) => {
      onSelect(answer);
    };
    const currentQuestion = question[questionNumber - 1];

    // preload image
    const imageUrl = useMemo(
      () => currentQuestion?.imageUrl,
      [currentQuestion?.imageUrl]
    );
    const hasImage = !!imageUrl;

    const AnswersButtons = [
      {
        id: "A",
        answer: currentQuestion?.answer_a,
      },
      {
        id: "B",
        answer: currentQuestion?.answer_b,
      },
      {
        id: "C",
        answer: currentQuestion?.answer_c,
      },
      {
        id: "D",
        answer: currentQuestion?.answer_d,
      },
    ];

    return (
      <Card className="px-3">
        <CardHeader className="">
          <div className="flex items-center justify-between gap-2">
            <Badge
              className="ml-0 px-2 py-1 w-fit"
              variant={
                currentQuestion?.subject === "inf03" ? "outline" : "default"
              }
            >
              {currentQuestion?.subject ?? ""}
            </Badge>
            <QuestionReport
              question={question}
              questionNumber={questionNumber}
            />
          </div>
          <div className="flex py-2">
            <h1 className="text-lg font-medium leading-relaxed">
              {questionNumber}. {currentQuestion?.question_text}
            </h1>
          </div>
          {/* if image is not null or empty string:  */}
          {hasImage && (
            <ZoomImage questionNumber={questionNumber} imageUrl={imageUrl} />
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col px-4 gap-2">
            {AnswersButtons.map((item) => (
              <Button
                key={item.id}
                variant={"questionButton"}
                className={`
              items-start justify-start text-left 
              whitespace-normal break-words
              h-auto min-h-[3rem] 
              ${selectedAnswer === item.id ? "border-primary" : ""}
            `}
                id={item.id}
                size="question"
                onClick={() => handleQuestionSelect(item.id)}
              >
                <span className="block w-full text-left">
                  <span className="font-semibold mr-2">{item.id}.</span>
                  <span className="break-words">{item.answer}</span>
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

const ZoomImage = ({
  questionNumber,
  imageUrl,
}: {
  questionNumber: number;
  imageUrl: string;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const handleZoomInOut = () => {
    if (zoomIn) {
      document.getElementById("image-zoom")?.classList.remove("zoomed");
      document
        .getElementById("image-zoom")
        ?.classList.remove("cursor-zoom-out");
      document.getElementById("image-zoom")?.classList.add("cursor-zoom-in");
      setZoomIn(false);
    } else {
      document.getElementById("image-zoom")?.classList.add("zoomed");
      document.getElementById("image-zoom")?.classList.add("cursor-zoom-out");
      document.getElementById("image-zoom")?.classList.remove("cursor-zoom-in");
      setZoomIn(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={isZoomed} onOpenChange={setIsZoomed}>
        <AlertDialogTrigger asChild>
          <img
            alt={`obraz ${questionNumber}`}
            className="w-[600px] h-auto cursor-pointer"
            loading="lazy"
            decoding="async"
            src={imageUrl}
            // onClick={handleZoom}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="h-fit  flex flex-col justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Obraz do pytania nr {questionNumber}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="">
            <img
              alt={`obraz ${questionNumber}`}
              className="h-fit w-auto cursor-zoom-in"
              loading="lazy"
              id="image-zoom"
              decoding="async"
              src={imageUrl}
              onClick={handleZoomInOut}
            />
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Zamknij</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionCard;
