import { RootState } from "../root-reducer";

export const getCurrentUser = (state: RootState) => state.session.currentUser;
