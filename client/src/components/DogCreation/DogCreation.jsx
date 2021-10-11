import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../../redux/actions/index";

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments)

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postDog(input));
    alert("Dog created!");
    setInput({
      name: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span: "",
      temperament: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <Fragment>
      <div>
        <div>
          <h2>Create your Woof</h2>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <h4>Heights</h4>
              <label>Min Height</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <p>cm</p>
              <label>Max Height</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="50"
                onChange={(e) => handleChange(e)}
                required
              />
              <p>cm</p>
            </div>
            <div>
              <h4>Weights</h4>
              <label>Min Weight</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="15"
                onChange={(e) => handleChange(e)}
                required
              />
              <p>kg</p>
              <label>Max Weight</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="32"
                onChange={(e) => handleChange(e)}
                required
              />
              <p>kg</p>
            </div>
            <div>
              <label>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="12 - 15 years"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Temperaments</label>
              <select onChange={(e)=>handleSelect(e)}>
                {
                    temperaments.map(temp=>{
                        return(<option key={temp.id} name={temp.name}>{temp.name}</option>)
                        })
                }
              </select>
              <div>
                <ul>
                  <li>{input.temperament.map((el) => el + ", ")}</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Link to="/home">
        <button>Cancel</button>
      </Link>
      <button type="submit">Creat 🐕</button>
    </Fragment>
  );
}
