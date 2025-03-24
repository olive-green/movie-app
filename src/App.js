import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieProvider from "./context/MovieContext";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <MovieProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  </MovieProvider>
);

export default App;
