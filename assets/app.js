var database = firebase.database();
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
var time = moment().hour("02:30")
console.log(time.add(12, 'm').format('h:mm'))
var hour = moment()
//hour = "2:30";
console.log(hour.format('MMMM Do YYYY'))
//inside of my on click event add info to the database
/*$(".submit").on("click", function(){
 $(".test1").text("ok i liked my js lol")
 console.log("clicked submit");

});*/

$(document).on("click", ".submit", function () {
    event.preventDefault();
    let name = $("#train-name").val();
    let dest = $("#train-destination").val();
    let ftime = $("#train-time").val();
    let freq = $("#train-frequency").val();
    // console.log("this is my train destination: "+ freq);
    database.ref('trains/').push({
        name: name,
        destination: dest,
        ftime: ftime,
        frequency: freq
        //end set
    });
    populateTable();
    //end click funciton   
});


//begin on change event to update table from database. 
var populateTable = function () {
    $(".traintable").empty();
    tableRef = database.ref("trains/")
    tableRef.on('value', function (snapshot) {
        snapshot.forEach(function (child) {
            var key = child.key;
            //  console.log("this is my key"+key)
            var childv = child;
            
            var tr = $("<tr>");
            var nametd = $("<td>");
            var destinationtd = $("<td>");
            var timetd = $("<td>");
            var freqtd = $("<td>");
            var nexttd = $("<td>");
            //nexttd
            nametd.text(child.val().name);
            destinationtd.text(child.val().destination)
            timetd.text(child.val().ftime)
            freqtd.text(child.val().frequency)
            tr.append(nametd, destinationtd, freqtd);
            $(".traintable").append(tr)
           //begin code to set time.
            var f = child.val().ftime;
            var splitTime = f.split(":");
            var hour = splitTime[0];
            var min = splitTime[1];
           var sett= moment().set('hour',hour)
           sett.set('minute', min)
           console.log(min)
           console.log("this is my sett var: "+sett.format("hh:mm"))
           //end code to set time


        })
    })
}

document.ready(populateTable());

