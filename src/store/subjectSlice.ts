import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subject: '',
  proficiency: '',
  topic: '',
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
  },
});

export const { setSubject } = subjectSlice.actions;
export default subjectSlice.reducer;