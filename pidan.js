//import { FileBox }  from 'file-box'
const {
  Wechaty,
  ScanStatus,
  log,
}               = require('wechaty')

const WECHATY_PUPPET_PADCHAT_TOKEN = 'YOUR_TOKEN'
 
const puppet = 'wechaty-puppet-padplus' // 使用ipad 的方式接入。
 
const puppetOptions = {
  token: WECHATY_PUPPET_PADCHAT_TOKEN,
}
  
const bot = new Wechaty({
	name: 'pidan',
  puppet,
  puppetOptions,
})

const QrcodeTerminal = require('qrcode-terminal');

// 运行 wechaty
bot
	//.on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`))
	.on('scan', (url, code) => {
  console.log(`Scan QR Code to login: ${code}\n${url}`)
  if (!(/201|200/).test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/')
    QrcodeTerminal.generate(loginUrl)
  }
})
	.on('login',       user    => console.log(`登录成功:+ ${user}`))
	.on('logout', (user) => {  console.log(`用户 ${user} logout`)})
	.on('error',  onError)
	.on('message',  async msg => {
		//const oldRoom = await bot.Room.find({ name: 'three群' })
		  const contact = msg.from()
		  const text = msg.text()
		  const room = msg.room()
		  	    if (msg.type() === bot.Message.Type.Recalled) {
		    const recalledMessage = await msg.toRecalled()
		    console.log(`Message: ${recalledMessage} has been recalled.`)
		  }
		  if (room) {
		    const topic = await room.topic()
		    console.log(`Room: ${topic} Contact: ${contact.name()} Text: ${text}`)
		  } else {
		    console.log(`Contact: ${contact.name()} Text: ${text}`)

		  console.info(msg.toString())

		  if (msg.self()) {
		    console.info('Message discarded because its outgoing')
		    return
		  }

		  if (msg.age() > 2 * 60) {
		    console.info('Message discarded because its TOO OLD(than 2 minutes)')
		    return
		  }

		  if (msg.type() !== bot.Message.Type.Text
		    || !/^(ding|ping|bing|code|疫情)$/i.test(msg.text())
		  ) {
		    console.info('Message discarded because it does not match ding/ping/bing/code')
		    return
		  }
		  /**
		   * 1. reply 'dong'
		   */
		  await msg.say('pong')
		  console.info('REPLY: dong')
		  
		// 3. send Contact
		  if (/^baicai$/i.test(msg.text())) {
		    const contactCard = await bot.Contact.find({name: '卖白菜'})
		    if (!contactCard) {
		      console.log('not found')
		      return
		    }
		    await msg.say(contactCard)
		  }

		  if (/^link$/i.test(msg.text())) { 
		    const urlLink = new bot.UrlLink({
		      description: 'Wechaty is a Bot SDK for Wechat Individual Account which can help you create a bot in 6 lines of javascript, with cross-platform support including Linux, Windows, Darwin(OSX/Mac) and Docker.',
		      thumbnailUrl: 'https://camo.githubusercontent.com/9433a83894f80d828db4909db6d9ee80ada5bed8/68747470733a2f2f776563686174792e6769746875622e696f2f776563686174792f696d616765732f776563686174792d6c6f676f2d656e2e706e67',
		      title: 'Wechaty',
		      url: 'https://github.com/wechaty/wechaty',
		    });

		    await msg.say(urlLink);
		  }
	if(text=="stop"){console.log(`Contact: ${contact.name()} Text: stop ${text}`);bot.stop();}
if(text=="疫情"){yqinfo=get_html();await msg.say(yqinfo)}
		if(text=="start"){console.log(`Contact: ${contact.name()} Text: stop ${text}`);bot.start();}
		if(text=="exit"){console.log(`Contact: ${contact.name()} Text: stop ${text}`);bot.stop();bot.logout();process.exit(-1)
		}
	}
})

	.on('friendship',  (friendship) => {  
  if(friendship.type() === Friendship.Type.Receive){
    // 1. receive new friendship request from new contact    
    const contact = friendship.contact()    
    console.log(`Contact: ${contact.name()} Text: ${text}`)
}})

	.on('room-invite', invitation => console.log('收到入群邀请：' + invitation))
//.start()
bot.start()
  .catch(async e => {
    console.error('Bot start() fail:', e)
    await bot.stop()
    await bot.logout()
    process.exit(-1)
  })
  		
if (bot.logonoff()) {  
  console.log('Bot logined')
} else {  
  console.log('Bot not logined')
}

