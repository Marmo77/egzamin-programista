import { BookOpen, Coffee, FileText, GraduationCap } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const onStartTest = () => {
    navigate("/theory");
  };

  const onViewExams = () => {
    navigate("/practice");
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full mb-6">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-600 dark:text-primary font-medium">
            Przygotuj się do egzaminów zawodowych
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-primary leading-tight mb-6">
          Zdaj Egzaminy
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Zawodowe
          </span>
        </h1>

        <p className="text-xl max-md:text-base text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed max-sm:px-6">
          Nowoczesna strona internetowa stworzona aby pomóc uczniom w
          przygotowaniu się do egzaminów zawodowych <strong>INF.03</strong> i{" "}
          <strong>INF.04</strong>. Strona zawiera testy teoretyczne oraz arkusze
          praktyczne.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-sm:px-6">
          <Button
            onClick={onStartTest}
            variant="ctaButton"
            className="px-12 py-5 max-md:px-12 max-md:py-5"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Test Teoretyczny
          </Button>
          <Button
            onClick={onViewExams}
            variant="outline"
            className="border-border text-primary hover:border-border px-8 py-3 rounded-lg font-medium transition-all max-md:px-12 max-md:py-5"
          >
            <FileText className="w-5 h-5 mr-2" />
            Arkusze Praktyczne
          </Button>
        </div>
        <HeroProsCards />
      </div>
    </div>
  );
};

const HeroProsCards = () => {
  const ProsCards = [
    {
      title: "Prawdziwe Pytania",
      description:
        "Pytania pochodzą z oficjalnej bazy CKE. Te same pytania, które mogą pojawić się na prawdziwym egzaminie.",
      icon: BookOpen,
      colors: [
        {
          bg: "bg-blue-100",
          text: "text-blue-600",
          hoverBorder: "hover:border-blue-400",
          darkBorder: "dark:border-blue-400/70",
        },
      ],
    },
    {
      title: "100% Za Darmo",
      description:
        "Projekt non-profit. Strona jest w 100% darmowe bez reklam. Dziękujemy za korzystanie z naszej strony!",
      icon: Coffee,
      colors: [
        {
          bg: "bg-orange-100",
          text: "text-orange-600",
          hoverBorder: "hover:border-orange-400",
          darkBorder: "dark:border-orange-400/70",
        },
      ],
    },
    {
      title: "Prawdziwe Arkusze",
      description:
        "Kompletne arkusze z poprzednich lat. Ćwicz dokładnie to, co będzie na egzaminie! Dostępne z rozwiązaniami!",
      icon: FileText,
      colors: [
        {
          bg: "bg-green-100",
          text: "text-green-600",
          hoverBorder: "hover:border-green-400",
          darkBorder: "dark:border-green-400/70",
        },
      ],
    },
  ];

  const ProsCard = ({
    title,
    description,
    icon,
    colors,
  }: {
    title: string;
    description: string;
    icon: any;
    colors: {
      bg: string;
      text: string;
      hoverBorder: string;
      darkBorder: string;
    }[];
  }) => {
    const Icon = icon;
    return (
      <Card
        className={`py-4 border ${colors[0].hoverBorder} ${colors[0].darkBorder} transition-all hover:shadow-lg hover:scale-105 bg-background shadow-md`}
      >
        <CardContent className="py-2">
          <div
            className={`w-12 h-12 dark:bg-primary/20 ${colors[0].bg} rounded-lg flex items-center justify-center mx-auto mb-4`}
          >
            <Icon className={`w-6 h-6 ${colors[0].text} dark:text-primary`} />
          </div>
          <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  };
  return (
    <div className="flex max-md:flex-col justify-center gap-5 px-12 max-lg:px-6">
      {ProsCards.map((card) => (
        <ProsCard
          title={card.title}
          description={card.description}
          icon={card.icon}
          colors={card.colors}
          key={card.title}
        />
      ))}
    </div>
  );
};

export default Hero;
