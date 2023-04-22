// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjectId: '',
  subjectName: '',
  classType: '',
  topicTitle: '',
  topic: '',
  topicTask: '',
  topicPerson: '',
  contextData: '',
  definitions: []
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subjectId = action.payload.subjectId;
      state.subjectName = action.payload.subjectName;
    },
    setProgress: (state, action) => {
      state.topicTitle = action.payload.topicTitle;
    },
    setClassType: (state, action) => {
      state.classType = action.payload.classType;
    },
    setPerson: (state, action) => {
      state.topicPerson = action.payload.topicPerson;
    },
    setTask: (state, action) => {
      state.topicTask = action.payload.topicTask;
    },

    // Array of definitions
    // Definition: {term: term, definition: definition}
    setTask: (state, action) => {
      state.definitions.push(action.payload.definition);
    },
    setContext: (state, action) => {
      if (action.payload.contextData === 'reset') {
        state.contextData = '';
      } else {
        state.contextData = action.payload.contextData;
      }
    }
  },
});

export const { setSubject, setProgress, setContext, setClassType, setPerson, setTask } = subjectSlice.actions;
export default subjectSlice.reducer;