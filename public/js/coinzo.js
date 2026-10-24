const WIDTH=960;
const HEIGHT=540;
const ROUND_TIME=45;
const COMBO_WINDOW=2000;
const MAX_COMBO=5;
const FONT='"Fredoka",Arial,sans-serif';
const SPEED=380;           //normal top speed
const BOOST_SPEED=560;     //top speed with the speed power-up
const BOMB_PENALTY=50;     //points lost when you touch a bomb
const MAX_BOMBS=5;
const MAGNET_RANGE=220;    //the magnet pulls in coins closer than this
const NICKNAME=/^[\p{L}\p{N} _.-]{2,16}$/u;   //2 to 16 letters, numbers, spaces, dots, dashes or underscores


//COLORS
const COLORS={
  background: '#2a1917',
  text: '#fff8f0',
  muted: '#c9a98c',
  gold: '#f2b33d',
  buttonText: '#ffffff',
  green: 0x2f9e44,
  red: 0xe4604f,
  dark: 0x5a3d35,
  overlay: 0x1e1211,
  coin: 0xf2b33d,
  coinDark: 0x9a6b12,
  coinLight: 0xffe9a8
};

//CHARACTERS
const CHARACTERS=[
  {
    name: 'Blobby',
    tagline: 'Round, bouncy and always hungry',
    colors: { body: 0x8a5cd0, dark: 0x6b3fa0, light: 0xa985ea, eye: 0xffffff, pupil: 0x1a1238 },
    draw: drawBlob
  },
  {
    name: 'Bolt',
    tagline: 'Beep boop, built for coin collecting',
    colors: { body: 0x9aa5b1, dark: 0x5f6b78, light: 0xd5dce3, eye: 0xffffff, pupil: 0x1b2430 },
    draw: drawRobot
  },
  {
    name: 'Whisk',
    tagline: 'Quick paws and sharp eyes',
    colors: { body: 0xf2a24b, dark: 0xc9772a, light: 0xffe2bc, eye: 0xffffff, pupil: 0x2b1708 },
    draw: drawCat
  },
  {
    name: 'Wisp',
    tagline: 'Floats through everything',
    colors: { body: 0x9aa5b1, dark: 0x5f6b78, light: 0x5f6b78, eye: 0xffffff, pupil: 0x1a1238 },
    draw: drawGhost
  },
  {
    name: 'Hop',
    tagline: 'Big eyes, bigger jumps',
    colors: { body: 0x4ccf6a, dark: 0x2a9a4a, light: 0xa8f0a0, eye: 0xffffff, pupil: 0x10301c },
    draw: drawFrog
  }
];

const POWERUPS={
  time: { label: '+5 seconds', color: 0x4dabf7, seconds: 0, draw: drawClock },
  double: { label: 'Double points!', color: 0xb36bf2, seconds: 8, draw: drawStar },
  speed: { label: 'Speed boost!', color: 0x40c057, seconds: 6, draw: drawBolt },
  magnet: { label: 'Magnet!', color: 0xff6b6b, seconds: 8, draw: drawMagnet }
};

// g=Phaser graphics object, c=character's colors
function drawBlob(g,c){
  g.fillStyle(c.dark);
  g.fillTriangle(8, 20, 14, 0, 30, 12);      // left ear
  g.fillTriangle(56, 20, 50, 0, 34, 12);     // right ear
  g.fillStyle(c.body);
  g.fillRoundedRect(4, 10, 56, 52, 24);      // body
  g.fillStyle(c.light);
  g.fillEllipse(32, 50, 34, 14);             // belly
  g.fillStyle(c.eye);
  g.fillCircle(21, 30, 10);
  g.fillCircle(43, 30, 10);
  g.fillStyle(c.pupil);
  g.fillCircle(21, 31, 5);
  g.fillCircle(43, 31, 5);
  g.lineStyle(3, c.pupil);                   // smile
  g.beginPath();
  g.arc(32, 44, 7, 0.25, Math.PI - 0.25);
  g.strokePath();
}

function drawRobot(g, c){
  g.lineStyle(3, c.dark);
  g.lineBetween(32, 12, 32, 4);              // antenna
  g.fillStyle(COLORS.green);
  g.fillCircle(32, 5, 4);
  g.fillStyle(c.dark);
  g.fillRoundedRect(0, 26, 8, 14, 3);        // side bolts
  g.fillRoundedRect(56, 26, 8, 14, 3);
  g.fillStyle(c.body);
  g.fillRoundedRect(6, 12, 52, 50, 12);      // head
  g.fillStyle(c.dark);
  g.fillRoundedRect(12, 22, 40, 28, 9);      // screen
  g.fillStyle(c.eye);
  g.fillCircle(24, 35, 8);
  g.fillCircle(40, 35, 8);
  g.fillStyle(c.pupil);
  g.fillCircle(24, 36, 4);
  g.fillCircle(40, 36, 4);
  g.fillStyle(c.light);
  g.fillRoundedRect(22, 52, 20, 5, 2);       // mouth
}

