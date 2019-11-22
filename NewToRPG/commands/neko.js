/*
    Skrypt stworzony przez Taki Tam Slu#5916.
    Nazwa pliku może być jakakolwiek.
    Wszystkie polecenia bota trzymaj w katalogu "commands".
    Jeśli zapoznałeś się z tymi informacjami (podpowiedziami dla programisty) (tych na zielono) możesz je usunąć, aby skrypt był czytelniejszy.
*/

const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (_client, message) => {
    /*
        Komenda Neko.
        Losowe zdjęcia Neko z API.

        a) Jak dodać więcej komend Anime?
        1. Odwiedź stronę https://docs.nekobot.xyz/#image-endpoints-image
        2. Znajdź "The type of image to get. Current types: ...". Masz podane tam dostępnie endpointy, czyli API.
        3. Skopiuj i wklej ten plik. (Ctrl + C potem Ctrl + V)
        4. Gdzie masz `https://nekobot.xyz/api/image?type=neko` (linijka 25) zmień końcówkę linku według dokumentacji. W tym przypadku jest to "neko".
        np. `https://nekobot.xyz/api/image?type=kanna`
    */

    let {body} = await superagent
    .get(`https://nekobot.xyz/api/image?type=neko`).catch((err) => {
        // API nie odpowiada? Wyślij wiadomość "Błąd z API!".
        message.channel.send("Błąd z API!");
        return console.log(err);
    });

    // Błąd? Wyślij wiadomość "Błąd bota!"
    try {
        let embed = new Discord.RichEmbed()
        .setColor(body.color)
        .setImage(body.message);
        message.channel.send(embed);
    } catch(err) { // Złap błąd...
        message.channel.send("Błąd bota!");
        return console.log(err);
    }
}

module.exports.help = {
    name: "neko" // Nazwa polecenia. Bez prefiksu!
    // W tym przypadku będzie to akurat "!test".
    // Prefix bota jest możliwy do zmiany w pliku "config.json".
}