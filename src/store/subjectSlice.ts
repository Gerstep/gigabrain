import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '',
  proficiency: '',
  topic: '',
  progress: [],
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload.subject;
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