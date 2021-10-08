import React from "react";
import { Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import SearchBar from "../SearchBar/SearchBar";
import DogArea from "../DogArea/DogArea";

export default function Home() {

  return (
    <Fragment>
      <NavBar />
      <SearchBar />
      <SideBar />
      <DogArea />
    </Fragment>
  );
}
