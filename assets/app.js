var database = firebase.database();
console.log(database);

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
    console.log("this is my train destination: "+ freq);
    database.ref('trains/').push({
        name: name,
        destination: dest,
        ftime: ftime,
        frequency:freq
        //end set
    });
 //end click funciton   
});