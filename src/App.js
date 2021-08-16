import { BrowserRouter as Router, Route, Switch,  } from "react-router-dom";
import MainLayout from "./components/main-layout/main-layout.component";
import Nav from "./components/nav/nav.component";
const App = () => {
  return (
    <>

      <Router>
        <Nav />
        <Switch>
          <Route path='/' exact component={ MainLayout } />

        </Switch>
      </Router>
    </>
  );
}

export default App;
