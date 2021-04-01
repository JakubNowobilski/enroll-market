import { AnyAction } from '@reduxjs/toolkit';
import * as C from './constants';

export const offersListingReducer = (state = C.InitialOffersListingState, action: AnyAction): C.OffersListingState => {
    switch (action.type) {
        case C.OffersListingActionType.ChangePage:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
};

export default offersListingReducer;
