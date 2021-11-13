const fetch = require ('node-fetch')
// Plain text or H

const questions = require("./wyr.json")
const Canvas = require('canvas');
Canvas.registerFont(`./assets/Noto-Regular.ttf`, { family: `Noto` });
Canvas.registerFont(`./assets/Noto-Emoji.ttf`, { family: `Noto` });
Canvas.registerFont(`./assets/concertone-regular.ttf`, { family: `Round Font`})
const play = require('google-play-scraper'),
GIFEncoder = require('gif-encoder-2');
const express = require('express');
const app = express();
const request = require('node-superfetch');
const got = require('got');
const jimp = require('jimp');
const canvas = require('canvas-constructor');
const path = require('path')
const pet = require('pet-pet-gif');
const { letterTrans } = require('custom-translate');
const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');
const db = require("quick.db");
const mongoose = require('mongoose')
mongoose.connect(process.env.mongo, {useNewUrlParser : true , useUnifiedTopology : true})

const hook = new Discord.WebhookClient(process.env.hookid,process.env.hooktoken);
const colors = ['ORANGE', '4169e1', 'ffcc99']
const color = colors[Math.floor(Math.random() * colors.length)]
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
  const embed = new Discord.MessageEmbed()
        .setDescription('Someone just started viewing our home page!')
        .setColor("RED")
        hook.send(embed)
});
app.set('json spaces', 1);
app.get('/chatbot', async (req, res) => {
  const msg = req.query.msg;
  if(!msg) return res.json({ error: "Please provide a message!" })
let owner = req.query.owner;
if(!owner) owner = "Pop cat"
let botname = req.query.botname;
if(!botname) botname = "Pop cat the robot!"

  const url = `http://api.brainshop.ai/get?bid=${process.env.bid}&key=${process.env.keye}&uid=cat&msg=${msg}`
  const resp = await fetch(url)
  const json = await resp.json()
  let response = json.cnt;
  if(response.includes("ownername")) {
    response = response.replace("ownername", owner)
  } 
  if(response.includes("botname")) {
     response = response.replace("botname", botname)
  }

  res.json({ response: response })
  db.add(`reqs`, 1)
  db.add(`reqschatbot`, 1)
   const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Chatbot", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• msg - ${msg}`, true)
        .setColor(color)
        hook.send(embed)
})

