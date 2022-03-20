import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import BreadCrumb from "../Common/BreadCrumb";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  // initialize blank form state
  const initialFormState = {
    name: "",
    description: "",
  };
  // declare deck for loading via readDeck(), get history and url deckId parameter
  const [deck, setDeck] = useState({ ...initialFormState });
  const history = useHistory();
  const { deckId } = useParams();
  // load deck based on deckId parameter
  useEffect(() => {
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
  }, [deckId]);
  // handle form data change
  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };
  // update deck and navigate to deck view after submit
  const handleSubmit = (event) => {
    event.preventDefault();
    async function updateDeckData() {
      await updateDeck(deck);
      history.push(`/decks/${deck.id}`);
    }
    updateDeckData();
  };
  // display breadcrumb, form for deck edits, and buttons for cancel and save
  return (
    <div>
      <BreadCrumb
        link={`/decks/${deckId}/edit`}
        linkName={deck.name}
        pageName={"Edit"}
      />
      <div className="container">
        <div className="row">
          <h1>Edit Deck</h1>
          <br />
        </div>
        <div className="row w-100">
          <DeckForm
            formData={deck}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}`}>
            <button className="btn btn-secondary mr-1">Cancel</button>
          </Link>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDeck;
