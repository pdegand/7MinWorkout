$(document).ready(function() {

    setTimeout(launch, 1000);

})

var steps = ["Push up", "Break", "coucou", "Break", "prout", "Break", "End"];
var cursor = 1;

var stepsView = ["#firstStep", "#secondStep"];
var stepsNextView = ["#firstNextStep", "#secondNextStep"];

var timing = 0;
var maxTime = 8;
var delta = 30;
//setInterval(updateTimer, delta);
var memory = 0;


 

var Model = function(){
    var model = this;
    this.cursor = 0;
    this.steps = new Array();
    this.maxTime = 0;
    this.init = function(){
        this.cursor = 0;
        this.addStep("Jumping Jack","hard",3,null);
        this.addStep("Break","break",2,null);
        this.addStep("Push Up","hard",3,null);
        this.addStep("Break","break",2,null);
        this.addStep("WallSit","hard",3,null);
    };
    
    this.addStep =function(name,type,duration,img){
            var step = new Object();
    step.name=name;
    step.type=type;
    step.img=img;
    step.duration = duration;
    model.steps[this.steps.length] = step;
    model.maxTime+=duration;
    }
    
    this.next = function(){
        model.cursor++;
        if(model.cursor>=model.steps.length)
            return false;
        else return true;
    }
    
    this.getCurrent = function(){
        return model.steps[model.cursor];
    }
}





var Timer =function(callback){
    var timer = this;
    this.fps = 30;
    var time = 0;
    var timeLap = 0;
    this.interval = null;
    this.callback = callback;
    timer.start = function()
        {
        console.log("timer start");
        this.time = 0;
        timer.time = 0;
        timer.timeLap = 0;
        this.interval = setInterval(timer.update,1000/timer.fps);
        }
            
    timer.stop = function()
        {
        console.log("timer stop");
        clearInterval(this.interval);
        
        }
    
    timer.update = function()
        {
            timer.time+=1000/timer.fps;
            timer.timeLap+=1000/timer.fps;
            timer.callback(timer.time,timer.timeLap);
    }
    timer.resetLap = function(){
        this.timeLap = 0;
    }
}


//setInterval(monTimer.update, 1000);


var Controller = function(){
    var controller = this;
    this.model = new Model();
    this.init = function(){
        controller.model.init();
        controller.view.initTimeline(controller.model);
    },
            
    this.run =function(){
        console.log("run");
        this.model.init();
        this.timer.start();
    },
    
    this.stop = function(){
        console.log("stop");
    },
    
    this.update = function(time, timeLap){
        
        var currentStep = controller.model.getCurrent();
        
        if(timeLap/1000 >= currentStep.duration)
            {
                controller.timer.resetLap();
                if(!controller.model.next())
                    controller.timer.stop();
            }
       
        controller.updateView(time,timeLap);
        
    }
    this.nextStep = function(){
        console.log("nextStep");
    },
    
    this.updateView =function(time, timeLap){
        controller.view.updateTimeLine(time/1000, controller.model.maxTime);
    }
    this.timer = new Timer(controller.update);
    this.view = new View();
}


var View = function(){
    var view = this;
    
    this.initTimeline = function(model){
        var steps = model.steps;
        
        for(var i = 0;i<steps.length;i++)
            {
                console.log(i);
                view.insertStep(steps[i].duration,steps[i].type,model.maxTime);
            }
    }
    
    this.insertStep = function(duration, type,maxTime){
         var ref = $(".emptyBar").width();
         var width = Math.round(duration/maxTime*ref-1);
         
       $(".emptyBar").append("<div class='box "+type+"' style='width:"+width+"px'></div>");
    }

    this.updateTimeLine = function(timing, maxTime){
    if (timing < maxTime)
    {
        var ref = $(".emptyBar").width();
        var position = ref / maxTime * timing;

        $(".fullBar").width(position);
        $(".timing").css('left', position-11);
        $(".cursor").css('left', position-7);
        $(".timing").html(format(Math.round(timing, 2)));
    }
    else{
        $(".node").removeClass("inactive");
        $(".node").addClass("active");
        $(".cursor").fadeOut();
        $(".timing").fadeOut();
        
    }
    }
    
    this.initSlideshow = function(){
        
    }
    this.updateSlideshow = function(){
        
    }
    
}

function launch(){
    var controller = new Controller();
controller.init();
controller.run();
}

//controller.run();
//model.init();
//controller.init();
//controller.run();

function updateTimer()
{
    if (timing < maxTime)
    {
        var ref = $(".emptyBar").width();
        timing += delta / 1000;
        var position = ref / maxTime * timing;

        $(".fullBar").width(position);
        $(".timing").css('left', position-11);
        $(".cursor").css('left', position-7);
        $(".timing").html(format(memory*maxTime+Math.round(timing, 2)));
    }
    else{
        $(".node").removeClass("inactive");
        $(".node").addClass("active");
        $(".cursor").fadeOut();
        $(".timing").fadeOut();
        
    }
}

function removeAllNode(){
    $(".node").each(function(){
        $(this).remove();
    })
}

function insertNode(time, type){
     var ref = $(".emptyBar").width();
     var width = Math.round(time/maxTime*ref-1);
    $(".emptyBar").append("<div class='box "+type+"' style='width:"+width+"px'></div>");
}

function format(sec)
{
    var count = 0;
    while (sec > 60)
    {
        count++;
        sec -= 60;
    }
    if (sec < 10)
        return count + ":0" + sec
    else
        return count + ":" + sec;
}
function cycler() {

    for(var i = 0;i<1;i++){
//insertNode(5,"hard");
//insertNode(3,"break");
    }
 //   insertNode(30,"hard");
    cycle = $('#steps').cycle({
        fx: 'scrollLeft',
        timeout: 0,
        after: update
    });

    cycleNext = $('#next_steps').cycle({
        fx: 'scrollLeft',
        timeout: 0,
    });
    init();
}

function next() {
    $('#steps').cycle("resume", true);
    $('#next_steps').cycle("resume", true);
    //   update();
}

function update() {
    if (cursor < steps.length)
        $(stepsView[cursor % 2]).html(steps[cursor]);
    else
        $(stepsView[cursor % 2]).html("");

    if (cursor + 1 < steps.length)
    {
        $(stepsNextView[cursor % 2]).html(steps[cursor + 1]);
    }
    else
    {
        $(stepsNextView[cursor % 2]).html("");
    }
    cursor++;
}

function init() {
    $(stepsView[0]).html(steps[0])
    $(stepsView[1]).html(steps[1])
    $(stepsNextView[0]).html(steps[1])
    $(stepsNextView[1]).html(steps[2])
}