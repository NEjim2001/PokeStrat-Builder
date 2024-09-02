import React, { useState } from "react";
import { BackDrop } from "./BackDrop";

const TextInputModal = ({ showInputModal, setImportData }) => {
  const [text, setText] = useState("");

  const handleClose = () => showInputModal(false);
  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = () => {
    setImportData(text.trimEnd());
    showInputModal(false);
  };

  return (
    <>
      <BackDrop onClick={handleClose}>
        <section
          onClick={handleClose}
          className="absolute z-10 inset-0 flex items-center justify-center h-screen"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primaryDark p-6 rounded-lg shadow-lg h-3/4 w-3/4 md:w-2/3 lg:w-1/3"
          >
            <h1 className="text-center text-2xl text-white font-semibold ">
              Import Pokemon
            </h1>
            <textarea
              value={text}
              onChange={handleChange}
              placeholder={`Gliscor @ Toxic Orb
Ability: Poison Heal
EVs: 184 HP / 252 Atk / 72 Spe
Adamant Nature
- Earthquake
- Swords Dance
- Facade
- Roost`}
              className="overflow-y-scroll h-5/6 w-full p-4 border border-black rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              className="w-full py-2 px-4  text-white font-semibold rounded-md hover:bg-white hover:text-black transition duration-200 bg-gradient-to-r from-yellow-600 to-yellow-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </section>
      </BackDrop>
    </>
  );
};

export default TextInputModal;
