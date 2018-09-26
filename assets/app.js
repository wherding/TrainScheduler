var database = firebase.database();
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
var time = moment().hour("02:30")
console.log("this is adding 12min to the current time: " + time.add(12, 'm').format('h:mm'))
var hour = moment()
//hour = "2:30";
console.log("this is my hour var on line 7" + hour.format('MMMM Do YYYY'))
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
            if (child.val().ftime==''||child.val().frequency =='') {
                console.log("bad entry skipped");
            } else {
                var tr = $("<tr>");
                var nametd = $("<td>");
                var destinationtd = $("<td>");
                var timetd = $("<td>");
                var freqtd = $("<td>");
                var nexttd = $("<td>");
                var nextMintd = $("<td>");
                //nexttd
                nametd.text(child.val().name);
                destinationtd.text(child.val().destination)
                timetd.text(child.val().ftime)
                freqtd.text(child.val().frequency)
               
                $(".traintable").append(tr)
                //begin code to set time.
                var f = child.val().ftime;
                var splitTime = f.split(":");
                var hour = splitTime[0];
                var min = splitTime[1];
                var sett = moment().set('hour', hour)
                sett.set('minute', min);
                //end code to set time
                var nt = next(sett,child.val().frequency);
               
                nexttd.text(nt.format('H:mm'));
                var minTiln = moment(nt,'m').fromNow();
                nextMintd.text(minTiln)
                tr.append(nametd, destinationtd, freqtd, nexttd,nextMintd);
            }

           
    
        })


    })
}
//start copy
var email = document.getElementById("train-time");

email.addEventListener("input", function (event) {
  if (email.validity.patternMismatch) {
    email.setCustomValidity("I expect an e-mail, darling!");
  } else {
    email.setCustomValidity("");
  }
});
// end copy
//begin test
$("#train-time").on("change", function(){
    var regex1 = RegExp("([01][0-9]|2[0-3]):([0-5][0-9])$");
    var thingTotest = $(this).val();
    var result = regex1.test(thingTotest);
    //alert(result)
    var l = $(".wrong");
    
    if (!result) {
    //    $("#train-time").append(l)
    l.text("please enter a time in military time format. Ex: 20:18")
    }
    else{
        l.empty()
    }
})
//end test
var next = function(startTime,freq){
    while(startTime<moment()){
    startTime.add(freq,'m')
    }
    
return startTime;
}



document.ready(populateTable());

