import { createContext, useState, useEffect, useContext } from "react";
import axios from "../api/axios";

export const ItemsContext = createContext();
export const ItemsUpdateContext = createContext();

export function useItems() {
  return useContext(ItemsContext);
}
export function useItemsUpdate() {
  return useContext(ItemsUpdateContext);
}

export function ItemsProvider({ children }) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [size, setSize] = useState("");
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [link, setLink] = useState("");

  const [nameUpdate, setNameUpdate] = useState("");
  const [detailsUpdate, setDetailsUpdate] = useState("");
  const [sizeUpdate, setSizeUpdate] = useState("");
  const [makerUpdate, setMakerUpdate] = useState("");
  const [modelUpdate, setModelUpdate] = useState("");
  const [linkUpdate, setLinkUpdate] = useState("");

  const [id, setId] = useState("");

  const [modal, setModal] = useState(false);
  const [modalPut, setModalPut] = useState(false);

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const GetItems = async () => {
    const response = await axios.get("/items", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.items.reverse());
  };

  // useEffect(() => {
  //   GetItems().catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

  const PostItem = async (e) => {
    try {
      if (name && details && size && maker && model && link) {
        await axios.post(
          "/items",
          {
            name,
            details,
            size,
            maker,
            model,
            link,
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setName("");
        setDetails("");
        setSize("");
        setMaker("");
        setModel("");
        setLink("");
        GetItems();
        toggleModal();
      } else {
        console.log("Fill all fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateItem = (id) => {
    axios
      .put(
        `/items/${id}`,
        {
          name: nameUpdate,
          details: detailsUpdate,
          size: sizeUpdate,
          maker: makerUpdate,
          model: modelUpdate,
          link: linkUpdate,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.status === 200) {
          GetItems();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // toggleModalUpdate();
    setModalPut(false);
  };

  const DeleteItem = (id) => {
    axios
      .delete(`/items/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        GetItems();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <ItemsContext.Provider
      value={{
        name,
        setName,
        details,
        setDetails,
        size,
        setSize,
        maker,
        setMaker,
        model,
        setModel,
        link,
        setLink,
        nameUpdate,
        setNameUpdate,
        detailsUpdate,
        setDetailsUpdate,
        sizeUpdate,
        setSizeUpdate,
        makerUpdate,
        setMakerUpdate,
        modelUpdate,
        setModelUpdate,
        linkUpdate,
        setLinkUpdate,
        id,
        setId,
        data,
        setData,
        modal,
        setModal,
        modalPut,
        setModalPut,
      }}
    >
      <ItemsUpdateContext.Provider
        value={{
          GetItems,
          PostItem,
          UpdateItem,
          DeleteItem,
          toggleModal,
        }}
      >
        {children}
      </ItemsUpdateContext.Provider>
    </ItemsContext.Provider>
  );
}
