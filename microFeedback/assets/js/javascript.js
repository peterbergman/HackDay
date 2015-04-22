$(document).ready(function(){


function pushBtn(data){

    console.log("lol");
}

$('#great').click(pushBtn);




function save(opinion){

    ajaxRequest = $.ajax({
        url: "url",
        dataType: "jsonp",
        success : function(data) {
    }
    });

}


})