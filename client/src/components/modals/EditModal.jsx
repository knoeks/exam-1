import Register from "../Register";
import close from "../../assets/closeIcon.svg";

const EditModal = ({ modalId, setUpdate, setModalId, book }) => {

  const closeModalHandler = () => {
    setModalId("");
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getOne(modalId);
  //       setData(result);
  //       console.log(result.category);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   if (modalId) fetchData();
  // }, [modalId]);

  if (!modalId) return null;

  return (
    <dialog
      open
      className="fixed w-1/2 bg-neutral-200 h-[32rem] top-1/2 bottom-1/2 shadow-2xl border border-sky-200 rounded-2xl flex flex-col justify-center items-center"
    >
      <button
        onClick={closeModalHandler}
        className="self-end relative right-4 top-4"
      >
        <img src={close} alt="close icon" />
      </button>
      <p className="self-center mb-8 font-bold underline">UPDATE BOOK</p>
      <Register setUpdate={setUpdate} book={book} setModalId={setModalId} />
    </dialog>
  );
};

export default EditModal;
