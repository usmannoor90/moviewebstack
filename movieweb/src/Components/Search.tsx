import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Input {
  input: string;
}

function Search() {
  const { register, reset, handleSubmit } = useForm<Input>();
  const navigate = useNavigate();

  const submitHanlder = (e: FieldValues) => {
    navigate(`/home/searched/` + e.input);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHanlder)}>
      <input className="input" type="text" {...register("input")} />
    </form>
  );
}

export default Search;
