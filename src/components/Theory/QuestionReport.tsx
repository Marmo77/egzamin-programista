import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { QuestionType } from "@/types/types";
import {
  BookOpen,
  Check,
  Flag,
  FlagTriangleRight,
  Loader,
  MessageSquare,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ReportBug } from "@/hooks/ReportBug";
import { toast } from "sonner";

const QuestionReport = ({
  question,
  questionNumber,
}: {
  question: QuestionType[];
  questionNumber: number;
}) => {
  const [report, setReport] = useState({
    question_id: "",
    category: "",
    description: "",
  });
  // Update question_id when questionNumber changes
  useEffect(() => {
    setReport((prev) => ({
      ...prev,
      question_id: question[questionNumber - 1].id,
    }));
  }, [questionNumber]);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reportCategories = [
    { value: "Nieprawidłowa odpowiedź", label: "Nieprawidłowa odpowiedź" },
    { value: "Niejasne pytanie", label: "Niejasne pytanie" },
    { value: "Błąd językowy/literówka", label: "Błąd językowy/literówka" },
    { value: "Brakuje kontekstu", label: "Brakuje kontekstu" },
    { value: "Przestarzałe informacje", label: "Przestarzałe informacje" },
    { value: "Inne", label: "Inne" },
  ];

  const handleCategorySelect = (value: string) => {
    setReport((prev) => ({ ...prev, category: value }));
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) return;
    setReport((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send report to server
    await ReportBug(report);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsReportOpen(false);

      setReport({
        category: "",
        description: "",
        question_id: question[questionNumber - 1].id,
      });
      //reset form
      // Show toast
      toast.success("Twoje zgłoszenie zostało wysłane!", {
        duration: 5000,
        position: "top-right",
        richColors: true,
      });
    }, 2000);
  };
  return (
    <Sheet open={isReportOpen} onOpenChange={setIsReportOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="h-8 w-8 p-0 hover:bg-destructive/15 hover:text-destructive transition-colors duration-500"
        >
          <Flag className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="p-4 px-8 max-sm:p-3">
          <SheetTitle className="flex items-center gap-2 justify-center">
            <FlagTriangleRight className="w-5 h-5 text-destructive" />
            Zgłoś pytanie
          </SheetTitle>
          <SheetDescription>
            Znalazłeś błąd lub masz uwagi do tego pytania? Pomóż nam ulepszyć
            stronę!
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6 max-sm:gap-2 max-sm:px-3">
          {/* Question informations */}
          <div className="rounded-lg px-2 mt-4 space-y-2 max-sm:space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>
                Pytanie {questionNumber} •{" "}
                {question[questionNumber - 1].subject.toUpperCase()}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {question[questionNumber - 1].question_text}
            </p>
          </div>

          {/* REPORT FORM */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  Kategoria problemu *
                </Label>
                <Select
                  value={report.category}
                  onValueChange={handleCategorySelect}
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Wybierz kategorię..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reportCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Opis problemu *
                </Label>
                <Textarea
                  id="category"
                  value={report.description}
                  onChange={(e) => handleTextArea(e)}
                  placeholder="Opisz szczegółowo problem, który zauważyłeś..."
                  className="mt-1 w-full max-h-[300px] placeholder:text-sm"
                />
                <span className="text-xs text-muted-foreground px-1">
                  {report.description.length}/500 znaków
                </span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={
                  !report.description || !report.category || isSubmitting
                }
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Wysyłanie zgłoszenia...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Wyślij zgłoszenie
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsReportOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Benefits from report */}
          <div className="bg-blue-50 mx-4 max-sm:mx-1 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
            <div className="flex gap-3">
              <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-1">
                  Twoje zgłoszenie pomoże nam:
                </p>
                <ul className="space-y-0.5 text-xs list-disc px-4 py-1">
                  <li>Poprawić jakość pytań</li>
                  <li>Usunąć błędy i literówki</li>
                  <li>Aktualizować treści</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default QuestionReport;
