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

    enemy = this.physics.add.sprite (1400, 600, 'inimigo');
    enemy.setScale(4);
    enemy.setCollideWorldBounds (true)


    tree1 = this.physics.add.sprite (450, 205, 'arvore1');
    tree1.setScale(4);
    tree2 = this.physics.add.sprite (678, 456, 'arvore2');
    tree2.setScale(5);
    tree3 = this.physics.add.sprite (1790, 556, 'arvore3');
    tree3.setScale(6);
    tree4 = this.physics.add.sprite (120, 456, 'arvore1');
    tree4.setScale(4);
    tree5 = this.physics.add.sprite (890, 678, 'arvore2');
    tree5.setScale(5);
    tree6 = this.physics.add.sprite (23, 78, 'arvore3');
    tree6.setScale(6);
    tree7 = this.physics.add.sprite (789, 67, 'arvore1');
    tree7.setScale(4);
    tree8 = this.physics.add.sprite (35, 890, 'arvore2');
    tree8.setScale(5);
    tree9 = this.physics.add.sprite (1000, 234, 'arvore3');
    tree9.setScale(6);
    tree10 = this.physics.add.sprite (1400, 200, 'arvore1');
    tree10.setScale(4);
    tree11 = this.physics.add.sprite (346, 967, 'arvore2');
    tree11.setScale(5);
    tree12 = this.physics.add.sprite (753, 74, 'arvore3');
    tree12.setScale(6);
    tree13 = this.physics.add.sprite (1000, 234, 'arvore3');
    tree13.setScale(6);
    tree14 = this.physics.add.sprite (697, 374, 'arvore1');
    tree14.setScale(4);
    tree15 = this.physics.add.sprite (369, 209, 'arvore2');
    tree15.setScale(5);
    tree16 = this.physics.add.sprite (1232, 346, 'arvore3');
    tree16.setScale(6);
    tree17 = this.physics.add.sprite (1000, 234, 'arvore3');
    tree17.setScale(6);
    tree18 = this.physics.add.sprite (967, 486, 'arvore1');
    tree18.setScale(4);
    tree19 = this.physics.add.sprite (436, 236, 'arvore2');
    tree19.setScale(5);
    tree20 = this.physics.add.sprite (457, 789, 'arvore3');
    tree20.setScale(6);
    tree21 = this.physics.add.sprite (1567, 486, 'arvore1');
    tree21.setScale(4);
    tree22 = this.physics.add.sprite (1234, 890, 'arvore2');
    tree22.setScale(5);
    tree23 = this.physics.add.sprite (1900, 234, 'arvore3');
    tree23.setScale(6);
    cursors = this.input.keyboard.createCursorKeys();

    obstacles = this.physics.add.staticGroup ();
    obstacles.addMultiple ([tree1, tree2, tree3, tree4, tree5,  tree6,  tree7,  tree8,  tree9,  tree10,  tree11,  tree12,  tree13,  tree14,  tree15,  tree16,  tree17,  tree18,  tree19,  tree20,  tree21,  tree22,  tree23])

    this.physics.add.collider (enemy, obstacles);
    this.
}




function update (time, delta) {
    if (cursors.left.isDown) {
        player.x -= 3;
    } else if (cursors.right.isDown)  {
        player.x += 3;
    }

    if (cursors.up.isDown) {
        player.y -= 3;
    } else if (cursors.down.isDown) {
        player.y += 3;
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