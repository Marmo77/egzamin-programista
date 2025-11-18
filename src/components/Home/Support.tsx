import { Card, CardContent } from "../ui/card";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";

const Support = () => {
  return (
    <div className="max-w-4xl mx-auto text-center px-6">
      <Card className="border border-border shadow-md light:bg-red-50">
        <CardContent className="px-6">
          <div className="flex flex-col items-center gap-2 mb-2">
            <Heart className="w-10 h-10 text-red-500" fill="#fb2c36" />
            <h3 className="font-semibold text-red-600 text-lg">
              Wspieraj projekt
            </h3>
          </div>
          <p className="max-w-md text-muted-foreground text-[15px] mb-4">
            Jeśli nasza strona pomogła Ci w przygotowaniu się do egzaminów,
            rozważ wsparcie naszej pracy. Każda pomoc pozwala nam rozwijać i
            ulepszać materiały.
          </p>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 group"
            onClick={() => {
              // window.open("", "_blank")
              alert("Aktualnie nie przyjmujemy wsparcia. <3");
              window.open(
                "https://github.com/Marmo77/egzamin-programista",
                "_blank"
              );
            }}
          >
            <Heart className="w-4 h-4 mr-2 group-hover:fill-white" />
            Wspieraj projekt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