function drawCat(g, c){
  g.fillStyle(c.body);
  g.fillTriangle(7, 26, 9, 0, 30, 14);       // ears
  g.fillTriangle(57, 26, 55, 0, 34, 14);
  g.fillStyle(c.light);
  g.fillTriangle(12, 18, 13, 7, 23, 14);     // inner ears
  g.fillTriangle(52, 18, 51, 7, 41, 14);
  g.fillStyle(c.body);
  g.fillRoundedRect(4, 12, 56, 50, 24);      // head
  g.fillStyle(c.light);
  g.fillEllipse(32, 53, 30, 12);             // chin
  g.fillStyle(c.eye);
  g.fillEllipse(22, 32, 17, 19);
  g.fillEllipse(42, 32, 17, 19);
  g.fillStyle(c.pupil);
  g.fillCircle(22, 33, 5);
  g.fillCircle(42, 33, 5);
  g.lineStyle(2, c.dark);                    // whiskers
  g.lineBetween(2, 42, 16, 44);
  g.lineBetween(2, 50, 16, 48);
  g.lineBetween(62, 42, 48, 44);
  g.lineBetween(62, 50, 48, 48);
  g.fillStyle(c.pupil);
  g.fillTriangle(29, 42, 35, 42, 32, 46);    // nose
}

function drawGhost(g, c){
  g.fillStyle(c.body);
  g.fillCircle(32, 28, 24);                  // head
  g.fillRect(8, 28, 48, 24);                 // body
  g.fillCircle(16, 52, 8);                   // wavy bottom
  g.fillCircle(32, 54, 8);
  g.fillCircle(48, 52, 8);
  g.fillStyle(c.light);
  g.fillEllipse(32, 40, 30, 18);             // belly
  g.fillStyle(c.eye);
  g.fillCircle(23, 26, 8);
  g.fillCircle(41, 26, 8);
  g.fillEllipse(32, 42, 8, 10);              // mouth
  g.fillStyle(c.pupil);
  g.fillCircle(23, 27, 3);
  g.fillCircle(41, 27, 3);
}

function drawFrog(g, c){
  g.fillStyle(c.body);
  g.fillEllipse(32, 42, 60, 40);             // body
  g.fillStyle(c.light);
  g.fillEllipse(32, 51, 38, 18);             // belly
  g.fillStyle(c.body);
  g.fillCircle(18, 16, 13);                  // eye bumps
  g.fillCircle(46, 16, 13);
  g.fillStyle(c.eye);
  g.fillCircle(18, 15, 10);
  g.fillCircle(46, 15, 10);
  g.fillStyle(c.pupil);
  g.fillCircle(18, 16, 5);
  g.fillCircle(46, 16, 5);
  g.lineStyle(3, c.pupil);                   // smile
  g.beginPath();
  g.arc(32, 40, 12, 0.2, Math.PI - 0.2);
  g.strokePath();
  g.fillStyle(c.dark);
  g.fillCircle(8, 46, 3);                    // cheeks
  g.fillCircle(56, 46, 3);
}

function drawToken(g,color){
  g.fillStyle(color);
  g.fillCircle(22, 22, 21);
  g.lineStyle(3, 0xffffff, 0.85);
  g.strokeCircle(22, 22, 18);
}

function drawClock(g){
  g.lineStyle(3, 0xffffff);
  g.strokeCircle(22, 22, 10);
  g.lineBetween(22, 22, 22, 15);             // hands
  g.lineBetween(22, 22, 27, 24);
}

function drawStar(g){
  const points=[];
  for(let i=0; i < 10; i++){
    const radius=i % 2 === 0 ? 12 : 5;       // outer and inner corners
    const angle=-Math.PI / 2 + i * Math.PI / 5;
    points.push({ x: 22 + Math.cos(angle) * radius, y: 22 + Math.sin(angle) * radius });
  }
  g.fillStyle(0xffffff);
  g.fillPoints(points, true);
}

function drawBolt(g){
  g.fillStyle(0xffffff);
  g.fillPoints([
    { x: 25, y: 9 }, { x: 14, y: 24 }, { x: 21, y: 24 },
    { x: 18, y: 35 }, { x: 30, y: 19 }, { x: 23, y: 19 }
  ], true);
}

function drawMagnet(g){
  g.lineStyle(6, 0xffffff);
  g.beginPath();
  g.arc(22, 21, 8, 0, Math.PI);              // the bend
  g.strokePath();
  g.lineBetween(14, 21, 14, 12);             // arms
  g.lineBetween(30, 21, 30, 12);
  g.fillStyle(0x5f6b78);
  g.fillRect(11, 9, 6, 5);                   // metal tips
  g.fillRect(27, 9, 6, 5);
}

function drawBomb(g){
  g.lineStyle(3, 0xc9a98c);                  // fuse
  g.beginPath();
  g.moveTo(26, 9);
  g.lineTo(31, 4);
  g.lineTo(36, 5);
  g.strokePath();
  g.fillStyle(0x6b7280);
  g.fillRoundedRect(19, 7, 12, 8, 2);        // cap
  g.fillStyle(0x23232b);
  g.fillCircle(24, 28, 17);                  // body
  g.lineStyle(2, 0x6b7280);
  g.strokeCircle(24, 28, 17);
  g.fillStyle(0xffffff, 0.3);
  g.fillCircle(17, 21, 5);                   // shine
  g.fillStyle(0xff922b);
  g.fillCircle(39, 6, 5);                    // spark
  g.fillStyle(0xffe066);
  g.fillCircle(39, 6, 2);
}

//Read and save a number in the browser
function load(key){
  try{
    return Number(localStorage.getItem(key)) || 0;
  }catch(e){
    return 0;
  }
}
function save(key,value){
  try{
    localStorage.setItem(key,value);
  } catch(e){
  }
}

//Read saved text, like the nickname
function loadText(key){
  try{
    return localStorage.getItem(key) || '';
  }catch(e){
    return '';
  }
}

let selected=load('coinrush.char') % CHARACTERS.length;  //Load saved character selection

