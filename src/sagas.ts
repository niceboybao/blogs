import {all, fork} from 'redux-saga/effects';

//各个组件的sagas
import sagaTeam1 from './containers/Team1/sagas';
import sagaTeam3 from './containers/Team3/sagas';
import sagaTeam4 from './containers/Team4/sagas';
import sagaHomePage from './containers/HomePage/sagas';

export default function* rootSaga() {
    yield all([
        //创建一条 Effect 描述信息，指示 middleware 以 无阻塞调用 方式执行 fn。
        fork(sagaTeam1),
        fork(sagaTeam3),
        fork(sagaTeam4),

        // ---------add saga----------//
        fork(sagaHomePage)
    ]);
};
