"use strict";

import Vuex from "vuex";

import examplemodule from "@/store/examplemodule";
import GraphQLService from "../services/GraphQLService";
import geolib from "geolib";

export const state = () => ({
  currentPosition: {
    lat: 37.41322,
    lng: -1.219482,
    timeOfInformation: ""
  },
  currentVelocity: {
    course: 50,
    speed: 10
  },
  futureCourse: [],
  course: [[37.41322, -1.219482]],
  vesselPositions: [],
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
  getCurrentCourse: state => state.course,
  getFutureCourse: state => {
    console.log("getting future course:", state.futureCourse)
    var futureCourse = state.futureCourse.map(course => [course[0], course[1]])
    console.log("future course: ", futureCourse)
    return futureCourse
  },
  getCurrentVelocity: state => state.currentVelocity,
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
    var newDataString = JSON.stringify(data);
    console.log("updating current user position data to:" + newDataString);
    state.currentPosition = data;
  },
  UPDATE_COURSE(state, latlng) {
    state.course.push([latlng.lat, latlng.lng])
  },
  UPDATE_CURRENT_VELOCITY(state, velocity) {
    state.currentVelocity.course = velocity.course
    state.currentVelocity.speed = velocity.speed
  },
  UPDATE_FUTURE_COURSE(state, velocity) {
    const lastpos = state.course.pop();
    const lastPoint = {lat: lastpos[0], lon: lastpos[1]}
    const dist = 500;
    const bearing = velocity.course;
    let predictedCourse;
    let futureCourse = [];
    futureCourse.push(lastpos)

    for(var i = 0; i< 10; i++) {
      predictedCourse = geolib.computeDestinationPoint(lastPoint, dist + (i * 500), bearing);
      futureCourse.push([predictedCourse.latitude, predictedCourse.longitude])
    }
    //state.futureCourse = [{lat:lastpos[0], lng:lastpos[1]}, {lat: predictedCourse.latitude, lng: predictedCourse.longitude}] //[lastpos, [predictedCourse.latitude, predictedCourse.longitude]]
    state.futureCourse = futureCourse;
    console.log('state.futureCourse', state.futureCourse)
  },
  UPDATE_VESSEL_POSITIONS(state, positions) {
    state.vesselPositions = positions;
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
  //updateCurrentCourse({ commit }, params) {
    // GraphQLService.getCurrentVelocity(params.axios).then(
    //   response => {
    //     console.log('resp', response)
    //     commit("UPDATE_CURRENT_VELOCITY", response);
    //     commit("UPDATE_FUTURE_COURSE", response);
    //   }
    // );

  async updateCurrentCourse({ commit }, params) {
    var response = await GraphQLService.getCurrentVelocity(params.axios);
    console.log('resp', response)
    commit("UPDATE_CURRENT_VELOCITY", response);
    commit("UPDATE_FUTURE_COURSE", response);
  },
  async updateCurrentPosition({ commit }, params) {
    var response = await GraphQLService.getCurrentPosition(params.axios);
    var newData = {
      timeOfInformation: response.timeOfInformation,
      lat: response.position.latitude,
      lng: response.position.longitude
    };
    console.log("current position resp", response);
    commit("UPDATE_CURRENT_POSITION", newData);
    commit("UPDATE_COURSE", newData);
    return newData;
  },
  updateCurrentShipUserData({ commit }, params) {
    //TODO change this out for something sensible.
    // commit("UPDATE_CURRENT_USER_SHIP_DATA", {
    //   timeOfInformation: "10:00:00 14/12/2018 GMT",
    //   course: 170,
    //   speed: 7
    // });
  },
  async updateVesselAisData({ commit }, params) {
    var response = await GraphQLService.getCurrentVesselAisData(
      params.axios,
      params.currentPosition
    );
    console.log("vessel ais resp", response);
    if (response && response.length > 0) {
      commit("UPDATE_VESSEL_AIS_DATA", response);
    }
  },
  async updateStore({ dispatch }, params) {
    var currentPosition = await dispatch("updateCurrentPosition", params);
    params.currentPosition = currentPosition;
    dispatch("updateVesselAisData", params);
    dispatch("updateCurrentShipUserData", params);
    dispatch("updateCurrentCourse", params);
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
