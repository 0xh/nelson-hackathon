"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482
  },
  currentUserShipData: {
    timeOfInformation: "10:00:00 14/12/2018 GMT",
    course: 120,
    speed: 5
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
  getCurrentUserShipDataAsString: state =>
    `Current ship data: 
    Time: ${state.currentUserShipData.timeOfInformation}
    Course: ${state.currentUserShipData.course}
    Speed: ${state.currentUserShipData.speed} knots`,
  getVesselPositions: state =>
    state.vesselPositions.map(pos => [pos.lat, pos.lng])
};

export const mutations = {
  UPDATE_CURRENT_POSITION(state, latlng) {
    state.currentPosition.lat = latlng.latitude;
    state.currentPosition.lng = latlng.longitude;
  },
  UPDATE_CURRENT_USER_SHIP_DATA(state, data) {
    state.currentUserShipData = data;
  },
  UPDATE_VESSEL_POSITIONS(state, positions) {
    state.vesselPositions = positions;
  }
};

export const actions = {
  updateCurrentPosition({ commit }, params) {
    GraphQLService.getCurrentPosition(params.axios).then(
      response => {
        console.log('resp', response)
        commit("UPDATE_CURRENT_POSITION", response);
      }
    );
  },
  updateCurrentShipUserData({ commit }, params) {
    //TODO change this out for something sensible.

    commit("UPDATE_CURRENT_USER_SHIP_DATA", {
      timeOfInformation: "10:00:00 14/12/2018 GMT",
      course: 170,
      speed: 7
    });
  },
  updateVesselPositions({ commit }, params) {
    //TODO change this out for something sensible.  This is just POC

    commit("UPDATE_VESSEL_POSITIONS", [
      {
        lat: 47.43422,
        lng: -1.217482
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
    dispatch("updateCurrentShipUserData", params);
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
