const { sleep, getSecret } = require('common');
const { Discord } = require('discord.js');
const search = require('youtube-search');

const DiscordClient = new Discord.Client();

exports.handler = async (event) => {
    console.log('HANDLER -- RETRIEVING SECRETS')
    const botSecret = await getSecret('bot_client_secret');
    const channelId = await getSecret('wizard-boat-chat-channel-id');

    const discordMessage = (JSON.parse(event.Records[0].Sns.Message)).content;
    const keyWords = discordMessage.substring(3,);
    console.log(`HANDLER -- SEARCHING FOR "${keyWords}"`)

    DiscordClient.on("ready", () => {
        console.log('DYSON -- DISCORD CLIENT SUCCESSFULLY LOGGED IN')
        const channel = DiscordClient.channels.cache.get(channelId);

        if (!channel) return console.error('DYSON -- THE CHANNEL DOES NOT EXIST');
        channel.join().then(connection => {
            console.log("DYSON -- SUCCESSFULLY CONNECTED TO VOICE CHANNEL");

            console.log('DYSON -- LEAVING THE VOICE CHANNEL')
            channel.leave();

        }).catch(e => {
            console.error(e);
        });
    });

    DiscordClient.login(botSecret);

    await sleep(5000);
    console.log('HANDLER -- FIN')
    return { statusCode: 200, body: JSON.stringify("Audio Played") }
}


function searchYoutubeForKeywords (searchTerms) {
    console.log('YOUTUBESEARCH -- LOGGING INTO YOUTUBE');
    const youtubeApiKey = process.env.API_KEY(getSecret('youtube_api_key'));

    console.log('YOUTUBESEARCH -- SEARCH FOR KEYWORDS');
    var opts = {
        maxResults: 2,
        key: searchTerms
    }

    search('jsconf', opts, function (err, results) {
        if (err) return console.log(err);

        console.log(`SEARCH - SEARCH RESULTS == ${results}`)
        console.dir(results);
    });
    const videoId = '01283';
    //logout
    return videoid
}