$(document).ready(function() {
    var action;
    var currentId=1;
    var spinnerMin=1;
    var spinnerMax=151;
    update();
    $(".number-spinner button").mousedown(function () {
        btn = $(this);
        input = btn.closest('.number-spinner').find('input');
        btn.closest('.number-spinner').find('button').prop("disabled", false);

    	if (btn.attr('data-dir') == 'up') {
            action = setInterval(function(){
                if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                    input.val(parseInt(input.val())+1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 125);
    	} else {
            action = setInterval(function(){
                if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                    input.val(parseInt(input.val())-1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 125);
    	}
    }).mouseup(function(){
        clearInterval(action);
    });

    $(".number-spinner button").click(function() {
        btn = $(this);
        input = btn.closest('.number-spinner').find('input');
        btn.closest('.number-spinner').find('button').prop("disabled", false);

        if (btn.attr('data-dir') == 'up') {  
            if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                input.val(parseInt(input.val())+1);
            }else{
                btn.prop("disabled", true);
                clearInterval(action);
            }
        }
        else
        {           
            if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                input.val(parseInt(input.val())-1);
            }else{
                btn.prop("disabled", true);
                clearInterval(action);
            }
        }
        
    });
    $("#search").click(function(event) {
        input = $('#numberSpinner').find('input');
        currentId=parseInt(input.val());
        update(currentId);
    });
    $("#up").click(function(event) {
        if(currentId+1>spinnerMax){return;}
        input = $('#numberSpinner').find('input');
        currentId=parseInt(input.val())+1;
        input.val(currentId);
        update(currentId);
    });
    $("#down").click(function(event) {
        if(currentId-1<spinnerMin){return;}
        input = $('#numberSpinner').find('input');
        currentId=parseInt(input.val())-1;
        input.val(currentId);
        update(currentId);
    });
    function update(id=""){
        if(id==""){id=currentId;}
        $("#blocker").addClass('overlay');
        $.getJSON("https://pokeapi.co/api/v2/pokemon/"+id+"/").then(function(response){
            $("#right").empty();
            $("#imageFront").attr("src",response.sprites.front_default);
            $("#imageBack").attr("src",response.sprites.back_default);
            $("#right").append('<p>ID:'+response.id+'</p>');
            $("#right").append('<p>NAME:'+response.name.toUpperCase()+'</p>');
            $("#right").append('<p>WEIGHT:'+response.weight+'</p>');
            $("#right").append('<p>HEIGHT:'+response.height+'</p>');
            $("#right").append('<p>HP:'+response.stats[5].base_stat+'</p>');
            $("#right").append('<p>ATTACK:'+response.stats[4].base_stat+'</p>');
            $("#right").append('<p>DEFENSE:'+response.stats[3].base_stat+'</p>');
            $("#right").append('<p>SPEED:'+response.stats[0].base_stat+'</p>');
            $("#blocker").removeClass('overlay');
                
        });
    }
    /*
    response.id
    response.name
    response.weight
    response.height
    response.stats[5].base_stat    //HP
    response.stats[4].base_stat    //ATTACK
    response.stats[3].base_stat    //DEFENSE
    response.stats[0].base_stat    //SPEED
    response.types.forEach(function(val){console.log(val.type.name)})
    response.sprites.front_default
    response.sprites.back_default
*/
});