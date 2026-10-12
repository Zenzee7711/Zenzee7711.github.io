(() => {
 const section=document.querySelector('#skills .section');
 if(!section)return;
 // Representative tools from the current resume. The complete list remains below.
 const keys=[
 ['Py','Python','ML & data','#315d86','I use Python for model training, computer vision, and data-processing projects.'],
 ['JS','JavaScript','Software','#786115','Used in web interfaces and the Node.js room-reservation backend.'],
 ['Da','Dart','Software','#126a83','The language behind the Flutter mobile room-booking app.'],
 ['SQL','SQL','Data','#6a547f','Used to work with relational data and explore flight records with Spark SQL.'],
 ['</>','HTML/CSS','Software','#9b4931','Used to structure and style web interfaces.'],
 ['N','Node.js','Software','#3e6b45','Used for the room-reservation backend and its REST API.'],
 ['ex','Express','Software','#3e4652','Routes, authentication, and API logic for the room-booking system.'],
 ['Fl','Flutter','Software','#146c98','Used to extend room booking into a mobile app, tested on the iOS simulator.'],
 ['My','MySQL','Data','#376b80','Stores the room-booking application’s relational data.'],
 ['LGB','LightGBM','Machine learning','#416843','Selected classifier in the roadside accident-risk prototype.'],
 ['XGB','XGBoost','Machine learning','#6d4d70','One of the classifiers compared during the road-risk modelling experiments.'],
 ['Cat','CatBoost','Machine learning','#896329','Compared with other classifiers for accident-risk classification.'],
 ['sk','scikit-learn','Machine learning','#9b5430','Used in the machine-learning workflow for preprocessing and evaluation.'],
 ['YOLO','YOLO','Computer vision','#6e458c','Object detection in the roadside traffic-video prototype.'],
 ['CV','OpenCV','Computer vision','#326e69','Video processing and integration in the road-risk application.'],
 ['Sp','PySpark','Data','#9b5034','Flight-record processing, SQL analysis, and Spark MLlib model experiments.'],
 ['K','Kafka','Data','#4b5364','Tested the team’s producer-to-consumer streaming prediction flow.'],
 ['Git','Git','Development','#a04735','Version control for project source code.'],
 ['Do','Docker','Development','#236994','Used in the road-risk project’s tooling.'],
 ['>_','Linux','Development','#566139','Part of my development toolkit listed in my resume.'],
 ['J','Java','Coursework','#8c4d3f','Coursework experience; listed separately from my main project tools.'],
 ['C#','C#','Coursework','#664786','Coursework experience; listed separately from my main project tools.'],
 ['M','MATLAB','Coursework','#92582b','Coursework experience; listed separately from my main project tools.'],
 ['HW','Hardware','Prototyping','#456661','Servo testing, soldering, power-budget and battery assessment, and microcontroller fundamentals.']
 ];

 // The keyboard is a representative selection; all resume skills remain in the panels.
 const logos={'Python':'python','JavaScript':'javascript','Dart':'dart','HTML/CSS':'html5','Node.js':'nodejs','Express':'express','Flutter':'flutter','MySQL':'mysql','scikit-learn':'scikitlearn','OpenCV':'opencv','PySpark':'apachespark','Kafka':'apachekafka','Git':'git','Docker':'docker','Linux':'linux','Java':'java','C#':'csharp','MATLAB':'matlab'};
 const shown=keys.filter(k=>logos[k[1]]);
 shown.splice(4,0,['CSS','CSS','Software','#c6dafa','Used to style responsive web interfaces.']);logos.CSS='css3';
 const colors=['#f3ce65','#f4da61','#97dcec','#f49c70','#90b9f0','#a6d59c','#e6e9eb','#92d6ee','#bddfe9','#f3c389','#a9d9b8','#f2b995','#ddd9ef','#eea18c','#a6daf0','#e8dfb3','#f3c8a9','#cbb4e9','#efb493'];
 const layout=document.createElement('div');layout.className='skill-keyboard-layout';
 layout.innerHTML='<div class="skill-keyboard-stage"><div class="skill-keyboard" role="group" aria-label="Explore my skills"></div><p class="keyboard-hint mono">PICK A KEY · EXPLORE MY TOOLKIT</p></div><div class="skill-key-info" aria-live="polite" aria-atomic="true"><span class="mono key-category"></span><h3 class="key-title"></h3><p class="key-description"></p><p class="key-instruction">Click or tap a key. You can also use Tab and Enter.</p></div>';
 const board=layout.querySelector('.skill-keyboard');
 const buttons=[];
 function select(index){const k=shown[index];layout.querySelector('.key-category').textContent=k[2];layout.querySelector('.key-title').textContent=k[1];layout.querySelector('.key-description').textContent=k[4];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));}
 shown.forEach((k,index)=>{
   const b=document.createElement('button');b.type='button';b.className='skill-key';b.style.setProperty('--key-color',colors[index]);b.setAttribute('aria-label',k[1]+' — '+k[2]);b.title=k[1];
   const face=document.createElement('span');face.className='skill-key-face';
   const mark=document.createElement('img');mark.className='skill-key-logo';mark.alt='';mark.src='assets/tool-logos/'+logos[k[1]]+'.svg';mark.width=40;mark.height=40;mark.draggable=false;
   const label=document.createElement('span');label.className='skill-key-label';label.textContent=k[1];face.append(mark,label);b.append(face);b.addEventListener('click',()=>select(index));board.append(b);buttons.push(b);
 });
 const signature=document.createElement('span');signature.className='keyboard-signature';signature.textContent='ptk*';signature.setAttribute('aria-hidden','true');board.append(signature);
 // Reuse the same brand artwork in the detailed toolkit; generic skills retain text labels.
 document.querySelectorAll('.skill-chips li').forEach(li=>{const name=li.textContent.trim();const slug=logos[name] || (name==='HTML / CSS'?'html5':name==='Spark MLlib'?'apachespark':null);if(!slug)return;const img=document.createElement('img');img.src='assets/tool-logos/'+slug+'.svg';img.alt='';img.width=20;img.height=20;img.loading='lazy';li.prepend(img);});
 section.querySelector('.section-heading').after(layout);select(0);
})();
