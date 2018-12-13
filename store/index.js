"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482
  }
});

export const types = {
  //
};

export const getters = {
  getCurrentPosition: state => [state.currentPosition.lat, state.currentPosition.lng]
};

export const mutations = {
  UPDATE_CURRENT_POSITION(state, latlng) {
    state.currentPosition.lat = latlng.lat;
    state.currentPosition.lng = latlng.lng;
  }
};

export const actions = {
  getCurrentPosition({commit}, params) {
    GraphQLService.getCurrentPosition(params.axios, params.type).then(
      response => {
        commit('UPDATE_CURRENT_POSITION', response)
      }
    )
  }
};

let store;

const initStore = () => {
  return (
    store ||
    (store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions,
      modules: {
        examplemodule
      }
    }))
  );
};

export default initStore;
