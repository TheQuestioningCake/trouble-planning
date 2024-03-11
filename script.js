// created global variables for the functions to access
var currDayEL = $('#currentDay');

//allows the day to be shown in our header
var currTime = moment().format('dddd, MMMM Do');
currDayEL.text(currTime);

var containEl = $('.contain');

var currHour = moment().hour();

var scheduleHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];

var hourBlock = $('col-1 hour')

var event = $('.description')
// end of global variables

// function that checks to see what time of day it is and reassigns the class of each div to resemble that time of day
function timeBlock(blockEvent) {
    
    var currenthourBlock = moment($(hourBlock).text().trim(), 'hA').hour();

    $(blockEvent).removeClass('past present future');

    if (currenthourBlock > currHour) {
        $(blockEvent).addClass('future');
    }
    else if (currenthourBlock === currHour) {
        $(blockEvent).addClass('present');
    }
    else {
        $(blockEvent).addClass('past');
    }
}

// function to load events saved in our local storage
function loadEvent() {

    for (var i = 0; i < scheduleHours.length; i++) {
        let event = localStorage.getItem(scheduleHours[i])

        if (event) {
            $('#' + (i + 9)).siblings().first().children().text(event);
        }
    }
}
//function to save event in local storage
function saveEvent(hour, event) {
    localStorage.setItem(hour, event);
}

//for loop to add a timeblock for each hour of a regular 9-5 work day
for (var i = 0; i < scheduleHours.length; i++) {
    
    var blockRow = $('<div>')
        .addClass('row time-block')
        .attr({
            id: 'row-' + (i + 9)
        })

    
    var hourBlock = $('<div>')
        .addClass('col-1 hour')
        .text(scheduleHours[i])
        .attr({
            id: i + 9
        })

    
    var blockEvent = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
        })

    
    var userInput = $('<p>')
        .addClass('description')
        .text(' ')
        .attr({
            id: 'Hour-' + (i + 9)
        });

    
    timeBlock(blockEvent);

    //creates a save button for the user to click on
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button-' + (i + 9),
            type: 'button',
        })
        .on('click', function () {
            
            var hour = $(this).siblings().first().text();
            
            var event = $(this).siblings().last().text();
            // calling saveEvent function to save to local storage
            saveEvent(hour, event)
        })

    var icon = $('<i>')
        .addClass('fas fa-save');

    //makes appends so they show in the correct spot on the page   
    $(containEl).append(blockRow);
    
    $(blockRow).append(hourBlock);
    
    $(blockRow).append(blockEvent);
    
    $(blockEvent).append(userInput);
   
    $(blockRow).append(saveBtn);
    
    $(saveBtn).append(icon);
}

// allows user to interact with the page
$('.col-10').on('click', 'p', function () {

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

$('.col-10').on('blur', 'textarea', function () {

    var text = $(this)
        .val()
        .trim();

    var userText = $("<p>")
        .addClass("description")
        .text(text);

    $(this).replaceWith(userText);
})

// to loads events saved to local storage
loadEvent();