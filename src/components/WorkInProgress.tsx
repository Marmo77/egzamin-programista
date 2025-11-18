import { Button } from "./ui/button";
import { ArrowLeft, Clock, Construction } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useNavigate } from "react-router-dom";

const WorkInProgress = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <section className="py-12 px-4">
      <Card className="max-w-3xl mx-auto py-5 px-5">
        <div className="flex justify-center">
          <div className="text-orange-500 bg-orange-100 p-4 hover:scale-105 duration-300 rounded-full">
            <Construction className="w-16 h-16 animate-pulse duration-300" />
          </div>
        </div>
        <CardHeader className="flex flex-col gap-3 items-center">
          <h1 className="text-4xl font-semibold text-center text-primary">
            W trakcie realizacji
          </h1>
          <h4 className="text-center text-base text-primary font-semibold">
            Ta podstrona jest w trakcie realizacji / zmiany.
          </h4>
          <p className="text-center text-muted-foreground max-w-md mx-auto">
            Pracujemy nad nową funkcjonalnością, która wkrótce będzie dostępna.
            Dziękujemy za cierpliowść.
          </p>
        </CardHeader>
        <CardContent>
          <Button className="w-full py-6 bg-background text-primary shadow-md border border-border hover:cursor-auto hover:bg-background">
            <Clock className="w-6 h-6 mr-1" />
            <span className="text-wrap">
              Szacowany czas ukończenia: <strong>wkrótce</strong>
            </span>
          </Button>
          {/* Co dodajemy */}
          {/* <div className="py-4 border border-border my-3 rounded-2xl pb-5">
            <h2 className="text-lg  font-semibold text-center mb-4 text-primary">
              Co zmieniamy
            </h2>
            <ul className="px-20 flex flex-col gap-2 text-sm list-disc list-inside">
              <li className="marker:text-blue-600  text-primary/90">
                Ulepszone funkcjonalności
              </li>
              <li className="marker:text-purple-600">
                Lepszy interfejs użytkownika
              </li>
              <li className="marker:text-green-600 text-primary/90">
                Nowe opcje i możliwości
              </li>
            </ul>
          </div> */}
          {/* CTA powrot */}
          <div className="flex justify-center my-3">
            <Button variant={"ctaButton"} onClick={handleNavigate}>
              <ArrowLeft className="w-6 h-6 mr-1" />
              Powrót do Strony Głównej
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Note */}
      <p className="text-sm text-center text-foreground/60 mt-6">
        W razie pytań skontaktuj się z nami przez{" "}
        <a
          href="https://github.com/Marmo77"
          target="_blank"
          className="text-primary underline"
        >
          GitHub
        </a>
      </p>
    </section>
  );
};

export default WorkInProgress;
