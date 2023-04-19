// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjectId: '',
  subjectName: '',
  proficiency: '',
  topic: '',
  progress: [],
  contextData: '',
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subjectId = action.payload.subjectId;
      state.subjectName = action.payload.subjectName;
      state.proficiency = action.payload.proficiency;
      state.topic = action.payload.topic;
    },
    setProgress: (state, action) => {
      const { topic } = action.payload;
      state.progress.length > 0 ? state.progress[state.progress.length - 1] = { topic } : state.progress.push({ topic });
    },
    setContext: (state, action) => {
      if (action.payload.contextData === 'reset') {
        state.contextData = '';
      } else {
        state.contextData = state.contextData + action.payload.contextData;
      }
    }
  },
});

export const { setSubject, setProgress, setContext } = subjectSlice.actions;
export default subjectSlice.reducer;