const fs = require("fs");
const path = require("path");
const title = require("console-title");
const ask = require("prompt-sync")();
const gradient = require("gradient-string");
const fetch = require('node-fetch'); //npm install node-fetch@^2.6.6
var config = require("./config.json");
if (!fs.existsSync(config.playerdir)) return console.log("Error when Fetching to (" + config.playerdir + ")\n{Error Directory not found}");
if (!fs.existsSync(config.worlddir)) return console.log("Error when Fetching to (" + config.worlddir + ")\n{Error Directory not found}");
var playersdir = config.playerdir, worldsdir = config.worlddir;
var playersdirtotal = fs.readdirSync(config.playerdir).length, worldsdirtotal = fs.readdirSync(config.worlddir).length;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
var montas = "";
if (month == 1) montas = "January";
if (month == 2) montas = "Febuary";
if (month == 3) montas = "March";
if (month == 4) montas = "April";
if (month == 5) montas = "May";
if (month == 6) montas = "June";
if (month == 7) montas = "July";
if (month == 8) montas = "August";
if (month == 9) montas = "Febuary";
if (month == 10) montas = "September";
if (month == 11) montas = "October";
if (month == 12) montas = "December";
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
var type = "", timeds = "";
var version = "1.5\n"; //Dont change this to bypass version :)
if (hours > 12) type = "PM";
if (hours < 12) type = "AM";
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var times = `${hours}:${minutes}:${seconds} ${type}`;
var dates = `[${montas}-${date}-${year}]`;

var yel = "#bda01e", blu = "#64b3e8", yellig = "#f5d64c";
var log = `[${gradient('#f5d64c','#f5d64c')("•")}]`;
var who = `[${gradient('#ff0011','#ff0011')("?")}]`
var err = `[${gradient('#ff0011','#ff0011')("x")}]`;
var warn = `[${gradient('#f5d64c','#f5d64c')("!")}]`;
var results = `[${gradient('#ad5028','#ad5028')("~")}]`;

