$(document).ready(function() {
    function startChange() {
        var startDate = start.value(),
            endDate = end.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            if(endDate && (endDate < startDate))
                end.value(startDate);
            end.min(startDate);
        } else if (endDate) {
            start.max(new Date(endDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    function endChange() {
        var endDate = end.value(),
            startDate = start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            start.max(endDate);
        } else if (startDate) {
            end.min(new Date(startDate));
        } else {
            endDate = new Date();
            start.max(endDate);
            end.min(endDate);
        }
    }

    var today = new Date(kendo.format('{0:MM-dd-yyyy}', new Date()))

    var start = $("#startDateTimePicker").kendoDateTimePicker({
        culture: "pl-PL",
        value: today,
        start: "month",
        depth: "year",
        interval: 15,
        timeFormat: "HH:mm",
        format: "dd/MM/yyyy HH:mm",
        change: startChange
    }).data("kendoDateTimePicker");

    var end = $("#endDateTimePicker").kendoDateTimePicker({
        culture: "pl-PL",
        value: today,
        start: "month",
        depth: "year",
        interval: 15,
        timeFormat: "HH:mm",
        format: "dd/MM/yyyy HH:mm",
        change: endChange
    }).data("kendoDateTimePicker");

    start.max(end.value());
    end.min(start.value());
});