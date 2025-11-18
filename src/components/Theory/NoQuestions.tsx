import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const NoQuestions = ({ exam_type }: { exam_type: string }) => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-4xl py-12">
      <Card className="p-8 text-center">
        <CardHeader className="space-y-6">
          <h1 className="text-2xl font-semibold mb-2">
            Brak pytań do tego testu...
          </h1>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Przepraszamy, ale nie znaleźliśmy pytań do egzaminu{" "}
            {exam_type.toUpperCase()}. Spróbuj ponownie.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant={"link"}
            size={"lg"}
            className="text-[16px] hover:scale-95 active:scale-75 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Powrót
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default NoQuestions;
