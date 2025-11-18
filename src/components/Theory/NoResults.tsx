import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const NoResults = () => {
  return (
    <section className="mx-auto max-w-5xl py-12">
      <Card className="flex flex-col items-center gap-4">
        <p className="text-muted-foreground">
          Brak zapisanych wyników dla tego testu.
        </p>
        <Link to="/">
          <Button variant={"link"}>Powrot do strony głównej</Button>
        </Link>
      </Card>
    </section>
  );
};

export default NoResults;
