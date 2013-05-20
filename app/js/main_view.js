$(document).on("smwReady", function() {
    launch();

    $("#smwApp").click(function(){
        if(controller.timer.status == 1)
            controller.timer.stop();
        else controller.timer.restart();
    })
});

var cursor = 1;
var debugMultiplier = 5;

var timing = 0;
var maxTime = 8;
var delta = 30;
//setInterval(updateTimer, delta);
var memory = 0;




var Model = function() {
    var model = this;
    this.cursor = 0;
    this.steps = new Array();
    this.maxTime = 0;
    this.init = function() {
        this.cursor = 0;
        $.ajax({
            url: 'data/exercises.json',
            method: 'get',
            contentType: 'JSON',
            async: false,
            success: function(data) {
                for (index in data) {
                    var exercise = data[index];
                    model.addStep(exercise.name, "hard", exercise.duration, exercise.picture);
                    if (exercise.break) {
                        model.addStep("Break", "break", exercise.break, "");
                    }
                }
            }
        });
    };

    this.addStep = function(name, type, duration, img) {
        var step = new Object();
        step.name = name;
        step.type = type;
        step.img = img;
        step.duration = duration;
        model.steps[this.steps.length] = step;
        model.maxTime += duration;
    };

    this.next = function() {
        model.cursor++;
        if (model.cursor >= model.steps.length)
            return false;
        else
            return true;
    };

    this.getCurrent = function() {
        return model.steps[model.cursor];
    };
};

var Timer = function(callback) {
    var timer = this;
    this.fps = 30;
    var time = 0;
    var timeLap = 0;
    this.status = 1;
    this.interval = null;
    this.callback = callback;
    
    timer.start = function() {
        //console.log("timer start");
        this.time = 0;
        timer.time = 0;
        timer.timeLap = 0;
        this.interval = setInterval(timer.update, 1000 / timer.fps);
    };

    timer.stop = function() {
        //console.log("timer stop");
        clearInterval(this.interval);
        timer.status = 0;
    };

    timer.restart = function() {
        //console.log("timer stop");
        this.interval = setInterval(timer.update, 1000 / timer.fps);
        timer.status = 1;
    };
    timer.update = function() {
        timer.time += (1000 / timer.fps)*debugMultiplier;
        timer.timeLap += (1000 / timer.fps)*debugMultiplier;
        timer.callback(timer.time, timer.timeLap);
    };
    
    timer.resetLap = function() {
        this.timeLap = 0;
    };
};


//setInterval(monTimer.update, 1000);


var Controller = function() {
    var controller = this;
    this.model = new Model();
    this.init = function() {
        controller.model.init();
        controller.view.initTimeline(controller.model);
        controller.view.initSlideshow(controller.model);
    };
    
    this.run = function() {
        //console.log("run");
        this.timer.start();
    };
    
    this.stop = function() {
        //console.log("stop");
    };
    
    this.update = function(time, timeLap) {
        var currentStep = controller.model.getCurrent();
        if (timeLap / 1000 >= currentStep.duration) {
            controller.timer.resetLap();
            if (!controller.model.next())
                controller.timer.stop();
            controller.view.updateSlideshow(controller.model, timeLap, true);
        }
        controller.view.updateSlideshow(controller.model, timeLap, false);
        controller.view.updateTimeLine(time / 1000, controller.model.maxTime);
    };
    
    this.nextStep = function() {
        //console.log("nextStep");
    };
    
    this.updateView = function(time, timeLap) {
    };
    
    this.updateNextStep = function() {
        controller.view.updateNextStep(controller.model);
    };
    
    this.timer = new Timer(controller.update);
    this.view = new View();
};


