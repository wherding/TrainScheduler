var database = firebase.database();
//console.log(database);

//inside of my on click event add info to the database
/*$(".submit").on("click", function(){
 $(".test1").text("ok i liked my js lol")
 console.log("clicked submit");

});*/

$(document).on("click", ".submit", function(){
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
        frequency:freq
        //end set
    });
    populateTable();
 //end click funciton   
});


//begin on change event to update table from database. 
var populateTable = function(){
    tableRef = database.ref("trains/")
    tableRef.on('value', function(snapshot){
 snapshot.forEach(function(child){
     var key = child.key;
   //  console.log("this is my key"+key)
     var childv= child;
     console.log(childv)
     var tr = $("<tr>");
     var nametd =$("<td>");
     var destinationtd =$("<td>");
     var timetd =$("<td>");
     var freqtd =$("<td>");
     nametd.text(child.val().name);
     destinationtd.text(child.val().destination)
     timetd.text(child.val().ftime)
     freqtd.text(child.val().frequency)
     tr.append(nametd,destinationtd,freqtd);
     $(".traintable").append(tr)


 })
    })
}

