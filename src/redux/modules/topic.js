import {urls, getRequest, normalFetchData, normalFetchSuccess} from '../../utils/api'


const initialState = {
  topics: {}, // 以主题id为键，主题对象为值的字典
  topic: "", // 当前主题id值，对应topics中的id。
  latestTopics: [],
  hotTopics: [],
};


export const types = {
  GET_LATEST_TOPICS: 'TOPIC/GET_LATEST_TOPICS',
  GET_HOT_TOPICS: 'TOPIC/GET_HOT_TOPICS',
  GET_TOPIC_BY_ID: 'TOPIC/GET_TOPIC_BY_ID',
};


// action creators
const successActions = {
  getLatestTopicsSuccess: normalFetchSuccess(types.GET_LATEST_TOPICS),

  getHotTopicsSuccess: normalFetchSuccess(types.GET_HOT_TOPICS),

  getTopicByIdSuccess: normalFetchSuccess(types.GET_TOPIC_BY_ID),
};

const fetchActions = {
  getLatestTopics: normalFetchData(successActions.getLatestTopicsSuccess, () => getRequest(urls.getNewestTopics)),

  getHotTopics: normalFetchData(successActions.getHotTopicsSuccess, () => getRequest(urls.getHotTopics)),

  getTopicById: normalFetchData(successActions.getTopicByIdSuccess, param => getRequest(urls.getTopicInfo, param)),
};

export const actions = {...successActions, ...fetchActions};


const putTopics = (data, topics, topicsArray) => {
  if (data) {
    data.forEach(d => {
      topics[d.id] = d;
      topicsArray.push(d.id);
    })
  }

  return [topics, topicsArray];
};

// reducers
const reducers = (state = initialState, action) => {
  const topics = {
    ...state.topics,
  };
  let result = null;

  switch (action.type) {
    case types.GET_LATEST_TOPICS:
      const latestTopics = [];
      result = putTopics(action.data, topics, latestTopics);
      return {
        ...state,
        topics: result[0],
        latestTopics: action.data
      };
    case types.GET_HOT_TOPICS:
      const hotTopics = [];
      result = putTopics(action.data, topics, hotTopics);
      return {
        ...state,
        topics: result[0],
        hotTopics: action.data
      };
    case types.GET_TOPIC_BY_ID:
      let id = "";
      if (action.data[0]) {
        topics[action.data[0].id] = action.data[0];
        id = action.data[0].id;
      }
      return {
        ...state,
        topics: topics,
        topic: id
      };
    default:
      return state
  }
};


export default reducers;


// selectors
const getTopics = (state, topicsId) => {
  const topics = [];
  topicsId.forEach(d => {
    topics.push(state.topic.topics[d])
  });
  return topics;
};

export const getLatestTopics = state => {
  return state.topic.latestTopics;
};

export const getHotTopics = state => {
  return state.topic.hotTopics;
};

export const getTopicById = (state, id) => {
  return state.topic.topics[id];
};