function onError (e) {
  console.error('Bot 出错了:', e)
  /*
  */
  if (bot.logonoff()) {
    bot.say('Wechat error: ' + e.message).catch(console.error)
  }
}

function get_html(){
var fs = require("fs");
var rp = require('request-promise');
var baseUrl = 'https://ncov.dxy.cn/'; //输入任何网址都可以
var route = `ncovh5/view/pneumonia`;
var url=baseUrl + route;
var charset='utf-8';
console.info(url);
rp(url)
    .then(process, handleError);
    }

var html;

function handleError(content){
	console.log("出错了："+content);
}
function process(content){
	yqxx=get_nCoV_num(content);
	console.log(yqxx);
	return yqxx;
}

function custom_time(unixtime){
var  unixTimestamp = new  Date(unixtime);
if(unixtime.toString().length<=10){unixTimestamp = new  Date(unixtime* 1000);}
commonTime = unixTimestamp.toLocaleString();
return commonTime;
}


function get_nCoV_numJS(htmlstr){
    reg = /<script id="getStatisticsService">.+?window.getStatisticsService\s=\s({.*?)}catch\(e\){}<\/script>/ig;
    //res=htmlstr.match(reg);
    res=reg.exec(htmlstr);
    news_list=res[1]
    //console.log(news_list);
    return news_list;
}
function get_nCoV_num(htmlstr){
	var nCoV_numStr=get_nCoV_numJS(htmlstr);
	datas = JSON.parse(nCoV_numStr);
	//console.log(datas.data.qrCodeUrl);
        nCoV_num_str="国内疫情情况： \r\n --- \r\n ";
        nCoV_num_str+="现存确诊："+datas.currentConfirmedCount+"，";
        nCoV_num_str+="较昨日："+datas.currentConfirmedIncr+"，";
        //nCoV_num_str+="疑似："+datas.suspectedCount+"，";
        nCoV_num_str+="境外输入："+datas.suspectedCount+"，";
        nCoV_num_str+="较昨日："+datas.suspectedIncr+"，";
        nCoV_num_str+="现存重症："+datas.seriousCount+"，";
        nCoV_num_str+="较昨日："+datas.seriousIncr+"， \r\n --- \r\n ";
        
        nCoV_num_str+="累计确诊："+datas.confirmedCount+"，";
        nCoV_num_str+="较昨日："+datas.confirmedIncr+"，";
        nCoV_num_str+="累计死亡："+datas.deadCount+"，";
        nCoV_num_str+="较昨日："+datas.deadIncr+"，";
        nCoV_num_str+="累计治愈："+datas.curedCount+"，";
        nCoV_num_str+="较昨日："+datas.curedIncr+" \r\n --- \r\n ";
        nCoV_num_str+="更新："+custom_time(datas.modifyTime)+" \r\n --- \r\n ";
        
        nCov_Foreign_num_str="国外疫情数据： \r\n --- \r\n ";
        nCov_Foreign_num_str+="现存确诊："+datas.foreignStatistics.currentConfirmedCount+"，";
        nCov_Foreign_num_str+="较昨日："+datas.foreignStatistics.currentConfirmedIncr+"，";
        
        nCov_Foreign_num_str+="累计确诊："+datas.foreignStatistics.confirmedCount+"，";
        nCov_Foreign_num_str+="较昨日："+datas.foreignStatistics.confirmedIncr+"，";
        nCov_Foreign_num_str+="累计死亡："+datas.foreignStatistics.deadCount+"，";
        nCov_Foreign_num_str+="较昨日："+datas.foreignStatistics.deadIncr+"，";
        nCov_Foreign_num_str+="累计治愈："+datas.foreignStatistics.curedCount+"，";
        nCov_Foreign_num_str+="较昨日："+datas.foreignStatistics.curedIncr+" \r\n --- \r\n ";
        nCov_Foreign_num_str+="更新："+custom_time(datas.modifyTime);
	//console.log(datas.foreignStatistics);
        fs.writeFile('input.txt', nCoV_numStr, function (err) {
        if (!err) {
            console.log("文件写入完毕!")
        }
    });
        return nCoV_num_str+nCov_Foreign_num_str;

	//console.log(nCoV_num_str);
}

function get_nCoV_news(htmlstr){
    reg = /<script id="getTimelineService">.+?window.getTimelineService\s=\s(\[{.*?\])}catch\(e\){}<\/script>/ig;
    res=reg.exec(htmlstr);
    news_list=res[1]
    //console.log(news_list);
    return news_list;
}
/*
          module.exports = {
       process,
       handleError
     }
*/