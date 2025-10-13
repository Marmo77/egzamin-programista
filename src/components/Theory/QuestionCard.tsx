import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import QuestionReport from "./QuestionReport";
import type { QuestionType } from "@/types/types";

const QuestionCard = ({
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
  const imageUrl = currentQuestion?.imageUrl;
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
          <QuestionReport question={question} questionNumber={questionNumber} />
        </div>
        <div className="flex py-2">
          <h1 className="text-lg font-medium leading-relaxed">
            {questionNumber}. {currentQuestion?.question_text}
          </h1>
        </div>
        {/* if image is not null or empty string:  */}
        {hasImage && (
          <div>
            {/* WHAT TO DO: */}
            {/* Status Code 403 Forbidden */}
            {/* it means that we cannot get from their page images */}
            {/* we need to get images from our own server, so we need to download it */}
            {/* https://ee-informatyk.pl/src/img/quizy/ee09/{questionNumber}.jpg */}
            {/* so we can scrape only questions with images and downloads them to our server and we need to add every question an order numbers so we can pin the images to the questions */}
            {/* example: question_number: 120, image: question120.jpg */}
            {/* its done in VSC all i have 2 scrips working, now add images to bucket and connect to database, (remember to update the database quesitons with questios.txt from 21:10) */}

            <img
              alt={`obraz ${questionNumber}`}
              className="w-[600px] h-auto"
              loading="lazy"
              src={imageUrl}
            />
          </div>
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
};

export default QuestionCard;
