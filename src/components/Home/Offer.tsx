import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Offer = () => {
  const date = new Date().getFullYear();

  const navigate = useNavigate();

  const stats = [
    {
      label: "INF.03",
      value: "Tworzenie stron i aplikacji internetowych",
      color: "text-blue-600",
    },
    {
      label: "INF.04",
      value: "Projektowanie i programowanie aplikacji",
      color: "text-purple-600",
    },
    { label: "100%", value: "Darmowa platforma", color: "text-green-600" },
    { label: date, value: "Aktualne materiały", color: "text-orange-600" },
  ];

  return (
    <section className="py-4 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-primary leading-tight mb-6">
            Co oferujemy?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            Dajemy Ci <strong>kompletny dostęp</strong> do platformy z testami
            teoretycznymi oraz arkuszami praktycznymi. Stworzyliśmy system
            testów, który losuje pytania z <strong>oficjalnej bazy CKE</strong>.
            A najlepsze? Wszystko jest za{" "}
            <span className="text-green-600 font-semibold">darmo! 🎉</span>
          </p>
        </div>
        {/* CTA */}
        <div className="flex justify-center my-8">
          <Button
            variant={"ctaButton"}
            className="py-5"
            onClick={() => navigate("/theory")}
          >
            <BookOpen className="w-6 h-6 mr-1" />
            Rozpocznij test
          </Button>
        </div>

        {/* Stats Section */}
        <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
          <h3 className="text-center font-semibold text-primary mb-6">
            Przygotuj się do egzaminów zawodowych
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
