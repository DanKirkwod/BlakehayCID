const scriptVer = "a.1"


function setData(dataCall){
  console.log(dataCall);
  var roomCall = "#"+dataCall;
  console.log(roomCall);
  $.getJSON ("/Data/data.json", function(data){
    var today = new Date().setHours(0,0,0,0);
    console.log(today);
    var room=data[dataCall];
    console.log(room);
    var nextEvent = room[Object.keys(room)[0]];
    console.log(nextEvent)
    var afterEvent = room[Object.keys(room)[1]];
    console.log(nextEvent)
    var eventStartTime = new Date(nextEvent.startTime*1000);
    var eventEndTime = new Date(nextEvent.startTime*1000);
    var eventDay = new Date(nextEvent.startTime*1000).setHours(0,0,0,0);
    if (eventDay == today){
      $(roomCall+"container").removeClass("hide")
      $(roomCall+"nexttime").html("<span>"+eventStartTime.getHours()+":"+("0"+eventStartTime.getMinutes()).slice(-2)+" — "+eventEndTime.getHours()+":"+("0"+eventEndTime.getMinutes()).slice(-2)+"</span>");
      $(roomCall+'nexttime').textfill({
        minFontPixels: 4,
        maxFontPixels: 90,
      });
      $(roomCall+"nextname").html("<span>"+nextEvent.name+"</span>")
      $(roomCall+'nextname').textfill({
        minFontPixels: 4,
        maxFontPixels: 90,
      });
      $(roomCall+"nextdesc").html("<span>"+nextEvent.description+"</span>");
      $(roomCall+'nextdesc').textfill({
        minFontPixels: 4,
        maxFontPixels: 30,
      });
    }else{
      if($(roomCall+"container").hasClass("hide") == false) {
        $(roomCall+"container").addClass("hide");
      };
    };
    var eventStartTime = new Date(afterEvent.startTime*1000);
    var eventEndTime = new Date(afterEvent.startTime*1000);
    var eventDay = new Date(afterEvent.startTime*1000).setHours(0,0,0,0);
    if (eventDay == today){
      $(roomCall+"after").removeClass("hide")
      $(roomCall+"aftertime").html("<span>"+eventStartTime.getHours()+":"+("0"+eventStartTime.getMinutes()).slice(-2)+" — "+eventEndTime.getHours()+":"+("0"+eventEndTime.getMinutes()).slice(-2)+"</span>");
      $(roomCall+'aftertime').textfill({
        minFontPixels: 4,
        maxFontPixels: 90,
      });
      $(roomCall+"aftername").html("<span>"+afterEvent.name+"</span>");
      $(roomCall+'aftername').textfill({
        minFontPixels: 4,
        maxFontPixels: 90,
      });
    }else{
      if($(roomCall+"after").hasClass("hide") == false) {
        $(roomCall+"after").addClass("hide");
      };
    };
  })

}

setInterval(function(){
  setData("ST");
}, 1000)
