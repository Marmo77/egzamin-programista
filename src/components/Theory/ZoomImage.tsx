import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState, useEffect } from "react";

const ZoomImage = ({
  questionNumber,
  imageUrl,
}: {
  questionNumber: number;
  imageUrl: string;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  const handleZoomInOut = () => {
    if (zoomIn) {
      document.getElementById("image-zoom")?.classList.remove("zoomed");
      document
        .getElementById("image-zoom")
        ?.classList.remove("cursor-zoom-out");
      document.getElementById("image-zoom")?.classList.add("cursor-zoom-in");
      setZoomIn(false);
    } else {
      document.getElementById("image-zoom")?.classList.add("zoomed");
      document.getElementById("image-zoom")?.classList.add("cursor-zoom-out");
      document.getElementById("image-zoom")?.classList.remove("cursor-zoom-in");
      setZoomIn(true);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <AlertDialog open={isZoomed} onOpenChange={setIsZoomed}>
        <AlertDialogTrigger asChild>
          <img
            alt={`obraz ${questionNumber}`}
            className="h-auto w-auto cursor-pointer"
            loading="lazy"
            decoding="async"
            src={imageUrl}
            // onClick={handleZoom}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="h-fit flex flex-col justify-between">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Obraz do pytania nr {questionNumber}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="">
            <img
              alt={`obraz ${questionNumber}`}
              className="h-fit w-auto cursor-zoom-in"
              loading="lazy"
              id="image-zoom"
              decoding="async"
              src={imageUrl}
              onClick={handleZoomInOut}
            />
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Zamknij</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ZoomImage;
