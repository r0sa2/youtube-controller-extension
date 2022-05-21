var video, ytpChromeBottom, ytpTimeDisplay; // YouTube HTML elements
var slider; // Range slider
var startTime, endTime; // Start and end time (in seconds)
var leftBracket, startTimeElement, separator, endTimeElement, rightBracket; // Start and end time display HTML elements
var timeFormatStartIndex, timeFormatLength; // Start and end time display format

function init() {
    video = document.querySelector("video");
    ytpChromeBottom = document.querySelector(".ytp-chrome-bottom");
    ytpTimeDisplay = document.querySelector(".ytp-time-display.notranslate");

    // Create slider
    slider = document.createElement("div");
    slider.setAttribute("id", "slider");
    ytpChromeBottom.appendChild(slider);

    startTime = 0;
    endTime = !isNaN(video.duration) ? video.duration : 0;

    // Set start and end time display format
    if (endTime < 3600) {
        timeFormatStartIndex = 14;
        timeFormatLength = 5; 
    } else {
        timeFormatStartIndex = 11;
        timeFormatLength = 8;
    }

    // Create start and end time display HTML elements
    leftBracket = document.createElement("span");
    startTimeElement = document.createElement("span");
    separator = document.createElement("span");
    endTimeElement = document.createElement("span");
    rightBracket = document.createElement("span");

    leftBracket.setAttribute("style", "font-weight: bold; margin-left: 8px; margin-right: 1px");
    startTimeElement.setAttribute("style", "font-weight: bold;");
    separator.setAttribute("style", "font-weight: bold; margin-left: 4px; margin-right: 4px");
    endTimeElement.setAttribute("style", "font-weight: bold;");
    rightBracket.setAttribute("style", "font-weight: bold; margin-left: 1px; margin-right: 8px");
    
    leftBracket.innerHTML = "(";
    startTimeElement.innerHTML = new Date(startTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
    separator.innerHTML = "/";
    endTimeElement.innerHTML = new Date(endTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
    rightBracket.innerHTML = ")";

    ytpTimeDisplay.appendChild(leftBracket);
    ytpTimeDisplay.appendChild(startTimeElement);
    ytpTimeDisplay.appendChild(separator);
    ytpTimeDisplay.appendChild(endTimeElement);
    ytpTimeDisplay.appendChild(rightBracket);

    $(function() {
        $("#slider").slider({
            range: true,
            min: 0,
            max: !isNaN(video.duration) ? video.duration : 0,
            values: [0, !isNaN(video.duration) ? video.duration : 0],
            slide: function(event, ui) {
                if (startTime != ui.values[0]) {
                    startTime = ui.values[0];
                    startTimeElement.innerHTML = new Date(startTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
                    video.currentTime = ui.values[0];
                } else {
                    endTime = ui.values[1];
                    endTimeElement.innerHTML = new Date(endTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
                    video.currentTime = ui.values[1];
                }
            }
        });
    });

    video.addEventListener("durationchange", function() {
        if (!isNaN(video.duration)) {
            $("#slider").slider("option", "max", video.duration);
            $("#slider").slider("option", "values", [0, video.duration]);
            startTime = 0;
            endTime = video.duration;

            if (endTime < 3600) {
                timeFormatStartIndex = 14;
                timeFormatLength = 5; 
            } else {
                timeFormatStartIndex = 11;
                timeFormatLength = 8;
            }
            
            startTimeElement.innerHTML = new Date(startTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
            endTimeElement.innerHTML = new Date(endTime * 1000).toISOString().substr(timeFormatStartIndex, timeFormatLength);
        }
    });

    // Loop in range
    video.addEventListener("timeupdate", function() {
        if (video.currentTime < startTime || video.currentTime > (endTime - 0.25)) {
            video.currentTime = startTime;
        }
    });
}

// Create slider after the required elements exist
var waitUntilExists = setInterval(function() {
    if (document.querySelector("video") != null && document.querySelector(".ytp-chrome-bottom") != null && document.querySelector(".ytp-time-display.notranslate") != null) {
        init();
        clearInterval(waitUntilExists);
    }
}, 100);
