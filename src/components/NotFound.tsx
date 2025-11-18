import {
  ArrowLeft,
  BookOpen,
  FileQuestion,
  Home,
  BookOpenText,
  HandCoins,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { lazy, Suspense, memo } from "react";
import { AppConstants } from "@/data/constants";
// lazy load avatar
const Avatar = lazy(() =>
  import("@/components/ui/avatar").then((m) => ({ default: m.Avatar }))
);
const AvatarFallback = lazy(() =>
  import("@/components/ui/avatar").then((m) => ({ default: m.AvatarFallback }))
);
const AvatarImage = lazy(() =>
  import("@/components/ui/avatar").then((m) => ({ default: m.AvatarImage }))
);

const NotFound = () => {
  const suggestions = [
    {
      icon: BookOpen,
      title: "Test teoretyczny",
      description: "Sprawdź swoją wiedzę z INF.03 lub INF.04",
      action: "Rozpocznij test",
      link: "/theory",
    },
    {
      icon: FileQuestion,
      title: "Arkusze egzaminacyjne",
      description: "Pobierz oficjalne arkusze do ćwiczeń",
      action: "Zobacz arkusze",
      link: "/practice",
    },
    {
      icon: BookOpenText,
      title: "Polityka prywatności",
      description: "Wyjaśnia jak dane są używane",
      action: "Polityka prywatności",
      link: "/privacy",
    },
    {
      icon: HandCoins,
      title: "Donacje",
      description: "Chciałeś wesprzeć projekt",
      action: "Donate",
      link: "/donate",
    },
  ];
  return (
    <section className="min-h-screen flex justify-center bg-background pt-16">
      <div className="max-w-4xl flex flex-col items-center gap-6 mx-auto px-4">
        <div className="relative">
          <div className="text-[12rem] font-bold text-primary/10 select-none leading-none">
            404
          </div>
        </div>
        {/* Error Message */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="destructive" className="text-sm px-3 py-1">
              Błąd 404
            </Badge>
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-foreground mb-4">
              Strona, której szukasz nie istnieje lub została usunięta.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Przepraszamy, ale strona której szukasz nie istnieje lub została
              przeniesiona. Sprawdź adres URL lub skorzystaj z poniższych opcji.
            </p>
          </div>
        </div>
        {/* Quick Action */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            className="px-8 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Strona główna
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="px-8 flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Wróć
          </Button>
        </div>
        {/* Suggestions */}
        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-medium text-foreground mb-6">
            Być może szukasz:
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {suggestions.map((suggestion, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-border hover:border-primary/20"
                onClick={() => (window.location.href = suggestion.link)}
              >
                <CardContent className=" text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <suggestion.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-medium text-foreground mb-2">
                    {suggestion.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {suggestion.description}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  >
                    {suggestion.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12">
            <Suspense fallback={<div className="h-20" />}>
              <FunFact />
            </Suspense>
            <Suspense fallback={<div className="h-20" />}>
              <Credits />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

const Credits = memo(() => {
  return (
    <div className="flex items-center justify-center mt-12 pt-8 mb-3 border-t border-border">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={AppConstants.Credits.avatar}
            alt={AppConstants.Credits.name}
            loading="lazy"
          />
          <AvatarFallback>{AppConstants.Credits.name[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm">
          Stworzono przez{" "}
          <Button
            className="-ml-2"
            variant="link"
            onClick={() => window.open(AppConstants.Credits.link, "_blank")}
          >
            {AppConstants.Credits.name}
          </Button>
        </span>
      </div>
    </div>
  );
});
const FunFact = memo(() => {
  const funFacts = [
    {
      fact: "Błąd 404 pochodził z numerem pokoju w CERN, gdzie znajdował się pierwszy serwer WWW. Gdy strona nie była dostępna, użytkownicy otrzymywali komunikat z pokoju 404!",
    },
    {
      fact: "JavaScript nie ma nic wspólnego z Javą — nazwa to był tylko trik marketingowy z lat 90., bo wtedy „Java” brzmiała modnie.",
    },
    {
      fact: "W CSS kolory można ustawić np. jako red, #ff0000, rgb(255,0,0) albo nawet hsl(0,100%,50%) — wszystkie dają dokładnie ten sam odcień czerwieni.",
    },
    {
      fact: "PHP jest tak popularne, że około 75% stron w Internecie wciąż korzysta z tego języka — w tym WordPress, który sam napędza ponad 40% całej sieci.",
    },
    {
      fact: "Najlepsi programiście podobnie jak ty dalej szukają w googlu jak wycentrować diva",
    },
    {
      fact: "WSZYSCY używają console.log() żeby zobaczyć co sie dzieje z kodem. Prawda?",
    },
    {
      fact: "Przysięgam, u mnie działa!",
    },
    {
      fact: "Jeśli nie wiesz jakim cudem twój kod działa, ale działa to to zostaw!",
    },
  ];

  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  return (
    <div className="mt-16 p-6 bg-background rounded-lg mx-auto border border-border max-w-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="font-medium text-foreground">Czy wiesz, że...</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {randomFact.fact}
      </p>
    </div>
  );
});
export default NotFound;
