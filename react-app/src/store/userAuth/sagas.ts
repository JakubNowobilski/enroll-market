import { put, takeEvery, all, call, delay } from 'redux-saga/effects';
import { getMe } from '../../api/requests';
import * as A from './actions';
import * as C from './constants'
import notitier from '../../utils/notifications';
import { AnyAction } from '@reduxjs/toolkit';

export function* getUserDataWorker(action: AnyAction) {
    try {
        yield delay(10000);
        const { data: myData } = yield call(getMe, action.token);
        yield put(A.getUserDataSuccess(myData));
    } catch (error) {
        yield put(A.getUserDataFail());
        notitier.alert('Ładowanie danych użytkownika nie powiodło się. Odśwież, by spróbować jeszcze raz.');
    }
}

export function* userDataWatcher() {
    yield all([
        takeEvery([C.UserAuthActionType.GetUserDataRequest], getUserDataWorker),
    ]);
};