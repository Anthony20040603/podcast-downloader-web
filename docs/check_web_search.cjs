const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];new vm.Script(js);
const helper=js.slice(js.indexOf('function appleSearch('),js.indexOf('async function searchName('));
(async()=>{for(const file of fs.readdirSync('docs/search-fixtures')){
 let removed=false;const ctx={window:{},URL,DOMException,setTimeout,clearTimeout,document:{createElement(){return{remove(){removed=true}}},head:{append(script){const callback=new URL(script.src).searchParams.get('callback');const payload=fs.readFileSync('docs/search-fixtures/'+file,'utf8').replace('podcastTestCallback',callback);vm.runInContext(payload.replace(callback+"(","window."+callback+"("),ctx);script.onload()}}}};
 vm.createContext(ctx);vm.runInContext(helper,ctx);const result=await ctx.appleSearch(file.slice(0,-3),new AbortController().signal);assert(result.results.length>0);assert(removed);assert.equal(Object.keys(ctx.window).length,0);console.log(file+': callback accepted; cleanup passed');
 }
 const ctx={window:{},URL,DOMException,setTimeout,clearTimeout,document:{createElement(){return{remove(){}}},head:{append(){}}}};vm.createContext(ctx);vm.runInContext(helper,ctx);const control=new AbortController();const pending=ctx.appleSearch('cancel',control.signal);control.abort();await assert.rejects(pending,e=>e.name==='AbortError');assert.equal(Object.keys(ctx.window).length,0);console.log('Syntax and cancellation passed');
})().catch(e=>{console.error(e);process.exitCode=1});
