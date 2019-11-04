import { useState } from "react";

export const useRadio = (initialRadios) => {
  const [radios, setRadios] = useState(initialRadios);

  return {
    radios,
    handleChange: (e) => {
      setRadios({
        ...radios,
        [e.target.name]: e.target.value
      });
    },
    reset: () => {
      setRadios(initialRadios);
    }
  };
};
