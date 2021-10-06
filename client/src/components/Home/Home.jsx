import React, { Fragment } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import {
  getDogs
} from '../../redux/actions/index';
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  useEffect (() => {
    dispatch(getDogs());
  },[dispatch]) 

  return (
    <Fragment>
      <NavBar />
      <SideBar/>
      <div></div>
    </Fragment>
  );
}
