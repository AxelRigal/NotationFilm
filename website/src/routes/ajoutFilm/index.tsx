import "./AjoutFilm.css";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addFilm } from "../../api/film";

export const Route = createFileRoute("/ajoutFilm/")({
  component: AjoutFilm,
});

type Inputs = {
  title: string;
  description: string;
  url: string;
  averageRating: number;
};

function AjoutFilm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    const response = await addFilm(data as any);

    navigate({ to: `/film/${response.id}` });
  };

  console.log("Errors", errors);
  return (
    <form className="ajout-film-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <h1>Ajout de film</h1>
      <img
        src="https://pretatourner.com/upload/default/636519b12ffe0180451063.webp"
        alt="image de création de film"
        style={{
          borderRadius: "1rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          maxWidth: "90vw",
          width: "400px",
          marginBottom: "2rem",
        }}
      />
      <div>
        <p>Nom du film</p>
        <input
          type="text"
          id="title"
          {...register("title", { required: true, minLength: 2 })}
        />
        {errors.title && (
          <div className="text-red-500">
            {errors.title.type === "required"
              ? "Le titre est obligatoire"
              : "Le titre doit avoir au moins 2 caractères"}
          </div>
        )}
      </div>
      <div>
        <p>Description</p>
        <input
          className="border"
          type="text"
          id="description"
          {...register("description", { required: true, minLength: 10 })}
        />
        {errors.description && (
          <div className="text-red-500">
            {errors.description.type === "required"
              ? "La description est obligatoire"
              : "La description doit avoir au moins 10 caractères"}
          </div>
        )}
      </div>
      <div>
        <p>URL</p>
        <input
          className="border"
          type="text"
          id="url"
          {...register("url", { required: true })}
        />
        {errors.url && (
          <div className="text-red-500">L'URL est obligatoire</div>
        )}
      </div>
      <button>Ajouter le film</button>
    </form>
  );
}
