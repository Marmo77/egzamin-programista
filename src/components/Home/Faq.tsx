import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Lightbulb } from "lucide-react";

type FaqType = {
  question: string;
  answer: string;
};

const Faq = () => {
  const FaqQuestions: FaqType[] = [
    {
      question: "Czy ta strona naprawdę pomoże mi zdać egzamin?",
      answer:
        "Tak! Używam oficjalnych pytań z CKE i arkuszy z poprzednich lat. Sam zdałem dzięki podobnym materiałom. Oczywiście musisz się też uczyć, ale to dobre miejsce na powtórkę oraz źródło materiałów do nauki! ",
    },
    {
      question: "Dla kogo jest ta strona?",
      answer:
        'Ta strona jest dla każdego. Ale szczególnie dla uczniów, którzy chcą zdać egzaminy zawodowe INF.03 i INF.04 i są na kierunku "technik-programista".',
    },
    {
      question: "Ile kosztuje korzystanie ze strony?",
      answer:
        "Nic! Jest to projekt non-profit. Robiłem to w wolnym czasie. Jeśli chcesz, możesz wesprzeć projekt przez przycisk 'Wspieraj' ☕",
    },
    {
      question: "Skąd biorą się pytania w testach?",
      answer:
        "Wszystkie pytania pochodzą z oficjalnej bazy CKE (Centralna Komisja Egzaminacyjna). To te same pytania, które mogą pojawić się na prawdziwym egzaminie! 📋",
    },
    {
      question: "Czy mogę powtarzać testy?",
      answer:
        "Oczywiście! Możesz robić tyle testów ile chcesz. Każdy test losuje inne pytania, więc zawsze będziesz ćwiczył coś nowego 🔄",
    },
    {
      question: "Co to są arkusze praktyczne?",
      answer:
        "To prawdziwe zadania z egzaminów z poprzednich lat. Znajdziesz tam kompletne polecenia i przykładowe rozwiązania. Super do ćwiczenia przed praktyczną częścią egzaminu! 💻",
    },
    {
      question: "Różnica między INF.03 a INF.04?",
      answer:
        'INF.03 to głównie web development (HTML, CSS, JS, PHP, SQL), a INF.04 to bardziej programowanie aplikacji (Python, C++, bazy danych, czasem React!). Trzeba zdać obie kwalfikacje, aby uzyskać tytuł "Technik-programista".',
    },
    {
      question: "Czy mogę używać strony na telefonie?",
      answer:
        "Tak! Strona jest responsywna i działa na telefonach, tabletach i komputerach. Możesz ćwiczyć wszędzie! 📱",
    },
    {
      question: "Ile jest pytań w testach?",
      answer:
        "W każdym testach jest 40 pytań. Możesz robić tyle testów ile chcesz. Za każdym razem losowany jest nowy zestaw pytań. Aktualnie jest ponad 2000 pytań w bazie danych.",
    },
    {
      question: "Kto stoi za tym projektem?",
      answer:
        "Cześć! Jestem uczniem, który przeszedł przez ten sam proces. Postanowiłem pomóc innym, bo wiem jak stresujące mogą być te egzaminy. Kod jest dostępny na GitHub! 👨‍💻",
    },
  ];

  return (
    <div className="w-full max-w-4xl px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Najczęściej zadawane pytania 🤔
        </h2>
        <p className="text-muted-foreground">
          Masz pytania? Sprawdź czy nie ma już odpowiedzi tutaj!
        </p>
      </div>
      <div className="flex flex-col gap-2"></div>

      <Accordion type="single" collapsible className="space-y-4">
        {FaqQuestions.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-background rounded-lg border border-border px-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-left font-semibold text-primary hover:text-blue-600 py-6 cursor-pointer">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-background dark:border-border border border-blue-200 rounded-full">
          <Lightbulb className="w-5 h-5 text-blue-700 dark:text-blue-400" />
          <span className="text-sm text-blue-800 dark:text-blue-400">
            Masz inne pytanie? Napisz na{" "}
            <a
              href="https://github.com/Marmo77/egzamin-programista/issues"
              className="hover:underline dark:text-blue-300 font-semibold"
              target="_blank"
            >
              GitHub Issues
            </a>
            !
          </span>
        </div>
      </div>
    </div>
  );
};

export default Faq;
