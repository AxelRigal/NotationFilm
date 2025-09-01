import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div
      className="home-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#222",
        }}
      >
        Bienvenue sur le site de notation de films !
      </h2>
      <img
        src="https://www.webstickersmuraux.com/products/detalle/muestras/fotomurales/fomcol002mov.jpg"
        alt="Cinéma"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          maxWidth: "90vw",
          width: "400px",
          marginBottom: "2rem",
        }}
      />
      <p
        style={{
          fontSize: "1.2rem",
          color: "#444",
          maxWidth: 600,
          textAlign: "center",
        }}
      >
        Découvrez, partagez et notez vos films préférés.
        <br />
        Cliquez sur "Films" pour explorer la liste ou "Ajouter un film" pour
        enrichir la collection !
      </p>
    </div>
  );
}
