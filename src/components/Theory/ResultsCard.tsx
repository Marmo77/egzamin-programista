import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import type { QuestionType } from "@/types/types";
import type { QuestionEvaluation } from "@/hooks/QuestionResults";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ResultsCard = ({
  results,
  questions,
  summary,
}: {
  results: QuestionEvaluation[];
  questions: QuestionType[];
  summary: { total: number; correct: number; incorrect: number; time: number };
}) => {
  const resultPercent = summary.total > 0 ? summary.correct / summary.total : 0;
  const resultPoints = Math.round(resultPercent * 100);

  const navigate = useNavigate();
  const onDeleteResult = () => {
    localStorage.removeItem("results_" + questions[0].subject);
    navigate("/theory");
    //Toaster info that result was deleted
    toast.info("Wynik został usunięty!");
  };
  return (
    <section className="mx-auto max-w-7xl py-12 max-xl:px-12 max-md:py-6 max-md:px-6">
      <Card className="border shadow-sm">
        <CardHeader className="text-center space-y-4 relative">
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center  min-md:absolute w-full top-1">
              <Link to="/">
                <Button variant={"default"} className="">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Powrót do strony glownej
                </Button>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"destructive"}
                    size={"lg"}
                    className="group"
                    onClick={onDeleteResult}
                  >
                    <Trash2 className="h-10 w-10 group-hover:animate-pulse group-hover:scale-110 group-hover:rotate-6 duration-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Usuń wynik i rozpocznij kolejny test</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">Wyniki</h2>
            <p className="text-sm text-muted-foreground">
              Podsumowanie twojego testu {questions[0].subject.toUpperCase()}
            </p>
          </div>
          {/* Progress and Score*/}
          <ScoreAndProgress
            resultPercent={resultPercent}
            resultPoints={resultPoints}
            summary={summary}
          />
          {/* Statistics */}
          <Statistics summary={summary} />
        </CardHeader>

        <CardContent className="space-y-6">
          <AnswersCards results={results} questions={questions} />
        </CardContent>
      </Card>
    </section>
  );
};

const ScoreAndProgress = memo(
  ({
    resultPercent,
    resultPoints,
    summary,
  }: {
    resultPercent: number;
    resultPoints: number;
    summary: { total: number; correct: number };
  }) => {
    return (
      <>
        <div className="flex items-center justify-center gap-3">
          <span className="text-base font-medium">Uzyskany wynik:</span>
          <Badge
            variant={resultPercent >= 0.5 ? "default" : "destructive"}
            className={`text-base px-3 py-1 ${
              resultPercent >= 0.5 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {resultPoints}%
          </Badge>
        </div>
        <div className="w-full max-w-md mx-auto">
          <Progress
            value={resultPoints}
            className={`h-2 bg-gray-200 ${
              resultPercent >= 0.5
                ? "[&>div]:bg-green-500"
                : "[&>div]:bg-red-500"
            }`}
          />
          <div className="mt-2 text-xs text-muted-foreground">
            {summary.correct} z {summary.total} poprawnych
          </div>
        </div>
      </>
    );
  }
);

const Statistics = memo(
  ({
    summary,
  }: {
    summary: {
      total: number;
      correct: number;
      incorrect: number;
      time: number;
    };
  }) => {
    const formatDoingTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    return (
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        <div className="rounded-md border p-3 text-center">
          <div className="text-xs text-muted-foreground">Wszystkie</div>
          <div className="text-lg font-semibold">{summary.total}</div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-xs text-muted-foreground">Poprawne</div>
          <div className="text-lg font-semibold text-green-600">
            {summary.correct}
          </div>
        </div>
        <div className="rounded-md border p-3 text-center">
          <div className="text-xs text-muted-foreground">Błędne</div>
          <div className="text-lg font-semibold text-red-600">
            {summary.incorrect}
          </div>
        </div>
        <div className="col-span-3 gap-6 border p-2">
          <div className="text-xs text-muted-foreground">Czas realizacji</div>
          <div className="text-lg font-semibold text-blue-600">
            {formatDoingTime(summary.time)}
          </div>
        </div>
      </div>
    );
  }
);

const AnswersCards = ({
  results,
  questions,
}: {
  results: QuestionEvaluation[];
  questions: QuestionType[];
}) => {
  return results.map((result, idx) => {
    const q = questions[idx];
    if (!q) return null;

    const options: { key: "A" | "B" | "C" | "D"; text: string }[] = [
      { key: "A", text: q.answer_a },
      { key: "B", text: q.answer_b },
      { key: "C", text: q.answer_c },
      { key: "D", text: q.answer_d },
    ];

    const questionImage = q.imageUrl && (
      <img
        src={q.imageUrl}
        alt={`${q.subject} ${q.image}`}
        className="h-auto"
      />
    );

    const questionStatus =
      result.zaznaczono === null
        ? "not-answered"
        : result.isCorrect
        ? "correct"
        : "wrong";

    const statusBadge =
      questionStatus === "correct" ? (
        <Badge className="bg-green-500">Poprawnie</Badge>
      ) : questionStatus === "wrong" ? (
        <Badge variant="destructive" className="bg-red-500">
          Błędna odpowiedź
        </Badge>
      ) : (
        <Badge
          variant="destructive"
          className="bg-yellow-500 dark:bg-yellow-500 hover:bg-yellow-600"
        >
          Brak odpowiedzi
        </Badge>
      );

    const borderAccentClass =
      questionStatus === "correct"
        ? "border-l-4 border-l-green-500"
        : questionStatus === "wrong"
        ? "border-l-4 border-l-red-500"
        : "border-l-4 border-l-yellow-500";

    return (
      <div
        key={idx}
        className={`rounded-md border ${borderAccentClass} shadow-xs`}
      >
        <div className="flex max-md:flex-col max-md:items-center max-md:gap-3 items-start justify-between p-3 pb-0">
          <h3 className="text-lg font-semibold">
            {idx + 1}. {q.question_text}
          </h3>
          {statusBadge}
        </div>
        {/* Question Image */}
        <div className="px-4 py-2 flex justify-center max-h-64">
          {questionImage}
        </div>

        {/* Answers */}
        <div className="flex flex-col gap-2 px-3 py-3">
          {options.map((opt) => {
            const isCorrectOption = opt.key === result.poprawna_odpowiedz;
            const isUserOption = opt.key === result.twoja_odpowiedz;
            const wrongUserPick = isUserOption && !result.isCorrect;

            // Styling
            const extra = isCorrectOption
              ? "border-green-500 bg-background text-green-600"
              : wrongUserPick
              ? "border-red-500 bg-background text-red-500"
              : "border-muted";

            return (
              <Button
                key={opt.key}
                variant={"questionButton"}
                size="question"
                className={`items-start text-left disabled:opacity-80 whitespace-normal break-words justify-start ${extra}`}
                disabled
              >
                {opt.key}. {opt.text}
              </Button>
            );
          })}
        </div>
      </div>
    );
  });
};

export default ResultsCard;