// Play a short beep
let audio;
function beep(frequency,length=0.12){
  try{
    if(!audio){
      audio=new(window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator=audio.createOscillator();
    const volume=audio.createGain();
    oscillator.type='sine';
    oscillator.frequency.value=frequency;
    volume.gain.setValueAtTime(0.07,audio.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.001,audio.currentTime + length);
    oscillator.connect(volume);
    volume.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + length);
  }catch(e){}
}

// Play a short burst of noise for an explosion
function boom(){
  try{
    if(!audio){
      audio=new(window.AudioContext || window.webkitAudioContext)();
    }
    const buffer=audio.createBuffer(1, Math.floor(audio.sampleRate * 0.4), audio.sampleRate);
    const data=buffer.getChannelData(0);
    for(let i=0; i < data.length; i++){
      data[i]=(Math.random() * 2 - 1) * (1 - i / data.length);   // random noise that fades out
    }
    const noise=audio.createBufferSource();
    const filter=audio.createBiquadFilter();
    const volume=audio.createGain();
    noise.buffer=buffer;
    filter.type='lowpass';                   // keep the deep rumble
    filter.frequency.value=900;
    volume.gain.value=0.3;
    noise.connect(filter);
    filter.connect(volume);
    volume.connect(audio.destination);
    noise.start();
  }catch(e){}
}

//Shortcut for text styling
function style(size,color,weight){
  return{
    fontFamily:FONT,
    fontSize:size + 'px',
    color:color,
    fontStyle:weight === '600' ? 'bold' : 'normal'
};
}

function hex(color){
  return '#' + color.toString(16).padStart(6, '0');
}

// Rounded button with a label. texture 'buttonDark' makes a brown one
function makeButton(scene, x, y, label, onClick, texture='button'){
  const button=scene.add.image(x, y, texture).setInteractive({ useHandCursor: true });
  const text=scene.add.text(x, y, label, style(30, COLORS.buttonText, '600')).setOrigin(0.5);
  button.on('pointerover',() => button.setScale(1.05));
  button.on('pointerout',() => button.setScale(1));
  button.on('pointerdown',onClick);
  return [button, text];
}

//LEADERBOARD: the scores are kept on the server so read a <meta> tag from the page
function meta(name){
  const tag=document.querySelector('meta[name="' + name + '"]');
  return tag ? tag.content : '';
}

// ask the server for the Top 10
function fetchTopTen(){
  return fetch(meta('scores-url'), { headers: { Accept: 'application/json' } })
    .then(response => {
      if(!response.ok){
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    });
}

//send a score to the server
function submitScore(nickname, score){
  return fetch(meta('scores-url'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-TOKEN': meta('csrf-token')    
    },
    body: JSON.stringify({ nickname: nickname, score: score, character: selected })
  })
    .then(response => response.json().catch(() => ({})).then(data => {
      if(!response.ok){
        return { error: saveError(response.status, data) };
      }
      return data;
    }))
    .catch(() => ({ error: "Couldn't reach the leaderboard." }));
}

function saveError(status, data){
  if(status === 422 && data.errors){
    return Object.values(data.errors)[0][0];   //server's own message, like a bad nickname
  }
  if(status === 429){
    return 'Too many tries. Wait a minute.';
  }
  if(status === 419){
    return 'Session expired. Refresh the page.';
  }
  return "Couldn't save your score.";
}

//Draw all images once and store them under a name like loaded pictures
function makeTextures(scene){
  const g=scene.make.graphics({ add: false });
  g.fillStyle(0xffffff, 1);                    // spark
  g.fillCircle(8, 8, 8);
  g.generateTexture('dot', 16, 16);
  g.clear();

  g.fillStyle(COLORS.coinDark);                // coin
  g.fillCircle(24, 24, 23);
  g.fillStyle(COLORS.coin);
  g.fillCircle(24, 24, 20);
  g.lineStyle(3, COLORS.coinLight);
  g.strokeCircle(24, 24, 13);
  g.generateTexture('coin', 48, 48);
  g.clear();

  g.fillStyle(COLORS.green);                   // green button
  g.fillRoundedRect(0, 0, 220, 58, 29);
  g.generateTexture('button', 220, 58);
  g.clear();
   g.fillStyle(COLORS.dark);                    // brown button
  g.fillRoundedRect(0, 0, 220, 58, 29);
  g.generateTexture('buttonDark', 220, 58);
  g.clear();

  drawBomb(g);                                 // bomb
  g.generateTexture('bomb', 48, 48);
  g.clear();

  for(const type in POWERUPS){                 // every power-up
    drawToken(g, POWERUPS[type].color);
    POWERUPS[type].draw(g);
    g.generateTexture('power_' + type, 44, 44);
    g.clear();
  }

  for (let i=0; i<CHARACTERS.length; i++){  // every character
    CHARACTERS[i].draw(g, CHARACTERS[i].colors);
    g.generateTexture('char' + i, 64, 64);
    g.clear();
  }
  g.destroy();
}

//BOOT SCENE: loading screen
class Boot extends Phaser.Scene{
  constructor(){
    super('Boot');
  }

  create(){
    this.cameras.main.setBackgroundColor(COLORS.background);
    makeTextures(this);

    this.add.text(WIDTH / 2, 220, 'Coinzo', style(48, COLORS.gold, '600')).setOrigin(0.5);
    this.add.text(WIDTH / 2, 330, 'Loading...', style(16, COLORS.text)).setOrigin(0.5);

    this.add.rectangle(WIDTH / 2 - 150, 285, 300, 10, 0xffffff, 0.15).setOrigin(0, 0.5);
    const bar=this.add.rectangle(WIDTH / 2 - 150, 285, 300, 10, COLORS.green).setOrigin(0, 0.5);
    bar.scaleX=0;

    this.tweens.add({
      targets:bar,
      scaleX:1,
      duration:1000,
      onComplete:() => this.scene.start('Menu')
    });
  }
}

//MENU SCENE: front page and character select
class Menu extends Phaser.Scene{
  constructor(){
    super('Menu');
  }

  create(){
    this.cameras.main.setBackgroundColor(COLORS.background);
    const character=CHARACTERS[selected];

    this.add.text(WIDTH / 2, 90, 'Coinzo', style(84, COLORS.gold, '600')).setOrigin(0.5);
    this.add.text(WIDTH / 2, 148, 'Go Fast. Grab Gold. Get Points.', style(22, COLORS.text)).setOrigin(0.5);
    this.add.text(WIDTH - 30, 26, 'Best  ' + load('coinrush.best'), style(18, COLORS.text)).setOrigin(1, 0.5);

    // the selected character, floating up and down
    const hero=this.add.image(WIDTH / 2, 275, 'char' + selected).setScale(2);
    this.tweens.add({
         targets:hero,
         y:265,
         duration:1000,
         yoyo:true,
         repeat:-1
    });

    this.add.text(WIDTH / 2, 365, character.name, style(34, COLORS.text, '600')).setOrigin(0.5);
    this.add.text(WIDTH / 2, 398, character.tagline, style(18, COLORS.muted)).setOrigin(0.5);
    this.add.text(WIDTH / 2, 424, (selected + 1) + ' / ' + CHARACTERS.length, style(14, COLORS.text)).setOrigin(0.5);

    this.makeArrow(WIDTH / 2 - 260, '<', -1);
    this.makeArrow(WIDTH / 2 + 260, '>', 1);

    makeButton(this, WIDTH / 2 - 120, 470, 'Play', () => this.play());
    makeButton(this, WIDTH / 2 + 120, 470, 'Leaderboard', () => this.leaderboard(), 'buttonDark');


    // keyboard
    const keyboard=this.input.keyboard;
    keyboard.on('keydown-LEFT', () => this.changeCharacter(-1));
    keyboard.on('keydown-A', () => this.changeCharacter(-1));
    keyboard.on('keydown-RIGHT', () => this.changeCharacter(1));
    keyboard.on('keydown-D', () => this.changeCharacter(1));
    keyboard.on('keydown-ENTER', () => this.play());
    keyboard.on('keydown-SPACE', () => this.play());
  }

  makeArrow(x,symbol,direction){
    const arrow=this.add.text(x, 275, symbol, style(64, COLORS.gold, '600'));
    arrow.setOrigin(0.5);
    arrow.setInteractive({ useHandCursor: true });
    arrow.on('pointerdown',() => this.changeCharacter(direction));
  }

  changeCharacter(direction){
    selected=(selected + direction + CHARACTERS.length) % CHARACTERS.length;
    save('coinrush.char',selected);
    beep(400 + selected * 70, 0.09);
    this.scene.restart();
  }

  play(){
    beep(440);
    this.scene.start('Main');
  }

  leaderboard(){
    beep(440);
    this.scene.start('Leaderboard');
  }
}

//MAIN SCENE: the game
class Main extends Phaser.Scene{
  constructor(){
    super('Main');
  }

  create(){
    this.cameras.main.setBackgroundColor(COLORS.background);

    // game state
    this.score=0;
    this.timeLeft=ROUND_TIME;
    this.combo=1;
    this.lastPickup=-10000;
    this.playing=true;
    this.endedAt=0;
    this.best=load('coinrush.best');
    this.clock=0;                    
    this.effects={ double: 0, speed: 0, magnet: 0 };   
    this.nextBomb=3000;                
    this.nextPowerup=6000;           
    this.lastPowerup='';
    this.stunnedUntil=0;            
    this.safeUntil=0;   
    this.saveForm=null;                //nickname box on the gameover screen
    this.saveInput=null;
    this.saving=false;
    this.round=(this.round || 0) + 1; 
          

    //the play area is the screen except the top bar
    this.physics.world.setBounds(0, 70, WIDTH, HEIGHT - 70);

    // player on Phaser physics moves it and keeps it on screen
    this.player=this.physics.add.image(WIDTH / 2, HEIGHT / 2 + 30, 'char' + selected);
    this.player.setCollideWorldBounds(true);
    this.player.setDrag(900);          //slows down when you let go
    this.player.setMaxVelocity(SPEED); //top speed

    //bombs drift around and bounce off the walls, power-ups wait to be picked up
    this.bombs=this.physics.add.group({ collideWorldBounds: true, bounceX: 1, bounceY: 1 });
    this.powerups=this.physics.add.group();

    //three coins
    this.coins=this.physics.add.group();
    for(let i=0; i < 3; i++){
      const coin=this.coins.create(0, 0, 'coin');
      this.moveCoin(coin);
    }

    //when the player touches something, then run function()
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, this.bombTouches, this);
    this.physics.add.overlap(this.player, this.powerups, this.collectPowerup, null, this);

    //sparks that burst out when a coin is collected
    this.sparks=this.add.particles(0,0,'dot',{
      speed: { min: 80, max: 260 },
      lifespan: 500,
      scale: { start: 0.6, end: 0 },
      tint: COLORS.coin,
      emitting: false
    });

    //fire when a bomb goes off
    this.fire=this.add.particles(0, 0, 'dot',{
      speed: { min: 100, max: 360 },
      lifespan: 500,
      scale: { start: 1, end: 0 },
      tint: [0xff922b, 0xffd43b, COLORS.red],
      emitting: false
    });

    //a burst in each power-up color
    this.bursts={};
    for(const type in POWERUPS){
      this.bursts[type]=this.add.particles(0, 0, 'dot',{
        speed: { min: 60, max: 220 },
        lifespan: 500,
        scale: { start: 0.6, end: 0 },
        tint: POWERUPS[type].color,
        emitting: false
      });
    }

    //trail behind the player during a speed boost
    this.trail=this.add.particles(0, 0, 'dot',{
      lifespan: 300,
      scale: { start: 0.5, end: 0 },
      alpha: { start: 0.5, end: 0 },
      tint: POWERUPS.speed.color,
      emitting: false
    });
    this.trail.setDepth(-1);           

    //ring that shows how far the magnet reaches
    this.magnetRing=this.add.circle(0, 0, MAGNET_RANGE).setStrokeStyle(2, POWERUPS.magnet.color, 0.35);
    this.magnetRing.setDepth(-1).setVisible(false);

    // controls
     this.cursors=this.input.keyboard.createCursorKeys();
    this.keys=this.input.keyboard.addKeys('A,W,S,D');
    this.input.keyboard.on('keydown-ESC',() => this.scene.start('Menu'));
    this.input.keyboard.on('keydown-SPACE',() => this.tryRestart());
    this.input.keyboard.on('keydown-ENTER',() => this.enterPressed());
    this.buildHud();
    this.buildGameOver();
  }

  //screen text
  buildHud(){
    this.add.text(32, 14, 'SCORE', style(15, COLORS.muted));
    this.scoreText = this.add.text(32, 30, '0', style(44, COLORS.text, '600'));
    this.add.text(WIDTH - 100, 14, 'BEST', style(15, COLORS.muted));
    this.add.text(WIDTH - 100, 30, + this.best, style(25, COLORS.text, '500'));

    // timer bar
    this.add.rectangle(WIDTH / 2 - 190, 28, 380, 10, 0xffffff, 0.15).setOrigin(0, 0.5);
    this.bar=this.add.rectangle(WIDTH / 2 - 190, 28, 380, 10, COLORS.green).setOrigin(0, 0.5);
    this.timeText=this.add.text(WIDTH / 2, 44, ROUND_TIME + 's', style(16, COLORS.muted)).setOrigin(0.5, 0);
    this.comboText=this.add.text(WIDTH / 2, 92, '', style(44, COLORS.gold, '600')).setOrigin(0.5);

    // power-ups with the seconds they have left, along the bottom
    this.effectHud={};
    for(const type in this.effects){
      this.effectHud[type]={
        icon: this.add.image(0, HEIGHT - 24, 'power_' + type).setScale(0.6).setDepth(5).setVisible(false),
        text: this.add.text(0, HEIGHT - 24, '', style(18, COLORS.text, '600')).setOrigin(0, 0.5).setDepth(5).setVisible(false)
      };
    }
  }

  buildGameOver(){
    const dim=this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, COLORS.overlay, 0.8);
    const title=this.add.text(WIDTH / 2, 90, "Time's up", style(64, COLORS.gold, '600')).setOrigin(0.5);
    this.summary=this.add.text(WIDTH / 2, 172, '', style(26, COLORS.text)).setOrigin(0.5).setAlign('center');
    this.saveText=this.add.text(WIDTH / 2, 252, '', style(20, COLORS.muted)).setOrigin(0.5).setAlign('center');
    const again=makeButton(this, WIDTH / 2 - 120, 400, 'Try again', () => this.tryRestart());
    const menu=makeButton(this, WIDTH / 2 + 120, 400, 'Menu', () => this.toMenu(), 'buttonDark');
    this.hint=this.add.text(WIDTH / 2, 474, '', style(18, COLORS.muted)).setOrigin(0.5);

    this.gameOver=this.add.container(0, 0, [dim, title, this.summary, this.saveText, ...again, ...menu, this.hint]);
    this.gameOver.setDepth(10);
    this.gameOver.setVisible(false);
  }

  //put a coin at a random spot
  moveCoin(coin){
    const spot=this.freeSpot(150);
    coin.setPosition(spot.x, spot.y);
    coin.setScale(0);
    this.tweens.add({ targets: coin, scale: 1, duration: 350, ease: 'Back.Out' });
  }

  //a random spot in the play area, away from the player and the bombs
  freeSpot(gap){
    let x;
    let y;
    let tries=0;
    do{
      x=Phaser.Math.Between(60, WIDTH - 60);
      y=Phaser.Math.Between(110, HEIGHT - 60);
      tries++;
    }while(tries < 50 && (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < gap || this.nearBomb(x, y)));
    return { x: x, y: y };
  }

  nearBomb(x, y){
    return this.bombs.getChildren().some(bomb => Phaser.Math.Distance.Between(x, y, bomb.x, bomb.y) < 90);
  }

  collectCoin(player,coin){
    const now=this.time.now;
    if(now - this.lastPickup < COMBO_WINDOW){
      this.combo=Math.min(this.combo + 1, MAX_COMBO);
    }else{
      this.combo=1;
    }
    this.lastPickup=now;

    //score, doubled by the double points power-up
    const double=this.clock < this.effects.double;
    const points=10 * this.combo * (double ? 2 : 1);
    this.score += points;
    this.scoreText.setText(this.score);
    if(this.combo > 1){
      this.comboText.setText('x' + this.combo);
    }

    //feedback with sparks, floating points, squash and a sound
    this.sparks.explode(5, coin.x, coin.y);
    this.showText(coin.x, coin.y, '+' + points, double ? hex(POWERUPS.double.color) : COLORS.text);
    this.tweens.add({ targets: player, scale: 1.2, duration: 100, yoyo: true });
    beep(500 + this.combo * 80);
    this.moveCoin(coin);
  }

  showText(x, y, message, color){
    const label=this.add.text(x, y - 20, message, style(30, color, '600')).setOrigin(0.5).setDepth(5);
    this.tweens.add({
      targets: label,
      y: y - 70,
      alpha: 0,
      duration: 700,
      onComplete: () => label.destroy()
    });
  }

  spawnBomb(){
    const spot=this.freeSpot(220);
    const bomb=this.bombs.create(spot.x, spot.y, 'bomb');
    const angle=Math.random() * Math.PI * 2;
    const speed=Phaser.Math.Between(30, 60) + this.clock / 1000;   //later bombs move faster
    bomb.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    bomb.armedAt=this.clock + 800;           
    bomb.expires=this.clock + Phaser.Math.Between(7000, 9500);
    bomb.setScale(0);
    this.tweens.add({ targets: bomb, scale: 1, duration: 400, ease: 'Back.Out' });
  }

  updateBombs(){
    //more bombs are allowed as time pass
    const allowed=Math.min(1 + Math.floor(this.clock / 9000), MAX_BOMBS);
    if(this.clock >= this.nextBomb){
      if(this.bombs.countActive() < allowed){
        this.spawnBomb();
      }
      this.nextBomb=this.clock + Phaser.Math.Between(1800, 3200);
    }

    for(const bomb of this.bombs.getChildren().slice()){   
      const left=bomb.expires - this.clock;
      if(left <= 0){
        this.vanish(this.bombs, bomb);
      }else if(this.clock < bomb.armedAt){
        bomb.setAlpha(Math.floor(this.clock / 100) % 2 ? 0.35 : 0.75);   
      }else if(left < 1500){
        bomb.setAlpha(Math.floor(left / 120) % 2 ? 0.35 : 1);  
      }else{
        bomb.setAlpha(1);
      }
    }
  }

  //bombs only count when they are armed and really touching the player
  bombTouches(player, bomb){
    return this.playing && this.clock >= bomb.armedAt && this.clock >= this.safeUntil &&
      Phaser.Math.Distance.Between(player.x, player.y, bomb.x, bomb.y + 4) < 40;
  }

  hitBomb(player, bomb){
    const lost=Math.min(BOMB_PENALTY, this.score);
    this.score -= lost;
    this.scoreText.setText(this.score);
    this.combo=1;
    this.comboText.setText('');
    this.showText(bomb.x, bomb.y, lost > 0 ? '-' + lost : 'Boom!', hex(COLORS.red));

    //explosion with fire, a shake and a bang
    this.fire.explode(24, bomb.x, bomb.y);
    this.cameras.main.shake(250, 0.01);
    boom();

    //knock the player away and stun them for a moment
    const angle=Phaser.Math.Angle.Between(bomb.x, bomb.y, player.x, player.y);
    player.setAcceleration(0, 0);
    player.setVelocity(Math.cos(angle) * SPEED, Math.sin(angle) * SPEED);
    this.stunnedUntil=this.clock + 450;
    this.safeUntil=this.clock + 1500;
    this.tweens.add({ targets: player, alpha: 0.3, duration: 100, yoyo: true, repeat: 6, onComplete: () => player.setAlpha(1) });

    this.tweens.killTweensOf(bomb);
    bomb.destroy();
  }

  //power-up pops up now and then waits a few seconds to be picked up
  spawnPowerup(){
    const types=Object.keys(POWERUPS).filter(type => type !== this.lastPowerup);   //never the same one twice in a row
    const type=Phaser.Utils.Array.GetRandom(types);
    const spot=this.freeSpot(150);
    const item=this.powerups.create(spot.x, spot.y, 'power_' + type);
    item.power=type;
    item.expires=this.clock + 6500;
    this.lastPowerup=type;
    item.setScale(0);
    this.tweens.add({ targets: item, scale: 1, duration: 350, ease: 'Back.Out' });
    this.tweens.add({ targets: item, y: spot.y - 6, duration: 600, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
  }

  updatePowerups(){
    if(this.clock >= this.nextPowerup){
      if(this.powerups.countActive() === 0){
        this.spawnPowerup();
      }
      this.nextPowerup=this.clock + Phaser.Math.Between(8000, 11000);
    }

    for(const item of this.powerups.getChildren().slice()){
      const left=item.expires - this.clock;
      if(left <= 0){
        this.vanish(this.powerups, item);
      }else if(left < 2000){
        item.setAlpha(Math.floor(left / 150) % 2 ? 0.4 : 1);   //blink before it goes
      }
    }
  }

  collectPowerup(player, item){
    if(!this.playing){
      return;
    }
    const power=POWERUPS[item.power];
    if(power.seconds > 0){
      this.effects[item.power]=this.clock + power.seconds * 1000;
    }else{
      this.timeLeft += 5;                      
    }
    this.bursts[item.power].explode(12, item.x, item.y);
    this.showText(item.x, item.y, power.label, hex(power.color));
    beep(880, 0.2);
    this.tweens.killTweensOf(item);
    item.destroy();
  }

  //a bomb or power-up that ran out of time shrinks away
  vanish(group, item){
    group.remove(item);
    this.tweens.killTweensOf(item);
    this.tweens.add({ targets: item, scale: 0, alpha: 0, duration: 250, onComplete: () => item.destroy() });
  }

  updateEffects(){
    const magnet=this.clock < this.effects.magnet;
    for(const coin of this.coins.getChildren()){
      const near=Phaser.Math.Distance.Between(coin.x, coin.y, this.player.x, this.player.y) < MAGNET_RANGE;
      if(magnet && near){
        this.physics.moveToObject(coin, this.player, 450);
      }else{
        coin.body.setVelocity(0, 0);
      }
    }
    this.magnetRing.setPosition(this.player.x, this.player.y).setVisible(magnet);

    //speed boost with leave a trail
    if(this.clock < this.effects.speed){
      this.trail.emitParticleAt(this.player.x, this.player.y + 20, 1);
    }

    //show the power-ups that are working, centered along the bottom
    const active=Object.keys(this.effects).filter(type => this.clock < this.effects[type]);
    for(const type in this.effectHud){
      const item=this.effectHud[type];
      const index=active.indexOf(type);
      item.icon.setVisible(index >= 0);
      item.text.setVisible(index >= 0);
      if(index >= 0){
        const x=WIDTH / 2 - active.length * 40 + index * 80;
        item.icon.setX(x + 14);
        item.text.setX(x + 32).setText(Math.ceil((this.effects[type] - this.clock) / 1000) + 's');
      }
    }
  }

  endGame(){
    this.playing=false;
    this.endedAt=this.time.now;
    this.player.setAcceleration(0, 0);
    this.comboText.setText('');
    this.bombs.setVelocity(0, 0);              //bombs and magnet-pulled coins stop where they are
    this.coins.setVelocity(0, 0);
    this.magnetRing.setVisible(false);

    let message='Score  ' + this.score;
    if(this.score > this.best){
      this.best=this.score;
      save('coinrush.best',this.best);
      message += '\nNew best!';
    }else{
      message += '\nBest  ' + this.best;
    }
    this.summary.setText(message);
    this.gameOver.setVisible(true);
    beep(320, 0.3);
    this.offerSave();
    this.setHint();
  }

  resultsReady(){
    return !this.playing && this.time.now - this.endedAt > 600;
  }

  tryRestart(){
    if(this.resultsReady()){
      this.scene.restart();
    }
  }

  toMenu(){
    if(this.resultsReady()){
      this.scene.start('Menu');
    }
  }

  //show a nickname box so the score can go on the leaderboard
  offerSave(){
    if(this.score <= 0){
      return;                               
    }
    const form=document.createElement('form');
    form.className='save-form';
    const input=document.createElement('input');
    input.type='text';
    input.maxLength=16;
    input.placeholder='Nickname';
    input.autocomplete='off';
    input.spellcheck=false;
    input.setAttribute('aria-label', 'Nickname');
    input.value=loadText('coinrush.nick');     //the nickname from last time
    const button=document.createElement('button');
    button.type='submit';
    button.textContent='Save';
    form.append(input, button);

    //typing a nickname must not move the player or press the game's keys
    input.addEventListener('keydown', event => {
      event.stopPropagation();
      if(event.key === 'Escape'){
        input.blur();
      }
    });
    input.addEventListener('keyup', event => event.stopPropagation());
    form.addEventListener('submit', event => {
      event.preventDefault();                  //stay on this page
      this.saveScore();
    });

    this.saveText.setText('Enter your Name');
    this.saveForm=this.add.dom(WIDTH / 2, 308, form);
    this.saveInput=input;
  }

  saveScore(){
    if(this.saving){
      return;
    }
    const nickname=this.saveInput.value.trim().replace(/\s+/g, ' ');
    if(!NICKNAME.test(nickname)){
      this.saveText.setText('Names need 2-16 letters or numbers').setColor(hex(COLORS.red));
      return;
    }
    this.saving=true;
    save('coinrush.nick', nickname);
    this.saveText.setText('Saving...').setColor(COLORS.muted);

    const round=this.round;
    submitScore(nickname, this.score).then(result => {
      if(round !== this.round || !this.scene.isActive()){
        return;                                //the player already left this screen
      }
      this.saving=false;
      if(result.error){
        this.saveText.setText(result.error).setColor(hex(COLORS.red));
        return; 
      }
      this.saveForm.destroy();                 //saved, so the nickname box goes away
      this.saveForm=null;
      this.saveInput=null;
      this.setHint();
      if(result.improved){
        this.saveText.setText('Saved! ' + nickname + ' is #' + result.rank + ' on the leaderboard');
      }else{
        this.saveText.setText(nickname + "'s best is still " + result.score + '  (#' + result.rank + ')');
      }
      this.saveText.setColor(COLORS.gold);
      beep(660);
    });
  }

  //Enter saves the score while the nickname box is showing
  enterPressed(){
    if(!this.saveInput){
      return;
    }
    if(this.saveInput.value.trim()){
      this.saveScore();
    }else{
      this.saveInput.focus();
    }
  }

  setHint(){
    if(this.saveInput){
      this.hint.setText('Enter to save   |   Space to try again   |   Esc for menu');
    }else{
      this.hint.setText('Space to try again   |   Esc for menu');
    }
  }

  update(time, delta){
    if(!this.playing){
      return;
    }
    this.clock += delta;

    //the speed boost raises the top speed
    const top=this.clock < this.effects.speed ? BOOST_SPEED : SPEED;
    this.player.setMaxVelocity(top);

    //read the keys  with x and y are -1, 0 or 1
    let x=0;
    let y=0;
    if(this.cursors.left.isDown || this.keys.A.isDown) x=-1;
    if(this.cursors.right.isDown || this.keys.D.isDown) x=1;
    if(this.cursors.up.isDown || this.keys.W.isDown) y=-1;
    if(this.cursors.down.isDown || this.keys.S.isDown) y=1;

    const pointer=this.input.activePointer;
    if(this.clock < this.stunnedUntil){
      //knocked back by a bomb: no steering for a moment
      this.player.setAcceleration(0, 0);
    }else if(pointer.isDown){
      const dx=pointer.worldX - this.player.x;
      const dy=pointer.worldY - this.player.y;
      const distance=Math.hypot(dx, dy);
      const speed=Math.min(distance * 10, top);   // slows down as it gets close
      this.player.setAcceleration(0, 0);
      if(distance > 4){
        this.player.setVelocity((dx / distance) * speed, (dy / distance) * speed);
      }else{
        this.player.setVelocity(0, 0);
      }
    }else{
      //keyboard mode, a little stronger during a speed boost
      const push=1800 * top / SPEED;
      this.player.setAcceleration(x * push, y * push);
    }

    this.updateBombs();
    this.updatePowerups();
    this.updateEffects();

    //count down the timer
    this.timeLeft -= delta / 1000; //milliseconds elapsed since the previous frame
    if(this.timeLeft <= 0){
      this.timeLeft=0;
      this.endGame();
    }
    this.bar.scaleX=Math.min(this.timeLeft / ROUND_TIME, 1);   //extra time can go past a full bar
    this.timeText.setText(Math.ceil(this.timeLeft) + 's');
    this.bar.setFillStyle(this.timeLeft < 10 ? COLORS.red : COLORS.green);   //turns green again after extra time

    //the combo ends if you wait too long
    if(this.combo > 1 && this.time.now - this.lastPickup > COMBO_WINDOW){
      this.combo=1;
      this.comboText.setText('');
    }
  }
}

//LEADERBOARD SCENE: the Top 10
class Leaderboard extends Phaser.Scene{
  constructor(){
    super('Leaderboard');
  }

  create(){
    this.cameras.main.setBackgroundColor(COLORS.background);
    this.add.text(WIDTH / 2, 66, 'Leaderboard', style(56, COLORS.gold, '600')).setOrigin(0.5);

    //light panel behind the list
    const panel=this.add.graphics();
    panel.fillStyle(0xffffff, 0.06);
    panel.fillRoundedRect(WIDTH / 2 - 260, 120, 520, 330, 16);

    //column titles
    this.add.text(WIDTH / 2 - 190, 148, '#', style(14, COLORS.muted)).setOrigin(1, 0.5);
    this.add.text(WIDTH / 2 - 135, 148, 'PLAYER', style(14, COLORS.muted)).setOrigin(0, 0.5);
    this.add.text(WIDTH / 2 + 220, 148, 'SCORE', style(14, COLORS.muted)).setOrigin(1, 0.5);
    this.message=this.add.text(WIDTH / 2, 290, 'Loading...', style(20, COLORS.muted)).setOrigin(0.5).setAlign('center');

    //Back button and keys go back to the menu
    makeButton(this, WIDTH / 2, 494, 'Back', () => this.back(), 'buttonDark');
    const keyboard=this.input.keyboard;
    keyboard.on('keydown-ESC', () => this.back());
    keyboard.on('keydown-ENTER', () => this.back());
    keyboard.on('keydown-SPACE', () => this.back());

    //ask the server for the list. It arrives a moment later
    this.visit=(this.visit || 0) + 1;   //an answer for an earlier visit is ignored
    const visit=this.visit;
    fetchTopTen()
      .then(list => {
        if(visit === this.visit && this.scene.isActive()){
          this.showList(list);
        }
      })
      .catch(() => {
        if(visit === this.visit && this.scene.isActive()){
          this.message.setText("Couldn't load the leaderboard.");
        }
      });
  }

  showList(list){
    if(list.length === 0){
      this.message.setText('No scores yet.\nBe the first!');
      return;
    }
    this.message.setVisible(false);

    const me=loadText('coinrush.nick');
    let rank=0;
    list.forEach((entry, i) => {
      if(i === 0 || entry.score !== list[i - 1].score){
        rank=i + 1;                        //equal scores share a rank
      }
      const y=180 + i * 27;
      if(entry.nickname === me){              
        const highlight=this.add.graphics();
        highlight.fillStyle(COLORS.coin, 0.15);
        highlight.fillRoundedRect(WIDTH / 2 - 240, y - 13, 480, 26, 8);
      }
      const face=CHARACTERS[entry.character] ? entry.character : 0;   //the character they played with
      this.add.text(WIDTH / 2 - 190, y, rank + '.', style(18, COLORS.muted)).setOrigin(1, 0.5);
      this.add.image(WIDTH / 2 - 160, y, 'char' + face).setScale(0.36);
      this.add.text(WIDTH / 2 - 135, y, entry.nickname, style(19, COLORS.text)).setOrigin(0, 0.5);
      this.add.text(WIDTH / 2 + 220, y, entry.score, style(19, COLORS.text, '600')).setOrigin(1, 0.5);
    });
  }

  back(){
    beep(440);
    this.scene.start('Menu');
  }
}

//START THE GAME
function launchGame(){
  const loader=document.getElementById('boot');

  if(loader){
    loader.style.background=COLORS.background;
    loader.style.color=COLORS.muted;
  }

  const game=new Phaser.Game({
    type:Phaser.AUTO,
    parent:'game',
    width:WIDTH,
    height:HEIGHT,
    backgroundColor: COLORS.background,
    physics:{ default: 'arcade' },
    scale:{ mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
     dom:{ createContainer: true },     //lets the game show the nickname box
    scene:[Boot, Menu, Main, Leaderboard]
  });

  game.events.once('ready',() => {
    if(loader){
      loader.remove();
    }
  });
}

launchGame();