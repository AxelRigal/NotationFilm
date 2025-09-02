import { useState } from "react";
import type { Film } from "../../types/film";
import { rateFilm } from "../../api/film";
import { StarRating } from "../utils/StarRating";
import useAuth from "../../hook/useAuth";

type Props = {
  film: Film;
  onSpecificPage: boolean;
};

export default function FilmCard({ film, onSpecificPage }: Props) {
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | undefined>(
    film.averageRating
  );
  const [hovered, setHovered] = useState(false);

  // console.log("User in FilmCard:", user);

  const handleRate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        setMessage("Veuillez vous connecter pour noter.");
        return;
      }
      const updatedFilm = await rateFilm(film.id, rating, user.uid);
      setAverageRating(updatedFilm.averageRating);
      setMessage("Merci pour votre note !");
    } catch (err) {
      setMessage("Erreur lors de l'envoi de la note.");
    }
  };

  return (
    <div className="film-card">
      <img src={film.url} alt={film.title} className="film-image" />
      <div className="film-content">
        <h2 className="film-title">{film.title}</h2>
        <p className="film-description">{film.description}</p>
        <div className="film-rating">
          <span>Note moyenne : </span>
          <span style={{ color: "#ffd700", fontWeight: "bold" }}>
            {averageRating ?? "N/A"}
          </span>
        </div>
        {onSpecificPage && (
          <form onSubmit={handleRate} style={{ marginTop: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Noter ce film :
            </label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <StarRating value={rating} onChange={setRating} />
              {hovered && rating === 0 && (
                <span
                  style={{
                    color: "#d32f2f",
                    marginTop: "0.5rem",
                    fontSize: "1rem",
                  }}
                >
                  Sélectionnez une note pour pouvoir envoyer
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={rating === 0}
              style={{
                marginTop: "1rem",
                background: "#ffd700",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                fontWeight: "bold",
                cursor: rating === 0 ? "not-allowed" : "pointer",
                opacity: rating === 0 ? 0.6 : 1,
              }}
            >
              Envoyer
            </button>
          </form>
        )}
        {message && (
          <div style={{ marginTop: "0.5rem", color: "green" }}>{message}</div>
        )}
      </div>
    </div>
  );
}
