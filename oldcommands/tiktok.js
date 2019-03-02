import TikTokAPI, { getRequestParams } from 'tiktok-api';


const signURL = async (url, ts, deviceId) => {
  const as = '1';
  const cp = '2'
  const mas = '3';
  return `${url}&as=${as}&cp=${cp}&mas=${mas}`;
}

const params = getRequestParams({
  device_id: '6660616653112542725',
  fp: '',
  iid: '6660618700696209158',
  openudid: '0144f144ee84efe0',
});

const api = new TikTokAPI(params, { signURL });

const Discord = require('discord.js');

module.exports = {
    name: 'tiktok',
    description: 'search for cringe',
    async execute(message, args) {    
        api.searchHashtags({
            keyword: 'example',
            count: 10,
            cursor: 0,
          })
            .then(res => { 
                console.log(res.data.challenge_list);
                api.listPostsInHashtag({
                    ch_id: '<hashtag_id>',
                  })
                    .then(res => console.log(res.data.aweme_list))
                    .catch(console.log);
            })
            .catch(console.log);
    }
}
