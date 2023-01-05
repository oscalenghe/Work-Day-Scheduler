//creating an array for each timeslot 
$(function currentTime() {
    var today = dayjs();
    var time9am = $("#9AM");
    var time10am = $("#10AM");
    var time11am = $("#11AM");
    var time12pm = $("#12PM");
    var time1pm = $("#1PM");
    var time2pm = $("#2PM");
    var time3pm = $("#3PM");
    var time4pm = $("#4PM");
    var time5pm = $("#5PM");
    var saveBtn = $(".save-img");
    var timeSlotElArray = [
        time9am, time10am, time11am, time12pm, time1pm, time2pm, time3pm, time4pm, time5pm];
    $("#currentDay").text(today.format("dddd, MMMM D YYYY h:mm:ss"));


    // renders what is in the local storage, and displays it
    function renderTask() {
        for (var el of timeSlotElArray) {
            el.val(localStorage.getItem("time" + el.data( "hour")));
        }
    }
    renderTask();
    
    
    //Shows the time, and changes the color of the blocks depending on present, past and future
    function timeChange() {
        var currentTime = dayjs().hour();
        console.log(currentTime)
        $('.time-block').each(function () {
            console.log($(this));
            console.log($(this).attr("id").split('-')[1]);
            var Time = parseInt($(this).attr("id").split('-')[1]);  
            
            if (Time < currentTime) {
                $(this).addClass("past");
            } else if (Time === currentTime) {
                $(this).addClass("present");
                $(this).removeClass("past");
            } else {
                $(this).addClass("future");
                $(this).removeClass("past");
                $(this).removeClass("present");
            }
        })
    }
    //  Shows clock in real time
    timeChange();
    setInterval(function () {
        $("#currentDay").text(dayjs().format("dddd, MMMM D YYYY h:mm:ss"));
    }, 1000)
    
        

// This is what occurs when the save button is clicked; local storage is saving what is typed
function submitForm(event) {
    event.preventDefault();

    var clickBtn = $(event.currentTarget);
    var text = clickBtn.siblings("textarea");
    var time = text.data("hour");

    localStorage.setItem("time" + time, text.val());

}

saveBtn.on("click", submitForm);

});