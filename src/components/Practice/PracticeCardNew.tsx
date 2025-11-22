import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  CheckCircle,
  Calendar,
  FileText,
  NotebookText,
  Scale,
  FolderArchive,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import type { PracticeType } from "@/types/types";
import {memo} from "react";

const PracticeCard = memo(({ exam }: { exam: PracticeType }) => {
  const DoneColors = [
    {
      Done: {
        text: "text-green-600",
        border: "border-green-600",
      },
      NotDone: {
        text: "text-red-600",
        border: "border-red-600",
      },
    },
  ];

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

  const Technologies = [
    {
      JavaScript: {
        text: "text-yellow-600",
        border: "border-yellow-600/35",
      },
      PHP: {
        text: "text-purple-600",
        border: "border-purple-600/35",
      },
      else: {
        text: "text-blue-600",
        border: "border-blue-600/35",
      },
    },
  ];

//   const examFile = `${exam.subject.toUpperCase()}-${
//     exam.session == "styczeń"
//       ? "01"
//       : exam.session == "czerwiec"
//       ? "06"
//       : exam.session
//   }-${exam.year}`;
  return (
    <Card className="hover:shadow-lg hover:drop-shadow-lg hover:scale-102 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge className="bg-gray-900 py-1 px-2.5 rounded-xl flex items-center gap-1 uppercase dark:bg-primary dark:text-primary-foreground">
            {exam.subject}
          </Badge>
          <Badge
            // className={
            //   DoneColors[0][exam.has_solution ? "Done" : "NotDone"].text +
            //   " " +
            //   DoneColors[0][exam.has_solution ? "Done" : "NotDone"].border +
            //   " " +
            //   "bg-background"
            // }
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="">
              {/* {exam.has_solution ? "Rozwiązania" : "Brak rozwiązań"} */}
            </span>
          </Badge>
        </div>
        <CardTitle className="text-lg text-primary font-semibold">
          {/* {exam.title} */}
        </CardTitle>
        {/* {exam.description && (
          <CardDescription className="text-muted-foreground">
            {exam.description}
          </CardDescription>
        )} */}
      </CardHeader>
      <CardContent>
        {/* Informacje o egzaminie */}
        <div className="flex flex-col gap-3">
          <ul className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              {/* {exam.session} {exam.year} */}
            </div>
            <div className="flex items-center text-sm text-gray-600 gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              {/* {examFile} */}
            </div>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          {/* Techonologies used */}
          <div className="flex items-center gap-2">
            {/* LANGUAGES -----!__---- */}
          </div>
          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 items-center gap-2">
            <Link to={"/practice/arkusz"}>
              <Button
                size="sm"
                variant={"actionButton"}
                className={`w-full ${ActiveLinks[0].Exams.text} ${ActiveLinks[0].Exams.border}`}
              >
                <NotebookText className="w-4 h-4 mr-1" />
                Arkusz
              </Button>
            </Link>

              <Button
                size="sm"
                variant="actionButton"
                className={`w-full cursor-not-allowed opacity-45 ${ActiveLinks[0].Solutions.text} ${ActiveLinks[0].Solutions.border}`}
              >
                <FileText className="w-4 h-4 mr-1" />
                Rozwiązanie
              </Button>

            <Link to={"/practice/zip"}>
              <Button
                size="sm"
                variant="actionButton"
                className={`w-full ${ActiveLinks[0].ZIP.text} ${ActiveLinks[0].ZIP.border}`}
              >
                <FolderArchive className="w-4 h-4 mr-1" />
                ZIP
              </Button>
            </Link>
            <Link to={"/practice/zasady-oceniania"}>
              <Button
                size="sm"
                variant="actionButton"
                className={`w-full ${ActiveLinks[0].Rules.text} ${ActiveLinks[0].Rules.border}`}
              >
                <Scale className="w-4 h-4 mr-1" />
                Zasady Oceniania
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PracticeCard;
