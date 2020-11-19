User.destroy_all
Card.destroy_all

ben = User.create(username:'Ben', password:'asdf')

Card.create(name:'Develop',	image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:'Level the playing field', is_special: true, role:'env', strength:0, ability:'develop')
Card.create(name:'Cold of Space', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:'So cold...', is_special:true, role:'env', strength:0, ability:'cold')
Card.create(name:"Rocky Terrain", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Too many rocks!", is_special:true, role:'env', strength:0, ability:'rocky')
Card.create(name:"Solar Flare", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Solar Flare, get to the surface!", is_special:true, role:'env', strength:0, ability:'flare')
Card.create(name:"Drone", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Stupid hunk of junk...", is_special:true, role:'other', strength:0, ability:'decoy')
Card.create(name:"Talon Fighter", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"It feels weird to shoot at the moon", is_special:false, role:'space',strength:6, ability:nil)
Card.create(name:"Space Marine", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Here I was thinking I'd end up in Hawaii", is_special:false, role:'foot', strength:4, ability:'close-combat')
Card.create(name:"Talon Bomber", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Ok this feels a little unfair...", is_special:false, role:'space', strength:8, ability:'overwhelm')
Card.create(name:"Talon Skiff", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"They won't even see us coming", is_special:false, role:'ground', strength:5, ability:'overwhelm')
Card.create(name:'The Red Blur', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"This better have a decent payout", is_special:false, role:'ground', strength:6)
Card.create(name:'Repair Ship', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"If you didn't fly so badly, you wouldn't need us", is_special:false, role:'space', strength:5, ability:'revive')
Card.create(name:'Brave Pilot', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Follow me to victory", is_special:false, role:'space', strength:1, ability:'inspire')
Card.create(name:'Mag Bike', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"To be honest, this is more of a canon than a bike", is_special:false, role:'ground', strength:5)
Card.create(name:'Envoy Teron', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"I wish he'd just go back to Iowa already", is_special:false, role:'foot', strength:5, ability:'spy')
Card.create(name:'Miner A', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"You think this is bad, try spending a day working the lunar core", is_special:false, role:'foot', strength:1)
Card.create(name:'Miner B', image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Maybe we'll finally get paid?", is_special:false, role:'foot',strength:1)
Card.create(name:"Lunar Citizen", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"I can't TAKE IT ANYMORE", is_special:false, role:'foot', strength:1)
Card.create(name:"Jury rigged mining cart", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"I can't believe this works", is_special:false, role:'ground', strength:4)
Card.create(name:"Old Era Rover", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"Hey, look what I found!", is_special:false, role:'ground', strength:4)
Card.create(name:"Sheil", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:'REVOLUTION!', is_special:false, role:'foot', strength:5)
Card.create(name:"Rachel the Rager", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:'Oh YEAH babyyy', is_special:false, role:'ground', strength:5)
Card.create(name:"Talon Frigate", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"We FINALLY get to use these guns", is_special:false, role:'space', strength:6)
Card.create(name:"ID XQYZ24", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"You sure you know how to fly this thing?", is_special:false, role:'space', strength:6)
Card.create(name:"Dr. Algo", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"This is all my fault...", is_special:false, role:'foot', strength:5, ability:'spy')
Card.create(name:"Freedom Fighter", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:'I hope I can put this on my resume', is_special:false, role:'foot', strength:2)
Card.create(name:"Exosuit Miner", image:'https://i.picsum.photos/id/176/200/300.jpg?hmac=FVhRySTQhcAO5Xvxk6nE-bMsJSyIAW8Uw6zWgAh9hzY', flavor_text:"I feel like a GOD", is_special:false, role:'foot', strength:5)

Card.all.each {|card| OwnedCard.create(user:ben, card:card)}