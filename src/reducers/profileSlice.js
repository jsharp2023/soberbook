import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    avatar: '',
    birthday: '',
    state: '',
    interest: '',
    job: '',
    education: '',
    sobrietyYears: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    updateAvatar(state, action) {
      state.user.avatar = action.payload;
    },
  },
});

export const { updateProfile, updateAvatar } = profileSlice.actions;

export const selectUserProfile = (state) => state.profile.user;

export default profileSlice.reducer;
