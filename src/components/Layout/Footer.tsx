import { Mail, Github } from "lucide-react";
import { AppConstants } from "@/data/constants";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Left side - Copyright and creator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                <span>
                  © {new Date().getFullYear()}{" "}
                  <a
                    href={`https://${AppConstants.Website.link}`}
                    className="hover:text-primary text-primary/85"
                    target="_blank"
                  >
                    {
                      AppConstants.Website.link
                        .split("https://")[1]
                        .split(".vercel")[0]
                    }
                  </a>
                  . Wszystkie prawa zastrzeżone.
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="#o-nas"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              O nas
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Prywatność
            </Link>
            <Button
              variant="ghost"
              onClick={() =>
                window.open("mailto:hello@passtheexam.pl", "_blank")
              }
              className="rounded-3xl"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open(AppConstants.Credits.link, "_blank")}
              className="rounded-3xl"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
