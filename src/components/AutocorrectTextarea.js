import React, { useState } from "react";
import { useCheckWord } from "../hooks/useCheckWord";
import { AddWord } from "./AddWord";
import "./styles.css";

const CORRECTIONS = {
  realy: "really",
  wierd: "weird",
};

export const AutocorrectTextarea = () => {
  const [newCorrections, setNewCorrections] = useState(
    Object.keys(CORRECTIONS).map((word) => ({
      key: word,
      correction: CORRECTIONS[word],
    }))
  );
  const { text, checkTextArea, checkWord } = useCheckWord(newCorrections);
  const [misspelled, setMisspelled] = useState("");
  const [rightWord, setRightWord] = useState("");
  const [addNewWord, setAddNewWord] = useState(false);
  const [keyExist, setKeyExist] = useState(false);

  const handlerInputMisspelledChange = (e) => {
    setKeyExist(false);
    setMisspelled(e.target.value);
  };

  const handleNewCorrections = (e) => {
    e.preventDefault();

    for (let i = 0; i < newCorrections.length; i++) {
      if (newCorrections[i].key.toLowerCase() === misspelled.toLowerCase()) {
        setKeyExist(true);
        setMisspelled("");
        setRightWord("");
        return;
      }
    }

    if (!keyExist) {
      setNewCorrections([
        ...newCorrections,
        {
          key: misspelled,
          correction: rightWord,
        },
      ]);
    }

    setMisspelled("");
    setRightWord("");
    setAddNewWord(!addNewWord);
  };

  const handlerCancelButton = () => {
    setKeyExist(false);
    setMisspelled("");
    setRightWord("");
    setAddNewWord(!addNewWord);
  };

  return (
    <div className="container animate__animated animate__fadeInUp animate__slow">
      
      <h2 className="">You can add new words to the autocorrector!</h2>
      <AddWord
        handleNewCorrections={handleNewCorrections}
        handlerCancelButton={handlerCancelButton}
        handlerInputMisspelledChange={handlerInputMisspelledChange}
        misspelled={misspelled}
        setRightWord={setRightWord}
        rightWord={rightWord}
        keyExist={keyExist}
      />
      

      <hr />

      <div className="row mt-3">
        <div className="col-12 col-md-6 px-4 line-divided">
          <h4 className="text-center mb-4">
            Write your text here!
          </h4>
          <textarea
            data-testid="textarea"
            className="form-control"
            value={text}
            onChange={checkTextArea}
            onKeyDown={checkWord}
            name=""
            id=""
          ></textarea>
        </div>

        <div className="col-12 col-md-6 px-4 mt-4 mt-md-0">
          <h4 className="text-center mb-4">Correction's List</h4>
          <pre>{JSON.stringify(newCorrections, undefined, 2)}</pre>
        </div>
      </div>
    </div>
  );
};