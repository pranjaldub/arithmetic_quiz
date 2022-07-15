import logo from "./logo.svg";
import "./App.css";
import QuizOne from "./components/QuizOne/QuizOne";
import QuizTwo from "./components/QuizTwo/QuizTwo";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes as Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Home></Home>
        {/* { <Switch>
          {<Route exact path="/" element={<Home />} /> }
          <Route
            exact
            path="/quizOne"
            element={<QuizOne showQuestionProps={true} />}
          />
          <Route
            exact
            path="/quizTwo"
            element={<QuizTwo showQuestionProps={true} />}
          />
        </Switch> } */}
      </div>
    </Router>
  );
}

export default App;
