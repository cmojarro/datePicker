Session.setDefault('somePeople', []); 

Template.eventPage.onRendered(function(){
    /*Getting Event data from iron-router and storing it into an array*/
    var eventData = this.data.dates;
    
    var somePeople = this.data.groupMembers;
    Session.set('somePeople', this.data.groupMembers);

    //get reference to the targetMonthYear
    var targetMonthYear = this.data.eventMonthYear;   
    //get reference to the #eventCalendar 
    var $calContainer = $('#eventCalendar'); 
    var targetMoment = moment(targetMonthYear);
    var prevChosenMoment = moment(targetMonthYear).subtract(1, 'M');
    var nextChosenMoment = moment(targetMonthYear).add(1, 'M');

    var calendar = $calContainer.fullCalendar({
        header:{
            today: false,
            left: 'prev',
            right: 'next',
            center: 'title'
        },
        defaultDate: targetMonthYear,
        /*dayRender function handling the intial rendering of days on page load*/
        dayRender: function (date, cell) {
            /*For each item in the eventData onLoad adding the toggleOn class*/
            $.each(eventData,function(index,value){
                $("td[data-date='"+value+"']").addClass('toggleOn');
            });
        },
        viewRender: function(view, element){
            var calCurrent = $calContainer.fullCalendar('getDate');
            if(calCurrent < prevChosenMoment){
                $calContainer.fullCalendar('gotoDate', prevChosenMoment);
            }
            if(calCurrent > nextChosenMoment){
                $calContainer.fullCalendar('gotoDate', nextChosenMoment);
            }
        },
    })
});

Template.eventPage.helpers({



});

Template.eventPage.events({
    'click #pickDatesBtn': function(){
    Router.go('pickDates', {_id:this._id});     
    }
});
