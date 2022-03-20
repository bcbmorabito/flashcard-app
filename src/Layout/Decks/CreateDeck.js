import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import BreadCrumb from "../Common/BreadCrumb";
import { createDeck } from "../../utils/api/index";

function NewDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({...initialFormState});
  const history = useHistory();

  // handle change in form data
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // handle submission for new deck form data
  const handleSubmit = (event) => {
    event.preventDefault();
    async function createNewDeck() {
      try {
        const deck = await createDeck(formData);
        history.push(`/decks/${deck.id}`);
      } catch (error) {
        if (error !== "AbortError") {
          throw error;
        }
      }
    }
    createNewDeck();
  };

  return (
    <div>
      <BreadCrumb link={`/decks/new`} pageName={"Create Deck"} />
      <div>
        <h1>Create Deck</h1>
        <br />
        <DeckForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <br />
        <Link to="/">
          <button className="btn btn-secondary mr-1">Cancel</button>
        </Link>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default NewDeck();
