import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonalDetailsContextDto } from './dtos/personalDetailsContext.dto';

interface FormState {
  eventDate : string,
  location: string,
  startTime: string,
  endTime: string,
  eventType: string,
  guestCount: number,
  packageChoiceId: number,
  personalDetails: PersonalDetailsContextDto,
}

const initialState: FormState = {
  eventDate: new Date().toISOString(),
  location: '',
  startTime: '',
  endTime: "",
  eventType: '',
  guestCount: 0,
  packageChoiceId: -1,
  personalDetails: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: <K extends keyof FormState>(
      state: FormState,
      action: PayloadAction<{ key: K; value: FormState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value
    },
    resetForm : () => initialState
  }
});

export const {updateField, resetForm} = formSlice.actions;
export default formSlice.reducer;
export type { FormState }

