"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482,
    timeOfInformation: ""
  },
  currentUserShipData: {
    timeOfInformation: "10:00:00 14/12/2018 GMT",
    course: 120,
    speed: 5
  },
  vesselAisData: []
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
    state.vesselAisData.map(data => [
      data.position.latitude,
      data.position.longitude
    ])
};

export const mutations = {
  UPDATE_CURRENT_POSITION(state, data) {
    var newData = {
      timeOfInformation: data.timeOfInformation,
      lat: data.position.latitude,
      lng: data.position.longitude
    };
    var newDataString = JSON.stringify(newData);
    console.log("updating current user position data to:" + newDataString);
    state.currentPosition = newData;
  },
  // UPDATE_CURRENT_USER_SHIP_DATA(state, data) {
  //   var newData = {
  //     timeOfInformation: data.timeOfInformation,
  //     lat: data.position.latitude,
  //     lng: data.position.longitude
  //   };
  //   var newDataString = JSON.stringify(newData);
  //   console.log("updating user ship data to:" + newDataString);
  //   state.currentUserShipData = newData;
  // },
  UPDATE_VESSEL_AIS_DATA(state, data) {
    state.vesselAisData = data;
  }
};

export const actions = {
  updateCurrentPosition({ commit }, params) {
    GraphQLService.getCurrentPosition(params.axios).then(response => {
      console.log("current position resp", response);
      commit("UPDATE_CURRENT_POSITION", response);
    });
  },
  updateCurrentShipUserData({ commit }, params) {
    //TODO change this out for something sensible.
    // commit("UPDATE_CURRENT_USER_SHIP_DATA", {
    //   timeOfInformation: "10:00:00 14/12/2018 GMT",
    //   course: 170,
    //   speed: 7
    // });
  },
  updateVesselAisData({ commit }, params) {
    GraphQLService.getCurrentVesselAisData(params.axios).then(response => {
      console.log("vessel ais resp", response);
      if (response && response.length > 0) {
        commit("UPDATE_VESSEL_AIS_DATA", response);
      }
    });
  },
  updateStore({ dispatch }, params) {
    dispatch("updateCurrentPosition", params);
    dispatch("updateVesselAisData", params);
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
