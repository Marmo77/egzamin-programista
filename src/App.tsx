import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
// import Question from "./components/Theory/Question";
// import ResultsPage from "./components/ResultsPage";
// import Theory from "./components/Theory";
// import NotFound from "./components/NotFound";
// import Home from "./components/Home";
// import Practice from "./components/Practice";
// import WorkInProgress from "./components/WorkInProgress";
import Home from "./components/Home";
import LoadingSkeletons from "./components/Theory/LoadingSkeletons";

import { lazy, Suspense } from "react";

//lazy load other pages that user might not visit
const Theory = lazy(() => import("./components/Theory"));
const Question = lazy(() => import("./components/Theory/Question"));

const Practice = lazy(() => import("./components/Practice"));
const ResultsPage = lazy(() => import("./components/ResultsPage"));

const WorkInProgress = lazy(() => import("./components/WorkInProgress"));
const NotFound = lazy(() => import("./components/NotFound"));

const Privacy = lazy(() => import("./components/Privacy"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route
          path="/theory"
          element={
            <Suspense
              fallback={
                <LoadingSkeletons
                  page
                  pageValues={[
                    "Ładowanie Testów teoretycznych",
                    "Ładujemy testy teoretyczne, proszę czekać...",
                  ]}
                />
              }
            >
              <Theory />
            </Suspense>
          }
        />
        <Route path="/theory/:type" element={<Question />} />{" "}
        {/* its already have isLoading the LoadingQuestionSkeleton inside the Question component */}
        <Route
          path="/theory/results/:type"
          element={
            <Suspense
              fallback={
                <LoadingSkeletons
                  page
                  pageValues={[
                    "Wyniki Testów teoretycznych",
                    "Obliczamy wyniki testów teoretycznych, proszę czekać...",
                  ]}
                />
              }
            >
              <ResultsPage />
            </Suspense>
          }
        />
        <Route
          path="/practice"
          element={
            <Suspense
              fallback={
                <LoadingSkeletons
                  page
                  pageValues={[
                    "Ładowanie Praktycznych Pytań",
                    "Ładujemy praktyczne pytania, proszę czekać...",
                  ]}
                />
              }
            >
              <Practice />
            </Suspense>
          }
        />
        <Route
          path="/work-in-progress"
          element={
            <Suspense fallback={<LoadingSkeletons page />}>
              <WorkInProgress />
            </Suspense>
          }
        />
        <Route
          path="/privacy"
          element={
            <Suspense
              fallback={
                <LoadingSkeletons
                  page
                  pageValues={[
                    "Polityka Prywatności",
                    "Ładujemy politykę prywatności, proszę czekać...",
                  ]}
                />
              }
            >
              <Privacy />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingSkeletons page />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
