MonthForward.addEventListener("click", function(){

  if(M < 11){
    M++;
  } else {
    M = 0;
    Y++;
  };
  LY = Math.abs(Y - 2024);
  mult4val = 0;
  mult4 = [];
  Mmax = 0;

  document.getElementById("SavetheDateDiv").innerHTML = `
  <h3>`+ months[M] + `: ` + Y + `</h3>`

  for(var mult4ind = 0; mult4ind <= 1000; mult4ind++){
    mult4[mult4ind] = mult4val;
    mult4val = mult4val + 4;
  }

  var LeapYearMonths = {
    LeapYearBool: true,
    monthsArray: [31,29,31,30,31,30,31,31,30,31,30,31],
  }

  var NonLeapYearMonths = {
    LeapYearBool: false,
    monthsArray: [31,28,31,30,31,30,31,31,30,31,30,31],
  }

   document.getElementById("CalenderDatesDiv").innerHTML = `
     <div class = 'DaysOfWeek'>
       <button class = 'btn btn-primary'>Mon</button>
       <button class = 'btn btn-primary'>Tue</button>
       <button class = 'btn btn-primary'>Wed</button>
       <button class = 'btn btn-primary'>Thu</button>
       <button class = 'btn btn-primary'>Fri</button>
       <button class = 'btn btn-primary'>Sat</button>
       <button class = 'btn btn-primary'>Sun</button>
     </div>
     <div id = "preMonthDates" class = 'FlexCalendarRev'></div>`


//###############################################################################




  if (mult4.includes(LY)){
    Mmax = LeapYearMonths.monthsArray[M];

    if(M > 0){
      preMonthDate = LeapYearMonths.monthsArray[(M-1)];
      nextMonthDate = 1;
    } else {
      preMonthDate = LeapYearMonths.monthsArray[(11)];
      nextMonthDate = 1;
    }

    weekDay = pairEndWDkept; //finds a D-WD pair in next. month
    singleDate = pairEndDkept;
    while (singleDate > 0){
      if (weekDay > 0){
        weekDay = weekDay - 1;
        singleDate = singleDate - 1;
      } else {
        weekDay = 6;
        singleDate = singleDate - 1;
      }
    }; // maintains D - WD pairs (singelDate = 0 means last day of prev. month)
  // assessing if buttons needed.

      if (weekDay < 6){
        while( weekDay >= 0){
          document.getElementById("preMonthDates").innerHTML += "<button type='button' class='btn btn-primary CalendarButton ' style='background-color: #3399ff'>" + preMonthDate + "</button>"
          preMonthDate = preMonthDate - 1;
          weekDay = weekDay - 1;
        }
        calMonthStartWD = weekDay + 1;
        calMonthStartD = preMonthDate + 1;
        pairWD = calMonthStartWD;
        pairD = calMonthStartD;
      } else {
        pairWD = 6;
        pairD = preMonthDate;
      }

     duringMonthDates = 1;
    for (duringMonthDates = duringMonthDates; duringMonthDates <= Mmax; duringMonthDates++){
      document.getElementById("CalenderDatesDiv").innerHTML += "<button type='button' class='btn btn-primary CalendarButton'>" + duringMonthDates + "</button>"
    }

    singleDate = pairEndDkept; // current dates
    weekDay = pairEndWDkept; //finding end D-WD pair
    while (singleDate < Mmax){
      if (weekDay < 6){
        weekDay++;
        singleDate++;
      } else {
        weekDay = 0;
        singleDate++;
      }
    };

    if (weekDay < 6){
      while(weekDay < 6){
        document.getElementById("CalenderDatesDiv").innerHTML += "<button type='button' class='btn btn-primary CalendarButton' style='background-color: #3399ff'>" + nextMonthDate + "</button>";
        nextMonthDate ++;
        weekDay++;
      }
      calMonthEndWD = weekDay;
      calMonthEndD = nextMonthDate - 1;
      pairEndWD = calMonthEndWD;
      pairEndD = calMonthEndD;// ref. D-WD pair for next. month
    } else {
      pairEndWD = 0;
      pairEndD = nextMonthDate; //ref. pair next. month
    }

  pairWDkept = pairWD;
  pairDkept = pairD;
  pairEndWDkept = pairEndWD;
  pairEndDkept = pairEndD;

  }


  else {
    Mmax = NonLeapYearMonths.monthsArray[M];

    if(M > 0){
      preMonthDate = NonLeapYearMonths.monthsArray[(M-1)];
      nextMonthDate = 1;
    } else {
      preMonthDate = NonLeapYearMonths.monthsArray[(11)];
      nextMonthDate = 1;
    }

    weekDay = pairEndWDkept; //finds a D-WD pair in prev. month
    singleDate = pairEndDkept;
    while (singleDate > 0){
      if (weekDay > 0){
        weekDay = weekDay - 1;
        singleDate = singleDate - 1;
      } else {
        weekDay = 6;
        singleDate = singleDate - 1;
      }
    }; // maintains D - WD pairs (singelDate = 0 means last day of prev. month)
  // assessing if buttons needed.

      if (weekDay < 6){
        while( weekDay >= 0){
          document.getElementById("preMonthDates").innerHTML += "<button type='button' class='btn btn-primary CalendarButton ' style='background-color: #3399ff'>" + preMonthDate + "</button>"
          preMonthDate = preMonthDate - 1;
          weekDay = weekDay - 1;
        }
        calMonthStartWD = weekDay + 1;
        calMonthStartD = preMonthDate + 1;
        pairWD = calMonthStartWD;
        pairD = calMonthStartD;
      } else {
        pairWD = 6;
        pairD = preMonthDate;
      }

     duringMonthDates = 1;
    for (duringMonthDates = duringMonthDates; duringMonthDates <= Mmax; duringMonthDates++){
      document.getElementById("CalenderDatesDiv").innerHTML += "<button type='button' class='btn btn-primary CalendarButton'>" + duringMonthDates + "</button>"
    }

    singleDate = pairEndDkept; // current dates
    weekDay = pairEndWDkept; //finding end D-WD pair
    while (singleDate < Mmax){
      if (weekDay < 6){
        weekDay++;
        singleDate++;
      } else {
        weekDay = 0;
        singleDate++;
      }
    };

    if (weekDay < 6){
      while(weekDay < 6){
        document.getElementById("CalenderDatesDiv").innerHTML += "<button type='button' class='btn btn-primary CalendarButton' style='background-color: #3399ff'>" + nextMonthDate + "</button>";
        nextMonthDate ++;
        weekDay++;
      }
      calMonthEndWD = weekDay;
      calMonthEndD = nextMonthDate - 1;
      pairEndWD = calMonthEndWD;
      pairEndD = calMonthEndD;// ref. D-WD pair for next. month
    } else {
      pairEndWD = 0;
      pairEndD = nextMonthDate; //ref. pair next. month
    }

  pairWDkept = pairWD;
  pairDkept = pairD;
  pairEndWDkept = pairEndWD;
  pairEndDkept = pairEndD;
  };
});
