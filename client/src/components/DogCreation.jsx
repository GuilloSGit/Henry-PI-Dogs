import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postDog, getDogs } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Dog's name is required"
    }
    else if(!input.max_height){
        errors.height = "Dog's max height is required"
    }
    else if(!input.max_weight){
        errors.weight = "Dog's max weight is required"
    }
    else if(!input.max_life_span){
        errors.max_life_span = "Dog's max life-span is required"
    }
}