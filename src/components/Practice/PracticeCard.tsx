import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Calendar,
  FileText,
  NotebookText,
  Scale,
  FolderArchive,
} from "lucide-react";
import { Button } from "../ui/button";
import type { PracticeType } from "@/types/types";
import { memo } from "react";

const PracticeCard = memo(({ exam }: { exam: PracticeType }) => {
  const ActiveLinks = [
    {
      Exams: {
        text: "text-blue-600",
        border: "border-blue-600/35",
      },
      Solutions: {
        text: "text-green-600",
        border: "border-green-600/35",
      },
      ZIP: {
        text: "text-red-600",
        border: "border-red-600/35",
      },
      Rules: {
        text: "text-yellow-600",
        border: "border-yellow-600/35",
      },
    },
  ];

  const Technologies: Record<string, { text: string; border: string }> = {
    JavaScript: {
      text: "text-yellow-600",
      border: "border-yellow-600/35",
    },
    PHP: {
      text: "text-purple-600",
      border: "border-purple-600/35",
    },
    Python: {
      text: "text-green-600",
      border: "border-green-600/35",
    },
    Java: {
      text: "text-yellow-400",
      border: "border-yellow-400/35",
    },
    "C#": {
      text: "text-blue-600",
      border: "border-blue-600/35",
    },
    "C++": {
      text: "text-blue-800",
      border: "border-blue-800/35",
    },
    React: {
      text: "text-blue-400",
      border: "border-blue-400/35",
    },
    else: {
      text: "text-gray-600",
      border: "border-gray-600/35",
    },
  };

  const languages = exam.languages.map((tech) => {
    const style = Technologies[tech] || Technologies["else"];
    return (
      <Badge
        key={tech}
        className={`${style.text} ${style.border} bg-transparent py-1 px-2.5 rounded-xl flex items-center gap-1 dark:bg-transparent dark:${style.text}`}
      >
        {tech}
      </Badge>
    );
  });
  return (
    <Card className="hover:shadow-lg hover:drop-shadow-lg hover:scale-102 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-primary font-semibold">
            {exam.name}
          </CardTitle>
          {/* <Badge
            className={` bg-transparent ${
              userViewed
              ? "text-green-600 border-green-600/35"
              : "text-gray-600 border-gray-600/35"
              }`}
              >
              {userViewed ? "Przeglądałeś" : "Nie przeglądałeś"}
              </Badge> */}
          <Badge className="bg-gray-900 px-2.5 rounded-xl flex items-center gap-1 uppercase dark:bg-primary dark:text-primary-foreground">
            {exam.subject}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Informacje o egzaminie */}
        <div className="flex flex-col gap-3">
          <ul className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {exam.data}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              {exam.kind ? <span>{exam.kind.join(", ")}</span> : "Nieznane"}
            </div>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {/* LANGUAGES USED */}
            {languages}
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 items-center gap-2">
            <Button
              size="sm"
              variant={"actionButton"}
              className={`w-full select-none  ${ActiveLinks[0].Exams.text} ${ActiveLinks[0].Exams.border}`}
              onClick={() => window.open(exam.pdf_link, "_blank")}
              disabled={exam.pdf_link === "" || exam.pdf_link === null}
            >
              <NotebookText className="w-4 h-4 mr-1" />
              Arkusz
            </Button>

            <Button
              size="sm"
              variant="actionButton"
              className={`w-full select-none ${ActiveLinks[0].Solutions.text} ${ActiveLinks[0].Solutions.border}`}
              onClick={() => window.open(exam.solution_link, "_blank")}
              disabled={
                exam.solution_link === "" || exam.solution_link === null
              }
            >
              <FileText className="w-4 h-4 mr-1" />
              Rozwiązanie
            </Button>

            <Button
              size="sm"
              variant="actionButton"
              className={`w-full select-none  ${ActiveLinks[0].ZIP.text} ${ActiveLinks[0].ZIP.border}`}
              onClick={() => window.open(exam.materials_link, "_blank")}
              disabled={
                exam.materials_link === "" || exam.materials_link === null
              }
            >
              <FolderArchive className="w-4 h-4 mr-1" />
              ZIP
            </Button>
            <Button
              size="sm"
              variant="actionButton"
              onClick={() => window.open(exam.key_link, "_blank")}
              className={`w-full select-none  ${ActiveLinks[0].Rules.text} ${ActiveLinks[0].Rules.border}`}
              disabled={exam.key_link === "" || exam.key_link === null}
            >
              <Scale className="w-4 h-4 mr-1" />
              Zasady Oceniania
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PracticeCard;