function LastOnlineC(time){
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

const update_version = async () => {
    var createnewfile = await fetch("https://raw.githubusercontent.com/BorzXy/EcoScanner-v2/main/main.js").then(data => data.text());
    console.log("Please wait, writing the file!")
    var scriptName = path.basename(__filename);
    fs.unlinkSync(scriptName);
    setTimeout(() => {
        fs.writeFileSync(scriptName, createnewfile);
    }, 500);
}

const MasukMenu = async () => {
    console.clear();
    var ckversion = await fetch("https://raw.githubusercontent.com/BorzXys/newecoscanner-v2/main/ver").then(data => data.text());
    if (version != ckversion) {
        console.log("New version has been found, updating...");
        update_version();
        return;
    }
    if (ckversion < version) return console.log("Invalid Version!\nPlease dont edit the Version :)")
    var ip = await fetch(`https://api.ipify.org`).then(data => data.text());
    title("[MENU] | Version : " + version + " | Date : " + dates)
    var banner = `${gradient('white','white')(`███████  ██████  █████  ███    ██ ███    ██ ███████ ██████  
██      ██      ██   ██ ████   ██ ████   ██ ██      ██   ██ 
███████ ██      ███████ ██ ██  ██ ██ ██  ██ █████   ██████  
     ██ ██      ██   ██ ██  ██ ██ ██  ██ ██ ██      ██   ██ 
███████  ██████ ██   ██ ██   ████ ██   ████ ███████ ██   ██ v2`)}

${log} Author : ${gradient(blu,blu)("Daritoc & BorzXy")}
${log} Github / Discord : ${gradient(blu,blu)("BorzXy / borzxy")}
${log} Project Repository : ${gradient(blu,blu)("https://github.com/BorzXy/EcoScanner-v2")}
${log} Project Credit : ${gradient(blu,blu)("Galvin (galviy), w3school and rzgans")}

${log} IP : ${gradient(blu,blu)(ip)}
${log} Time : ${gradient(blu,blu)(times)}

${log} Player Directory : ${gradient(blu, blu)("(" + playersdir + ")")}
${log} World Directory : ${gradient(blu, blu)("(" + worldsdir + ")")}
${log} Registered Player Total : ${gradient(blu, blu)(playersdirtotal)}
${log} Registered World Total : ${gradient(blu, blu)(worldsdirtotal)}


${log} Note : ${gradient(blu, blu)("If you have any suggestion and Report a Problem, Feel free to Dm me at Discord (borzxy) or\n           Join https://discord.gg/yDAg9TZhhQ")}

${log} [MENU]
${log} [1] ${gradient(blu, blu)("Role Scanner")}
${log} [2] ${gradient(blu, blu)("Check 2FA Code")}
${log} [3] ${gradient(blu, blu)("Player Info")}
${log} [4] ${gradient(blu, blu)("View Trade Logs")}
${log} [5] ${gradient(blu, blu)("EcoScanner (Note: Scan Player Inventory, Player Backpack and Dropped Item)")}
${log} [0] ${gradient(blu, blu)("Exit")}
    `;
    console.clear();
    console.log(banner);
    var choose = ask(log + " > ");
    Scanner(choose);
}

MasukMenu();

function MenuTerakhir (type) {
    if (type == 1) {
        MasukMenu();
    } else if (type == 0) {
        console.clear();
        console.log(log + " Bye Bye")
        process.exit();
    } else {
        console.clear();
        console.log(err + " System dont have that command")
        process.exit();
    }
}

function Scanner (type) {
    if (type == 1) {
        title("[Role Scanner] | Date : " + dates)
        fs.readdir(playersdir, (err, files) => {
            var filter = files.filter(f => f.split(".").pop() === "json");
            var vips = "", mod2 = "", dev = "", superdev = "", owner = "";
            var cheater = "";
            for (i = 0; i < filter.length; i++) {
                try {
                    const fileData = fs.readFileSync(path.join(playersdir, filter[i]));
                    const json = JSON.parse(fileData.toString());
                    if (json.vips == 1 || json.vips == true) {
                        vips = vips + json.name + " (" + json.level + "), "
                        console.log(vips)
                    }
                    if (json.mod == 1 || json.mod == true) {
                        mod2 = mod2 + json.name + " (" + json.level + "), "
                    }
                    if (json.dev == 1 || json.dev == true) {
                        dev = dev + json.name + " (" + json.level + "), "
                    }
                    if (json.superdev == 1 || json.superdev == true) {
                        superdev = superdev + json.name + " (" + json.level + "), "
                    }
                    if (json.owner == 1 || json.owner == true) {
                        owner = owner + json.name + " (" + json.level + "), "
                    }
                    if (json.cheater == 1 || json.cheater == true) {
                        cheater = cheater + json.name + " (" + json.level + "), "
                    }
                } catch (e) {
                    console.log(err + e)
                    return;
                }
            }
            console.clear();
            console.log(`${results} [RESULT]:`)
            console.log(`${log} ${gradient("#ff0022","#ff0022")(`Owner`)}: ${owner}\n`)
            console.log(`${log} ${gradient("#a17c03","#a17c03")(`Super Developer`)}: ${superdev}\n`)
            console.log(`${log} ${gradient("#fac000","#fac000")(`Developer`)} : ${dev}\n`)
            console.log(`${log} ${gradient("#9a00fa","#9a00fa")(`Moderator`)} : ${mod2}\n`)
            console.log(`${log} ${gradient("#00ffff","#00ffff")(`VIP`)} : ${vips}\n`)
            console.log(`${log} Cheater : ${cheater}\n`)
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
        })
    } else if (type == 2) {
        title("[Check 2FA Code] | Date : " + dates)
        var playername = ask(who + " GrowID ? > ")
        if (!fs.existsSync(playersdir + playername + "_.json")) {
            console.clear();
            console.log(err + " Player not found!")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        const fileData = fs.readFileSync(path.join("./players/", playername + "_.json"));
        const json = JSON.parse(fileData.toString());
        var fas = json["2fa"];
        if (fas == "") fas = gradient("#fa0000","#fa0000")("No 2FA found");
        else fas = gradient("#00fa2e","#00fa2e")("2FA Code is " + json["2fa"]);
        console.clear();
        console.log(`${results} [RESULT]:`)
        console.log(`${results} Grow ID : ${playername}`)
        console.log(`${results} 2FA Status : ${fas}`)
        console.log(`\n${log} [1] Back to Main Menu`)
        console.log(`${log} [0] Exit`)
        var menu = ask(log + " > ");
        MenuTerakhir(menu);
    } else if (type == 3) {
        title("[Player Info] | Date : " + dates)
        var playername = ask(who + " GrowID ? > ")
        if (!fs.existsSync(playersdir + playername + "_.json")) {
            console.clear();
            console.log(err + " Player not found!")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        const fileData = fs.readFileSync(path.join("./players/", playername + "_.json"));
        const json = JSON.parse(fileData.toString());
        var fas = json["2fa"], status = "";
        if (fas == "") fas = gradient("#fa0000","#fa0000")("No 2FA found"), status = warn;
        else fas = gradient("#00fa2e","#00fa2e")("2FA Code is " + json["2fa"]), status = results;
        var date = json.date;
        let daysdate = 0;
        let s__ = Math.floor(Date.now() / 1000);
        let days_ = Math.floor(s__ / (60 * 60 * 24));
        daysdate = days_ - date;
        var worldown = json.worlds_owned, worldr = "", lastvis = json.la_wo;
        let worldc = 0;
        for (s = 0; s < worldown.length; s++) {
            worldc = worldc + 1;
            worldr = worldr + worldown[s] + ", ";
            //friendc = friendc + 1;
            //friendr = friendr + `[${s+1}] ` + friend[s].name + " | ";
        }
        var level = json.level, password = json.pass, growid = json.name, xp = json.xp, email = json.email, gems = json.gems;
        var ip = json.ip, rid = json.rid, mac = json.mac;
        var friend = json.friends, friendr = "";
        let friendc = 0;
        for (s = 0; s < friend.length; s++) {
            friendc = friendc + 1;
            friendr = friendr + `[${s+1}] ` + friend[s].name + " | ";
        }
        var addition = "";
        if (fs.existsSync("./rare.json")) {
            var founded = "";
            const fileData1 = fs.readFileSync(path.join("./rare.json"));
            const json1 = JSON.parse(fileData1.toString());
            for (s = 0; s < json1.rareitem.length; s++) {
                console.log(json1.rareitem[s])
                for (a = 0; a < json.inventory.length; a++) {
                    var inv = json.inventory[a];
                    if (inv[0] == json1.rareitem[s]) {
                        founded = founded + inv[0] + ` (${inv[1]}), `
                    }
                }
                console.log(founded)
            }
            addition = `${results} [RARE ITEM]:\n${founded}`
        }
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
        console.log(`${results} [RESULT]:`)
        console.log(`${results} [INFORMATION]:\n${results} Grow ID : ${growid} (${level})\n${results} Password : ${password}\n${results} Email : ${email}\n${results} XP = ${xp}\n${results} Gems : ${gems}\n${results} Account age ${parseInt(daysdate)} Days\n`)
        console.log(`${results} [NETWORK]:\n${results} ${ip}\n${results} ${rid}\n${results} ${mac}\n`)
        console.log(`${results} [ROLE]:\n${results} -\n`)
        console.log(`${status} [SECURITY] 2FA Status (${fas})\n`)
        console.log(`${results} [WORLD OWNED (${parseInt(worldc)})]:\n${results} ${worldr}\n`)
        console.log(`${results} [FRIEND (${parseInt(friendc)})]:\n${friendr}\n`)
        console.log(`${results} [LAST VISITED WORLD]:\n${results} ${lastvis}`)
        if (addition != "") console.log("\n" + addition);
        console.log(`\n${log} [1] Back to Main Menu`)
        console.log(`${log} [0] Exit`)
        var menu = ask(log + " > ");
        MenuTerakhir(menu);
    } else if (type == 4) {
        title("[View Trade Logs] | Date : " + dates)
        var playername = ask(who + " GrowID ? > ")
        if (!fs.existsSync(playersdir + playername + "_.json")) {
            console.clear();
            console.log(err + " Player not found!")
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
            return;
        }
        const fileData = fs.readFileSync(path.join("./players/", playername + "_.json"));
        const json = JSON.parse(fileData.toString());
        var tradeHis = json.t_h, growid = json.name;
        var t_h = "";
        let found = 0;
        var banned = ["``","``","``","``","`0","````","``","`1","`2","`3","`4","`5","`6","`7","`8","`9","`0","`q","`w","`e","`r","`t","`y","`u","`i","`o","`p","`a","`s","`d","`f","`g","`h","`j","`k","`l","`m","`n","`b","`v","`c","`x","`z","`)","`(","`*","`&","`^","`%","`$","`#","`@","`!"]
        //Sorry for the duplicate, to anticipate crashes or errors.
        for (i = 0; i < json.t_h.length; i++) {
            found = found + 1;
            t_h = t_h + `[${gradient(yel,yel)(`${i+1}`)}] ${json.t_h[i]}\n`
            for (s = 0; s < banned.length; s++) {
                if (json.t_h[i].includes(banned[s])) {
                    t_h = t_h.toString().replace(banned[s], "");
                }
            }
        }
        console.clear();
        console.log(`${results} [RESULT]:`)
        console.log(`${results} Grow ID ${growid} Trade Logs`)
        console.log(`${results} Found ${parseInt(found)} Trade Logs`)
        console.log(`\n${t_h}`)
        console.log(`\n${log} [1] Back to Main Menu`)
        console.log(`${log} [0] Exit`)
        var menu = ask(log + " > ");
        MenuTerakhir(menu);
    } else if (type == 5) {
        title("[EcoScanner] | Date : " + dates)
        var itemid = ask("ITEM ID > ")
        console.log(warn + " Please wait 3-10 Second!")
        let dropped = 0, inventory = 0, backpack = 0;
        fs.readdir(worldsdir, (err, files) => {
            let wihc = 0;
            var filter = files.filter(f => f.split(".").pop() === "json");
            for (i = 0; i < filter.length; i++) {
                try {
                    const fileData = fs.readFileSync(path.join(worldsdir, filter[i]));
                    const json = JSON.parse(fileData.toString());
                    var dropas = json.drop_new;
                    for (s = 0; s < dropas.length; s++) {
        
                        var droparr = dropas[s];
                        if (droparr[0] == itemid) {
                            wihc = wihc + droparr[1];
                        }
                    }
                } catch (e) {
                    console.log(err + e)
                    return;
                }
            }
            dropped = wihc;
        })
        fs.readdir(playersdir, (err, files) => {
            let inv_r = 0, bp_r = 0;
            var filter = files.filter(f => f.split(".").pop() === "json");
            for (i = 0; i < filter.length; i++) {
                const fileData = fs.readFileSync(path.join(playersdir, filter[i]));
                const json = JSON.parse(fileData.toString());
                var inv_view = json.inventory, bp_s = json.bp;
                for (y = 0; y < inv_view.length; y++) {
                    var view_inv = inv_view[y];
                    if (view_inv[0] == itemid) {
                        inv_r = inv_r + view_inv[1];
                    }
                }
                for (id = 0; id < bp_s.length; id++) {
                    var bp_i = bp_s[0];
                    for (s = 0;s < bp_i.length; s++) {
                        if (bp_i[0] == itemid) {
                            bp_r = bp_r + bp_i[1];
                        }
                    }
                }
            }
            inventory = inv_r;
            backpack = bp_r;
        })
        setTimeout(() => {
            console.clear();
            console.log(`${results} [RESULT]`)
            console.log(`${results} [TARGET]: Item ID : (${itemid})`)
            console.log(`${results} [PLAYER]:\n${results} Inventory (${inventory})\n${results} Backpack (${backpack})`)
            console.log(`${results} [WORLD]: Dropped (${dropped})`)
            console.log(`\n${log} [1] Back to Main Menu`)
            console.log(`${log} [0] Exit`)
            var menu = ask(log + " > ");
            MenuTerakhir(menu);
        }, 3500);
    }
    else if (type == 0) {
        console.clear();
        console.log(log + " Bye Bye")
        process.exit();
    }
    else {
        console.clear();
        console.log(err + " System dont have that command")
        process.exit();
    }
}
