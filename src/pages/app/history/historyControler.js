import Store from '../../../support/store';
import Comm from "../../../modules/rest/restCommunication";

export default {

    async getValues(fromTime, toTime, filter) {
        if (Store.state.loggedIn) {
            let req = {from:fromTime, to:toTime,filter:filter, groupId:Store.state.user.groupId};
            var res = await Comm.post('/alarms/get-history/', req);
            // console.log(res);
            return res;

        }
    },
}

