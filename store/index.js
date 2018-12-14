"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";
import geolib from "geolib";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482
  },
  currentVelocity: {
    course: 50,
    speed: 10
  },
  futureCourse: [],
  course: [[37.41322, -1.219482]],
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
  getCurrentCourse: state => state.course,
  getFutureCourse: state => state.futureCourse,
  getCurrentVelocity: state => state.currentVelocity,
  getVesselPositions: state =>
    state.vesselPositions.map(pos => [pos.lat, pos.lng])
};

export const mutations = {
  UPDATE_CURRENT_POSITION(state, latlng) {
    state.currentPosition.lat = latlng.latitude;
    state.currentPosition.lng = latlng.longitude;
  },
  UPDATE_COURSE(state, latlng) {
    state.course.push([latlng.latitude, latlng.longitude])
  },
  UPDATE_CURRENT_VELOCITY(state, velocity) {
    state.currentVelocity.course = velocity.course
    state.currentVelocity.speed = velocity.speed
  },
  UPDATE_FUTURE_COURSE(state, velocity) {
    const lastpos = state.course.pop();
    const lastPoint = {lat: lastpos[0], lon: lastpos[1]}
    const dist = 12345;
    const bearing = velocity.course;
    const predictedCourse = geolib.computeDestinationPoint(lastPoint, dist, bearing);
    state.futureCourse = [lastpos, [predictedCourse.latitude, predictedCourse.longitude]]
  },
  UPDATE_VESSEL_POSITIONS(state, positions) {
    state.vesselPositions = positions;
  }
};

export const actions = {
  updateCurrentPosition({ commit }, params) {
    GraphQLService.getCurrentPosition(params.axios).then(
      response => {
        commit("UPDATE_CURRENT_POSITION", response);
        commit("UPDATE_COURSE", response);
      }
    );
  },
  updateCurrentCourse({ commit }, params) {
    GraphQLService.getCurrentVelocity(params.axios).then(
      response => {
        console.log('resp', response)
        commit("UPDATE_CURRENT_VELOCITY", response);
        commit("UPDATE_FUTURE_COURSE", response);
      }
    );
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
    dispatch("updateCurrentCourse", params);
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
