$(document).ready(function(){


function pushBtn(data){

    console.log("lol");
}

$('#great').click(function(data) {
  console.log("Great clicked!");
    $.post("/press", {
      name:'asd',
      description:'some description',
      option:'awesome'
    });
});

$('#meh').click(function(data) {
  console.log("Meh clicked!");
  $.post('/press',{
    name:'asd',
    description:'some description',
    option:'meh'
    });
});

$('#terrible').click(function(data) {
  console.log("Terrible clicked!");
  $.post('/press',{
    name:'asd',
    description:'some description',
    option:'terrible'
    });
});



function save(opinion){

    ajaxRequest = $.ajax({
        url: "url",
        dataType: "jsonp",
        success : function(data) {
    }
    });

}

var ctx = document.getElementById("myChart").getContext("2d");
var cty = document.getElementById("myOtherChart").getContext("2d");

var nAwesome = 0;
var nMeh = 0;
var nTerrible = 0;

$.get('/press/aggregate', function(ad) {
  console.log(ad);

  for(var i=0; i<ad.length; i++) {
    console.log(ad[i]);

    for(var o=0; o<ad[i].options.length; o++) {
      if(ad[i].options[o].option == "awesome")
        nAwesome += ad[i].options[o].count;
      if(ad[i].options[o].option == "meh")
        nMeh += ad[i].options[o].count;
      if(ad[i].options[o].option == "terrible")
        nTerrible += ad[i].options[o].count;
    }
  }

  console.log("Awesome: " + nAwesome + " Meh: " + nMeh + " Terrible " + nTerrible);

  var data = [
      {
          value: nTerrible,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Terrible"
      },
      {
          value: nAwesome,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Great!"
      },
      {
          value: nMeh,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Meh"
      }
  ]
  var myDoughnutChart = new Chart(ctx).Doughnut(data,Chart.defaults.global);
});

console.log(ctx);
/*var data = [
    {
        value: nTerrible,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Terrible"
    },
    {
        value: nAwesome,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Great!"
    },
    {
        value: nMeh,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Meh"
    }
]
var myDoughnutChart = new Chart(ctx).Doughnut(data,Chart.defaults.global);
*/


var data = {
    labels: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    datasets: [
        {
            label: "Great",
            fillColor: "rgba(70,181,189,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(90,211,209,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 90]
        },
        {
            label: "Meh",
            fillColor: "rgba(253,180,92,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(255,200,112,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90, 95, 80, 95]
        },
        {
            label: "Terrible",
            fillColor: "rgba(247,70,74,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(255,90,94,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [12, 20, 11, 78, 4, 7, 50, 40, 25, 20]
        }
    ]
};


var myOtherChart = new Chart(cty).Line(data,{ scaleFontColor: "#fff", multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
});

legend(document.getElementById('otherChartLegend'), data);



})
