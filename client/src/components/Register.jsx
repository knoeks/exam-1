/* eslint-disable no-useless-escape */
import { useForm } from "react-hook-form";
import { postData } from "../helpers/post";
import { useState } from "react";
import { updateOne } from "../helpers/update";
import { useNavigate } from "react-router";

function Register({ setUpdate, book, setModalId }) {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  if (book) {
    const {title, author, price, cover, category} = book    
    setValue("title", title);
    setValue("author", author);
    setValue("price", price);
    setValue("cover", cover);
    setValue("category", category);
  };

  const formSubmitHandler = async (data) => {
    try {
      if (book) {
        
        await updateOne(book.id, {...data, reserved: book.reserved});
        setModalId("");
      } else {
        await postData({ ...data, reserved: false });
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
    setUpdate((prevState) => prevState + 1);
    reset();
  };

  return (
    <div className="w-full">
      <form
        className=" w-full flex flex-col items-center gap-4 py-8 bg-neutral-200"
        onSubmit={handleSubmit(formSubmitHandler)}
        noValidate
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <label className="w-24 block" htmlFor="title">
              Title:
            </label>
            <div>
              <input
                className="w-52"
                type="text"
                id="title"
                {...register("title", {
                  required: "Book title is required.",
                  minLength: {
                    value: 3,
                    message: "Title length must be between 3 and 100",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title length must be between 3 and 100",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex justify-center text-red-600 drop-shadow-lg">
            {errors.title?.message}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <label className="w-24 block" htmlFor="author">
              Author:
            </label>
            <div>
              <input
                className="w-52"
                type="text"
                id="author"
                {...register("author", {
                  required: "Book author is required.",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/g,
                    message: "only letters and spaces allowed",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex justify-center text-red-600 drop-shadow-lg">
            {errors.author?.message}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <label className="w-24 block self-start mt-2" htmlFor="price">
              Price:
            </label>
            <div className="w-52 flex flex-col ">
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Price is required.",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/g,
                    message: "price must be bigger than 0 and in 0.00 form",
                  },
                })}
              />
            </div>
          </div>
          <div className="flex justify-center text-red-600 drop-shadow-lg">
            {errors.price?.message}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <label className="w-24 block self-start mt-2" htmlFor="cover">
              Cover:
            </label>
            <div className="w-52 flex flex-col ">
              <input
              placeholder="jusu pattern nekoks :("
                type="text"
                id="cover"
                {...register("cover", {
                  required: "Cover is required."
                })}
              />
            </div>
          </div>
          <div className="flex justify-center text-red-600 drop-shadow-lg">
            {errors.cover?.message}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <label className="w-24 block mr-4" htmlFor="category">
              Category:
            </label>
            <select

              className="w-40"
              id="category"
              {...register("category", {
                required: "Book category is required",
              })}
            >
              <option value=""></option>
              <option className="text-center" value="Fiction">
                Fiction
              </option>
              <option className="text-center" value="Fantasy">
                Fantasy
              </option>
              <option className="text-center" value="Romance">
                Romance
              </option>
              <option className="text-center" value="Thriller">
                Thriller
              </option>
              <option className="text-center" value="Horror">
                Horror
              </option>
              <option className="text-center" value="Adventure">
                Adventure
              </option>
              <option className="text-center" value="Biographies">
                Biographies
              </option>
              <option className="text-center" value="History">
                History
              </option>
            </select>
          </div>
          <div className="flex justify-center text-red-600 drop-shadow-lg">
            {errors.category?.message}
          </div>
        </div>

        <div>
          <input
            className="px-4 py-2 bg-[#3c2a32] text-white hover:bg-neutral-600 rounded-lg transition-colors drop-shadow-md"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      {!error || <p className="flex justify-center">{error}</p>}
    </div>
  );
}

export default Register;
