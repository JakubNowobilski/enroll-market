import { AnyAction } from 'redux';
import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import { acceptOffer, createOffer, createOneForOneOffer, deleteOffer } from '../../api/requests';
import * as A from './actions';
import * as C from './constants';
import notitier from '../../utils/notifications';
import { OfferParams } from '../../api/models';
import { getGlobalDataRequest } from '../globalData/actions';
import { refreshPageWorker } from '../offersListing/sagas';

export function* deleteOfferWorker(action: AnyAction) {
    try {
        yield call(deleteOffer, action.id);
        yield put(A.deleteOfferSuccess());
        notitier.success('Usunięcie oferty powiodło się.');
    } catch (error) {
        yield put(A.deleteOfferFail());
        notitier.alert('Usunięcie oferty nie powiodło się.');
    }
}

export function* acceptOfferWorker(action: AnyAction) {
    try {
        yield call(acceptOffer, action.offerId, action.courseId);
        yield put(A.acceptOfferSuccess());
        notitier.success('Akceptacja oferty powiodła się.');
    } catch (error) {
        yield put(A.acceptOfferFail());
        notitier.alert('Akceptacja oferty nie powiodła się.');
    }
}

export function* createOfferWorker(action: AnyAction) {
    try {
        if (action.type === C.OffersManagementActionType.CreateOneForOneOfferRequest) {
            yield call(createOneForOneOffer, {
                givenCourseId: action.givenCourseId,
                takenCourseId: action.takenCourseId,
            });
        } else if (action.type === C.OffersManagementActionType.CreateOfferRequest) {
            const params: OfferParams = {
                givenCourseId: action.givenCourseId,
                offerConditions: {
                    teacherIds: action.teacherIds,
                    timeBlocks: action.timeBlocks,
                }
            };

            yield call(createOffer, params);
        }
        
        yield put(A.createOfferSuccess());
        notitier.success('Dodanie oferty powiodło się.');
    } catch (error) {
        yield put(A.createOfferFail());
        notitier.alert('Dodanie oferty nie powiodło się.');
    }
}

export function* acceptOfferSuccessWorker() {
    yield put(getGlobalDataRequest());
    yield fork(refreshPageWorker);
}

export function* offersManagementWatcher() {
    yield all([
        takeEvery(C.OffersManagementActionType.DeleteOfferRequest, deleteOfferWorker),
        takeEvery([C.OffersManagementActionType.CreateOfferRequest, C.OffersManagementActionType.CreateOneForOneOfferRequest], createOfferWorker),
        takeEvery(C.OffersManagementActionType.AcceptOfferRequest, acceptOfferWorker),
        takeEvery(C.OffersManagementActionType.AcceptOfferSuccess, acceptOfferSuccessWorker),
    ]);
};