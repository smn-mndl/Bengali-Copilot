import React, { useState } from "react";
import Characters from "./js/scenes/characters/Characters";
import data from "./data.json";
import "./form.scss";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    message: "",
  });

  const [namedEntity, setNamedEntity] = useState({});

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      message: "",
    });
  };

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/post_example", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: formData.message }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setNamedEntity(responseData);
    } catch (error) {
      //   setError(error.message);
    } finally {
      //   setIsLoading(false);
    }
  };

  return (
    <>
      <div className="main-cont">
        <form onSubmit={handleSubmit} className="form-comp">
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" onClick={() => fetchData()}>
            Submit
          </button>
        </form>

        <div className="character-comp">
          {Object.keys(namedEntity).length ? (
            <Characters data={namedEntity.response} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FormComponent;
