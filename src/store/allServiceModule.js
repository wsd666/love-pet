import axios from "axios";
export default {
  namespaced: true,
  state: {
    services: [],
    service: {
      name:"",
      useTime:"",
      prie:"",
      waiter:"",
      schedule:"",
      serviceTypeId:"",
      serviceType:{name:""},
      visible: false
    },
    waiter: [],
    serviceType: [],
    pagenation: {},
    searchRule: {
      type: "",
      value: ""
    },
    shopId: ""
  },
  mutations: {
    setServices(state, services) {
      state.services = services;
    },
    setServiceType(state, serviceType) {
      state.serviceType = serviceType;
    },
    setPagenation(state, pagenation) {
      state.pagenation = pagenation;
    },
    setShopId(state, setShopId) {
      state.shopId = setShopId;
    },
    setSearchRule(state, searchRule) {
      state.searchRule = searchRule;
    },
    setWaiter(state, waiter) {
      state.waiter = waiter;
    },
    setUpdateService(state, service) {
      state.service = { ...service, visible: true };
    },
    setUpdateServiceVis(state, visible) {
      state.service = { ...state.service, visible };
    }
  },
  actions: {
    getServiceType({ commit }, rule = {}) {
      let shopId = rule.shopId;
      axios({
        method: "get",
        url: "/service/getServiceType",
        params: { shopId }
      }).then(res => {
        commit("setServiceType", res.data);
      });
    },
    getServices({ commit }, rule = {}) {
      let shopId = rule.shopId;
      let page = rule.page || 1;
      let rows = rule.rows || 5;
      let type = rule.type || "";
      let value = rule.value || "";
      axios({
        method: "get",
        url: "/service/getServices",
        params: { page, rows, type, value, shopId }
      }).then(res => {
        commit("setServices", res.data.rows);
        commit("setPagenation", res.data);
      });
    },
    deleteServices({ commit }, id) {
      axios({
        method: "delete",
        url: "/service/deleteServices/" + id
      }).then(res => {});
    },
    addServices({ commit }, addMess) {
      axios({
        method: "post",
        url: "/service/addServices",
        data: addMess
      }).then(res => {});
    },
    getWaiter({ commit }, id) {
      axios({
        method: "get",
        url: "/service/getWaiter/" + id
      }).then(res => {
        commit("setWaiter", res.data);
        commit("setShopId",id);
      });
    },
    getUpdateService({ commit }, id) {
      axios({
        method: "get",
        url: "/service/getUpdateService/" + id
      }).then(res => {
        commit("setUpdateService", res.data);
      });
    },
    updateService({ commit }, data) {
      axios({
        method: "put",
        url: "/service/updateService/" + data._id,
        data: data
      }).then(res => {});
    }
  }
};
