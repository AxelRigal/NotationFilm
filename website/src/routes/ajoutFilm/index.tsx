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
    console.log("Formulaire", data);
    const response = await addFilm(data as any);
    console.log("Film added:", response);
    navigate({ to: `/film/${response.id}` });
  };
  return (
    <form className="ajout-film-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <h1>Ajout de film</h1>
      <div>
        <p>Nom du film</p>
        <input
          type="text"
          id="title"
          {...register("title", { required: true, minLength: 2 })}
        />
        {errors.title && (
          <div className="text-red-500">{errors.title.message}</div>
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
          <div className="text-red-500">{errors.description.message}</div>
        )}
      </div>
      <div>
        <p>URL de l'image</p>
        <input
          className="border"
          type="text"
          id="url"
          {...register("url", { required: true, minLength: 10 })}
        />
        {errors.url && <div className="text-red-500">{errors.url.message}</div>}
      </div>
      <div>
        <p>Note (entre 1 et 5)</p>
        <input
          className="border"
          type="text"
          id="averageRating"
          {...register("averageRating", {
            required: true,
            min: 0,
            max: 5,
            valueAsNumber: true,
          })}
        />
        {errors.averageRating && (
          <div className="text-red-500">{errors.averageRating.message}</div>
        )}
      </div>
      <button>Ajouter le film</button>
    </form>
  );
}
