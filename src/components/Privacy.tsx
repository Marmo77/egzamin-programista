import SEO from "./SEO";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Cookie,
  Database,
  ExternalLink,
  Eye,
  Lock,
  Shield,
} from "lucide-react";
import { AppConstants } from "../data/constants";
<SEO
  title="Polityka Prywatności | Egzamin Programista"
  description="Polityka prywatności serwisu Egzamin Programista"
  url={`${AppConstants.Website.link}/privacy`}
/>;
const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Jakie dane zbieramy?",
      content: [
        {
          type: "text",
          text: "Nie zbieramy żadnych danych osobowych. Nasza aplikacja działa w 100% lokalnie w Twojej przeglądarce.",
          highlight: true,
        },
      ],
    },
    {
      icon: Lock,
      title: "LocalStorage",
      content: [
        {
          type: "text",
          text: "Używamy localStorage do zapisywania:",
        },
        {
          type: "list",
          items: [
            "Wyników Twoich testów (tylko lokalnie)",
            "Preferencji motywu (jasny/ciemny)",
          ],
        },
        {
          type: "text",
          text: "Te dane nigdy nie opuszczają Twojego urządzenia. Możesz je usunąć czyszcząc pamięć przeglądarki.",
          highlight: true,
        },
      ],
    },
    {
      icon: Eye,
      title: "Analityka",
      content: [
        {
          type: "text",
          text: "Używamy Vercel Analytics do zbierania anonimowych statystyk odwiedzin (liczba użytkowników, źródło ruchu). Nie zbieramy danych osobowych ani nie śledzimy aktywności poza naszą stroną.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Zgłoszenia błędów",
      content: [
        {
          type: "text",
          text: "Gdy zgłaszasz błąd, zapisujemy tylko:",
        },
        {
          type: "list",
          items: ["ID pytania", "Kategorię problemu", "Opis problemu"],
        },
        {
          type: "text",
          text: "Nie prosimy o email, imię ani inne dane osobowe.",
          highlight: true,
        },
      ],
    },
    {
      icon: Cookie,
      title: "Cookies",
      content: [
        {
          type: "text",
          text: "Nie używamy cookies. Wszystko działa przez localStorage.",
          highlight: true,
        },
      ],
    },
    {
      icon: ExternalLink,
      title: "Linki zewnętrzne",
      content: [
        {
          type: "text",
          text: "Strona zawiera linki do m.in.: GitHub, Discord, Buy Me a Coffee. Nie odpowiadamy za politykę prywatności tych serwisów.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Polityka Prywatności | Egzamin Programista"
        description="Polityka prywatności serwisu Egzamin Programista - dowiedz się jak chronimy Twoją prywatność"
        url="https://egzaminprogramista.pl/privacy"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-8 hover:bg-muted transition-all group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Powrót do strony głównej
          </Button>
        </Link>

        {/* Header Card */}
        <Card className="mb-8 py-0 border-border bg-card overflow-hidden">
          <div className="bg-gradient-to-br h-full from-blue-600 to-purple-600 py-10 px-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-semibold">Polityka Prywatności</h1>
            </div>
            <p className="text-white/90 text-sm">
              Ostatnia aktualizacja:{" "}
              {new Date().toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </Card>

        {/* TL;DR Card */}
        <Card className="mb-8 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              TL;DR 🎯
            </h3>
            <p className="text-green-800 dark:text-green-200 leading-relaxed">
              Nie zbieramy Twoich danych. Wszystko działa lokalnie. Zero
              śledzenia. Twoja prywatność jest{" "}
              <strong>w 100% bezpieczna</strong>.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="font-semibold text-primary">
                        {index + 1}. {section.title}
                      </h2>
                      {section.content.map((item, itemIndex) => {
                        if (item.type === "text") {
                          return (
                            <p
                              key={itemIndex}
                              className={`text-muted-foreground leading-relaxed ${
                                item.highlight ? "font-medium text-primary" : ""
                              }`}
                            >
                              {item.text}
                            </p>
                          );
                        }
                        if (item.type === "list") {
                          return (
                            <ul key={itemIndex} className="space-y-2 ml-2">
                              {item.items?.map((listItem, listIndex) => (
                                <li
                                  key={listIndex}
                                  className="flex items-start gap-2 text-muted-foreground"
                                >
                                  <span className="text-primary mt-1">•</span>
                                  <span>{listItem}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Masz pytania?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              Zgłoś przez GitHub Issues lub Discord. Chętnie odpowiemy! 💬
            </p>
          </CardContent>
        </Card>

        {/* Back Button Bottom */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
              Wróć do strony głównej
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