app.get('/alert', async (req, res) => {
  const text = req.query.text;
  if(!text) return res.json({ error: "Please provide text!"})
  const base = await Canvas.loadImage(`./assets/alert.png`)
    const canvas = Canvas.createCanvas(base.width, base.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(base, 0, 0)
    ctx.font = "30px SF Pro"
    ctx.fillStyle = "#1f1f1f"
    ctx.textBaseline = "top"
    let text1 = await wrapText(ctx, text, 540)
    text1 = text.length > 3 ? `${text.slice(0, 3)}...` : text
    ctx.fillText(text, 60, 830)
    res.set({ 'Content-Type': 'image/png' })
    res.send(canvas.toBuffer())
     db.add(`reqs`, 1)
    db.add(`reqsalert`, 1)
     const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Alert", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get("/db", async (req, res) => {
  let key = req.query.key;
  let dbname = req.query.db;
  let number = req.query.number;
  if (key !== process.env.key) return res.json({
    e: "this is owner only!"
  }) 
  else {
    const e = await db.fetch(dbname, number)
    db.add(dbname, number)
    res.send("Done! " + e + " Total")

  }
})
app.get("/dbremove", async (req, res) => {
  let key = req.query.key;
  let dbname = req.query.db;
  let number = req.query.number;
  if (key !== process.env.key) return res.json({
    e: "this is owner only!"
  }) 
  else {
    const e = await db.fetch(dbname, number)
    db.subtract(dbname, number)
    res.send("Done! " + e + " Total")

  }
})
app.get('/texttomorse', (req, res) => {
  const text = req.query.text;
  if(!text) return res.json({
    morse: "No text was provided!"
  })
  res.json({ morse: morse(text) })
  const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Morse", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
})

app.get('/ship', async (req, res) => {
  const user1 = req.query.user1;
  const user2 = req.query.user2;
  if(!user1) return res.json({ error: "User1's avatar was not provided!"})
  if(!user2) return res.json({ error: "User2's avatar was not provided! "})
  const img = await Canvas.loadImage("https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg")
  try {
const img1 = await Canvas.loadImage(user1)
const img2 = await Canvas.loadImage(user2)
const img3 = await Canvas.loadImage("https://twemoji.maxcdn.com/v/latest/72x72/2764.png")
const canvas = Canvas.createCanvas(384, 128);
 const context = canvas.getContext("2d");
 context.drawImage(img, canvas.width, canvas.height)
 context.drawImage(img1, 0, 0, 127, 127)
 context.drawImage(img2, 261, 3, 120, 127)
 context.drawImage(img3, 131, 0, 128, 127)
 res.set({ 'Content-Type': 'image/png' })
 res.send(canvas.toBuffer())
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Ship", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• avatar1 - [Link](${user1})\n• avatar2 - [Link](${user2})`, true)
        .setColor(color)
        hook.send(embed)
        db.add(`reqs`, 1)
        db.add(`reqsship`, 1)
  } catch (error) {
    console.log(error);
    return res.json({ error: "Invalid image format! Only jpg and png accepted!"})
  }
})
app.get('/drake', async (req, res) => {
   
		let msg1 = req.query.text1;
		let msg2 = req.query.text2;
    if(!msg1) return res.json({
      error: "text1 was not provided!"
    })
    if(!msg2) return res.json({
      error: "text2 was not provided!"
    })
const img = await canvas.resolveImage('./assets/drake.png')
 if (msg1.length >= 25) {
		msg1 = msg1.slice(0, 25) + "\n" + msg1.slice(25);
	}
  if (msg1.length >= 48) {
		msg1 = msg1.slice(0, 48) + "\n" + msg1.slice(48);
	}
   if (msg1.length >= 72) {
		msg1 = msg1.slice(0, 72) + "\n" + msg1.slice(72);
	}
  if (msg1.length >= 96) {
		msg1 = msg1.slice(0, 96) + "\n" + msg1.slice(96);
	}
	if (msg2.length > 25) {
		msg2 = msg2.slice(0, 25) + "\n" + msg2.slice(25);

	}
  if (msg2.length >= 48) {
		msg2 = msg2.slice(0, 48) + "\n" + msg2.slice(48);
	}	
  if (msg2.length > 72) {
		msg2 = msg2.slice(0, 72) + "\n" + msg2.slice(72);

	}
  if (msg2.length >= 96) {
		msg2 = msg2.slice(0, 96) + "\n" + msg2.slice(96);
	}
 
  let mage = new canvas.Canvas(670, 435)
      .setColor("#ffffff")
      .printImage(img, 0, 0, 670, 435) 
      .setColor("#000000")
      .setTextFont("30px Noto") 
      .printText(msg1, 252, 36)
			.printText(msg2, 252, 258)
      .setColor("#000000")
      .toBuffer();
       res.set({ 'Content-Type': 'image/png' })
        res.send(mage)
        db.add(`reqs`, 1)
        db.add(`reqsdrake`, 1)
        
        const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Drake", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• text1 - ${msg1}\n• text2 - ${msg2}`, true)
        .setColor(color)
        hook.send(embed)
    })
app.get('/joke', async (req, res) => {

const joke = await fetch(`https://Pop-Cat-Official-2.avadakedavra09.repl.co/`)
const e = await joke.json()
res.json({ joke: e.joke })
  

    db.add(`reqs`, 1)
    db.add(`reqsjoke`, 1)
     const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Joke", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .setColor(color)
        hook.send(embed)
})
app.get('/reverse', (req, res) => {
  let text = req.query.text;
  if(!text) return res.json({
    error: "No text provided."
  })
  var reversed = '';
        var i = text.length;

        while (i > 0) {
            reversed += text.substring(i - 1, i);
            i--;
        }
        res.json({
          text: reversed
        })
db.add(`reqs`, 1)
db.add(`reqsreverse`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Reverse", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `${text}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get("/decode", async (req, res) => {
  let e = req.query.binary;
  if(!e) return res.json({
    error: "No binary numbers provided!"
  })
try {
 function binaryToString(input) {
    return input
        .match(/.{8}/g)                                    // take 8 characters
        .map(function(byte) {
            return String.fromCharCode(parseInt(byte, 2));
        })
        .join('');
}


res.json({ text: binaryToString(req.query.binary) });
db.add(`reqs`, 1)
db.add(`reqsdecode`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Decode", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• binary - ${e}`, true)
        .setColor(color)
        hook.send(embed)
} catch (error) {
  return res.json({ text: "Not valid binary numbers"})
}
})
app.get("/encode", async (req, res) => {
  let e = req.query.text;
  if(!e) return res.json({
    error: "No text provided!"
  })
function stringToBinary(input) {
 var characters = input.split('');
var bined = characters
 .map(function(char) {
 return char.charCodeAt(0).toString(2).padStart(8, 0)
 })
 .join(' '); 
 let binary = bined.toString()
 if (binary.includes(" ")) {
   binary = binary.split(" ").join("")
 }
 return binary;
}

res.json({ binary: stringToBinary(req.query.text) });
db.add(`reqs`, 1)
db.add(`reqsencode`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Encode", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${e}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get('/8ball', (req, res) => {
  let replies = ["Yes","No","Maybe","Not sure","Shut up you rat!","sure, why not","when you grow a braincell, yes","THAT'S A SOLID ****NO****","Nah that sucks tbh","idk UwU ask pop cat","Ask again sometime later.","Just shut up beech","It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes – definitely",
		"You may rely on it",
		"As I see it",

		"Most Likely",
		"Outlook good",
		
		"Signs point to yes","Give this poor 8ball a break!"]
 let randomized = replies[Math.floor(Math.random() * replies.length)]
 res.json({
   answer: randomized
 })
 db.add(`reqs`, 1)
 db.add(`reqs8ball`, 1)
})
app.get('/itunes', async (req, res) => {
   try {
    const query = req.query.q;
    const {
      body
    } = await request
      .get('https://itunes.apple.com/search')
      .query({
        term: query,
        media: 'music',
        entity: 'song',
        limit: 1,
        explicit: 'no'
      });
    const body2 = JSON.parse(body.toString());
    if (!body2.results.length) return res.json({ error: 'Could not find any results.' });
    const data = body2.results[0];
		let price = data.trackPrice.toString().split("-")[1]
		if (price === undefined) {
			price = 0
		}
    res.json({
      url: data.trackViewUrl,
      name: data.trackName,
      artist: data.artistName,
      album: data.collectionName,
      release_date:data.releaseDate.toString().split("T")[0],
      price: "$" + price,
      length: Math.round(data.trackTimeMillis/1000) + "s",
      genre: data.primaryGenreName,
      thumbnail: data.artworkUrl100

    })
   db.add(`reqs`, 1)
   db.add(`reqsitunes`, 1)
    const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "iTunes", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• Song - ${query}`, true)
        .setColor(color)
        hook.send(embed)
  } catch (err) {
    if (err.status === 404) return res.json({ error: 'Could not find any results.' });
    console.log(err);
    
}
})
app.get('/wide', async (req, res) => {
  const img = req.query.image;
  if(!img) return res.json({ error: "No image provided!"})
  try {
  const lmao = await Canvas.loadImage(img)
const canvas = Canvas.createCanvas(1500, 600);
const ctx = canvas.getContext(`2d`);
ctx.drawImage(lmao, 0, 0, 1500, 600);
res.set({ 'Content-Type': 'image/png'})
res.send(canvas.toBuffer())
db.add(`reqs`, 1)
db.add(`reqswide`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Wide", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${img})`, true)
        .setColor(color)
        hook.send(embed)
  } catch (error) {
    return res.json({ error: "Invalid image type! "})
  }
})
app.get('/mnm', async (req, res) => {
  let image = req.query.image;
   if (!image) return res.json({
     message: "You must provide an image as a parameter!"
   })
        let bg = await Canvas.loadImage(`https://media.discordapp.net/attachments/838369487073968138/853907536636674068/mms.png?width=427&height=427`);
        let img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(400, 400);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(img, 60, 10, 270, 270);
        ctx.drawImage(bg, 0, 0, 400, 400);
         await res.set({ 'Content-Type': 'image/png' })
      res.send(canvas.toBuffer())
      db.add(`reqs`, 1)
      db.add(`reqsmnm`, 1)
})

app.get("/pikachu", async (req, res) => {
   const img = await canvas.resolveImage('./assets/pikachu.png')

    let Msg = req.query.text;
    if(!Msg) return res.json({
      error: "No text was provided!"
    })
	
if (Msg.length >= 29) {
	Msg = Msg.slice(0, 29) + "\n" + Msg.slice(29)
}
if (Msg.length > 60) {
	Msg = Msg.slice(0, 60) + "\n" + Msg.slice(60)
}

  let mage = new canvas.Canvas(458, 388)
      .setColor("#ffffff")
      .printImage(img, 0, 0, 458, 388) 
      .setColor("#000000")
      .setTextFont("30px Noto") 
			.printText(Msg, 12, 25)
      .setColor("#000000")
      .toBuffer();
        res.set({ 'Content-Type': 'image/png' })
        res.send(mage)
        db.add(`reqs`, 1)
        db.add(`reqspikachu`, 1)
         const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Pikachu", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${Msg}`, true)
        .setColor(color)
        hook.send(embed)
})

app.get("/biden", async (req, res) => {
   const img = await canvas.resolveImage('./assets/biden.png')

    let Msg = req.query.text;
    if(!Msg) return res.json({
      error: "No text was provided!"
    })
	
if (Msg.length >= 67) {
	Msg = Msg.slice(0, 67) + "\n" + Msg.slice(67)
}
if (Msg.length > 134) {
	Msg = Msg.slice(0, 134) + "\n" + Msg.slice(134)
}

  let mage = new canvas.Canvas(900, 497)
      .setColor("#ffffff")
      .printImage(img, 0, 0, 900, 497) 
      .setColor("#000000")
      .setTextFont("30px Noto") 
			.printText(Msg, 20, 139)
      .setColor("#000000")
      .toBuffer();
        res.set({ 'Content-Type': 'image/png' })
        res.send(mage)
        db.add(`reqs`, 1)
    db.add(`reqsbiden`, 1)
     const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Biden", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${Msg}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get('/beautiful', async (req, res) => {
  let image = req.query.image;
  if(!image) return res.json({
    error: `You must provide an image!`
  })
     let base = await jimp.read(`https://media.discordapp.net/attachments/838369487073968138/854627379908575252/beautiful.png`);
        base.resize(376, 400);
        let img = await jimp.read(image);
        img.resize(84, 95);
        base.composite(img, 258, 28);
        base.composite(img, 258, 229);
        let raw;
        base.getBuffer(`image/png`, (err, buffer) => {
            raw = buffer;
        });
        res.set({ 'Content-Type': 'image/png' })
        res.send(raw)
})
app.get('/clown', async (req, res) => {
  let img = req.query.image;
  if (!img) return res.send({ message: 'Please provide a valid image of png or jpg format.' })
  try {
	const canvas = Canvas.createCanvas(599, 427);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./assets/clown.png');
  const avatar = await Canvas.loadImage(img);
  ctx.drawImage(avatar, 144, 94, 266, 226);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	
	

   res.set({ 'Content-Type': 'image/png' })
      res.send(canvas.toBuffer())
      db.add(`reqs`, 1)
      db.add(`reqsclown`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Clown", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${img})`, true)
        .setColor(color)
        hook.send(embed)
        } catch (error) {
          console.log(error)
    return res.json({ message: "Invalid Image Type" })
  }
})
app.get('/greyscale', async (req, res) => {
  let image = req.query.image;
   if (!image) return res.json({ error: `You must provide an image.` });
   try {
        image = await jimp.read(image);
        image.greyscale();
        let raw;
        image.getBuffer(`image/png`, (err, buffer) => {
            raw = buffer;
        });
             await res.set({ 'Content-Type': 'image/png' })
      res.send(raw)
      db.add(`reqs`, 1)
      db.add(`reqsgreyscale`, 1)
       const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "GreyScale", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - ${image}`, true)
        .setColor(color)
        hook.send(embed)
   } catch (error) {
     return res.json({
       error: "Invalid image type. Only png and jpg are accepted!"
     })
   }
})
app.get('/invert', async (req, res) => {
  let image = req.query.image;
   if (!image) return res.json({ error: `You must provide an image.` });
   try {
        image = await jimp.read(image);
        image.invert();
        let raw;
        image.getBuffer(`image/png`, (err, buffer) => {
            raw = buffer;
        });
             await res.set({ 'Content-Type': 'image/png' })
      res.send(raw)
      db.add(`reqs`, 1)
      db.add(`reqsinvert`, 1)
       const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Invert", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${req.query.image})`, true)
        .setColor(color)
        hook.send(embed)
   } catch (error) {
     return res.json({
       error: "Invalid image type. Only png and jpg are accepted!"
     })
   }
})
app.get("/colorify", async (req, res) => {
  let image = req.query.image;
   if (!image) return res.json({
     error: "An image was not provided!"
   })
  let color = req.query.color;
  if(!color) return res.json({
    error: "A color was not provided."
  })
  try {
        const img = await Canvas.loadImage(image);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (color) {
            ctx.globalCompositeOperation = "color";
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      res.set({ 'Content-Type': 'image/png' })
      res.send(canvas.toBuffer())
      db.add(`reqs`, 1)
      db.add(`reqscolorify`, 1)
       const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Colorify", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• image - [Link](${image})\n• color - ${color}`, true)
        .setColor('ORANGE')
        hook.send(embed)
  } catch (error) {
    return res.json({
      error: "Invalid image format! Must be either png or gif."
    })
  }
})
app.get('/color/:color', (req, res) => {
  const input = req.params.color;
  if(!input) return res.json({ error: "Usage: https://api.popcatdev.repl.co/color/<hex without #>" })
const image = `https://api.popcatdev.repl.co/color/image/${input}`
if(!image) return res.json({ error: "Not valid!"})
 let toeval;
if(!input.includes("#")) {
  toeval = `#${input}`
} else toeval = input;
const rgb = hexToRgb(toeval)
res.json({
  hex: "#" + input,
  name: name(input),
  rgb: `rgb(${rgb})`,
  color_image: image,
  brightened: brighten(input, 50)
})
db.add(`reqs`, 1)
db.add(`reqscolor`, 1)
const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Color Info", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• hex - ${input}`, true)
        .setColor(input)
        hook.send(embed)
function brighten(hex, percent){
    hex = hex.replace(/^\s*#|\s*$/g, '');
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
 function hexToRgb(hex) {
 let output = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
 .substring(1).match(/.{2}/g)
 .map(x => parseInt(x, 16)).toString()
 if(output.includes("NaN")) {
   return res.json({ error: "Not valid!" })
 } else return output;
 }
 function name(e) {
 
  var n_match = ntc.name(e);
  n_name = n_match[1]; 
  return(n_name);
}
})
app.get('/welcomecard', async (req, res) => {
  const q = req.query;
  let background = req.query.background;
  if(!background || !background.endsWith(".png")) return res.json({ error: "Please provide a background in png format!" })
  if(background.endsWith(".jpg")) {
    background = background.replace(".jpg", ".png")
  }
  const avatar = req.query.avatar;
  if(!avatar) return res.json({ error: "Please provide an avatar image!" })
  let text_1 = q.text1;
  if(!text_1) return res.json({ error: "Text 1 was not provided." })
  let text_2 = q.text2;
  if(!text_2) return res.json({ error: "Text 2 was not provided!" })
  let text_3 = q.text3;
  if(!text_3) return res.json({ error: "Text 3 was not provided." })
  if(text_1.includes("#")) {
      text_1 = text_1.replace("#", " ")
  }
   if(text_2.includes("#")) {
      text_2 = text_2.replace("#", " ")
  }
   if(text_3.includes("#")) {
      text_3 = text_3.replace("#", " ")
  }
  let color = q.color;
  if(!color) color = "#ffffff"
  try {
    
  const img = await welcomeImage(background, avatar, text_1, text_2, text_3, color)
  res.set({ 'Content-Type': 'image/png' })
  res.send(img)
  const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Welcome Card", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .setColor("ffcc99")
        hook.send(embed)
  db.add(`reqs`, 1)
  db.add(`reqswelcome`, 1)
  
  } catch (error) {
    return res.json({ error: "One of your images (background/avatar) have an unsupported image format!!!!"})
  }
})
async function welcomeImage(background, avatar, text_1, text_2, text_3, color) {

    let fonts = "Round Font"
    

    var welcomeCanvas = {};
    welcomeCanvas.create = Canvas.createCanvas(1024, 500)
    welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
    const ctx = welcomeCanvas.context
    ctx.font = `72px ${fonts}`;
    ctx.fillStyle = color;

    const bg = await Canvas.loadImage(background)
    ctx.drawImage(bg, 0, 0, 1024, 500)
    ctx.textAlign = 'center'
    ctx.fillText(text_1, 512, 360);
    ctx.beginPath();
    ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
    ctx.stroke()
    ctx.fill()
    

    let canvas = welcomeCanvas;
    canvas.context.font = `42px ${fonts}`,
    canvas.context.textAlign = 'center';
    canvas.context.fillText(text_2, 512, 410)
    canvas.context.font = `32px ${fonts}`
    canvas.context.fillText(text_3, 512, 455)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(avatar)
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    
	return canvas.create.toBuffer()
}
app.get('/color/image/:color', async (req, res) => {
  const color = req.params.color;
  if(!color) return res.json({ error: "Usage: https://api.popcatdev.repl.co/color/image/<hex without #>"})
  hexvalidator(color)
 const image = new canvas.Canvas(500, 500)
  .setColor(`#${color}`)
  .printRectangle(0, 0, 500, 500)
  .toBuffer();
  try {
res.set({ 'Content-Type': 'image/png' })
res.send(image)
  } catch (error) {
    if(error.status === 400) {
    res.json({ error: "Invalid color!" })
  }
  }
  function hexvalidator(hex) {
 let output = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
 ,(m, r, g, b) => '#' + r + r + g + g + b + b)
 .substring(1).match(/.{2}/g)
 .map(x => parseInt(x, 16)).toString()
 if(output.includes("NaN")) {
   return res.json({ error: "Not valid!" })
 } 
 if(output === undefined) {
  res.json({ error: "Not valid!" })
}
 }
})
app.get('/blur', async (req, res) => {
  let image = req.query.image;

   if (!image) return res.json({ error: `You must provide an image.` });
   try {
        image = await jimp.read(image);
        image.blur(5);
        let raw;
        image.getBuffer(`image/png`, (err, buffer) => {
            raw = buffer;
        });
             await res.set({ 'Content-Type': 'image/png' })
      res.send(raw)
      db.add(`reqs`, 1)
      db.add(`reqsblur`, 1)
   } catch (error) {
     return res.json({
       error: "Invalid image type. Only png and jpg are accepted!"
     })
   }
})
app.get('/jokeoverhead', async (req, res) => {
    try {
    const bg = await Canvas.loadImage('https://media.discordapp.net/attachments/838369487073968138/853881076145717258/jokeoverhead.png')

    if (!req.query.image) return res.json({ 
        message: 'no image was provided.'
      })
   

    if (req.query.image.endsWith('.png')) {
      const canvas1 = Canvas.createCanvas(250, 238)
      const logo = await Canvas.loadImage(req.query.image)
      const ctx = canvas1.getContext('2d')

      ctx.drawImage(bg, 0, 0, 250, 238)

      ctx.beginPath()
      ctx.arc(110, 110, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(logo, 60, 60, 100, 100)
      const output = canvas1.toBuffer()

      await res.set({ 'Content-Type': 'image/png' })
      res.send(output)
    } else if (req.query.image.endsWith('.jpg')) {
      const canvas1 = canvas.createCanvas(250, 238)
      const logo = await canvas.loadImage(req.query.image)
      const ctx = canvas1.getContext('2d')

      ctx.drawImage(bg, 0, 0, 250, 238)

      ctx.beginPath()
      ctx.arc(110, 110, 50, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(logo, 60, 60, 100, 100)
      const output = canvas1.toBuffer()

      await res.set({ 'Content-Type': 'image/jpg' })
      res.send(output)
    } else {
      return res.json({
        message: 'only jpg or png type of images are allowed.'
      })
    
    }
    db.add(`reqs`, 1)
    db.add(`reqsjokeoverhead`, 1)
  } catch (error) {
    console.log(error)
    res.json({
      error: error.message
    })
  }
})
app.get('/mock', async (req, res) => {
  let text = req.query.text;
  if(!text) return res.json({
    message: "Pleaase provide text to mock!"
  })
  let e = await mock(text)
  res.json({
    text: e
  })
  db.add(`reqs`, 1)
  db.add(`reqsmock`, 1)
   const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Mock", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get('/wyr', (req, res) => {
	let messagetext =  questions[Math.floor(Math.random() * questions.length)]
let question = messagetext.split("Would you rather ")[1]
let Option1 = question.split(" or ")[0]
let Option2 = question.split(" or ")[1]
	res.json({ ops1: Option1, ops2: Option2 })
 db.add(`reqs`, 1)
 db.add(`reqswyr`, 1)
  const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Would You Rather", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .setColor(color)
        hook.send(embed)
})

app.get('/drip', async (req, res) => {
 
  let img = req.query.image;
  if (!img) return res.send({ message: 'Please provide a valid image of png or jpg format.' })
  try {

	const background = await jimp.read('https://i.redd.it/ybb2xn4hs6a61.jpg');


	const avatar = await jimp.read(img);
 avatar.circle();
 avatar.resize(225, 225)
 background.resize(867, 892);
 background.composite(avatar, 330, 135);

	background.getBuffer(`image/png`, (err, buffer) => {

   res.set({ 'Content-Type': 'image/png' })
      res.send(buffer)
  })
     db.add(`reqs`, 1)
     db.add(`reqsdrip`, 1)
      const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Drip", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${img})`, true)
        .setColor(color)
        hook.send(embed)
        } catch (error) {
          console.log(error)
    return res.json({ message: "Invalid Image Type" })
  }
})
        
app.get('/doublestruck', (req, res) => {
 
  const text = req.query.text;
  if(!text) return res.json({
    error: "No text was provided."
  })
  else {
    res.json({ text: doublestruck(text) })
  }
  db.add(`reqs`, 1)
  db.add(`reqsdoublestruck`, 1)
   const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Doublestruck", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
})
app.get('/playstore', (req, res) => {

  let kata = req.query.q;
  if (!kata) return res.json({ message: "Please provide a query. Example: api.popcatdev.repl.co/playstore?q=discord"})
play.search({term: kata,num:1})
    .then(data => {
        if(!data) return res.json({
        error: "Not found"
      })
    let app = data[0].appId
    
    play.app({appId:app})
    .then(lata => {
    
    let price = lata.price === 0? "Free" : `${lata.price}`
    
   res.json({
     title: lata.title,
     icon: lata.icon,
     description: lata.summary,
     developer: lata.developer,
     ratings: lata.scoreText,
     installations: lata.installs === undefined ? "None" : lata.installs,
     genre: lata.genre === undefined ? "None" : lata.genre,
     url: lata.url,
     comment: lata.comments[0] === undefined ? "None" : lata.comments[0]
   })
   db.add(`reqs`, 1)
   db.add(`reqsplaystore`, 1)
    const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Playstore", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• app - ${kata}`, true)
        .setColor(color)
        hook.send(embed)
    })
    })
})

app.get('/bottoken', async (req, res) => {
 
const response = await fetch('https://some-random-api.ml/bottoken');
const data = await response.json();

    res.json({ token: data.token })

  db.add(`reqs`, 1)
  db.add(`reqsdoublestruck`, 1)
   const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Doublestruck", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
})

app.get('/ad', async (req, res) => {

  let image = req.query.image;
  if (!image) return res.send({ message: 'Please provide a valid image of png or jpg format.' })
  try {
        const canvas = Canvas.createCanvas(550, 474);
        const ctx = canvas.getContext(`2d`);
      const image1 = await Canvas.loadImage(image);
        const background = await Canvas.loadImage(`./assets/ad.png`);
        ctx.drawImage(image1, 150, 75, 230, 230);
        ctx.drawImage(background, 0, 0, 550, 474);
        res.set({ 'Content-Type': 'image/png' })
        res.send(canvas.toBuffer())
        db.add(`reqs`, 1)
        db.add(`reqsad`, 1)
         const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "AD", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${image})`, true)
        .setColor(color)
        hook.send(embed)
  } catch (error) {
    return res.json({ message: "Invalid Image Type" })

  }
})
app.get('/burn', async (req, res) => {

  let image = req.query.image;
  if (!image) return res.send({ message: 'Please provide a valid image of png or jpg format.' })
  try {
        const canvas = Canvas.createCanvas(347, 426);
        const ctx = canvas.getContext(`2d`);
      const image1 = await Canvas.loadImage(image);
        const background = await Canvas.loadImage(`./assets/burn.png`);
        ctx.drawImage(image1, 19, 31, 113, 154);
        ctx.drawImage(background, 0, 0, 347, 426);
        res.set({ 'Content-Type': 'image/png' })
        res.send(canvas.toBuffer())
       
  } catch (error) {
    return res.json({ message: "Invalid Image Type" })

  }
})
app.get('/uncover', async (req, res) => {
  let image1 = req.query.image;
  if (!image1) return res.send({ message: 'Please provide a valid image of png or jpg format.' })
  try {
        const canvas = Canvas.createCanvas(728, 424);
        const ctx = canvas.getContext(`2d`);
        image1 = await Canvas.loadImage(image1);
        const background = await Canvas.loadImage(`https://media.discordapp.net/attachments/766610773530509312/854316651272470538/1623755349956.png`);
        ctx.drawImage(image1, 114, 43, 582, 380);
        ctx.drawImage(background, 0, 0, 728, 424);
        res.set({ 'Content-Type': 'image/png' })
        res.send(canvas.toBuffer())
        db.add(`reqs`, 1)
        db.add(`reqsuncover`, 1)
         const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Uncover", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${req.query.image})`, true)
        .setColor(color)
        hook.send(embed)
  } catch (error) {
    console.log(error)
    return res.json({ message: "Invalid Image Type" })
  }
})
app.get('/meme', (req, res) => {
 let subreddits = ["dankmemes","me_irl","Memes_Of_The_Dank"]
 let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)]
  got(`https://www.reddit.com/r/${subreddit}/random/.json`)
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;


  res.json(
    {
    title: memeTitle,
    url: "https://reddit.com" + permalink,
    image: memeImage,
    upvotes: memeUpvotes,
    comments: memeNumComments
  }
  )
 db.add(`reqs`, 1)
 db.add(`reqsmeme`, 1)
  const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Meme", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .setColor(color)
        hook.send(embed)
  })
})

app.get('/pet', async (req, res) => {

let image = req.query.image;
if (!image) return res.json({
  error: "No image was provided"
})
let pat = await pet(image)
res.set({ 'Content-Type': 'image/gif' })
        res.send(pat)
        db.add(`reqs`, 1)
        db.add(`reqspet`, 1)
         const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Pet", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• image - [Link](${image})`, true)
        .setColor(color)
        hook.send(embed)
})
app.get('/caution', async (req, res) => {
  const text = req.query.text;
 if (!text) return res.json({ error: "Please provide text!" })

    const base = await Canvas.loadImage(`https://raw.githubusercontent.com/caseyCantCode/discordImageGenImages/main/caution.png`)
    const canvas = Canvas.createCanvas(base.width, base.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `60px Arial`
    let fontSize = 60;
    while (ctx.measureText(text).width > 3311) {
        fontSize--;
        ctx.font = `${fontSize}px Arial`
    }
    const lines = await wrapText(ctx, text.toUpperCase(), 895);
    const topMost = 470 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
    for (let i = 0; i < lines.length; i++) {
        const height = topMost + ((fontSize + 20) * i);
        ctx.fillText(lines[i], base.width / 2, height);
    }
    db.add(`reqs`, 1)
    db.add(`reqscaution`, 1)
     const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Caution", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}`, true)
        .setColor(color)
        hook.send(embed)
    res.set({ 'Content-Type': 'image/png' })
    res.send(canvas.toBuffer())
})
app.get('/translate', async (req, res) => {
 let text = req.query.text;
let to = req.query.to;
if (!text) return res.json({ message: "Provide a text to translate."})
if (!to) return res.json({ message: "Please provide a language to translate to"})

try {

let translated = await translate(text, {to: to })
    res.json({ translated: translated.text })
db.add(`reqs`, 1)
db.add(`reqstranslate`, 1)
 const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Translate", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${text}\n• to - ${to}`, true)
        .setColor(color)
        hook.send(embed)
} catch (error) {
  return res.json({
    translated: error.message
  })
  
}


  
})
function doublestruck(text) {
  const specialCodes = {
            'a': '𝕒',
            'b': '𝕓',
            'c': '𝕔',
            'd': '𝕕',
            'e': '𝕖',
            'f': '𝕗',
            'g': '𝕘',
            'h': '𝕙',
            'i': '𝕚',
            'j': '𝕛',
            'k': '𝕜',
            'l': '𝕝',
            'm': '𝕞',
            'n': '𝕟',
            'o': '𝕠',
            'p': '𝕡',
            'q': '𝕢',
            'r': '𝕣',
            's': '𝕤',
            't': '𝕥',
            'u': '𝕦',
            'v': '𝕧',
            'w': '𝕨',
            'x': '𝕩',
            'y': '𝕪',
            'z': '𝕫',
            'A': '𝔸',
            'B': '𝔹',
            'C': 'ℂ',
            'D': '𝔻',
            'E': '𝔼',
            'F': '𝔽',
            'G': '𝔾',
            'H': 'ℍ',
            'I': '𝕀',
            'J': '𝕁',
            'K': '𝕂',
            'L': '𝕃',
            'M': '𝕄',
            'N': 'ℕ',
            'O': '𝕆',
            'P': 'ℙ',
            'Q': 'ℚ',
            'R': 'ℝ',
            'S': '𝕊',
            'T': '𝕋',
            'U': '𝕌',
            'V': '𝕍',
            'W': '𝕎',
            'X': '𝕏',
            'Y': '𝕐',
            'Z': 'ℤ',
            "1": "𝟙",
            "2": "𝟚",
            "3": "𝟛",
            "4": "𝟜",
            "5": "𝟝",
    "6": "𝟞",
    "7": "𝟟",
    "8": "𝟠",
    "9": "𝟡",
    "0:": "𝟘",
    ",": "'",
    ".": "˙",
    "'": ",",
    "\"": ",,",
    "_": "‾",


    "&": "⅋",
    "!": "¡",
    "?": "¿",
    "`": ",",
   
       
           
            ' ': ' '
          }
  
        const converted = letterTrans(text, specialCodes);
        return converted;
}
const randomNumber = function (length) {
  return Math.floor(Math.random() * length)
}
const randomChoice = function (list) {
  return list[randomNumber(list.length)]
}

function mock(string) {
   const possibleOutcomes = ['low', 'high']
    const outcome = function () {
      return randomChoice(possibleOutcomes)
    }

    return string.split('').map(function (character) {
      if (outcome() === 'low') {
        return character.toLowerCase()
      }
      return character.toUpperCase()
    }).join('')
}
function morse(text) {
 const morseCode = {
 a: '.-',
 b: '-...',
 c: '-.-.',
 d: '-..',
 e: '.',
 f: '..-.',
 g: '--.',
 h: '....',
 i: '..',
 j: '.---',
 k: '-.-',
 l: '.-..',
 m: '--',
 n: '-.',
 o: '---',
 p: '.--.',
 q: '--.-',
 r: '.-.',
 s: '...',
 t: '-',
 u: '..-',
 v: '...-',
 w: '.--',
 y: '-.--',
 z: '--..',
 1: '.----',
 2: '..---',
 3: '...--',
 4: '....-',
 5: '.....',
 6: '-....',
 7: '--...',
 8: '---..',
 9: '----.',
 0: '-----',
 '.': '.-.-.-',
 ',': '--..--',
 ':': '---...',
 '?': '..--..',
 "'": '.----.',
 '-': '-....-',
 '/': '-..-.',
 ')': '-.--.-',
 '(': '-.--.',
 '"': '.-..-.',
 '@': '.--.-.',
 '=': '-...-',
 ' ': '/'
 }

 const splitted = text.toLowerCase().split(/(?!$)/)

 return splitted.map(function (character) {
 return morseCode[character]
 }).join(' ')
}

app.get("/apistats", async (req, res) => {
  res.json({
    total_requests: await db.fetch(`reqs`)  + " Requests",
    wyr: await db.fetch(`reqswyr`) + " Requests",
    mock: await db.fetch(`reqsmock`)  + " Requests",
    drip: await db.fetch(`reqsdrip`)  + " Requests",
    ad: await db.fetch(`reqsad`)  + " Requests",
    translate: await db.fetch(`reqstranslate`)  + " Requests",
    meme: await db.fetch(`reqsmeme`)  + " Requests",
    eightball: await db.fetch(`reqs8ball`)  + " Requests",
    playstore: await db.fetch(`reqsplaystore`)  + " Requests",
    itunes: await db.fetch(`reqsitunes`)  + " Requests",
    jokeoverhead: await db.fetch(`reqsjokeoverhead`)  + " Requests",
    reverse: await db.fetch(`reqsreverse`)  + " Requests",
    doublestruck: await db.fetch(`reqsdoublestruck`)  + " Requests",
    mnm: await db.fetch(`reqsmnm`)  + " Requests",
    pet: await db.fetch(`reqspet`)  + " Requests",
    uncover: await db.fetch(`reqsuncover`) + " Requests",
    encode: await db.fetch(`reqsencode`) + " Requests",
    decode: await db.fetch(`reqsdecode`) + " Requests",
    greyscale: await db.fetch(`reqsgreyscale`) + " Requests",
    invert: await db.fetch(`reqsinvert`) + " Requests",
    blur: await db.fetch(`reqsblur`) + " Requests",
    clown: await db.fetch(`reqsclown`) + " Requests",
    joke: await db.fetch(`reqsjoke`) + " Requests",
    colorify: await db.fetch(`reqscolorify`) + " Requests",
    pikachu: await db.fetch(`reqspikachu`) + " Requests",
    biden: await db.fetch(`reqsbiden`) + " Requests",
    drake: await db.fetch(`reqsdrake`) + " Requests",
    wide: await db.fetch(`reqswide`) + " Requests",
    ship: await db.fetch(`reqsship`) + " Requests",
    pooh: await db.fetch(`reqspooh`) + " Requests",
    facts: await db.fetch(`reqsfacts`) + " Requests",
    alert: await db.fetch(`reqsalert`) + " Requests",
    caution: await db.fetch(`reqscaution`) + " Requests",
    color: await db.fetch(`reqscolor`) + " Requests",
    chatbot: await db.fetch(`reqschatbot`) + " Requests",
    welcomecard: await db.fetch(`reqswelcome`) + " Requests"
   })   
 
  
})
app.get('/pooh', async (req, res) => {
  const normal = req.query.text1;
  const tuxedo = req.query.text2;
  if(!normal || !tuxedo) return res.json({ error: "Please provide text1 and text2!"})
   try {
        const base = await Canvas.loadImage('https://raw.githubusercontent.com/caseyCantCode/discordImageGenImages/main/tuxedo-pooh.png');
        const canvas = Canvas.createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.font = "50px Arial"
        let fontSize = 50;
        while (ctx.measureText(normal).width > 1320) {
            fontSize--;
            ctx.font = `${fontSize}px Arial`
        }
        const normalLines = await wrapText(ctx, normal, 440);
        const normalTopMost = 145 - (((fontSize * normalLines.length) / 2) + ((10 * (normalLines.length - 1)) / 2));
        for (let i = 0; i < normalLines.length; i++) {
            const height = normalTopMost + ((fontSize + 10) * i);
            ctx.fillText(normalLines[i], 570, height);
        }
        ctx.font = "50px Arial"
        fontSize = 50;
        while (ctx.measureText(tuxedo).width > 1320) {
            fontSize--;
            ctx.font = `${fontSize}px Arial`;
        }
        const tuxedoLines = await wrapText(ctx, tuxedo, 440);
        const tuxedoTopMost = 436 - (((fontSize * tuxedoLines.length) / 2) + ((10 * (tuxedoLines.length - 1)) / 2));
        for (let i = 0; i < tuxedoLines.length; i++) {
            const height = tuxedoTopMost + ((fontSize + 10) * i);
            ctx.fillText(tuxedoLines[i], 570, height);
        }
        res.set({ 'Content-Type': 'image/png' })
        res.send(canvas.toBuffer())
        db.add(`reqs`, 1)
        db.add(`reqspooh`, 1)
        const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Pooh", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Queries', `• text1 - ${normal}\n• text2 - ${tuxedo}`, true)
        .setColor(color)
        hook.send(embed)
    } catch (err) {
        res.json({ error: `Sorry there was an error: ${err.message}`})
    }
})

app.get('/facts', async (req, res) => {
  const fact = req.query.text;
  if(!fact) return res.json({ error: "Please provide text!"})
  const base = await Canvas.loadImage(`./assets/facts.png`);
    const canvas = Canvas.createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.drawImage(base, 0, 0);
    ctx.rotate(15 * (Math.PI / 180));
    ctx.font = `30px Arial`
    let fontSize = 30;
    while (ctx.measureText(fact).width > 458) {
        fontSize--;
        ctx.font = `${fontSize}px Arial`
    }
    const lines = await wrapText(ctx, fact, 183);
    ctx.fillText(lines.join('\n'), 119, 306, 183);
    ctx.rotate(-15 * (Math.PI / 180));
    res.set({ 'Content-Type': 'image/png' })
    res.send(canvas.toBuffer())
    db.add(`reqs`, 1)
        db.add(`reqsfacts`, 1)
        const embed = new Discord.MessageEmbed()
        .setTitle('New Endpoint Used')
        .addField('Endpoint', "Facts", true)
        .setThumbnail('https://cdn.discordapp.com/avatars/804341143092985886/02ddf76ce417a496f49a502ee80c7290.png')
        .addField('Query', `• text - ${fact}`, true)
        .setColor(color)
        hook.send(embed)
})
function  wrapText(ctx, text, maxWidth) {
        return new Promise(resolve => {
            if (ctx.measureText(text).width < maxWidth) return resolve([text]);
            if (ctx.measureText('W').width > maxWidth) return resolve(null);
            const words = text.split(' ');
            const lines = [];
            let line = '';
            while (words.length > 0) {
                let split = false;
                while (ctx.measureText(words[0]).width >= maxWidth) {
                    const temp = words[0];
                    words[0] = temp.slice(0, -1);
                    if (split) {
                        words[1] = `${temp.slice(-1)}${words[1]}`;
                    } else {
                        split = true;
                        words.splice(1, 0, temp.slice(-1));
                    }
                }
                if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
                    line += `${words.shift()} `;
                } else {
                    lines.push(line.trim());
                    line = '';
                }
                if (words.length === 0) lines.push(line.trim());
            }
            return resolve(lines);
        });
    }

 var ntc = {

  init: function() {
    var color, rgb, hsl;
    for(var i = 0; i < ntc.names.length; i++)
    {
      color = "#" + ntc.names[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {

    color = color.toUpperCase();
    if(color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if(color.length % 3 == 0)
      color = "#" + color;
    if(color.length == 4)
      color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

    var rgb = ntc.rgb(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;

    for(var i = 0; i < ntc.names.length; i++)
    {
      if(color == "#" + ntc.names[i][0])
        return ["#" + ntc.names[i][0], ntc.names[i][1], true];

      ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
      ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if(df < 0 || df > ndf)
      {
        df = ndf;
        cl = i;
      }
    }

    return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
  },

  names: [
["000000", "Black"],
["000080", "Navy Blue"],
["0000C8", "Dark Blue"],
["0000FF", "Blue"],
["000741", "Stratos"],
["001B1C", "Swamp"],
["002387", "Resolution Blue"],
["002900", "Deep Fir"],
["002E20", "Burnham"],
["002FA7", "International Klein Blue"],
["003153", "Prussian Blue"],
["003366", "Midnight Blue"],
["003399", "Smalt"],
["003532", "Deep Teal"],
["003E40", "Cyprus"],
["004620", "Kaitoke Green"],
["0047AB", "Cobalt"],
["004816", "Crusoe"],
["004950", "Sherpa Blue"],
["0056A7", "Endeavour"],
["00581A", "Camarone"],
["0066CC", "Science Blue"],
["0066FF", "Blue Ribbon"],
["00755E", "Tropical Rain Forest"],
["0076A3", "Allports"],
["007BA7", "Deep Cerulean"],
["007EC7", "Lochmara"],
["007FFF", "Azure Radiance"],
["008080", "Teal"],
["0095B6", "Bondi Blue"],
["009DC4", "Pacific Blue"],
["00A693", "Persian Green"],
["00A86B", "Jade"],
["00CC99", "Caribbean Green"],
["00CCCC", "Robin's Egg Blue"],
["00FF00", "Green"],
["00FF7F", "Spring Green"],
["00FFFF", "Cyan / Aqua"],
["010D1A", "Blue Charcoal"],
["011635", "Midnight"],
["011D13", "Holly"],
["012731", "Daintree"],
["01361C", "Cardin Green"],
["01371A", "County Green"],
["013E62", "Astronaut Blue"],
["013F6A", "Regal Blue"],
["014B43", "Aqua Deep"],
["015E85", "Orient"],
["016162", "Blue Stone"],
["016D39", "Fun Green"],
["01796F", "Pine Green"],
["017987", "Blue Lagoon"],
["01826B", "Deep Sea"],
["01A368", "Green Haze"],
["022D15", "English Holly"],
["02402C", "Sherwood Green"],
["02478E", "Congress Blue"],
["024E46", "Evening Sea"],
["026395", "Bahama Blue"],
["02866F", "Observatory"],
["02A4D3", "Cerulean"],
["03163C", "Tangaroa"],
["032B52", "Green Vogue"],
["036A6E", "Mosque"],
["041004", "Midnight Moss"],
["041322", "Black Pearl"],
["042E4C", "Blue Whale"],
["044022", "Zuccini"],
["044259", "Teal Blue"],
["051040", "Deep Cove"],
["051657", "Gulf Blue"],
["055989", "Venice Blue"],
["056F57", "Watercourse"],
["062A78", "Catalina Blue"],
["063537", "Tiber"],
["069B81", "Gossamer"],
["06A189", "Niagara"],
["073A50", "Tarawera"],
["080110", "Jaguar"],
["081910", "Black Bean"],
["082567", "Deep Sapphire"],
["088370", "Elf Green"],
["08E8DE", "Bright Turquoise"],
["092256", "Downriver"],
["09230F", "Palm Green"],
["09255D", "Madison"],
["093624", "Bottle Green"],
["095859", "Deep Sea Green"],
["097F4B", "Salem"],
["0A001C", "Black Russian"],
["0A480D", "Dark Fern"],
["0A6906", "Japanese Laurel"],
["0A6F75", "Atoll"],
["0B0B0B", "Cod Gray"],
["0B0F08", "Marshland"],
["0B1107", "Gordons Green"],
["0B1304", "Black Forest"],
["0B6207", "San Felix"],
["0BDA51", "Malachite"],
["0C0B1D", "Ebony"],
["0C0D0F", "Woodsmoke"],
["0C1911", "Racing Green"],
["0C7A79", "Surfie Green"],
["0C8990", "Blue Chill"],
["0D0332", "Black Rock"],
["0D1117", "Bunker"],
["0D1C19", "Aztec"],
["0D2E1C", "Bush"],
["0E0E18", "Cinder"],
["0E2A30", "Firefly"],
["0F2D9E", "Torea Bay"],
["10121D", "Vulcan"],
["101405", "Green Waterloo"],
["105852", "Eden"],
["110C6C", "Arapawa"],
["120A8F", "Ultramarine"],
["123447", "Elephant"],
["126B40", "Jewel"],
["130000", "Diesel"],
["130A06", "Asphalt"],
["13264D", "Blue Zodiac"],
["134F19", "Parsley"],
["140600", "Nero"],
["1450AA", "Tory Blue"],
["151F4C", "Bunting"],
["1560BD", "Denim"],
["15736B", "Genoa"],
["161928", "Mirage"],
["161D10", "Hunter Green"],
["162A40", "Big Stone"],
["163222", "Celtic"],
["16322C", "Timber Green"],
["163531", "Gable Green"],
["171F04", "Pine Tree"],
["175579", "Chathams Blue"],
["182D09", "Deep Forest Green"],
["18587A", "Blumine"],
["19330E", "Palm Leaf"],
["193751", "Nile Blue"],
["1959A8", "Fun Blue"],
["1A1A68", "Lucky Point"],
["1AB385", "Mountain Meadow"],
["1B0245", "Tolopea"],
["1B1035", "Haiti"],
["1B127B", "Deep Koamaru"],
["1B1404", "Acadia"],
["1B2F11", "Seaweed"],
["1B3162", "Biscay"],
["1B659D", "Matisse"],
["1C1208", "Crowshead"],
["1C1E13", "Rangoon Green"],
["1C39BB", "Persian Blue"],
["1C402E", "Everglade"],
["1C7C7D", "Elm"],
["1D6142", "Green Pea"],
["1E0F04", "Creole"],
["1E1609", "Karaka"],
["1E1708", "El Paso"],
["1E385B", "Cello"],
["1E433C", "Te Papa Green"],
["1E90FF", "Dodger Blue"],
["1E9AB0", "Eastern Blue"],
["1F120F", "Night Rider"],
["1FC2C2", "Java"],
["20208D", "Jacksons Purple"],
["202E54", "Cloud Burst"],
["204852", "Blue Dianne"],
["211A0E", "Eternity"],
["220878", "Deep Blue"],
["228B22", "Forest Green"],
["233418", "Mallard"],
["240A40", "Violet"],
["240C02", "Kilamanjaro"],
["242A1D", "Log Cabin"],
["242E16", "Black Olive"],
["24500F", "Green House"],
["251607", "Graphite"],
["251706", "Cannon Black"],
["251F4F", "Port Gore"],
["25272C", "Shark"],
["25311C", "Green Kelp"],
["2596D1", "Curious Blue"],
["260368", "Paua"],
["26056A", "Paris M"],
["261105", "Wood Bark"],
["261414", "Gondola"],
["262335", "Steel Gray"],
["26283B", "Ebony Clay"],
["273A81", "Bay of Many"],
["27504B", "Plantation"],
["278A5B", "Eucalyptus"],
["281E15", "Oil"],
["283A77", "Astronaut"],
["286ACD", "Mariner"],
["290C5E", "Violent Violet"],
["292130", "Bastille"],
["292319", "Zeus"],
["292937", "Charade"],
["297B9A", "Jelly Bean"],
["29AB87", "Jungle Green"],
["2A0359", "Cherry Pie"],
["2A140E", "Coffee Bean"],
["2A2630", "Baltic Sea"],
["2A380B", "Turtle Green"],
["2A52BE", "Cerulean Blue"],
["2B0202", "Sepia Black"],
["2B194F", "Valhalla"],
["2B3228", "Heavy Metal"],
["2C0E8C", "Blue Gem"],
["2C1632", "Revolver"],
["2C2133", "Bleached Cedar"],
["2C8C84", "Lochinvar"],
["2D2510", "Mikado"],
["2D383A", "Outer Space"],
["2D569B", "St Tropaz"],
["2E0329", "Jacaranda"],
["2E1905", "Jacko Bean"],
["2E3222", "Rangitoto"],
["2E3F62", "Rhino"],
["2E8B57", "Sea Green"],
["2EBFD4", "Scooter"],
["2F270E", "Onion"],
["2F3CB3", "Governor Bay"],
["2F519E", "Sapphire"],
["2F5A57", "Spectra"],
["2F6168", "Casal"],
["300529", "Melanzane"],
["301F1E", "Cocoa Brown"],
["302A0F", "Woodrush"],
["304B6A", "San Juan"],
["30D5C8", "Turquoise"],
["311C17", "Eclipse"],
["314459", "Pickled Bluewood"],
["315BA1", "Azure"],
["31728D", "Calypso"],
["317D82", "Paradiso"],
["32127A", "Persian Indigo"],
["32293A", "Blackcurrant"],
["323232", "Mine Shaft"],
["325D52", "Stromboli"],
["327C14", "Bilbao"],
["327DA0", "Astral"],
["33036B", "Christalle"],
["33292F", "Thunder"],
["33CC99", "Shamrock"],
["341515", "Tamarind"],
["350036", "Mardi Gras"],
["350E42", "Valentino"],
["350E57", "Jagger"],
["353542", "Tuna"],
["354E8C", "Chambray"],
["363050", "Martinique"],
["363534", "Tuatara"],
["363C0D", "Waiouru"],
["36747D", "Ming"],
["368716", "La Palma"],
["370202", "Chocolate"],
["371D09", "Clinker"],
["37290E", "Brown Tumbleweed"],
["373021", "Birch"],
["377475", "Oracle"],
["380474", "Blue Diamond"],
["381A51", "Grape"],
["383533", "Dune"],
["384555", "Oxford Blue"],
["384910", "Clover"],
["394851", "Limed Spruce"],
["396413", "Dell"],
["3A0020", "Toledo"],
["3A2010", "Sambuca"],
["3A2A6A", "Jacarta"],
["3A686C", "William"],
["3A6A47", "Killarney"],
["3AB09E", "Keppel"],
["3B000B", "Temptress"],
["3B0910", "Aubergine"],
["3B1F1F", "Jon"],
["3B2820", "Treehouse"],
["3B7A57", "Amazon"],
["3B91B4", "Boston Blue"],
["3C0878", "Windsor"],
["3C1206", "Rebel"],
["3C1F76", "Meteorite"],
["3C2005", "Dark Ebony"],
["3C3910", "Camouflage"],
["3C4151", "Bright Gray"],
["3C4443", "Cape Cod"],
["3C493A", "Lunar Green"],
["3D0C02", "Bean  "],
["3D2B1F", "Bistre"],
["3D7D52", "Goblin"],
["3E0480", "Kingfisher Daisy"],
["3E1C14", "Cedar"],
["3E2B23", "English Walnut"],
["3E2C1C", "Black Marlin"],
["3E3A44", "Ship Gray"],
["3EABBF", "Pelorous"],
["3F2109", "Bronze"],
["3F2500", "Cola"],
["3F3002", "Madras"],
["3F307F", "Minsk"],
["3F4C3A", "Cabbage Pont"],
["3F583B", "Tom Thumb"],
["3F5D53", "Mineral Green"],
["3FC1AA", "Puerto Rico"],
["3FFF00", "Harlequin"],
["401801", "Brown Pod"],
["40291D", "Cork"],
["403B38", "Masala"],
["403D19", "Thatch Green"],
["405169", "Fiord"],
["40826D", "Viridian"],
["40A860", "Chateau Green"],
["410056", "Ripe Plum"],
["411F10", "Paco"],
["412010", "Deep Oak"],
["413C37", "Merlin"],
["414257", "Gun Powder"],
["414C7D", "East Bay"],
["4169E1", "Royal Blue"],
["41AA78", "Ocean Green"],
["420303", "Burnt Maroon"],
["423921", "Lisbon Brown"],
["427977", "Faded Jade"],
["431560", "Scarlet Gum"],
["433120", "Iroko"],
["433E37", "Armadillo"],
["434C59", "River Bed"],
["436A0D", "Green Leaf"],
["44012D", "Barossa"],
["441D00", "Morocco Brown"],
["444954", "Mako"],
["454936", "Kelp"],
["456CAC", "San Marino"],
["45B1E8", "Picton Blue"],
["460B41", "Loulou"],
["462425", "Crater Brown"],
["465945", "Gray Asparagus"],
["4682B4", "Steel Blue"],
["480404", "Rustic Red"],
["480607", "Bulgarian Rose"],
["480656", "Clairvoyant"],
["481C1C", "Cocoa Bean"],
["483131", "Woody Brown"],
["483C32", "Taupe"],
["49170C", "Van Cleef"],
["492615", "Brown Derby"],
["49371B", "Metallic Bronze"],
["495400", "Verdun Green"],
["496679", "Blue Bayoux"],
["497183", "Bismark"],
["4A2A04", "Bracken"],
["4A3004", "Deep Bronze"],
["4A3C30", "Mondo"],
["4A4244", "Tundora"],
["4A444B", "Gravel"],
["4A4E5A", "Trout"],
["4B0082", "Pigment Indigo"],
["4B5D52", "Nandor"],
["4C3024", "Saddle"],
["4C4F56", "Abbey"],
["4D0135", "Blackberry"],
["4D0A18", "Cab Sav"],
["4D1E01", "Indian Tan"],
["4D282D", "Cowboy"],
["4D282E", "Livid Brown"],
["4D3833", "Rock"],
["4D3D14", "Punga"],
["4D400F", "Bronzetone"],
["4D5328", "Woodland"],
["4E0606", "Mahogany"],
["4E2A5A", "Bossanova"],
["4E3B41", "Matterhorn"],
["4E420C", "Bronze Olive"],
["4E4562", "Mulled Wine"],
["4E6649", "Axolotl"],
["4E7F9E", "Wedgewood"],
["4EABD1", "Shakespeare"],
["4F1C70", "Honey Flower"],
["4F2398", "Daisy Bush"],
["4F69C6", "Indigo"],
["4F7942", "Fern Green"],
["4F9D5D", "Fruit Salad"],
["4FA83D", "Apple"],
["504351", "Mortar"],
["507096", "Kashmir Blue"],
["507672", "Cutty Sark"],
["50C878", "Emerald"],
["514649", "Emperor"],
["516E3D", "Chalet Green"],
["517C66", "Como"],
["51808F", "Smalt Blue"],
["52001F", "Castro"],
["520C17", "Maroon Oak"],
["523C94", "Gigas"],
["533455", "Voodoo"],
["534491", "Victoria"],
["53824B", "Hippie Green"],
["541012", "Heath"],
["544333", "Judge Gray"],
["54534D", "Fuscous Gray"],
["549019", "Vida Loca"],
["55280C", "Cioccolato"],
["555B10", "Saratoga"],
["556D56", "Finlandia"],
["5590D9", "Havelock Blue"],
["56B4BE", "Fountain Blue"],
["578363", "Spring Leaves"],
["583401", "Saddle Brown"],
["585562", "Scarpa Flow"],
["587156", "Cactus"],
["589AAF", "Hippie Blue"],
["591D35", "Wine Berry"],
["592804", "Brown Bramble"],
["593737", "Congo Brown"],
["594433", "Millbrook"],
["5A6E9C", "Waikawa Gray"],
["5A87A0", "Horizon"],
["5B3013", "Jambalaya"],
["5C0120", "Bordeaux"],
["5C0536", "Mulberry Wood"],
["5C2E01", "Carnaby Tan"],
["5C5D75", "Comet"],
["5D1E0F", "Redwood"],
["5D4C51", "Don Juan"],
["5D5C58", "Chicago"],
["5D5E37", "Verdigris"],
["5D7747", "Dingley"],
["5DA19F", "Breaker Bay"],
["5E483E", "Kabul"],
["5E5D3B", "Hemlock"],
["5F3D26", "Irish Coffee"],
["5F5F6E", "Mid Gray"],
["5F6672", "Shuttle Gray"],
["5FA777", "Aqua Forest"],
["5FB3AC", "Tradewind"],
["604913", "Horses Neck"],
["605B73", "Smoky"],
["606E68", "Corduroy"],
["6093D1", "Danube"],
["612718", "Espresso"],
["614051", "Eggplant"],
["615D30", "Costa Del Sol"],
["61845F", "Glade Green"],
["622F30", "Buccaneer"],
["623F2D", "Quincy"],
["624E9A", "Butterfly Bush"],
["625119", "West Coast"],
["626649", "Finch"],
["639A8F", "Patina"],
["63B76C", "Fern"],
["6456B7", "Blue Violet"],
["646077", "Dolphin"],
["646463", "Storm Dust"],
["646A54", "Siam"],
["646E75", "Nevada"],
["6495ED", "Cornflower Blue"],
["64CCDB", "Viking"],
["65000B", "Rosewood"],
["651A14", "Cherrywood"],
["652DC1", "Purple Heart"],
["657220", "Fern Frond"],
["65745D", "Willow Grove"],
["65869F", "Hoki"],
["660045", "Pompadour"],
["660099", "Purple"],
["66023C", "Tyrian Purple"],
["661010", "Dark Tan"],
["66B58F", "Silver Tree"],
["66FF00", "Bright Green"],
["66FF66", "Screamin' Green"],
["67032D", "Black Rose"],
["675FA6", "Scampi"],
["676662", "Ironside Gray"],
["678975", "Viridian Green"],
["67A712", "Christi"],
["683600", "Nutmeg Wood Finish"],
["685558", "Zambezi"],
["685E6E", "Salt Box"],
["692545", "Tawny Port"],
["692D54", "Finn"],
["695F62", "Scorpion"],
["697E9A", "Lynch"],
["6A442E", "Spice"],
["6A5D1B", "Himalaya"],
["6A6051", "Soya Bean"],
["6B2A14", "Hairy Heath"],
["6B3FA0", "Royal Purple"],
["6B4E31", "Shingle Fawn"],
["6B5755", "Dorado"],
["6B8BA2", "Bermuda Gray"],
["6B8E23", "Olive Drab"],
["6C3082", "Eminence"],
["6CDAE7", "Turquoise Blue"],
["6D0101", "Lonestar"],
["6D5E54", "Pine Cone"],
["6D6C6C", "Dove Gray"],
["6D9292", "Juniper"],
["6D92A1", "Gothic"],
["6E0902", "Red Oxide"],
["6E1D14", "Moccaccino"],
["6E4826", "Pickled Bean"],
["6E4B26", "Dallas"],
["6E6D57", "Kokoda"],
["6E7783", "Pale Sky"],
["6F440C", "Cafe Royale"],
["6F6A61", "Flint"],
["6F8E63", "Highland"],
["6F9D02", "Limeade"],
["6FD0C5", "Downy"],
["701C1C", "Persian Plum"],
["704214", "Sepia"],
["704A07", "Antique Bronze"],
["704F50", "Ferra"],
["706555", "Coffee"],
["708090", "Slate Gray"],
["711A00", "Cedar Wood Finish"],
["71291D", "Metallic Copper"],
["714693", "Affair"],
["714AB2", "Studio"],
["715D47", "Tobacco Brown"],
["716338", "Yellow Metal"],
["716B56", "Peat"],
["716E10", "Olivetone"],
["717486", "Storm Gray"],
["718080", "Sirocco"],
["71D9E2", "Aquamarine Blue"],
["72010F", "Venetian Red"],
["724A2F", "Old Copper"],
["726D4E", "Go Ben"],
["727B89", "Raven"],
["731E8F", "Seance"],
["734A12", "Raw Umber"],
["736C9F", "Kimberly"],
["736D58", "Crocodile"],
["737829", "Crete"],
["738678", "Xanadu"],
["74640D", "Spicy Mustard"],
["747D63", "Limed Ash"],
["747D83", "Rolling Stone"],
["748881", "Blue Smoke"],
["749378", "Laurel"],
["74C365", "Mantis"],
["755A57", "Russett"],
["7563A8", "Deluge"],
["76395D", "Cosmic"],
["7666C6", "Blue Marguerite"],
["76BD17", "Lima"],
["76D7EA", "Sky Blue"],
["770F05", "Dark Burgundy"],
["771F1F", "Crown of Thorns"],
["773F1A", "Walnut"],
["776F61", "Pablo"],
["778120", "Pacifika"],
["779E86", "Oxley"],
["77DD77", "Pastel Green"],
["780109", "Japanese Maple"],
["782D19", "Mocha"],
["782F16", "Peanut"],
["78866B", "Camouflage Green"],
["788A25", "Wasabi"],
["788BBA", "Ship Cove"],
["78A39C", "Sea Nymph"],
["795D4C", "Roman Coffee"],
["796878", "Old Lavender"],
["796989", "Rum"],
["796A78", "Fedora"],
["796D62", "Sandstone"],
["79DEEC", "Spray"],
["7A013A", "Siren"],
["7A58C1", "Fuchsia Blue"],
["7A7A7A", "Boulder"],
["7A89B8", "Wild Blue Yonder"],
["7AC488", "De York"],
["7B3801", "Red Beech"],
["7B3F00", "Cinnamon"],
["7B6608", "Yukon Gold"],
["7B7874", "Tapa"],
["7B7C94", "Waterloo "],
["7B8265", "Flax Smoke"],
["7B9F80", "Amulet"],
["7BA05B", "Asparagus"],
["7C1C05", "Kenyan Copper"],
["7C7631", "Pesto"],
["7C778A", "Topaz"],
["7C7B7A", "Concord"],
["7C7B82", "Jumbo"],
["7C881A", "Trendy Green"],
["7CA1A6", "Gumbo"],
["7CB0A1", "Acapulco"],
["7CB7BB", "Neptune"],
["7D2C14", "Pueblo"],
["7DA98D", "Bay Leaf"],
["7DC8F7", "Malibu"],
["7DD8C6", "Bermuda"],
["7E3A15", "Copper Canyon"],
["7F1734", "Claret"],
["7F3A02", "Peru Tan"],
["7F626D", "Falcon"],
["7F7589", "Mobster"],
["7F76D3", "Moody Blue"],
["7FFF00", "Chartreuse"],
["7FFFD4", "Aquamarine"],
["800000", "Maroon"],
["800B47", "Rose Bud Cherry"],
["801818", "Falu Red"],
["80341F", "Red Robin"],
["803790", "Vivid Violet"],
["80461B", "Russet"],
["807E79", "Friar Gray"],
["808000", "Olive"],
["808080", "Gray"],
["80B3AE", "Gulf Stream"],
["80B3C4", "Glacier"],
["80CCEA", "Seagull"],
["81422C", "Nutmeg"],
["816E71", "Spicy Pink"],
["817377", "Empress"],
["819885", "Spanish Green"],
["826F65", "Sand Dune"],
["828685", "Gunsmoke"],
["828F72", "Battleship Gray"],
["831923", "Merlot"],
["837050", "Shadow"],
["83AA5D", "Chelsea Cucumber"],
["83D0C6", "Monte Carlo"],
["843179", "Plum"],
["84A0A0", "Granny Smith"],
["8581D9", "Chetwode Blue"],
["858470", "Bandicoot"],
["859FAF", "Bali Hai"],
["85C4CC", "Half Baked"],
["860111", "Red Devil"],
["863C3C", "Lotus"],
["86483C", "Ironstone"],
["864D1E", "Bull Shot"],
["86560A", "Rusty Nail"],
["868974", "Bitter"],
["86949F", "Regent Gray"],
["871550", "Disco"],
["87756E", "Americano"],
["877C7B", "Hurricane"],
["878D91", "Oslo Gray"],
["87AB39", "Sushi"],
["885342", "Spicy Mix"],
["886221", "Kumera"],
["888387", "Suva Gray"],
["888D65", "Avocado"],
["893456", "Camelot"],
["893843", "Solid Pink"],
["894367", "Cannon Pink"],
["897D6D", "Makara"],
["8A3324", "Burnt Umber"],
["8A73D6", "True V"],
["8A8360", "Clay Creek"],
["8A8389", "Monsoon"],
["8A8F8A", "Stack"],
["8AB9F1", "Jordy Blue"],
["8B00FF", "Electric Violet"],
["8B0723", "Monarch"],
["8B6B0B", "Corn Harvest"],
["8B8470", "Olive Haze"],
["8B847E", "Schooner"],
["8B8680", "Natural Gray"],
["8B9C90", "Mantle"],
["8B9FEE", "Portage"],
["8BA690", "Envy"],
["8BA9A5", "Cascade"],
["8BE6D8", "Riptide"],
["8C055E", "Cardinal Pink"],
["8C472F", "Mule Fawn"],
["8C5738", "Potters Clay"],
["8C6495", "Trendy Pink"],
["8D0226", "Paprika"],
["8D3D38", "Sanguine Brown"],
["8D3F3F", "Tosca"],
["8D7662", "Cement"],
["8D8974", "Granite Green"],
["8D90A1", "Manatee"],
["8DA8CC", "Polo Blue"],
["8E0000", "Red Berry"],
["8E4D1E", "Rope"],
["8E6F70", "Opium"],
["8E775E", "Domino"],
["8E8190", "Mamba"],
["8EABC1", "Nepal"],
["8F021C", "Pohutukawa"],
["8F3E33", "El Salva"],
["8F4B0E", "Korma"],
["8F8176", "Squirrel"],
["8FD6B4", "Vista Blue"],
["900020", "Burgundy"],
["901E1E", "Old Brick"],
["907874", "Hemp"],
["907B71", "Almond Frost"],
["908D39", "Sycamore"],
["92000A", "Sangria"],
["924321", "Cumin"],
["926F5B", "Beaver"],
["928573", "Stonewall"],
["928590", "Venus"],
["9370DB", "Medium Purple"],
["93CCEA", "Cornflower"],
["93DFB8", "Algae Green"],
["944747", "Copper Rust"],
["948771", "Arrowtown"],
["950015", "Scarlett"],
["956387", "Strikemaster"],
["959396", "Mountain Mist"],
["960018", "Carmine"],
["964B00", "Brown"],
["967059", "Leather"],
["9678B6", "Purple Mountain's Majesty"],
["967BB6", "Lavender Purple"],
["96A8A1", "Pewter"],
["96BBAB", "Summer Green"],
["97605D", "Au Chico"],
["9771B5", "Wisteria"],
["97CD2D", "Atlantis"],
["983D61", "Vin Rouge"],
["9874D3", "Lilac Bush"],
["98777B", "Bazaar"],
["98811B", "Hacienda"],
["988D77", "Pale Oyster"],
["98FF98", "Mint Green"],
["990066", "Fresh Eggplant"],
["991199", "Violet Eggplant"],
["991613", "Tamarillo"],
["991B07", "Totem Pole"],
["996666", "Copper Rose"],
["9966CC", "Amethyst"],
["997A8D", "Mountbatten Pink"],
["9999CC", "Blue Bell"],
["9A3820", "Prairie Sand"],
["9A6E61", "Toast"],
["9A9577", "Gurkha"],
["9AB973", "Olivine"],
["9AC2B8", "Shadow Green"],
["9B4703", "Oregon"],
["9B9E8F", "Lemon Grass"],
["9C3336", "Stiletto"],
["9D5616", "Hawaiian Tan"],
["9DACB7", "Gull Gray"],
["9DC209", "Pistachio"],
["9DE093", "Granny Smith Apple"],
["9DE5FF", "Anakiwa"],
["9E5302", "Chelsea Gem"],
["9E5B40", "Sepia Skin"],
["9EA587", "Sage"],
["9EA91F", "Citron"],
["9EB1CD", "Rock Blue"],
["9EDEE0", "Morning Glory"],
["9F381D", "Cognac"],
["9F821C", "Reef Gold"],
["9F9F9C", "Star Dust"],
["9FA0B1", "Santas Gray"],
["9FD7D3", "Sinbad"],
["9FDD8C", "Feijoa"],
["A02712", "Tabasco"],
["A1750D", "Buttered Rum"],
["A1ADB5", "Hit Gray"],
["A1C50A", "Citrus"],
["A1DAD7", "Aqua Island"],
["A1E9DE", "Water Leaf"],
["A2006D", "Flirt"],
["A23B6C", "Rouge"],
["A26645", "Cape Palliser"],
["A2AAB3", "Gray Chateau"],
["A2AEAB", "Edward"],
["A3807B", "Pharlap"],
["A397B4", "Amethyst Smoke"],
["A3E3ED", "Blizzard Blue"],
["A4A49D", "Delta"],
["A4A6D3", "Wistful"],
["A4AF6E", "Green Smoke"],
["A50B5E", "Jazzberry Jam"],
["A59B91", "Zorba"],
["A5CB0C", "Bahia"],
["A62F20", "Roof Terracotta"],
["A65529", "Paarl"],
["A68B5B", "Barley Corn"],
["A69279", "Donkey Brown"],
["A6A29A", "Dawn"],
["A72525", "Mexican Red"],
["A7882C", "Luxor Gold"],
["A85307", "Rich Gold"],
["A86515", "Reno Sand"],
["A86B6B", "Coral Tree"],
["A8989B", "Dusty Gray"],
["A899E6", "Dull Lavender"],
["A8A589", "Tallow"],
["A8AE9C", "Bud"],
["A8AF8E", "Locust"],
["A8BD9F", "Norway"],
["A8E3BD", "Chinook"],
["A9A491", "Gray Olive"],
["A9ACB6", "Aluminium"],
["A9B2C3", "Cadet Blue"],
["A9B497", "Schist"],
["A9BDBF", "Tower Gray"],
["A9BEF2", "Perano"],
["A9C6C2", "Opal"],
["AA375A", "Night Shadz"],
["AA4203", "Fire"],
["AA8B5B", "Muesli"],
["AA8D6F", "Sandal"],
["AAA5A9", "Shady Lady"],
["AAA9CD", "Logan"],
["AAABB7", "Spun Pearl"],
["AAD6E6", "Regent St Blue"],
["AAF0D1", "Magic Mint"],
["AB0563", "Lipstick"],
["AB3472", "Royal Heath"],
["AB917A", "Sandrift"],
["ABA0D9", "Cold Purple"],
["ABA196", "Bronco"],
["AC8A56", "Limed Oak"],
["AC91CE", "East Side"],
["AC9E22", "Lemon Ginger"],
["ACA494", "Napa"],
["ACA586", "Hillary"],
["ACA59F", "Cloudy"],
["ACACAC", "Silver Chalice"],
["ACB78E", "Swamp Green"],
["ACCBB1", "Spring Rain"],
["ACDD4D", "Conifer"],
["ACE1AF", "Celadon"],
["AD781B", "Mandalay"],
["ADBED1", "Casper"],
["ADDFAD", "Moss Green"],
["ADE6C4", "Padua"],
["ADFF2F", "Green Yellow"],
["AE4560", "Hippie Pink"],
["AE6020", "Desert"],
["AE809E", "Bouquet"],
["AF4035", "Medium Carmine"],
["AF4D43", "Apple Blossom"],
["AF593E", "Brown Rust"],
["AF8751", "Driftwood"],
["AF8F2C", "Alpine"],
["AF9F1C", "Lucky"],
["AFA09E", "Martini"],
["AFB1B8", "Bombay"],
["AFBDD9", "Pigeon Post"],
["B04C6A", "Cadillac"],
["B05D54", "Matrix"],
["B05E81", "Tapestry"],
["B06608", "Mai Tai"],
["B09A95", "Del Rio"],
["B0E0E6", "Powder Blue"],
["B0E313", "Inch Worm"],
["B10000", "Bright Red"],
["B14A0B", "Vesuvius"],
["B1610B", "Pumpkin Skin"],
["B16D52", "Santa Fe"],
["B19461", "Teak"],
["B1E2C1", "Fringy Flower"],
["B1F4E7", "Ice Cold"],
["B20931", "Shiraz"],
["B2A1EA", "Biloba Flower"],
["B32D29", "Tall Poppy"],
["B35213", "Fiery Orange"],
["B38007", "Hot Toddy"],
["B3AF95", "Taupe Gray"],
["B3C110", "La Rioja"],
["B43332", "Well Read"],
["B44668", "Blush"],
["B4CFD3", "Jungle Mist"],
["B57281", "Turkish Rose"],
["B57EDC", "Lavender"],
["B5A27F", "Mongoose"],
["B5B35C", "Olive Green"],
["B5D2CE", "Jet Stream"],
["B5ECDF", "Cruise"],
["B6316C", "Hibiscus"],
["B69D98", "Thatch"],
["B6B095", "Heathered Gray"],
["B6BAA4", "Eagle"],
["B6D1EA", "Spindle"],
["B6D3BF", "Gum Leaf"],
["B7410E", "Rust"],
["B78E5C", "Muddy Waters"],
["B7A214", "Sahara"],
["B7A458", "Husk"],
["B7B1B1", "Nobel"],
["B7C3D0", "Heather"],
["B7F0BE", "Madang"],
["B81104", "Milano Red"],
["B87333", "Copper"],
["B8B56A", "Gimblet"],
["B8C1B1", "Green Spring"],
["B8C25D", "Celery"],
["B8E0F9", "Sail"],
["B94E48", "Chestnut"],
["B95140", "Crail"],
["B98D28", "Marigold"],
["B9C46A", "Wild Willow"],
["B9C8AC", "Rainee"],
["BA0101", "Guardsman Red"],
["BA450C", "Rock Spray"],
["BA6F1E", "Bourbon"],
["BA7F03", "Pirate Gold"],
["BAB1A2", "Nomad"],
["BAC7C9", "Submarine"],
["BAEEF9", "Charlotte"],
["BB3385", "Medium Red Violet"],
["BB8983", "Brandy Rose"],
["BBD009", "Rio Grande"],
["BBD7C1", "Surf"],
["BCC9C2", "Powder Ash"],
["BD5E2E", "Tuscany"],
["BD978E", "Quicksand"],
["BDB1A8", "Silk"],
["BDB2A1", "Malta"],
["BDB3C7", "Chatelle"],
["BDBBD7", "Lavender Gray"],
["BDBDC6", "French Gray"],
["BDC8B3", "Clay Ash"],
["BDC9CE", "Loblolly"],
["BDEDFD", "French Pass"],
["BEA6C3", "London Hue"],
["BEB5B7", "Pink Swan"],
["BEDE0D", "Fuego"],
["BF5500", "Rose of Sharon"],
["BFB8B0", "Tide"],
["BFBED8", "Blue Haze"],
["BFC1C2", "Silver Sand"],
["BFC921", "Key Lime Pie"],
["BFDBE2", "Ziggurat"],
["BFFF00", "Lime"],
["C02B18", "Thunderbird"],
["C04737", "Mojo"],
["C08081", "Old Rose"],
["C0C0C0", "Silver"],
["C0D3B9", "Pale Leaf"],
["C0D8B6", "Pixie Green"],
["C1440E", "Tia Maria"],
["C154C1", "Fuchsia Pink"],
["C1A004", "Buddha Gold"],
["C1B7A4", "Bison Hide"],
["C1BAB0", "Tea"],
["C1BECD", "Gray Suit"],
["C1D7B0", "Sprout"],
["C1F07C", "Sulu"],
["C26B03", "Indochine"],
["C2955D", "Twine"],
["C2BDB6", "Cotton Seed"],
["C2CAC4", "Pumice"],
["C2E8E5", "Jagged Ice"],
["C32148", "Maroon Flush"],
["C3B091", "Indian Khaki"],
["C3BFC1", "Pale Slate"],
["C3C3BD", "Gray Nickel"],
["C3CDE6", "Periwinkle Gray"],
["C3D1D1", "Tiara"],
["C3DDF9", "Tropical Blue"],
["C41E3A", "Cardinal"],
["C45655", "Fuzzy Wuzzy Brown"],
["C45719", "Orange Roughy"],
["C4C4BC", "Mist Gray"],
["C4D0B0", "Coriander"],
["C4F4EB", "Mint Tulip"],
["C54B8C", "Mulberry"],
["C59922", "Nugget"],
["C5994B", "Tussock"],
["C5DBCA", "Sea Mist"],
["C5E17A", "Yellow Green"],
["C62D42", "Brick Red"],
["C6726B", "Contessa"],
["C69191", "Oriental Pink"],
["C6A84B", "Roti"],
["C6C3B5", "Ash"],
["C6C8BD", "Kangaroo"],
["C6E610", "Las Palmas"],
["C7031E", "Monza"],
["C71585", "Red Violet"],
["C7BCA2", "Coral Reef"],
["C7C1FF", "Melrose"],
["C7C4BF", "Cloud"],
["C7C9D5", "Ghost"],
["C7CD90", "Pine Glade"],
["C7DDE5", "Botticelli"],
["C88A65", "Antique Brass"],
["C8A2C8", "Lilac"],
["C8A528", "Hokey Pokey"],
["C8AABF", "Lily"],
["C8B568", "Laser"],
["C8E3D7", "Edgewater"],
["C96323", "Piper"],
["C99415", "Pizza"],
["C9A0DC", "Light Wisteria"],
["C9B29B", "Rodeo Dust"],
["C9B35B", "Sundance"],
["C9B93B", "Earls Green"],
["C9C0BB", "Silver Rust"],
["C9D9D2", "Conch"],
["C9FFA2", "Reef"],
["C9FFE5", "Aero Blue"],
["CA3435", "Flush Mahogany"],
["CABB48", "Turmeric"],
["CADCD4", "Paris White"],
["CAE00D", "Bitter Lemon"],
["CAE6DA", "Skeptic"],
["CB8FA9", "Viola"],
["CBCAB6", "Foggy Gray"],
["CBD3B0", "Green Mist"],
["CBDBD6", "Nebula"],
["CC3333", "Persian Red"],
["CC5500", "Burnt Orange"],
["CC7722", "Ochre"],
["CC8899", "Puce"],
["CCCAA8", "Thistle Green"],
["CCCCFF", "Periwinkle"],
["CCFF00", "Electric Lime"],
["CD5700", "Tenn"],
["CD5C5C", "Chestnut Rose"],
["CD8429", "Brandy Punch"],
["CDF4FF", "Onahau"],
["CEB98F", "Sorrell Brown"],
["CEBABA", "Cold Turkey"],
["CEC291", "Yuma"],
["CEC7A7", "Chino"],
["CFA39D", "Eunry"],
["CFB53B", "Old Gold"],
["CFDCCF", "Tasman"],
["CFE5D2", "Surf Crest"],
["CFF9F3", "Humming Bird"],
["CFFAF4", "Scandal"],
["D05F04", "Red Stage"],
["D06DA1", "Hopbush"],
["D07D12", "Meteor"],
["D0BEF8", "Perfume"],
["D0C0E5", "Prelude"],
["D0F0C0", "Tea Green"],
["D18F1B", "Geebung"],
["D1BEA8", "Vanilla"],
["D1C6B4", "Soft Amber"],
["D1D2CA", "Celeste"],
["D1D2DD", "Mischka"],
["D1E231", "Pear"],
["D2691E", "Hot Cinnamon"],
["D27D46", "Raw Sienna"],
["D29EAA", "Careys Pink"],
["D2B48C", "Tan"],
["D2DA97", "Deco"],
["D2F6DE", "Blue Romance"],
["D2F8B0", "Gossip"],
["D3CBBA", "Sisal"],
["D3CDC5", "Swirl"],
["D47494", "Charm"],
["D4B6AF", "Clam Shell"],
["D4BF8D", "Straw"],
["D4C4A8", "Akaroa"],
["D4CD16", "Bird Flower"],
["D4D7D9", "Iron"],
["D4DFE2", "Geyser"],
["D4E2FC", "Hawkes Blue"],
["D54600", "Grenadier"],
["D591A4", "Can Can"],
["D59A6F", "Whiskey"],
["D5D195", "Winter Hazel"],
["D5F6E3", "Granny Apple"],
["D69188", "My Pink"],
["D6C562", "Tacha"],
["D6CEF6", "Moon Raker"],
["D6D6D1", "Quill Gray"],
["D6FFDB", "Snowy Mint"],
["D7837F", "New York Pink"],
["D7C498", "Pavlova"],
["D7D0FF", "Fog"],
["D84437", "Valencia"],
["D87C63", "Japonica"],
["D8BFD8", "Thistle"],
["D8C2D5", "Maverick"],
["D8FCFA", "Foam"],
["D94972", "Cabaret"],
["D99376", "Burning Sand"],
["D9B99B", "Cameo"],
["D9D6CF", "Timberwolf"],
["D9DCC1", "Tana"],
["D9E4F5", "Link Water"],
["D9F7FF", "Mabel"],
["DA3287", "Cerise"],
["DA5B38", "Flame Pea"],
["DA6304", "Bamboo"],
["DA6A41", "Red Damask"],
["DA70D6", "Orchid"],
["DA8A67", "Copperfield"],
["DAA520", "Golden Grass"],
["DAECD6", "Zanah"],
["DAF4F0", "Iceberg"],
["DAFAFF", "Oyster Bay"],
["DB5079", "Cranberry"],
["DB9690", "Petite Orchid"],
["DB995E", "Di Serria"],
["DBDBDB", "Alto"],
["DBFFF8", "Frosted Mint"],
["DC143C", "Crimson"],
["DC4333", "Punch"],
["DCB20C", "Galliano"],
["DCB4BC", "Blossom"],
["DCD747", "Wattle"],
["DCD9D2", "Westar"],
["DCDDCC", "Moon Mist"],
["DCEDB4", "Caper"],
["DCF0EA", "Swans Down"],
["DDD6D5", "Swiss Coffee"],
["DDF9F1", "White Ice"],
["DE3163", "Cerise Red"],
["DE6360", "Roman"],
["DEA681", "Tumbleweed"],
["DEBA13", "Gold Tips"],
["DEC196", "Brandy"],
["DECBC6", "Wafer"],
["DED4A4", "Sapling"],
["DED717", "Barberry"],
["DEE5C0", "Beryl Green"],
["DEF5FF", "Pattens Blue"],
["DF73FF", "Heliotrope"],
["DFBE6F", "Apache"],
["DFCD6F", "Chenin"],
["DFCFDB", "Lola"],
["DFECDA", "Willow Brook"],
["DFFF00", "Chartreuse Yellow"],
["E0B0FF", "Mauve"],
["E0B646", "Anzac"],
["E0B974", "Harvest Gold"],
["E0C095", "Calico"],
["E0FFFF", "Baby Blue"],
["E16865", "Sunglo"],
["E1BC64", "Equator"],
["E1C0C8", "Pink Flare"],
["E1E6D6", "Periglacial Blue"],
["E1EAD4", "Kidnapper"],
["E1F6E8", "Tara"],
["E25465", "Mandy"],
["E2725B", "Terracotta"],
["E28913", "Golden Bell"],
["E292C0", "Shocking"],
["E29418", "Dixie"],
["E29CD2", "Light Orchid"],
["E2D8ED", "Snuff"],
["E2EBED", "Mystic"],
["E2F3EC", "Apple Green"],
["E30B5C", "Razzmatazz"],
["E32636", "Alizarin Crimson"],
["E34234", "Cinnabar"],
["E3BEBE", "Cavern Pink"],
["E3F5E1", "Peppermint"],
["E3F988", "Mindaro"],
["E47698", "Deep Blush"],
["E49B0F", "Gamboge"],
["E4C2D5", "Melanie"],
["E4CFDE", "Twilight"],
["E4D1C0", "Bone"],
["E4D422", "Sunflower"],
["E4D5B7", "Grain Brown"],
["E4D69B", "Zombie"],
["E4F6E7", "Frostee"],
["E4FFD1", "Snow Flurry"],
["E52B50", "Amaranth"],
["E5841B", "Zest"],
["E5CCC9", "Dust Storm"],
["E5D7BD", "Stark White"],
["E5D8AF", "Hampton"],
["E5E0E1", "Bon Jour"],
["E5E5E5", "Mercury"],
["E5F9F6", "Polar"],
["E64E03", "Trinidad"],
["E6BE8A", "Gold Sand"],
["E6BEA5", "Cashmere"],
["E6D7B9", "Double Spanish White"],
["E6E4D4", "Satin Linen"],
["E6F2EA", "Harp"],
["E6F8F3", "Off Green"],
["E6FFE9", "Hint of Green"],
["E6FFFF", "Tranquil"],
["E77200", "Mango Tango"],
["E7730A", "Christine"],
["E79F8C", "Tonys Pink"],
["E79FC4", "Kobi"],
["E7BCB4", "Rose Fog"],
["E7BF05", "Corn"],
["E7CD8C", "Putty"],
["E7ECE6", "Gray Nurse"],
["E7F8FF", "Lily White"],
["E7FEFF", "Bubbles"],
["E89928", "Fire Bush"],
["E8B9B3", "Shilo"],
["E8E0D5", "Pearl Bush"],
["E8EBE0", "Green White"],
["E8F1D4", "Chrome White"],
["E8F2EB", "Gin"],
["E8F5F2", "Aqua Squeeze"],
["E96E00", "Clementine"],
["E97451", "Burnt Sienna"],
["E97C07", "Tahiti Gold"],
["E9CECD", "Oyster Pink"],
["E9D75A", "Confetti"],
["E9E3E3", "Ebb"],
["E9F8ED", "Ottoman"],
["E9FFFD", "Clear Day"],
["EA88A8", "Carissma"],
["EAAE69", "Porsche"],
["EAB33B", "Tulip Tree"],
["EAC674", "Rob Roy"],
["EADAB8", "Raffia"],
["EAE8D4", "White Rock"],
["EAF6EE", "Panache"],
["EAF6FF", "Solitude"],
["EAF9F5", "Aqua Spring"],
["EAFFFE", "Dew"],
["EB9373", "Apricot"],
["EBC2AF", "Zinnwaldite"],
["ECA927", "Fuel Yellow"],
["ECC54E", "Ronchi"],
["ECC7EE", "French Lilac"],
["ECCDB9", "Just Right"],
["ECE090", "Wild Rice"],
["ECEBBD", "Fall Green"],
["ECEBCE", "Aths Special"],
["ECF245", "Starship"],
["ED0A3F", "Red Ribbon"],
["ED7A1C", "Tango"],
["ED9121", "Carrot Orange"],
["ED989E", "Sea Pink"],
["EDB381", "Tacao"],
["EDC9AF", "Desert Sand"],
["EDCDAB", "Pancho"],
["EDDCB1", "Chamois"],
["EDEA99", "Primrose"],
["EDF5DD", "Frost"],
["EDF5F5", "Aqua Haze"],
["EDF6FF", "Zumthor"],
["EDF9F1", "Narvik"],
["EDFC84", "Honeysuckle"],
["EE82EE", "Lavender Magenta"],
["EEC1BE", "Beauty Bush"],
["EED794", "Chalky"],
["EED9C4", "Almond"],
["EEDC82", "Flax"],
["EEDEDA", "Bizarre"],
["EEE3AD", "Double Colonial White"],
["EEEEE8", "Cararra"],
["EEEF78", "Manz"],
["EEF0C8", "Tahuna Sands"],
["EEF0F3", "Athens Gray"],
["EEF3C3", "Tusk"],
["EEF4DE", "Loafer"],
["EEF6F7", "Catskill White"],
["EEFDFF", "Twilight Blue"],
["EEFF9A", "Jonquil"],
["EEFFE2", "Rice Flower"],
["EF863F", "Jaffa"],
["EFEFEF", "Gallery"],
["EFF2F3", "Porcelain"],
["F091A9", "Mauvelous"],
["F0D52D", "Golden Dream"],
["F0DB7D", "Golden Sand"],
["F0DC82", "Buff"],
["F0E2EC", "Prim"],
["F0E68C", "Khaki"],
["F0EEFD", "Selago"],
["F0EEFF", "Titan White"],
["F0F8FF", "Alice Blue"],
["F0FCEA", "Feta"],
["F18200", "Gold Drop"],
["F19BAB", "Wewak"],
["F1E788", "Sahara Sand"],
["F1E9D2", "Parchment"],
["F1E9FF", "Blue Chalk"],
["F1EEC1", "Mint Julep"],
["F1F1F1", "Seashell"],
["F1F7F2", "Saltpan"],
["F1FFAD", "Tidal"],
["F1FFC8", "Chiffon"],
["F2552A", "Flamingo"],
["F28500", "Tangerine"],
["F2C3B2", "Mandys Pink"],
["F2F2F2", "Concrete"],
["F2FAFA", "Black Squeeze"],
["F34723", "Pomegranate"],
["F3AD16", "Buttercup"],
["F3D69D", "New Orleans"],
["F3D9DF", "Vanilla Ice"],
["F3E7BB", "Sidecar"],
["F3E9E5", "Dawn Pink"],
["F3EDCF", "Wheatfield"],
["F3FB62", "Canary"],
["F3FBD4", "Orinoco"],
["F3FFD8", "Carla"],
["F400A1", "Hollywood Cerise"],
["F4A460", "Sandy brown"],
["F4C430", "Saffron"],
["F4D81C", "Ripe Lemon"],
["F4EBD3", "Janna"],
["F4F2EE", "Pampas"],
["F4F4F4", "Wild Sand"],
["F4F8FF", "Zircon"],
["F57584", "Froly"],
["F5C85C", "Cream Can"],
["F5C999", "Manhattan"],
["F5D5A0", "Maize"],
["F5DEB3", "Wheat"],
["F5E7A2", "Sandwisp"],
["F5E7E2", "Pot Pourri"],
["F5E9D3", "Albescent White"],
["F5EDEF", "Soft Peach"],
["F5F3E5", "Ecru White"],
["F5F5DC", "Beige"],
["F5FB3D", "Golden Fizz"],
["F5FFBE", "Australian Mint"],
["F64A8A", "French Rose"],
["F653A6", "Brilliant Rose"],
["F6A4C9", "Illusion"],
["F6F0E6", "Merino"],
["F6F7F7", "Black Haze"],
["F6FFDC", "Spring Sun"],
["F7468A", "Violet Red"],
["F77703", "Chilean Fire"],
["F77FBE", "Persian Pink"],
["F7B668", "Rajah"],
["F7C8DA", "Azalea"],
["F7DBE6", "We Peep"],
["F7F2E1", "Quarter Spanish White"],
["F7F5FA", "Whisper"],
["F7FAF7", "Snow Drift"],
["F8B853", "Casablanca"],
["F8C3DF", "Chantilly"],
["F8D9E9", "Cherub"],
["F8DB9D", "Marzipan"],
["F8DD5C", "Energy Yellow"],
["F8E4BF", "Givry"],
["F8F0E8", "White Linen"],
["F8F4FF", "Magnolia"],
["F8F6F1", "Spring Wood"],
["F8F7DC", "Coconut Cream"],
["F8F7FC", "White Lilac"],
["F8F8F7", "Desert Storm"],
["F8F99C", "Texas"],
["F8FACD", "Corn Field"],
["F8FDD3", "Mimosa"],
["F95A61", "Carnation"],
["F9BF58", "Saffron Mango"],
["F9E0ED", "Carousel Pink"],
["F9E4BC", "Dairy Cream"],
["F9E663", "Portica"],
["F9EAF3", "Amour"],
["F9F8E4", "Rum Swizzle"],
["F9FF8B", "Dolly"],
["F9FFF6", "Sugar Cane"],
["FA7814", "Ecstasy"],
["FA9D5A", "Tan Hide"],
["FAD3A2", "Corvette"],
["FADFAD", "Peach Yellow"],
["FAE600", "Turbo"],
["FAEAB9", "Astra"],
["FAECCC", "Champagne"],
["FAF0E6", "Linen"],
["FAF3F0", "Fantasy"],
["FAF7D6", "Citrine White"],
["FAFAFA", "Alabaster"],
["FAFDE4", "Hint of Yellow"],
["FAFFA4", "Milan"],
["FB607F", "Brink Pink"],
["FB8989", "Geraldine"],
["FBA0E3", "Lavender Rose"],
["FBA129", "Sea Buckthorn"],
["FBAC13", "Sun"],
["FBAED2", "Lavender Pink"],
["FBB2A3", "Rose Bud"],
["FBBEDA", "Cupid"],
["FBCCE7", "Classic Rose"],
["FBCEB1", "Apricot Peach"],
["FBE7B2", "Banana Mania"],
["FBE870", "Marigold Yellow"],
["FBE96C", "Festival"],
["FBEA8C", "Sweet Corn"],
["FBEC5D", "Candy Corn"],
["FBF9F9", "Hint of Red"],
["FBFFBA", "Shalimar"],
["FC0FC0", "Shocking Pink"],
["FC80A5", "Tickle Me Pink"],
["FC9C1D", "Tree Poppy"],
["FCC01E", "Lightning Yellow"],
["FCD667", "Goldenrod"],
["FCD917", "Candlelight"],
["FCDA98", "Cherokee"],
["FCF4D0", "Double Pearl Lusta"],
["FCF4DC", "Pearl Lusta"],
["FCF8F7", "Vista White"],
["FCFBF3", "Bianca"],
["FCFEDA", "Moon Glow"],
["FCFFE7", "China Ivory"],
["FCFFF9", "Ceramic"],
["FD0E35", "Torch Red"],
["FD5B78", "Wild Watermelon"],
["FD7B33", "Crusta"],
["FD7C07", "Sorbus"],
["FD9FA2", "Sweet Pink"],
["FDD5B1", "Light Apricot"],
["FDD7E4", "Pig Pink"],
["FDE1DC", "Cinderella"],
["FDE295", "Golden Glow"],
["FDE910", "Lemon"],
["FDF5E6", "Old Lace"],
["FDF6D3", "Half Colonial White"],
["FDF7AD", "Drover"],
["FDFEB8", "Pale Prim"],
["FDFFD5", "Cumulus"],
["FE28A2", "Persian Rose"],
["FE4C40", "Sunset Orange"],
["FE6F5E", "Bittersweet"],
["FE9D04", "California"],
["FEA904", "Yellow Sea"],
["FEBAAD", "Melon"],
["FED33C", "Bright Sun"],
["FED85D", "Dandelion"],
["FEDB8D", "Salomie"],
["FEE5AC", "Cape Honey"],
["FEEBF3", "Remy"],
["FEEFCE", "Oasis"],
["FEF0EC", "Bridesmaid"],
["FEF2C7", "Beeswax"],
["FEF3D8", "Bleach White"],
["FEF4CC", "Pipi"],
["FEF4DB", "Half Spanish White"],
["FEF4F8", "Wisp Pink"],
["FEF5F1", "Provincial Pink"],
["FEF7DE", "Half Dutch White"],
["FEF8E2", "Solitaire"],
["FEF8FF", "White Pointer"],
["FEF9E3", "Off Yellow"],
["FEFCED", "Orange White"],
["FF0000", "Red"],
["FF007F", "Rose"],
["FF00CC", "Purple Pizzazz"],
["FF00FF", "Magenta / Fuchsia"],
["FF2400", "Scarlet"],
["FF3399", "Wild Strawberry"],
["FF33CC", "Razzle Dazzle Rose"],
["FF355E", "Radical Red"],
["FF3F34", "Red Orange"],
["FF4040", "Coral Red"],
["FF4D00", "Vermilion"],
["FF4F00", "International Orange"],
["FF6037", "Outrageous Orange"],
["FF6600", "Blaze Orange"],
["FF66FF", "Pink Flamingo"],
["FF681F", "Orange"],
["FF69B4", "Hot Pink"],
["FF6B53", "Persimmon"],
["FF6FFF", "Blush Pink"],
["FF7034", "Burning Orange"],
["FF7518", "Pumpkin"],
["FF7D07", "Flamenco"],
["FF7F00", "Flush Orange"],
["FF7F50", "Coral"],
["FF8C69", "Salmon"],
["FF9000", "Pizazz"],
["FF910F", "West Side"],
["FF91A4", "Pink Salmon"],
["FF9933", "Neon Carrot"],
["FF9966", "Atomic Tangerine"],
["FF9980", "Vivid Tangerine"],
["FF9E2C", "Sunshade"],
["FFA000", "Orange Peel"],
["FFA194", "Mona Lisa"],
["FFA500", "Web Orange"],
["FFA6C9", "Carnation Pink"],
["FFAB81", "Hit Pink"],
["FFAE42", "Yellow Orange"],
["FFB0AC", "Cornflower Lilac"],
["FFB1B3", "Sundown"],
["FFB31F", "My Sin"],
["FFB555", "Texas Rose"],
["FFB7D5", "Cotton Candy"],
["FFB97B", "Macaroni and Cheese"],
["FFBA00", "Selective Yellow"],
["FFBD5F", "Koromiko"],
["FFBF00", "Amber"],
["FFC0A8", "Wax Flower"],
["FFC0CB", "Pink"],
["FFC3C0", "Your Pink"],
["FFC901", "Supernova"],
["FFCBA4", "Flesh"],
["FFCC33", "Sunglow"],
["FFCC5C", "Golden Tainoi"],
["FFCC99", "Peach Orange"],
["FFCD8C", "Chardonnay"],
["FFD1DC", "Pastel Pink"],
["FFD2B7", "Romantic"],
["FFD38C", "Grandis"],
["FFD700", "Gold"],
["FFD800", "School bus Yellow"],
["FFD8D9", "Cosmos"],
["FFDB58", "Mustard"],
["FFDCD6", "Peach Schnapps"],
["FFDDAF", "Caramel"],
["FFDDCD", "Tuft Bush"],
["FFDDCF", "Watusi"],
["FFDDF4", "Pink Lace"],
["FFDEAD", "Navajo White"],
["FFDEB3", "Frangipani"],
["FFE1DF", "Pippin"],
["FFE1F2", "Pale Rose"],
["FFE2C5", "Negroni"],
["FFE5A0", "Cream Brulee"],
["FFE5B4", "Peach"],
["FFE6C7", "Tequila"],
["FFE772", "Kournikova"],
["FFEAC8", "Sandy Beach"],
["FFEAD4", "Karry"],
["FFEC13", "Broom"],
["FFEDBC", "Colonial White"],
["FFEED8", "Derby"],
["FFEFA1", "Vis Vis"],
["FFEFC1", "Egg White"],
["FFEFD5", "Papaya Whip"],
["FFEFEC", "Fair Pink"],
["FFF0DB", "Peach Cream"],
["FFF0F5", "Lavender blush"],
["FFF14F", "Gorse"],
["FFF1B5", "Buttermilk"],
["FFF1D8", "Pink Lady"],
["FFF1EE", "Forget Me Not"],
["FFF1F9", "Tutu"],
["FFF39D", "Picasso"],
["FFF3F1", "Chardon"],
["FFF46E", "Paris Daisy"],
["FFF4CE", "Barley White"],
["FFF4DD", "Egg Sour"],
["FFF4E0", "Sazerac"],
["FFF4E8", "Serenade"],
["FFF4F3", "Chablis"],
["FFF5EE", "Seashell Peach"],
["FFF5F3", "Sauvignon"],
["FFF6D4", "Milk Punch"],
["FFF6DF", "Varden"],
["FFF6F5", "Rose White"],
["FFF8D1", "Baja White"],
["FFF9E2", "Gin Fizz"],
["FFF9E6", "Early Dawn"],
["FFFACD", "Lemon Chiffon"],
["FFFAF4", "Bridal Heath"],
["FFFBDC", "Scotch Mist"],
["FFFBF9", "Soapstone"],
["FFFC99", "Witch Haze"],
["FFFCEA", "Buttery White"],
["FFFCEE", "Island Spice"],
["FFFDD0", "Cream"],
["FFFDE6", "Chilean Heath"],
["FFFDE8", "Travertine"],
["FFFDF3", "Orchid White"],
["FFFDF4", "Quarter Pearl Lusta"],
["FFFEE1", "Half and Half"],
["FFFEEC", "Apricot White"],
["FFFEF0", "Rice Cake"],
["FFFEF6", "Black White"],
["FFFEFD", "Romance"],
["FFFF00", "Yellow"],
["FFFF66", "Laser Lemon"],
["FFFF99", "Pale Canary"],
["FFFFB4", "Portafino"],
["FFFFF0", "Ivory"],
["FFFFFF", "White"]
]

}

ntc.init();
app.listen(3000, () => {
  console.log('server started');
});