var View = function() {
    var view = this;
    this.stepsView = ["#firstStep", "#secondStep"];
    this.stepsNextView = ["#firstNextStep", "#secondNextStep"];
    this.cursorView = 1;
    this.beginTransition = false;
    this.totalWidth = 0;
    this.initTimeline = function(model) {
        cycler();
        var steps = model.steps;
        $(".emptyBar").empty();
        for (var i = 0; i < steps.length; i++) {
            view.insertStep(steps[i].duration, steps[i].type, model.maxTime);
        }
    };

    this.insertStep = function(duration, type, maxTime) {
        var ref = $(".emptyBar").width() - 2;
//        var width = Math.round(duration / maxTime * ref);
        var width = ((duration*ref)/maxTime) - 1;
        view.totalWidth += width;
        $(".emptyBar").append("<div class='stepBox " + type + "' style='width:" + width + "px'></div>");
    };

    this.updateTimeLine = function(timing, maxTime) {
        if (timing < maxTime) {
            var ref = $(".emptyBar").width();
            var position = ref / maxTime * timing;

            $(".fullBar").width(position);
            $(".timing").css('left', position - 11);
            $(".cursor").css('left', position - 7);
            $(".timing").html(format(Math.round(timing, 2)));
        } else {
            $(".node").removeClass("inactive");
            $(".node").addClass("active");
            $(".cursor").fadeOut();
            $(".timing").fadeOut();

        }
    };

    this.initSlideshow = function(model) {
        $(view.stepsView[0] + " .title").html(model.steps[0].name);
        $(view.stepsView[0] + " .img").attr("src", model.steps[0].img);
        //$(view.stepsView[1]+ " .title").html(model.steps[1].name)
        $(view.stepsNextView[0] + " .title").html(model.steps[1].name)
        //$(view.stepsNextView[1]+ " .title").html(model.steps[2].name)
    };
    this.updateNextStep = function(model) {
        var p = model.cursor + 1;
        ////console.log("updateNextStep : " +view.cursorView + " - " + p );
        if (model.cursor + 1 < model.steps.length) {
            $(view.stepsView[view.cursorView] + " .title").html(model.steps[model.cursor + 1].name);
            $(view.stepsView[view.cursorView] + " .img").attr("src", model.steps[model.cursor + 1].img);
        } else {
            $(view.stepsView[view.cursorView] + " .title").html("");
            $(view.stepsView[view.cursorView] + " .img").remove();
        }


        if (model.cursor + 2 < model.steps.length)
            $(view.stepsNextView[view.cursorView] + " .title").html(model.steps[model.cursor + 2].name);
        else
            $(view.stepsNextView[view.cursorView] + " .title").html("");

        view.cursorView = 1 - view.cursorView;
        view.beginTransition = false;
    };

    this.updateSlideshow = function(model, timeLap, all) {
        if (model.cursor < model.steps.length) {
            var time = model.steps[model.cursor].duration - timeLap / 1000;
            time = time.toFixed(1);
            $(view.stepsView[0] + " .timeLap").html(time);
            $(view.stepsView[1] + " .timeLap").html(time);
            //console.log(all);
            if (all) {
                view.beginTransition = true;
            }
            ////console.log();
            if (view.beginTransition) {
                $(view.stepsView[view.cursorView] + " .timeLap").html("");
            }
        } else {
            $(view.stepsView[model.cursor % 2] + " .title").html("");
        }
        if (all) {
            $('#steps').cycle("resume", true);
            $('#next_steps').cycle("resume", true);
        }
    };

};

function launch() {
    //console.log("launch");
    controller = new Controller();
    controller.init();
    controller.run();
}


function updateTimer()
{
    if (timing < maxTime)
    {
        var ref = $(".emptyBar").width();
        timing += delta / 1000;
        var position = ref / maxTime * timing;

        $(".fullBar").width(position);
        $(".timing").css('left', position - 11);
        $(".cursor").css('left', position - 7);
        $(".timing").html(format(memory * maxTime + Math.round(timing, 2)));
    }
    else {
        $(".node").removeClass("inactive");
        $(".node").addClass("active");
        $(".cursor").fadeOut();
        $(".timing").fadeOut();
    }
}

function removeAllNode() {
    $(".node").each(function() {
        $(this).remove();
    });
}

function insertNode(time, type) {
    var ref = $(".emptyBar").width();
    var width = Math.round(time / maxTime * ref - 1);
    $(".emptyBar").append("<div class='box " + type + "' style='width:" + width + "px'></div>");
}

function format(sec)
{
    var count = 0;
    while (sec > 60) {
        count++;
        sec -= 60;
    }
    if (sec < 10)
        return count + ":0" + sec;
    else
        return count + ":" + sec;
}

function cycler() {

    cycle = $('#steps').cycle({
        fx: 'scrollLeft',
        timeout: 0,
        after: controller.updateNextStep,
        speed: 200
    });

    cycleNext = $('#next_steps').cycle({
        fx: 'scrollLeft',
        timeout: 0
    });
    //  init();
}

function next() {
    $('#steps').cycle("resume", true);
    $('#next_steps').cycle("resume", true);
    //   update();
}
/*
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
 */
