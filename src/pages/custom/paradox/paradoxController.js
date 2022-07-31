import Store from '../../../support/store';
import Comm from "../../../modules/rest/restCommunication";

export default {

    async getValues(fromTime, toTime) {
        if (Store.state.loggedIn) {
            let req = {from:fromTime, to:toTime};
            var res = await Comm.post('/paradox/get-events/', req);
            // console.log(res);
            return res;

        }
    },
}

