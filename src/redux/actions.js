import {CREATE_POST, FETCH_POST, HIDE_LOADER, SHOW_LOADER} from "./types";
import {API_POST} from "../api_const/api";

export function createPost(post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function fetchPosts() {
    return async dispatch => {
        dispatch(showLoader());
        const res = await fetch(API_POST);
        const json = await res.json();

        //Only for display loader
        setTimeout(()=>{
            dispatch({type: FETCH_POST, payload: json});
            dispatch(hideLoader());
        }, 500)
    }
}