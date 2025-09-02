import type { Film } from "../types/film";

export async function getFilms(): Promise<Film[]> {
  return await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query {
            films {
              id
              title
              description
              averageRating
              url
            }
          }
        `,
    }),
  })
    .then((res) => res.json())
    .then((data) => data.data.films)
    .catch(console.error);
}

export async function getFilm(filmId: string): Promise<Film> {
  return await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
              query GetFilm($id: ID!) {
                film(id: $id) {
                  id
                  description
                  title
                  averageRating
                  url
                }
              }
            `,
      variables: {
        id: filmId,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => data.data.film)
    .catch(console.error);
}

export async function addFilm(film: Film): Promise<Film> {
  return await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation addFilm($title: String!, $description: String!, $url: String!) {
          addFilm(title: $title, description: $description, url: $url) {
            id
            description
            title
            url
            averageRating
          }
        }
      `,
      variables: {
        title: film.title,
        description: film.description,
        url: film.url,
        rating: film.averageRating,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => data.data.addFilm)
    .catch(console.error);
}
export async function rateFilm(id: string, rating: number, userId: string) {
  return await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation rateFilm($id: ID!, $rating: Int!, $userId: ID!) {
          rateFilm(id: $id, rating: $rating, userId: $userId) {
            id
            averageRating
          }
        }
      `,
      variables: { id, rating, userId },
    }),
  })
    .then((res) => res.json())
    .then((data) => data.data.rateFilm)
    .catch(console.error);
}
