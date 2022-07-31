export default {
	getDateTimeString(timeAsLong){
		return this.getDateString(timeAsLong) + " " + this.getTimeString(timeAsLong);
	},

	getDateString(timeAsLong) {
		var date= new Date(timeAsLong);
		return date.getDate() + ". " + (date.getMonth() + 1) + ". " + date.getFullYear();
	},

	getTimeString(timeAsLong) {
		var date= new Date(timeAsLong);
		return this.leadingZero(date.getHours(), 2) + ":" + this.leadingZero(date.getMinutes(), 2) + ":" + this.leadingZero(date.getSeconds(), 2);
	},

	getDurationString(timeAsLongStart, timeAsLongEnd) {
		if (timeAsLongEnd == 0) {
			timeAsLongEnd = new Date().getTime();
		}

		let diff= timeAsLongEnd - timeAsLongStart;
		var date = new Date(diff);


		var days = Math.floor(diff/(1000*60*60*24));
		var hours = date.getUTCHours();
		var minutes = date.getUTCMinutes();
		var seconds = date.getUTCSeconds();

		var duration;
		switch (days) {
			case 0:
				duration = "";
				break;
			case 1:
				duration = "1dan ";
				break;
			default:
				duration = days + "dni ";
				break;

		}

		duration += this.leadingZero(hours, 2) + ":" + this.leadingZero(minutes, 2) + ":" + this.leadingZero(seconds, 2);

		return duration;
	},

	leadingZero(input, size) {
		var s = String(input);
		while (s.length < size) {
			s = "0" + s;
		}
		return s;
	},


}