//datapickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/ko";
import "flatpickr/dist/themes/airbnb.css"


flatpickr("#start-day", {
	locale: "ko",
	mode: "range",
	dateFormat: "Y-m-d",
	maxDate: "today",
	onChange: (selectedDates, dateStr, instance) => {
		console.log(selectedDates);
		console.log(dateStr);
		console.log(instance);
	}
});