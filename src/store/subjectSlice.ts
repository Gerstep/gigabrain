// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjectId: '',
  subjectName: '',
  classType: '',
  topicTitle: '',
  topic: '',
  contextData: '',
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
    setContext: (state, action) => {
      if (action.payload.contextData === 'reset') {
        state.contextData = '';
      } else {
        state.contextData = action.payload.contextData;
      }
    }
  },
});

export const { setSubject, setProgress, setContext, setClassType } = subjectSlice.actions;
export default subjectSlice.reducer;