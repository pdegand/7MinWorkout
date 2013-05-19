$(document).ready(function(){
    
setTimeout(cycler,1000);
    
}) 

var steps = ["Push up", "Break","coucou", "Break","prout", "Break", "End"];
var cursor = 1;

var stepsView =["#firstStep","#secondStep"];
var stepsNextView =["#firstNextStep","#secondNextStep"];

function cycler(){
    
cycle = $('#steps').cycle({ 
    fx:      'scrollLeft', 
    timeout:  0,
    after:update
});

cycleNext = $('#next_steps').cycle({ 
    fx:      'scrollLeft', 
    timeout:  0,
});
init();
} 

function next(){
    $('#steps').cycle("resume",true);
    $('#next_steps').cycle("resume",true);
 //   update();
}

function update(){
    if(cursor < steps.length)
        $(stepsView[cursor%2]).html(steps[cursor]);
    else $(stepsView[cursor%2]).html("");
    
    if(cursor+1 < steps.length)
        {$(stepsNextView[cursor%2]).html(steps[cursor+1]);
        }
    else 
        {
            $(stepsNextView[cursor%2]).html("");
        }
    cursor++;
}

function init(){
    $(stepsView[0]).html(steps[0])
    $(stepsView[1]).html(steps[1])
    $(stepsNextView[0]).html(steps[1])
    $(stepsNextView[1]).html(steps[2]) 
}