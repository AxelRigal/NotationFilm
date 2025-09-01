import { createFileRoute } from "@tanstack/react-router";
import { getFilm } from "../../api/film";
import "./film.css";
import FilmCard from "../../components/Film/FilmCard";

export const Route = createFileRoute("/film/$id")({
  component: Film,
  loader: async ({ params }) => await getFilm(params.id),
});

function Film() {
  const film = Route.useLoaderData();
  console.log(film);
  return <FilmCard film={film} onSpecificPage={true} />;
}
