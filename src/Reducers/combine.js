import switchFavourite from "./switchFavourite"
import { combineReducers } from "redux";

const myReducers = combineReducers({
    favorite: switchFavourite
})


export default myReducers;