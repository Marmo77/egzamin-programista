import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Question from "./components/Theory/Question";
import ResultsPage from "./components/ResultsPage";
import Theory from "./components/Theory";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Practice from "./components/Practice";
import WorkInProgress from "./components/WorkInProgress";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/theory/:type" element={<Question />} />
        <Route path="/theory/results/:type" element={<ResultsPage />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/work-in-progress" element={<WorkInProgress />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
