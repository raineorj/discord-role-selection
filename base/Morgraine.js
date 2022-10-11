const { Client, Collection } = require('discord.js');
const mongoose = require('mongoose');
class Morgraine extends Client {
    constructor(options, name) {
        super(options);
        this.name = name;
        this.config = require('./config');
        this.base = __dirname.toString();
        this.log = (p, t) => {
            return require("./utils")
                .functions
                .log(p, t)
        };
        this.buildMongoose();
        this.data = {
            emojis: {},
            roles: {
                "sub_etkinlik":"1019255127925862522",
                "sub_cekilis":"1019255158212923472",
                "sub_dc":"1021067413770477608",
                "sub_vk":"1021068038570782850",

                "oyun_lol":"1019284553271095336",
                "oyun_pubg":"1019284640932053022",
                "oyun_valo":"1019284592114532473",
                "oyun_gta":"1019284615434862623",
                "oyun_rust":"989505925561856020",
                "oyun_apex":"1019284658833330258",
                "oyun_ml":"989505916326015006",
                "oyun_csgo":"1019284395984699454",
                "oyun_cod":"991288487162691624",

                "takim_fb":"993311898726576254",
                "takim_gs":"993311909011017738",
                "takim_bjk":"993311899133423646",
                "takim_ts":"993311912232235060",

                "sevgilim_var":"1019283813475553290",
                "sevgilim_yok":"1019283854202253352",
                "sevgilim_yapmiyorum":"1019283854202253352",

                "burç_oğlak":"1019285291011420230",
                "burç_yay":"1019285274125144064",
                "burç_akrep":"1019285249588461598",
                "burç_kova":"1019285312469479485",
                "burç_balık":"1019285335101952091",
                "burç_terazi":"1019285228289789974",
                "burç_basak":"1019285186652938331",
                "burç_ikizler":"1019285118570987540",
                "burç_yengeç":"1019285134597431347",
                "burç_aslan":"1019285164884508762",
                "burç_boğa":"1019285004150394940",
                "burç_koç":"1019285016762650644",

                "rek_pembe":"1019327580266037309",
                "rek_turkuazmor":"1019327576671526962",
                "rek_mor":"989505836604866581",
                "rek_mavi":"1019327579162939522",
                "rek_yeşil":"1019327582149292142",

				"fırat":"981690664867737661",
                "muted":"989505871497277440",
                "cmd-mute":"989505871497277440",
                "yt":"980925852764229669",
                "booster":"980935545180024963",
                "prisoner":"989505877855834142",
                "man":"989505855055613992",
               "woman":"989505851079417897",
               "family":"989505843932311582",
               "welcome":"989505857240838155"
            },
            channels: {
				"chat":"982318908851781712",
                "uyarılog":"981181938016616459",
                "welcome":"983247120347836456"
			},
            other: {
				"root":[
				"474654095299444746",
				"784677560524996638"]
			},
            mash: (...values) => {
                let temp = [];
                for (let i = 0; i < values.length; i++) {
                    const value = values[i];
                    temp.concat(value);
                }
                return temp;
            }
        };
        this.models = require('./utils').models;
        this.func = require('./utils').functions;
        this.responders = new Collection();
        this.vanityUses = 0;
        this.actionlist = {
            textspam: new Collection(),
            voicespam: new Collection(),
            voicecut: new Collection()
        };
        this.handler = new (require('./handler'))(this);
        /*
        this.leaves = new Map();
        this.deleteChnl = new Map();
        this.invites = new Object();
        this.spamwait = new Map();
        this.spamcounts = new Object();
        this.trollwait = new Object();
        this.trollcounts = new Object();
        this.stats = new Object();
        this.banlimit = new Object();
        this.voicecutLimit = new Object();
        */
    };

    async buildMongoose() {
        const Options = {
          useNewUrlParser: true,
          autoIndex: false,
          connectTimeoutMS: 10000,
          family: 4,
          noDelay: true,
          maxPoolSize: 10,
          keepAlive: true, 
          keepAliveInitialDelay: 300000
        };
        
        mongoose.connect(this.config.mongoDB.url, Options);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on("connected", () => {
         this.log("Connected to db successfully", "info");
        });
    
        mongoose.connection.on("err", (err) => {
          this.log(`Mongoose connection error ${err}`, "error");
        });
    
      
    }
    getPath(obj, value, path) {

        if (typeof obj !== 'object') {
            return;
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var t = path;
                var v = obj[key];
                if (!path) {
                    path = key;
                }
                else {
                    path = path + '.' + key;
                }
                if (v === value) {
                    return path.toString();
                }
                else if (typeof v !== 'object') {
                    path = t;
                };
                var res = this.getPath(v, value, path);
                if (res) {
                    return res;
                }
            }
        };
    }

    async load_int(intName, intType, client) {
        try {
            const rawCmd = new (require(`${this.name}/app/${intType}/${intName}`))(client);
            await rawCmd.load();
            return false;
        } catch (e) {
            return `[HATA] "${intType}" komutu olan "${intName}" yüklenemedi: ${e}`;
        }
    }

    async unload_int(intName, intType) {
        let ress;
        if (this.responders.has(intType + ":" + intName)) {
            ress = this.responders.get(intType + ":" + intName);
        }
        if (!ress) {
            return `The command \`${intName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if (ress.shutdown) {
            await ress.shutdown(this);
        }
        delete require.cache[require.resolve(`../apps/${this.name}/src/${intType}/${intName}.js`)];
        return false;
    }


    async fetchEntry(action) {
        const entry = await this.client.guild.fetchAuditLogs({ type: action }).then((logs) => logs.entries.first());
        return entry;
    }

    updateData() {
        this.models.roles.find({ keyConf: { $ne: null } }).then((docs) => {
            docs.forEach((doc) => {
                this.data.roles[doc.keyConf] = doc.meta.pop()._id;
            });
        });
        this.models.channels.find({ keyConf: { $ne: null } }).then((docs) => {
            docs.forEach((doc) => {
                this.data.channels[doc.keyConf] = doc.meta.pop()._id;
            });
        });
        return this.data;
    }

}
module.exports = Morgraine;
