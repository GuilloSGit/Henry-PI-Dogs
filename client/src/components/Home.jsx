import { React } from "react";
import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { getDogs } from "../actions";
import { Link } from 'react-router-dom';

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);

    useEffect(() => {
        dispatch(getDogs());
    },[])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <Link to='/dogs'>Creat a dog</Link>
            <h1>Doguie Woooof</h1>
            <button onClick={e=>{handleClick(e)}}>Retrieve all dogs</button>
            <div>
                <select>
                    <option value='asc'>Asc</option>
                    <option value='desc'>Desc</option>
                </select>
                <select>
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                    <option value="breed_group">Breed</option>
                    <option value="temperament">Temper</option>
                </select>
                <select>
                    <option value="all">All Woooofs</option>
                    <option value="own">Your Woooofs</option>
                    <option value="db">DB Woooofs</option>
                </select>
            </div>
        </div>
    )
}