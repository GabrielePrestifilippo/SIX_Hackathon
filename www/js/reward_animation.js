function startWin(amount) {
    'use strict';
    $("#win").show();
    var initialTime = 0;
    var score = 16;
    var reward_amount = amount;
    // create a Scene
    var winDiv = document.getElementById("win");
    var scn = new DivSugar.Scene().setSize(800, 600).setImage('images/win.jpg').appendTo(winDiv);

    // maximize the Scene size
    function resize() {
        scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain');
    }

    window.addEventListener('resize', resize, true);
    resize();

    //text node
    var text_node = new DivSugar.Node().setPosition(250, 215, 0).setSize(300, 300).appendTo(scn);

    function Coin() {
        // call the base class's constructor
        this.constructor.uber.constructor();

        this.vec = new DivSugar.Vector();
        this.pos = new DivSugar.Vector(Math.random() * 800, 50, Math.random() * 800 - 1000);
        this.vel = new DivSugar.Vector(0, Math.random() * 8 - 9, (-1) * Math.random() * 6 - 3);
        this.rot = new DivSugar.Vector(Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2);

        this.center = new DivSugar.Node().setPosition(this.pos)
            .rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360).appendTo(scn);

        this.front = new DivSugar.Node().setSize(200, 200).setPosition(-100, -100, 0).setBackface(false)
            .setImage('images/single_coin.png').appendTo(this.center);

        this.back = new DivSugar.Node().setSize(200, 200).setPosition(100, -100, 0).setBackface(false)
            .setImage('images/single_coin.png').rotate(0, 180, 0).appendTo(this.center);
    }

    DivSugar.inherit(Coin, DivSugar.Task);

    Coin.prototype.onUpdate = function () {

        if (this.deltaTime < 1500) {
            this.vel.y += this.deltaTime * 0.01;
            this.pos.add(this.vec.set(this.vel).mul(this.deltaTime * 0.06));
            this.center.setPosition(this.pos).rotate(this.deltaTime * this.rot.x, this.deltaTime * this.rot.y, this.deltaTime * this.rot.z);

            // when fall enough, destroy this Task and create an another Task
            if (this.pos.y > 1000)
                this.destroy();

        }


    };

    var task = new DivSugar.Task().appendTo(DivSugar.rootTask);
    task.onUpdate = function () {
        if (this.deltaTime > 15) {
            initialTime+=1;
            if (score < reward_amount)
                score++;
            else
                score = reward_amount;
            text_node.div.innerHTML = score;
            text_node.div.innerHTML = '<h1 style="text-align: center;color: #43a1ea;font-weight: bold;font-size: 170px;margin-top: -40px;">' + score + '</h1>';
        }
        if (initialTime > 80) {
            this.destroy();
            $("#win").html("");
            $("#win").fadeOut();;
        }


    };

    Coin.prototype.onDestroy = function () {
        scn.remove(this.center);
    };

    // create and register instances of the animation class
    for (var i = 0; i < 20; i++) {
        new Coin().appendTo(DivSugar.rootTask);
    }
};
