import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

const UserResults = () => {
  return (
    <Card className="flex my-4 max-w-xl justify-center items-center relative">
      <Badge
        variant="destructive"
        className="absolute top-1 -left-3 -rotate-45 text-[8px]"
      >
        NOWE
      </Badge>
      <CardTitle className="text-center text-xl">Twoje wyniki</CardTitle>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-center">
          Zobacz wyniki swojego poprzedniego testu{" "}
        </p>
        <i className="text-xs text-center">
          (Pod warunkiem że go nie usunąłeś)
        </i>
        <Button
          variant="outline"
          className="w-full bg-primary/5 hover:bg-primary/10 duration-300 mt-4"
        >
          Zobacz wyniki
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserResults;
