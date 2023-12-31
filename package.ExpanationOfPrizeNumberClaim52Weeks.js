//2022.10.05 - Calculate dates and prizes - MCL

const awardDate = '4/30/22';

//variables to update as needed
const numberDaysInWeek = 7;
const numberWeeksInYear = 52;
const epncWeeks = [1, 2, 3, 4];
const epncYears = [1, 5, 10, 20, 40];
const epncWeeklyPayment = 5000;

CalculateDatesPrizes = {

    renderHTML(awardDate, epncWeeks) {

        let html = '';

        epncWeeks.forEach((x, i) => {

            let date = new Date(awardDate.replace(/-/g,"/"));
            let epncPayment = x * epncWeeklyPayment;

             //the winner receives the first prize on award date
            date.setDate(date.getDate() + (x-1)*7);
            
            let epncDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear().toString().slice(-2);    
            
            html += `<li class="eopnc-record ${ (i===1) ?  ' grey-bg' :''} ${ (i===2) ?  ' epnc-padding' :''} ${ (i===3) ?  ' blue-highlight' :''}"> <span class="eopnc-date">+ ${epncDate} </span><span class="eopnc-description">Weekly Deposit</span> <span class="eopnc-amount">$5,000.00</span> <span class="eopnc-avail-balance">${CalculateDatesPrizes.helper.formatToCurrency(epncPayment)}</span> </li>`;

        });

        epncYears.forEach((y, i) => {

            let epncYear = new Date(awardDate.replace(/-/g,"/"));

            let getYearRounded = (epncYear.getFullYear() + y).toString().slice(-2);
            let getMonth = epncYear.getMonth() + 1;
            let getDay = epncYear.getDate();
            let yearFinalPrint = `${getMonth}/${getDay}/${getYearRounded}`;
            let balanceFinal = epncYears[i] * numberWeeksInYear * epncWeeklyPayment;

            html += `<li class="eopnc-record eopnc-stmt">Statement as of ${yearFinalPrint} (Year ${y})</li>`;

            html +=`<li class="eopnc-record ${ (i===4) ?  ' blue-highlight' :''}"> <span class="eopnc-date">+ ${yearFinalPrint}</span> <span class="eopnc-description">Weekly Deposit</span> <span class="eopnc-amount">$5,000.00</span> <span class="eopnc-avail-balance">${CalculateDatesPrizes.helper.formatToCurrency(balanceFinal)}</span> </li>`;

        });

        document.querySelector('#epncRenderWeeks').innerHTML = html;
    },
    
    getFullYear(awardDate, epncYears) {
        epncYears.forEach((x, i) => {

            const epncYear = new Date(awardDate.replace(/-/g,"/"));
            let getFullYear = epncYear.getFullYear() + x;

        });

    },

    getISOWeeks(y) {
        var d,
          isLeap;
      
        d = new Date(y, 0, 1);
        isLeap = new Date(y, 1, 29).getMonth() === 1;
      
        //check for a Jan 1 that's a Thursday or a leap year that has a 
        //Wednesday jan 1. Otherwise it's 52
        return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
    },

    helper: {

        calculateYearsBetweenDates(date1, date2) {
            date1 = new Date(date1.replace(/-/g,"/"));
            date2 = new Date(date2.replace(/-/g,"/"));
            const yearMilliseconds = 1000 * 60 * 60 * 24 * 365;
            const date1Milliseconds = date1.getTime();
            const date2Milliseconds = date2.getTime();
            const differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
            const years =  Math.round(differenceMilliseconds / yearMilliseconds);
            return years;

        },

        calculateWeeksBetweenDates(date1, date2) {

            date1 = new Date(date1.replace(/-/g,"/"));
            date2 = new Date(date2.replace(/-/g,"/"));
            // The number of milliseconds in one week
            const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
            // Convert both dates to milliseconds
            const date1_ms = date1.getTime();
            const date2_ms = date2.getTime();
            // Calculate the difference in milliseconds
            const difference_ms = Math.abs(date1_ms - date2_ms);
            // Convert back to weeks and return hole weeks
            return Math.floor(difference_ms / ONE_WEEK);
        },

        formatToCurrency(number){

             // Create our number formatter.
             var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            
            return formatter.format(number); 

        }
           
    }

};

CalculateDatesPrizes.renderHTML(awardDate, epncWeeks);
CalculateDatesPrizes.getFullYear(awardDate, epncYears);

