import { createFileRoute, Link } from "@tanstack/react-router";
import { getFilms } from "../../api/film";
import type { Film } from "../../types/film";
import FilmCard from "../../components/Film/FilmCard";

export const Route = createFileRoute("/film/")({
  component: FilmsList,
  loader: getFilms,
});

function FilmsList() {
  const films = Route.useLoaderData();
  console.log("films", films);
  return (
    <div>
      <h1>🎬 Liste des Films</h1>
      <ul className="film-list">
        {films &&
          films.map((film: Film) => (
            <li key={film.id} style={{ listStyle: "none"}}>
              <Link
                to={"/film/$id"}
                params={{
                  id: film.id,
                }}
              >
                <FilmCard film={film} onSpecificPage={false} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
