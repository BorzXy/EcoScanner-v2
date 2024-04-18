var fs = require("fs")
const path = require("path")
var playername = "ninepiaths"
var results = "";
const fileData = fs.readFileSync(path.join("./players/", playername + "_.json"));
const json = JSON.parse(fileData.toString());

var dates = json.date;
let s__ = Math.floor(Date.now() / 1000);
let days_ = Math.floor(s__ / (60 * 60 * 24));
console.log(days_ - dates)

/*if (pInfo(currentPeer).display_age) {
    let s__ = Math.floor(Date.now() / 1000);
    let days_ = Math.floor(s__ / (60 * 60 * 24));
    personalize += `\nadd_label|small|\`1Account Age:\`\` ${days_ - pInfo(currentPeer).account_created} days|left\nadd_spacer|small|`;
}*/

//p_.accountCreated = r_["date"];
//if (p_.accountCreated === 0) p_.accountCreated = Math.floor(Date.now() / 1000 / 86400);






/*var cheater = [[2,3,4,5]];

for (i = 0; i < cheater.length; i++) {
    console.log("i ["+i+"]")
    var yikesc = cheater[i];
    console.log(yikesc[0])
}*/
//var fas = json["worlds_owned"];
/*fs.readdir("./players", (err, files) => {
    var filter = files.filter(f => f.split(".").pop() === "json");
    let wihc = 0;
    for (i = 0; i < filter.length; i++) {
        try {
            const fileData = fs.readFileSync(path.join("./players", filter[i]));
            const json = JSON.parse(fileData.toString());
            var bp_s = json.bp;
            console.log(bp_s + json.name)
            for (id = 0; id < bp_s.length; id++) {
                var bp_i = bp_s[0];
                for (s = 0;s < bp_i.length; s++) {
                    if (bp_i[0] == 242) {
                        wihc = wihc + bp_i[1];
                    }
                }
            }
            //console.log(bp_s + json.name)
        } catch (e) {
            console.log(err + e)
            return;
        }
    }
    console.log("This server has " + wihc + " 242")
})*/
/*
const fileData1 = fs.readFileSync(path.join("./players", "hantopia12_.json"));
const json1 = JSON.parse(fileData1.toString());
var bp_s = json1.bp;
for (i = 0; i < bp_s.length; i++) {
    var bp_i = bp_s[0];
    for (s = 0;s < bp_i.length; s++) {
        console.log(bp_i[0])
    }
}*/