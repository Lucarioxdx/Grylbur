const config = {
    type: Phaser.AUTO, 
    width: 1900,
    height: 980,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false,
        }
    },
    scene: {
        preload: preload, 
        create: create,
        update: update,
    }
};

const game = new Phaser.Game (config);
let enemy;
let player;
let cursors;
let tree1, tree2, tree3, tree4, tree5,  tree6,  tree7,  tree8,  tree9,  tree10,  tree11,  tree12,  tree13,  tree14,  tree15,  tree16,  tree17,  tree18,  tree19,  tree20,  tree21,  tree22,  tree23;
let obstacles;
let enemyspeed = 50;
let enemyChaseSpeed = 200;
let chaseDistance = 300;
let enemyDirectionTimer = 0;
let bullets;
let score = 0;
let life = 100;
let enemylife = 1000;
let scoretext, lifetext, enemylifetext, victorytext;
let playerdirection = "right";
let playercolision = true;



function preload () {
    this.load.image('jogador', 'jogador_esquerda.png');
    this.load.image('jogadorb', 'jogador_direita.png');
    this.load.image('inimigo', 'monstro_esquerda.png');
    this.load.image('inimigob', 'monstro_direita.png');
    this.load.image('arvore1', 'arvore1.png');
    this.load.image('arvore2', 'arvore2.png');
    this.load.image('arvore3', 'arvore3.png');
    this.load.image('bala', 'bala_esquerda.png');
    this.load.image('balab', 'bala_direita.png');
}

function create () {
    this.cameras.main.setBackgroundColor("#001405");
    player = this.physics.add.sprite (400, 400, 'jogador');
    player.setScale(2);
    player.setCollideWorldBounds (true)
    player.setSize (player.width*1.1, player.height*1.1).setOffset (player.width*0.01, player.height*0.01)
    enemy = this.physics.add.sprite (1400, 600, 'inimigo');
    enemy.setScale(4);
    enemy.setCollideWorldBounds (true)
    enemy.setSize (enemy.width*0.1, enemy.height*0.1).setOffset (enemy.width*0.1, enemy.height*0.1)
    bullets = this.physics.add.group ({
        defaultKey: 'balab',
        maxSize: 1,
        runChildUpdate: true,
    })

    obstacles = this.physics.add.staticGroup ();
    obstacles.create(450, 205, 'arvore1').setScale(4).refreshBody();
  
    obstacles.create(678, 456, 'arvore2').setScale(5).refreshBody();
  
    obstacles.create(1790, 556, 'arvore3').setScale(6).refreshBody();
    
    obstacles.create(120, 456, 'arvore1').setScale(4).refreshBody();
   
    obstacles.create(890, 678, 'arvore2').setScale(5).refreshBody();
 
    obstacles.create(23, 78, 'arvore3').setScale(6).refreshBody();
  
    obstacles.create(789, 67, 'arvore1').setScale(4).refreshBody();

    obstacles.create(35, 890, 'arvore2').setScale(5).refreshBody();
   
    obstacles.create(1000, 234, 'arvore3').setScale(6).refreshBody();
  
    obstacles.create(1400, 200, 'arvore1').setScale(4).refreshBody();
 
    obstacles.create(346, 967, 'arvore2').setScale(5).refreshBody();
    
    obstacles.create(753, 74, 'arvore3').setScale(6).refreshBody();
   
    obstacles.create(1000, 234, 'arvore1').setScale(6).refreshBody();
 
    obstacles.create(697, 374, 'arvore1').setScale(4).refreshBody();
    
    obstacles.create(369, 209, 'arvore2').setScale(5).refreshBody();
    
    obstacles.create(1232, 346, 'arvore3').setScale(6).refreshBody();
   
    obstacles.create(1000, 234, 'arvore1').setScale(6).refreshBody();
    
    obstacles.create(967, 486, 'arvore1').setScale(4).refreshBody();
   
    obstacles.create(436, 236, 'arvore2').setScale(5).refreshBody();
    
    obstacles.create(457, 789, 'arvore3').setScale(6).refreshBody();
    
    obstacles.create(1567, 486, 'arvore1').setScale(4).refreshBody();
  
    obstacles.create(1234, 890, 'arvore2').setScale(5).refreshBody();
    
    obstacles.create(1900, 234, 'arvore3').setScale(6).refreshBody();
    

    this.physics.add.collider (player, obstacles);
    this.physics.add.collider (enemy, obstacles);
    this.physics.add.overlap (bullets, enemy, hitenemy, null, this);
    this.physics.add.overlap (enemy, bullets, hitenemy, null, this);
    this.physics.add.overlap (player, enemy, hitplayer, null, this);

    cursors = this.input.keyboard.createCursorKeys();

   scoretext = this.add.text(16, 16, "Score: 0", {fontSize:"20px", fontFamily:"Comic Sans MS", fill:"purple"});
   lifetext = this.add.text(16, 45, "Life: 100", {fontSize:"20px", fontFamily:"Comic Sans MS", fill:"Green"});
   enemylifetext = this.add.text(1293, 16, `Life Enemy: ${enemylife}`, {fontSize:"20px", fontFamily:"Comic Sans MS", fill:"Green"});
   victorytext = this.add.text(605, 310, "Grylbur Aniquiled", {fontSize:"50px", fontFamily:"Comic Sans MS", fill:"Red"}).setVisible(false) 
}




function update (time, delta) {
    if (cursors.left.isDown) {
       // player.x -= 3;
       player.setVelocityX (-200);
       playerdirection = "left";
    } else if (cursors.right.isDown)  {
        //player.x += 3;
        player.setVelocityX (200);
        playerdirection = "right";
    }

    if (cursors.up.isDown) {
        //player.y -= 3;
        player.setVelocityY (-200);
    } else if (cursors.down.isDown) {
       // player.y += 3;
       player.setVelocityY (200);
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space)){
        playerbullets ();
        
    }

    let dist = Phaser.Math.Distance.Between (enemy.x, enemy.y, player.x, player.y);
    if (dist < chaseDistance) {
        this.physics.moveToObject (enemy, player, enemyChaseSpeed);        
    } else {
        enemyDirectionTimer += delta;
        if (enemyDirectionTimer > 2000) {
            enemyDirectionTimer = 0;
            let angle = Phaser.Math.Between (0, 360);
            this.physics.velocityFromAngle (angle, enemyspeed, enemy.body.velocity);
        }
    }
}