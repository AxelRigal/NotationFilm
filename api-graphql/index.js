const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const cors = require("cors");

// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/graphqlfilms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// Modèle Mongoose
const filmSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  ratings: [Number],
});

const Film = mongoose.model("Film", filmSchema);

// Schéma GraphQL
const schema = buildSchema(`
  type Film {
    id: ID!
    title: String!
    description: String
    averageRating: Float
    ratings: [Int]
    url: String
  }

  type Query {
    films: [Film]
    film(id: ID!): Film
  }

  type Mutation {
    addFilm(title: String!, description: String!, url: String!): Film
    rateFilm(id: ID!, rating: Int!): Film
  }
`);

// Helper pour moyenne
function calculateAverage(ratings) {
  if (!ratings.length) return 0;
  return parseFloat(
    (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
  );
}

// Résolveurs
const root = {
  films: async () => {
    const films = await Film.find();
    return films.map((f) => ({
      id: f._id,
      title: f.title,
      description: f.description,
      ratings: f.ratings,
      averageRating: calculateAverage(f.ratings),
      url: f.url,
    }));
  },

  film: async ({ id }) => {
    const f = await Film.findById(id);
    if (!f) return null;
    return {
      id: f._id,
      title: f.title,
      description: f.description,
      ratings: f.ratings,
      url: f.url,
      averageRating: calculateAverage(f.ratings),
    };
  },

  addFilm: async ({ title, description, url }) => {
    const newFilm = new Film({
      title,
      description,
      url,
      ratings: [0], // Note initiale de 0
    });
    await newFilm.save();
    return {
      id: newFilm._id,
      title: newFilm.title,
      description: newFilm.description,
      ratings: newFilm.ratings,
      averageRating: calculateAverage(newFilm.ratings),
      url: newFilm.url,
    };
  },

  rateFilm: async ({ id, rating }) => {
    if (rating < 1 || rating > 5)
      throw new Error("La note doit être entre 1 et 5");
    const film = await Film.findById(id);
    if (!film) throw new Error("Film introuvable");

    film.ratings.push(rating);
    await film.save();

    return {
      id: film._id,
      title: film.title,
      description: film.description,
      ratings: film.ratings,
      averageRating: calculateAverage(film.ratings),
    };
  },
};

// Lancer le serveur
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use(cors());
app.listen(4000, () =>
  console.log("🚀 Serveur GraphQL sur http://localhost:4000/graphqlfilms")
);
