import { getOne } from "../helpers/get";
import { updateOne } from "../helpers/update";
import EditModal from "./modals/EditModal";

function Mechanic({ mechanic, setUpdate, modalId, setModalId }) {
  const { title, author, category, price, cover, reserved, id } = mechanic;

  const reserveHandler = async () => {
    const { reserved } = await getOne(id);
    await updateOne(id, {...mechanic, reserved: !reserved });
    setUpdate((prevState) => prevState + 1);
  };

  const openEditModalHandler = () => {
    console.log(modalId);
    if (modalId == id) {
      setModalId("");
    } else setModalId(id);
  };

  return (
    <div className="shadow m-3 border py-2 flex items-center justify-around">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <h1>{title}</h1>
          <p>{author}</p>
          <p>category: {category}</p>
          <p>price: {price}</p>
          <img src={cover} alt={title + " cover"} />
        </div>
        <div className="w-56 flex justify-center my-3">
          <button
            className="ml-4 shadow border px-1"
            onClick={() => reserveHandler(id)}
          >
            {reserved ? "turn back" : "reserved"}
          </button>
          <button
            className="ml-4 shadow border px-1"
            onClick={openEditModalHandler}
          >
            Edit mechanic Data
          </button>
        </div>
      </div>
      {modalId == id && (
        <EditModal setUpdate={setUpdate} modalId={modalId} setModalId={setModalId} mechanic={mechanic} />
      )}
    </div>
  );
}

export default Mechanic;
