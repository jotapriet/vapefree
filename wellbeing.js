const DAY=86400000;
export const triggers={stress:['Estrés','Haz una pausa, afloja los hombros y respira con comodidad.'],coffee:['Café','Cambia de lugar al terminar el café y toma un vaso de agua.'],boredom:['Aburrimiento','Ocupa tus manos: dibuja, ordena algo pequeño o juega con las burbujas.'],friends:['Con amigos','Prepara una frase: «Hoy paso, estoy dejando el vapeo».'],other:['Otro','Piensa qué necesitabas en ese momento y prueba una alternativa.'],unknown:['Sin especificar','Puedes registrar el motivo la próxima vez, si te apetece.']};
export const exercises={breath:'Respiración',timer:'Temporizador',bubbles:'Burbujas',grounding:'Grounding',activities:'Actividades'};
export function localDay(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
export function wellbeingDefaults(){return {triggerLog:[],checkins:[],plans:{stress:'',coffee:'',boredom:'',friends:'',other:''},sos:{duration:180,volume:50,favorite:'breath'},reminders:{enabled:false,time:'20:00',message:'Haz una pausa para ti. Tu SOS está a un toque.',lastDay:''}}}
export function upgrade(data){const fresh=wellbeingDefaults();for(const k of Object.keys(fresh))if(data[k]===undefined)data[k]=fresh[k];return data}
export function validateWellbeing(data){
 upgrade(data);
 const invalid=()=>{throw Error('El respaldo contiene registros de bienestar no válidos.')};
 if(!Array.isArray(data.triggerLog)||!data.triggerLog.every(x=>x&&Number.isFinite(x.at)&&x.at>=0&&Object.hasOwn(triggers,x.trigger)))invalid();
 if(!Array.isArray(data.checkins)||!data.checkins.every(x=>x&&/^\d{4}-\d{2}-\d{2}$/.test(x.day)&&localDay(new Date(x.day+'T12:00:00'))===x.day&&Number.isInteger(x.mood)&&x.mood>=1&&x.mood<=5&&Number.isInteger(x.intensity)&&x.intensity>=0&&x.intensity<=10&&typeof x.win==='string'&&x.win.length<=300))invalid();
 if(new Set(data.checkins.map(x=>x.day)).size!==data.checkins.length)invalid();
 if(!data.plans||!Object.keys(wellbeingDefaults().plans).every(k=>typeof data.plans[k]==='string'&&data.plans[k].length<=300))invalid();
 const s=data.sos,r=data.reminders;
 if(!s||![60,120,180,300].includes(s.duration)||!Number.isFinite(s.volume)||s.volume<0||s.volume>100||!Object.hasOwn(exercises,s.favorite))invalid();
 if(!r||typeof r.enabled!=='boolean'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(r.time)||typeof r.message!=='string'||!r.message.trim()||r.message.length>200||typeof r.lastDay!=='string')invalid();
 return data;
}
export function weekly(data,now=new Date()){
 const rows=[];for(let i=6;i>=0;i--){const date=new Date(now);date.setDate(date.getDate()-i);date.setHours(0,0,0,0);const end=new Date(date);end.setDate(end.getDate()+1);const start=date.getTime(),finish=Math.min(end.getTime(),now.getTime());
 const overlap=(a,b)=>Math.max(0,Math.min(finish,b)-Math.max(start,a));
 const daily=data.profile.device==='disposable'?data.profile.price/data.profile.lasting:data.profile.weekly/7;
 let money=overlap(Date.parse(data.profile.start),now.getTime())/DAY*daily;
 for(const a of data.attempts){const ended=Date.parse(a.endedAt);if(Number.isFinite(ended)&&a.duration>0)money+=overlap(ended-a.duration,ended)/a.duration*a.money}
 const day=localDay(date);const entry=data.checkins.find(x=>x.day===day);
 rows.push({day,label:date.toLocaleDateString('es-ES',{weekday:'short',day:'numeric'}),cravings:data.cravings.filter(t=>t>=start&&t<end.getTime()&&t<=now.getTime()).length,mood:entry?.mood??null,intensity:entry?.intensity??null,money});
 }return rows;
}
export function patterns(data){const counts={};for(const log of data.triggerLog)counts[log.trigger]=(counts[log.trigger]||0)+1;return Object.entries(counts).sort((a,b)=>b[1]-a[1])}
export function reminderDue(reminder,now=new Date()){
 const time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
 return Boolean(reminder?.enabled&&reminder.lastDay!==localDay(now)&&time>=reminder.time);
}
