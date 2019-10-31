import { useState } from "react";

export const useForm = (initialValues, initialErrors, initialFiles, validators) => {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState(initialErrors);

  return {
    values,
    files,
    errors,
    handleChange: (e) => {
      if (e.target.files) {
        let file = e.target.files[0];
        setFiles({ ...files, [e.target.name]: file });
      } else {
        let error = validators[`${e.target.id}`](e.target.value);
        setErrors({ ...errors, [e.target.id]: error });
        setValues({
          ...values,
          [e.target.name]: e.target.value
        });
      }
    },
    reset: () => {
      setValues(initialValues);
      setFiles(initialFiles);
      setErrors(initialErrors);
    }
  };
};
