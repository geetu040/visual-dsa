import { Home } from "./Home";
import { HomeLink } from "./HomeLink";

import { BinaryTreePage } from "./components/binarytree/BinaryTreePage";
import { SortingPage } from "./components/sorting/SortingPage";
import { GraphPage } from "./components/graph/GraphPage";

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <HomeLink />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/binarytree" element={<BinaryTreePage />} />
                <Route path="/sorting" element={<SortingPage />} />
                <Route path="/graph" element={<GraphPage />} />
            </Routes>
        </Router>
    );
}

export default App;
