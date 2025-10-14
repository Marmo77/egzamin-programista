import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
};
import ogImage from "../assets/imgs/ogimage.jpg";
const SEO = ({
  title = "Egzamin Programista - Testy INF.03 & INF.04 za Darmo",
  description = "Przygotuj się do egzaminów zawodowych INF.03 i INF.04 z darmowymi testami teoretycznymi i arkuszami praktycznymi. Pytania z oficjalnej bazy CKE!",
  keywords = "egzamin programista, inf03, inf04, technik programista, testy egzaminacyjne, cke, programowanie, aplikacje internetowe",
  image = ogImage,
  url = "https://egzamin-programista.vercel.app",
  type = "website",
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Egzamin Programista" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Polish" />
      <meta name="author" content="Marmo77" />
      <meta name="theme-color" content="#1e40af" />
    </Helmet>
  );
};

export default SEO;
