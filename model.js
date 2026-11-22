import {validateWellbeing} from './wellbeing.js';
export const DAY=86400000;
export const defaults=()=>({version:1,profile:{start:new Date().toISOString(),device:'disposable',price:8,lasting:3,weekly:20,ml:10,puffs:200,nicotine:20,reason:'Quiero volver a sentirme libre',currency:'EUR'},attempts:[],cravings:[],goal:{name:'Una escapada para mí',amount:150},dark:false});
export function validate(data){
 if(!data||data.version!==1||!data.profile||!Number.isFinite(Date.parse(data.profile.start)))throw Error('El archivo no contiene un perfil válido.');
 const p=data.profile; if(!['disposable','pods','mod'].includes(p.device)||!['EUR','USD'].includes(p.currency))throw Error('Perfil no válido.');
 for(const key of ['price','lasting','weekly','ml','puffs','nicotine'])if(typeof p[key]!=='number'||!Number.isFinite(p[key])||p[key]<0||(key==='lasting'&&p[key]<=0))throw Error('Revisa los valores de consumo.');
 if(typeof p.reason!=='string'||p.reason.length>1000||!Array.isArray(data.attempts)||!Array.isArray(data.cravings)||!data.cravings.every(x=>Number.isFinite(x)&&x>=0)||!data.attempts.every(a=>a&&['duration','money','puffs','ml','devices','nicotine'].every(k=>Number.isFinite(a[k])&&a[k]>=0))||!data.goal||typeof data.goal.name!=='string'||!Number.isFinite(data.goal.amount)||data.goal.amount<=0)throw Error('El respaldo contiene datos no válidos.');
 return validateWellbeing(data);
}
export function stats(data,now=Date.now()){
 const p=data.profile,duration=Math.max(0,now-Date.parse(p.start)),days=duration/DAY;
 const daily=p.device==='disposable'?p.price/p.lasting:p.weekly/7;
 const ml=days*p.ml/7;
 const current={duration,money:days*daily,puffs:days*p.puffs,ml,devices:p.device==='disposable'?days/p.lasting:0,nicotine:ml*p.nicotine};
 const total={...current};for(const a of data.attempts)for(const k of Object.keys(total))total[k]+=a[k]||0;
 return {current,total};
}
export const milestones=[['Un primer respiro',20/1440,'Has empezado a cambiar tu rutina.'],['Un día a tu favor',1,'Tu cuerpo se adapta a estar sin el vapeador.'],['Recupera tus sentidos',2,'Observa cómo te sientes y qué cambios percibes.'],['Paso a paso',3,'La abstinencia puede ser intensa estos días; cada experiencia es diferente.'],['Más espacio para moverte',14,'Prueba a caminar y observar tu respiración.'],['Un nuevo hábito',30,'Llevas un mes construyendo otras rutinas.'],['Sigue creciendo',90,'Celebra tu constancia y los cambios que has observado.'],['Tu próximo capítulo',180,'Medio año de decisiones a tu favor.']];
export const facts=[
'La nicotina puede generar dependencia. Reconocer un impulso es el primer paso para responder de otra manera.',
'Los antojos son temporales. Cambiar de actividad puede ayudarte a atravesarlos.',
'El gesto de llevar la mano a la boca también se aprende. Puedes ensayar una rutina diferente.',
'Planificar una fecha para dejarlo ayuda a preparar tu entorno y buscar apoyo.',
'Reducir la concentración de nicotina es una de las opciones para dejar el vapeo gradualmente.',
'Al reducir la nicotina, algunas personas vapean más. Observar tu consumo ayuda a detectar ese cambio.',
'Ampliar el tiempo entre sesiones puede ayudarte a reducir el vapeo.',
'Crear espacios sin vapeo ayuda a interrumpir asociaciones con lugares cotidianos.',
'La irritabilidad puede aparecer al dejar la nicotina y suele mejorar con el tiempo.',
'La dificultad para concentrarte puede ser un síntoma de abstinencia.',
'El sueño puede cambiar al dejar la nicotina. Mantener una rutina puede ayudarte.',
'Sentir más hambre puede formar parte de la abstinencia de nicotina.',
'El apoyo de alguien de confianza puede hacer más llevadero el proceso.',
'Un tropiezo no borra lo que has aprendido. Puedes ajustar tu plan y volver a intentarlo.',
'Reconocer tus desencadenantes permite preparar alternativas antes del próximo impulso.',
'Guardar el vapeador fuera de la vista puede ayudarte a cambiar tus señales habituales.',
'Una caminata o una actividad que disfrutes puede servir como distracción durante un antojo.',
'Si dejarlo resulta difícil, un profesional sanitario puede orientarte sobre el apoyo disponible.',
'Si usabas el vapeador para dejar de fumar, evita volver al tabaco y busca apoyo para tu plan.',
'Tu ahorro depende de lo que gastabas: pequeñas cantidades repetidas se acumulan.',
'Cada desechable evitado es un dispositivo menos que gestionar como residuo electrónico.',
'Los miligramos del líquido no equivalen a la nicotina que absorbe el cuerpo. La absorción varía.'
];
