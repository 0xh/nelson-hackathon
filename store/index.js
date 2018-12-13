"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482
  },
  vesselPositions: []
});

export const types = {
  //
};

export const getters = {
  getCurrentPosition: state => [
    state.currentPosition.lat,
    state.currentPosition.lng
  ],
  getVesselPositions: state =>
    state.vesselPositions.map(pos => [pos.lat, pos.lng])
};

export const mutations = {
  UPDATE_CURRENT_POSITION(state, latlng) {
    state.currentPosition.lat = latlng.lat;
    state.currentPosition.lng = latlng.lng;
  },
  UPDATE_VESSEL_POSITIONS(state, positions) {
    state.vesselPositions = positions;
  }
};

export const actions = {
  updateCurrentPosition({ commit }, params) {
    GraphQLService.getCurrentPosition(params.axios).then(
      response => {
        console.log(response)
        commit("UPDATE_CURRENT_POSITION", response);
      }
    );
  },
  updateVesselPositions({ commit }, params) {
    //TODO change this out for something sensible.  This is just POC

    commit("UPDATE_VESSEL_POSITIONS", [
      {
        lat: 47.41422,
        lng: -1.218482
      },
      {
        lat: 47.41222,
        lng: -1.229482
      }
    ]);
  },
  updateStore({ dispatch }, params) {
    dispatch("updateCurrentPosition", params);
    dispatch("updateVesselPositions", params);
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
