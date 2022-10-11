const { PrefixCommand } = require("../../../../base/utils");
const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
class Eval extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "menu",
            description: "sunucunun linkini gönderir",
            usage: "menü",
            examples: ["link"],
            cooldown: 300000,
            ownerOnly: true
        });
    }
    async run(client, message, args) {

        await message.channel.send({
            content: stripIndents`
            <:yes:1019236440720289882>  Sunucuda sizleri rahatsız etmemek için \`@everyone\` veya \`@here\` atmayacağız. Sadece isteğiniz doğrultusunda aşağıda bulunan tepkilere tıklarsanız Çekilişler, Etkinlikler V/K ve D/C'den haberdar olacaksınız.

            <a:valeria_tag5:1019234481128865884> Eğer \`Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda düzenlenecek olan etkinlikler, konserler ve oyun etkinlikleri gibi etkinliklerden haberdar olabilirsiniz. 

            <a:valeria_tag5:1019234481128865884> Eğer \`Çekiliş Katılımcısı\` Rolünü alırsanız sunucumuzda sıkça vereceğimiz  ve daha nice ödüllerin bulunduğu çekilişlerden haberdar olabilirsiniz. 

            <a:valeria_tag5:1019234481128865884> Ayrıca sunucumuzda özel olarak bazı etkinliklerden haberdar olmak istiyorsan aşağıdan istediğin etkinliğin rolünü alabilirsin.

            <:channel:1019242277559865374> **NOT:** Kayıtlı, kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Sunucumuz da everyone veya here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\n
            `,
            embeds: [
            ],
            components: [

                {
                    type:"ACTION_ROW",
            components:[{
                type:"SELECT_MENU",
                customId:"sevgilim_nazlı",
                placeholder:"Diğer rolleri görüntülemek için tıkla!",
                maxValues: 1,
                minValues:1,
                options: [{
                    label: "Lovers",
                    value: "sevgilim_var",
                    description: "Sevgilim var rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_roles3",
                        id: "985898657305993268"
                    }

                },
                {
                    label: "Alone",
                    value: "sevgilim_yok",
                    description: "Sevgilim yok rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_roles2",
                        id: "985898659189252156"
                    }
                },
                {
                    label: "No Lovers",
                    value: "sevgilim_yapmiyorum",
                    description: "Sevgili yapmıyorum rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_roles1",
                        id: "985898757147201566"
                    }
                },
                {
                    label: "Temizle",
                    value: "sevgilim_temizle",
                    emoji: {
                        name: "🗑️"
                    }
                }
            ]
            }]

                },

                {
                    type:"ACTION_ROW",
            components:[{
                type:"SELECT_MENU",
                customId:"burç_rol",
                placeholder:"Burç rollerini seçmek için tıkla!",
                maxValues: 1,
                minValues:0,
                options: [
                {
                    label: "Kova",
                    value: "burç_kova",
                    description: "Kova rolüne sahip olmak için tıkla!",
                    emoji: {
                        name:"ashera_boga",
                        id: "985900745113083904"
                    }
                },
                {
                    label: "Balık",
                    value: "burç_balık",
                    description: "Balık rolüne sahip olmak için tıkla!",
                    emoji: {
                        name:"ashera_balik",
                        id: "985900735311011840"
                    }
                },
                {
                    label: "Koç",
                    value: "burç_koç",
                    description: "Koç rolüne sahip olmak için tıkla!",
                    emoji: {
                        name:"ashera_koc",
                        id: "985900743049494578"
                    }
                },
                {
                    label: "Boğa",
                    value: "burç_boğa",
                    description: "Boğa rolüne sahip olmak için tıkla!",
                    emoji: {
                        name:"ashera_boga",
                        id: "985900739010371664"
                    }
                    },
                    {
                        label: "İkizler",
                        value: "burç_ikizler",
                        description: "İkizler rolüne sahip olmak için tıkla!",
                        emoji: {
                            name:"ashera_ikizler",
                            id: "985900741082382336"
                    }
                    },
                    {
                        label: "Yengeç",
                        value: "burç_yengeç",
                        description: "Yengeç rolüne sahip olmak için tıkla!",
                        emoji: {
                            name:"ashera_yengec",
                            id: "985900751819784202"
                    }
                },
                {
                    label: "Aslan",
                    value: "burç_aslan",
                    description: "Aslan rolüne sahip olmak için tıkla!",
                    emoji: {
                        name:"ashera_aslan",
                        id: "985900733566156901"
                    }
                },
            {
                label: "Başak",
                value: "burç_basak",
                description: "Başak rolüne sahip olmak için tıkla!",
                emoji: {
                    name:"ashera_basak",
                    id: "985900737097777213"
                }
            },
            {
                label: "Terazi",
                value: "burç_terazi",
                description: "Terazi rolüne sahip olmak için tıkla!",
                emoji: {
                    name:"ashera_terazi",
                    id: "985900748623712326"
                }
            },
            {
                label: "Akrep",
                value: "burç_akrep",
                description: "Akrep rolüne sahip olmak için tıkla!",
                emoji: {
                    name:"ashera_akrep",
                    id: "985900731460636715"
                }
            },
            {
                label: "Yay",
                value: "burç_yay",
                description: "Yay rolüne sahip olmak için tıkla!",
                emoji: {
                    name:"ashera_yay",
                    id: "985900750116892722"
                }
            },
            {
                label: "Oğlak",
                value: "burç_oğlak",
                description: "Oğlak rolüne sahip olmak için tıkla!",
                emoji: {
                    name:"ashera_oglak",
                    id: "985900746774040656"
                }
            },
            {
                label:"Temizle",
                value:"burç_temizle",
                emoji:{
                    name:"🗑️"
                }
            }
           
                ]
            }]
                },
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "rol_oyun",
                            placeholder: "Oyun rollerini seçmek için tıkla!",
                            maxValues: 9,
                            minValues: 0,
                            options: [
                                {
                                    label: "League of Legends",
                                    value: "oyun_lol",
                                    description: "League of Legends rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "oyun_lol",
                                        id: "956800147734536232"
                                    }
                                },
                                {
                                    label: "Call of Duty",
                                    value: "oyun_cod",
                                    description: "COD rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "oyun_cod",
                                        id: "991285979036008519"
                                    }
                                },
                                {
                                    label: "PUBG",
                                    value: "oyun_pubg",
                                    description: "PUBG rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "oyun_pubg",
                                        id: "956800148070101012"
                                    }
                                },
                                {
                                    label: "VALORANT",
                                    value: "oyun_valo",
                                    description: "VALORANT rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_valorant",
                                        id: "985905098565754910"
                                    }
                                },
                                {
                                    label: "GTA V",
                                    value: "oyun_gta",
                                    description: "GTA V rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_gtav",
                                        id: "985899564496203806"
                                    }
                                },
                                {
                                    label: "Minecraft",
                                    value: "oyun_rust",
                                    description: "Minecraft rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "oyun_rust",
                                        id: "972914762633580704"
                                    }
                                },
                                {
                                    label: "Apex Legends",
                                    value: "oyun_apex",
                                    description: "Apex Legends rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "oyun_apex",
                                        id: "972914705381339187"
                                    }
                                },
                                {
                                    label: "Mobile Legends",
                                    value: "oyun_ml",
                                    description: "Mobile Legends rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_mobilelegends",
                                        id: "985905097156485171"
                                    }
                                },
                                {
                                    label: "CSGO",
                                    value: "oyun_csgo",
                                    description: "CS:GO rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_csgo",
                                        id: "985905095118049280"
                                    }
                                },
                                {
                                    label: "Temizle",
                                    value: "oyun_clear",
                                    emoji: {
                                        name: "🗑️"
                                    }
                                }
                            ]
                        }
                    ]
                },

                {
                    type:"ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "renk_rol",
                            maxValues: 1,
                            minValues: 1,
                            placeholder: "Renk rolünü seçmek için tıkla!",
                            options: [
                                {
                                    label: "Pembe",
                                    value:"rek_pembe",
                                    description: "Pembe rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_color5",
                                        id: "985896048776081469"
                                    }
                                },
                                {
                                    label: "Koyu Mavi",
                                    value:"rek_turkuazmor",
                                    description: "Koyu Mavi rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_color3",
                                        id: "985896052030861312"
                                    }
                                },
                                {
                                    label: "Mor",
                                    value:"rek_mor",
                                    description: "Mor rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_color2",
                                        id: "985896053675016212"
                                    }
                                },
                                {
                                    label: "Mavi",
                                    value:"rek_mavi",
                                    description: "Mavi rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_color1",
                                        id: "985896055461781514"
                                    }
                                },
                                {
                                    label: "Yeşil",
                                    value:"rek_yeşil",
                                    description: "Yeşil rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_color4",
                                        id: "985896050491543572"
                                    }
                                },
                                {
                                    label: "Temizle",
                                    value:"rek_temizle",
                                    emoji: {
                                        name: "🗑️"
                                    }
                                }
                            ]
                        }
                    ]
                },
                
                {
                    type: "ACTION_ROW",
                    components: [
                        {
                            type: "SELECT_MENU",
                            customId: "rol_katılımcı",
                            maxValues: 4,
                            minValues: 0,
                            placeholder: "Etkinlik rollerini seçmek için tıkla!",
                            options: [
                                {
                                    label: "Çekiliş Katılımcısı",
                                    value: "sub_cekilis",
                                    description: "Çekiliş katılımcısı rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_tada3",
                                        id: "991435774216114346"
                                    }
                                },
                                {
                                    label: "Etkinlik Katılımcısı",
                                    value: "sub_etkinlik",
                                    description: "Etkinlik katılımcısı rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_tada",
                                        id: "981188179115782155"
                                    }
                                },
                                {
                                    label: "D/C",
                                    value: "sub_dc",
                                    description: "D/C rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_dc",
                                        id: "991432478025863198"
                                    }
                                },
                                {
                                    label: "Vampir Köylü",
                                    value: "sub_vk",
                                    description: "Vampir köylü rolüne sahip olmak için tıkla!",
                                    emoji: {
                                        name: "ashera_vk",
                                        id: "991432479716163595"
                                    }
                                },
                                {
                                    label: "Temizle",
                                    value: "sub_clear",
                                    emoji: {
                                        name: "🗑️"
                                    }
                                }
                            ]
                        }
                    ]
                },
            ]
        });

    }

}

module.exports = Eval;
