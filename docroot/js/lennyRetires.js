$(document).ready(function() {

    var countdownInterval = null;
    var hoursInterval     = null;
    var minutesInterval   = null;
    var secondsInterval   = null;
    var currentButton     = 'daysCounter';
    var currentHeaderOpt  = 1;

    //set up the difference between retirement and today in multiple formats
    function daysBetween( date1, date2 ) {
        //Get 1 day in milliseconds
        var one_day    = 1000*60*60*24;
        var one_hour   = 1000*60*60;
        var one_minute = 1000*60;
        var one_second = 1000;

        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        var daysLeft    = Math.abs(Math.ceil(difference_ms/one_day));
        var hoursLeft   = Math.abs(Math.ceil( (difference_ms % one_day)/one_hour ));
        var minutesLeft = Math.abs(Math.ceil( ((difference_ms % one_day) % one_hour)/one_minute ) );
        var secondsLeft = Math.abs(Math.ceil( (((difference_ms % one_day) % one_hour) % one_minute )/one_second));

        //if less than 10 then have it appear as 2 digit
        function doubleDigitize(digit) {
            if (digit < 10) {
                digit = '0' + digit;
            }
            return digit;
        }

        daysLeft    = doubleDigitize(daysLeft);
        hoursLeft   = doubleDigitize(hoursLeft);
        minutesLeft = doubleDigitize(minutesLeft);
        secondsLeft = doubleDigitize(secondsLeft);

        var timeLeftArray = [daysLeft, hoursLeft, minutesLeft, secondsLeft];

        return timeLeftArray;
    }

    //get the current time
    function getTime (timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring) {
        //Set the two dates
        var retireDate           = new Date('June 3, 2016 8:30:00 pm (EST)');
        var today                = new Date();
        var timeZoneOffset       = (today.getTimezoneOffset()/60) - 4;
        today.setHours(today.getHours() + timeZoneOffset);
        var timeLeftArray        = daysBetween(retireDate, today);
        hoursUntilRetiring       = (+timeLeftArray[0] * 24) + (+timeLeftArray[1]);
        minutesUntilRetiring     = (hoursUntilRetiring * 60) + (+timeLeftArray[2]);
        secondsUntilRetiring     = (minutesUntilRetiring * 60) + (+timeLeftArray[3]);
        var timeLordArray        = [timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring];
        return timeLordArray;
    }

    //change the countdown options
    function changeCountdown(clickOption) {
        var timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring;

        var timeLordArray = getTime(timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring);

        timeLeftArray        = timeLordArray[0];
        hoursUntilRetiring   = timeLordArray[1];
        minutesUntilRetiring = timeLordArray[2];
        secondsUntilRetiring = timeLordArray[3];

        switch (+clickOption) {
            case 1:
                $('body').find('#total-time-left').html(
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    timeLeftArray[0] + '</h2><p>Days</p></div>' +
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    timeLeftArray[1] + '</h2><p>Hours</p></div>' +
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    timeLeftArray[2] + '</h2><p>Minutes</p></div>' +
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    timeLeftArray[3] + '</h2><p>Seconds</p></div>');
                break;
            case 2:
                $('.clock-boxes').find('.clock-dials').text(hoursUntilRetiring);
                break;
            case 3:
                $('body').find('#total-time-left').html(
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    minutesUntilRetiring + '</h2><p>Total Minutes</p></div>');
                break;
            case 4:
                $('body').find('#total-time-left').html(
                    '<div class="clock-boxes"><h2 class="clock-dials">' +
                    secondsUntilRetiring + '</h2><p>Total Seconds</p></div>');
                break;
            default:
                break;
        }
    }

    //fade things in and out
    function fadeInAndOut (whichEl, elToAdd) {
        $('body').find(whichEl).fadeOut( "500", function() {
            $('body').find(whichEl).html(elToAdd);
            $('body').find(whichEl).fadeIn('500', function() {});
        });
    }

    $('#cd-menu').on('click', '.cd-buttons', function(){
        var elId = $(this).find('p').attr('id') || '';

        var imageHeight = $('#lenny-image').height();
        $('#lenny-image').css('height', imageHeight);

        if (currentButton !== elId) {
            currentButton = elId;
            var imageEl = '#lenny-image';
            var timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring;

            var timeLordArray = getTime(timeLeftArray, hoursUntilRetiring, minutesUntilRetiring, secondsUntilRetiring);

            timeLeftArray        = timeLordArray[0];
            hoursUntilRetiring   = timeLordArray[1];
            minutesUntilRetiring = timeLordArray[2];
            secondsUntilRetiring = timeLordArray[3];

            clearInterval(countdownInterval);
            clearInterval(hoursInterval);
            clearInterval(minutesInterval);
            clearInterval(secondsInterval);

            switch (elId) {
                case 'daysCounter':

                    var htmlImageString = '<img src="docroot/images/volcanicSunset.jpg" alt="Sunset Silhouettes on the volcano">';
                    var htmlClockString =   '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            timeLeftArray[0] + '</h2><p>Days</p></div>' +
                                            '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            timeLeftArray[1] + '</h2><p>Hours</p></div>' +
                                            '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            timeLeftArray[2] + '</h2><p>Minutes</p></div>' +
                                            '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            timeLeftArray[3] + '</h2><p>Seconds</p></div>';
                    var timeLeftEl = '#total-time-left';

                    fadeInAndOut(imageEl, htmlImageString);
                    fadeInAndOut(timeLeftEl, htmlClockString);

                    countdownInterval = setInterval(function() {changeCountdown(1)}, 1000);

                    break;
                case 'hoursCounter':
                    var htmlImageString = '<img src="docroot/images/viklenWaterfalling.jpg" alt="Lenny and Vikie on Maui">';
                    var htmlClockString = '<div class="clock-boxes"><h2 class="clock-dials">'+hoursUntilRetiring+'</h2><p>Total Hours</p></div>';
                    var timeLeftEl = '#total-time-left';

                    fadeInAndOut(imageEl, htmlImageString);
                    fadeInAndOut(timeLeftEl, htmlClockString);

                    hoursInterval = setInterval(function() {changeCountdown(2)}, 1000);

                    break;
                case 'minutesCounter':
                    var htmlImageString = '<img src="docroot/images/viklenTopOfTheWorld.jpg" alt="Lenny and Vikie on Haleakalā">';
                    var htmlClockString =   '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            minutesUntilRetiring + '</h2><p>Total Minutes</p></div>';
                    var timeLeftEl = '#total-time-left';

                    fadeInAndOut(imageEl, htmlImageString);
                    fadeInAndOut(timeLeftEl, htmlClockString);

                    minutesInterval = setInterval(function() {changeCountdown(3)}, 1000);

                    break;
                case 'secondsCounter':
                    var htmlImageString = '<img src="docroot/images/vikLen.jpg" alt="Vikie and Lenny">';
                    var htmlClockString =   '<div class="clock-boxes"><h2 class="clock-dials">' +
                                            secondsUntilRetiring + '</h2><p>Total Seconds</p></div>';
                    var timeLeftEl = '#total-time-left';

                    fadeInAndOut(imageEl, htmlImageString);
                    fadeInAndOut(timeLeftEl, htmlClockString);

                    secondsInterval = setInterval(function() {changeCountdown(4)}, 1000);

                    break;
                default:
                    console.log('nay');
            }
        }

        setTimeout(function(){$('#lenny-image').css('height', 'auto')}, 700);

    });

    //set up a random bg color using base 16 math
    function randomColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    //can change header, bg and days font
    function changeColor() {
        var backgroundColor   = randomColor();
        $('body').css('background-color', backgroundColor);
        $('#page-overlay').css('background-color', backgroundColor);
    }

    //set interval to change background color
    setInterval(changeColor, 4000);

    //easter egg: on click of header we get different headers and images
    $('body').on('click', '#retirement-header', function(event) {

        event.preventDefault();
        currentButton = '';

        var imageHeight = $('#lenny-image').height();
        $('#lenny-image').css('height', imageHeight);
        var imageEl = '#lenny-image';
        +currentHeaderOpt === 5 ? currentHeaderOpt = 0 : '';
        var headerOptions =[
                            "Countdown to Lenny's Retirement 2016!",
                            "Lenny Arrives in Portland With Tools",
                            "Countdown to SF Summer with Sandy",
                            "Sit Back, Have a Drink, and Relax",
                            "New Profession: Full Time Mechanic"
                            ];


        switch (currentHeaderOpt) {
            case 0:
                var htmlImageString = '<img src="docroot/images/cadenceSunglasses.jpg" alt="Cadence in Sunglasses. Duh.">';
                fadeInAndOut(imageEl, htmlImageString);
                break;
            case 1:
                var htmlImageString = '<img src="docroot/images/cjBeerList.jpg" alt="C&J Show Lenny a List of Portland\'s Necessay Fixes">';
                fadeInAndOut(imageEl, htmlImageString);
                break;
            case 2:
                var htmlImageString = '<img src="docroot/images/sandyPride.jpg" alt="Sandy, Pride, Apple and Sun!!">';
                fadeInAndOut(imageEl, htmlImageString);
                break;
            case 3:
                var htmlImageString = '<img src="docroot/images/jerAndLenBeers.jpg" alt="Lenny and Jeremy Having Beers">';
                fadeInAndOut(imageEl, htmlImageString);
                break;
            case 4:
                var htmlImageString = '<img src="docroot/images/lennyTools.jpg" alt="Lenny Brings Tools to Portland">';
                fadeInAndOut(imageEl, htmlImageString);
                break;
        }

        $(this).text(headerOptions[currentHeaderOpt]);

        setTimeout(function(){$('#lenny-image').css('height', 'auto')}, 2000);
        currentHeaderOpt++;
    });

    //view site, password is correct
    function viewSitePasswordCorrect() {
        //set up clock
        changeCountdown(1);
        //set clock interval to start
        countdownInterval = setInterval(function() {changeCountdown(1)}, 1000);
        //add first image
        $('body').find('#lenny-image').html('<img src="docroot/images/volcanicSunset.jpg" alt="Sunset Silhouettes on the volcano">');
    }

    //if return key is used pass value to passwordInput function
    $('#page-overlay').on('keyup', '#shall-not-pass', function(e) {
        if(event.keyCode == 13) {
            var passwordInput = $('#shall-not-pass').val();
            checkPassword(passwordInput);
        }
    });

    //set up a frontend password to deter some users
    $('#page-overlay').on('click', '#bridge-troll', function(e) {
        e.preventDefault();
        var passwordInput = $('#shall-not-pass').val();
        checkPassword(passwordInput);
    });

    //test Password
    function checkPassword (passwordInput) {
        if (passwordInput === 'lennyretires'){
            viewSitePasswordCorrect();
            $('#page-overlay').hide();
        } else {
            alert('Wrong Password. Please Try Again');
        }
    }

});