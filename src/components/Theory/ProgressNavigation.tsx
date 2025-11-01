import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { Progress } from "../ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const ProgressNavigation = memo(
  ({
    currentQuestion,
    question,
    exam_type,
  }: {
    currentQuestion: number;
    question: any[];
    exam_type: string;
  }) => {
    return (
      <div className="max-w-5xl mx-auto max-lg:px-4 max-md:px-2 py-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Pytanie {currentQuestion} z {question.length} •{" "}
              {exam_type.toUpperCase()}
            </span>
            <ConfirmExitDialog
              title="Napewno chcesz wyjść z tego egzaminu?"
              description="Twoje odpowiedzi nie zostaną zapisane."
            />
          </div>
          <Progress value={(currentQuestion / question.length) * 100} />
        </div>
      </div>
    );
  }
);

const ConfirmExitDialog = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Wyjdź
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleExit}>Wyjdź</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(ProgressNavigation);
