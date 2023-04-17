// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjectId: '',
  subjectName: '',
  proficiency: '',
  topic: '',
  progress: [],
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
      const { topic  } = action.payload;
      state.progress.length > 0 ? state.progress[state.progress.length - 1] = { topic } : state.progress.push({ topic });
    },
  },
});

export const { setSubject, setProgress } = subjectSlice.actions;
export default subjectSlice.reducer;