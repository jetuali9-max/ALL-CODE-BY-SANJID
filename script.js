const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function enterSite(){let ok=$("#pass").value.trim().toUpperCase()==="SANJID";if(!ok){$("#entry").querySelector("button").classList.add("shake");$("#entryMsg").className="bad";$("#entryMsg").textContent="✕ WRONG CODE";setTimeout(()=>$("#enter").classList.remove("shake"),500);return}$("#entryMsg").className="ok";$("#entryMsg").textContent="✓ ACCESS GRANTED";$("#enter").classList.add("entry-ok");setTimeout(()=>{$("#entry").remove();$("#app").classList.remove("hide")},500)};
$("#enter").addEventListener("click",enterSite);
$("#pass").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();enterSite()}});

$("#hamb").onclick=()=>$("#drawer").classList.add("open");$(".close").onclick=()=>$("#drawer").classList.remove("open");$("#dots").onclick=()=>$("#pop").classList.toggle("open");
$$("[data-v]").forEach(x=>x.onclick=()=>{show(x.dataset.v);$("#drawer").classList.remove("open");$("#pop").classList.remove("open")});
function show(v){$$(".view").forEach(x=>x.classList.remove("active"));$("#"+v).classList.add("active")}

const code=$("#code"),preview=$("#preview"),nums=$("#nums"),sugg=$("#suggestions");
const tags=["h1","h2","h3","h4","h5","h6","p","a","img","div","span","section","header","footer","main","nav","article","aside","button","input","form","label","ul","ol","li","table","tr","td","th","strong","em","br","hr","video","audio","iframe","select","option","textarea","details","summary"];
function update(){nums.textContent=code.value.split("\n").map((_,i)=>i+1).join("\n");preview.srcdoc=code.value;localStorage.lc=code.value}
function suggest(){let m=code.value.slice(0,code.selectionStart).match(/<([a-z0-9]*)$/i);if(!m){sugg.classList.remove("show");return}let a=tags.filter(t=>t.startsWith(m[1].toLowerCase()));sugg.innerHTML=a.map(t=>`<button data-t="${t}">&lt;${t}&gt; → &lt;/${t}&gt;</button>`).join("");sugg.classList.toggle("show",a.length>0);sugg.querySelectorAll("button").forEach(b=>b.onclick=()=>{let p=code.selectionStart,q=m[1].length;code.value=code.value.slice(0,p-q-1)+`<${b.dataset.t}></${b.dataset.t}>`+code.value.slice(p);code.selectionStart=code.selectionEnd=p-q-1+b.dataset.t.length+2;update();sugg.classList.remove("show");code.focus()})}
code.oninput=()=>{let p=code.selectionStart,v=code.value,m=v.slice(0,p).match(/<([a-z][\w-]*)>$/i);if(m&&!["img","br","hr","input","meta","link"].includes(m[1])){let c=`</${m[1]}>`;code.value=v.slice(0,p)+c+v.slice(p);code.selectionStart=code.selectionEnd=p}update();suggest();coach()};
code.onclick=code.onkeyup=()=>{update();suggest()};
if(localStorage.lc)code.value=localStorage.lc;update();
function coach(){let t=code.value.toLowerCase(),m="👀 I'm watching your code. Keep going!",s="Watching";if(t.includes("<img")&&!t.includes("src=")){m="🧐 Your image needs a src.";s="Checking"}else if((t.match(/</g)||[]).length>(t.match(/>/g)||[]).length){m="🤔 An HTML tag looks unfinished.";s="Helping"}else if(t.includes("onclick")){m="🎉 Nice! You made it interactive.";s="Cheering"}else if(t.length>300){m="🕺 Wow! Keep building.";s="Happy"}$("#gtext").textContent=m;$("#gstate").textContent=s}
$("#swap").onclick=()=>{let w=$("#workspace"),a=$("#editorPane"),b=$("#previewPane");w.insertBefore(w.classList.toggle("sw")?b:a,w.firstChild)};
$("#fe").onclick=()=>{$("#workspace").classList.toggle("full-editor");$("#workspace").classList.remove("full-preview")};$("#fp").onclick=()=>{$("#workspace").classList.toggle("full-preview");$("#workspace").classList.remove("full-editor")};
$("#reset").onclick=()=>{code.value='<h1>Hello SANJID</h1>\n<p>Start learning HTML!</p>\n<button onclick="alert(\'Nice!\')">Click me</button>';update();coach()};

const D={
HTML:[
 ["Text",[
  ["Heading",`<h1>Title</h1>`,"শিরোনাম ও heading তৈরি করতে।",`<h2>Section</h2>`],
  ["Paragraph",`<p>Hello</p>`,"সাধারণ লেখা দেখাতে।",`<p>Hello world</p>`],
  ["Strong / emphasis",`<strong>Important</strong> <em>Note</em>`,"গুরুত্বপূর্ণ লেখা ও emphasis দিতে.",`<strong>Important</strong>`]
 ]],
 ["Links & media",[
  ["Link",`<a href="#">Open link</a>`,"Clickable link বানাতে href ব্যবহার করুন.",`<a href="#">Open</a>`],
  ["Image",`<img src="https://picsum.photos/180/80" alt="demo">`,"ছবি দেখাতে src এবং alt ব্যবহার করুন.",`<img src="https://picsum.photos/180/80" alt="Demo">`],
  ["Video",`<video controls src="video.mp4"></video>`,"ভিডিও embed করতে.",`<video controls></video>`]
 ]],
 ["Structure & forms",[
  ["Div",`<div>Box</div>`,"সাধারণ container হিসেবে.",`<div style="padding:10px;background:#def">Box</div>`],
  ["Form",`<form><input><button>Send</button></form>`,"User input সংগ্রহ ও submit করতে.",`<input placeholder="Name"><button>Send</button>`],
  ["List",`<ul><li>HTML</li><li>CSS</li></ul>`,"তালিকা তৈরি করতে.",`<ul><li>HTML</li><li>CSS</li></ul>`],
  ["Table",`<table><tr><td>A</td></tr></table>`,"Tabular data দেখাতে.",`<table border="1"><tr><td>A</td></tr></table>`]
 ]]
],
CSS:[
 ["Text & box",[
  ["Color",`color:#00eaff;background:#07101d;`,"Text ও background-এর রং বদলাতে.",`<b style="color:#00aaff">Color</b>`],
  ["Font",`font-size:20px;font-weight:800;`,"লেখার size ও weight ঠিক করতে.",`<b style="font-size:20px">Big</b>`],
  ["Margin / padding",`margin:10px;padding:15px;`,"বাইরে ও ভেতরে spacing দিতে.",`<div style="padding:15px;background:#ddd">Box</div>`],
  ["Border",`border:2px solid #00eaff;border-radius:12px;`,"Border ও rounded corner দিতে.",`<div style="border:2px solid #08a;padding:8px">Box</div>`]
 ]],
 ["Layout & effects",[
  ["Flex",`display:flex;gap:10px;`,"Row/column alignment করতে.",`<div style="display:flex;gap:8px"><b>A</b><b>B</b></div>`],
  ["Grid",`display:grid;grid-template-columns:1fr 1fr;`,"Grid layout তৈরি করতে.",`<div style="display:grid;grid-template-columns:1fr 1fr"><b>A</b><b>B</b></div>`],
  ["Shadow",`box-shadow:0 10px 30px #0006;`,"Card ও element-এ depth দিতে.",`<div style="padding:10px;box-shadow:0 8px 20px #999">Shadow</div>`],
  ["Animation",`animation:pulse 2s infinite;`,"Motion/animation দিতে.",`<div>Animated element</div>`]
 ]]
],
Python:[
 ["Basics",[
  ["Print",`print("Hello")`,"Output দেখাতে.",`<pre>Hello</pre>`],
  ["Variable",`name="Sanjid"`,"Value সংরক্ষণ করতে.",`<pre>name = Sanjid</pre>`],
  ["Input",`name=input("Name: ")`,"User-এর কাছ থেকে input নিতে.",`<pre>Name: Sanjid</pre>`]
 ]],
 ["Logic & collections",[
  ["If / else",`if age >= 18:
    print("Adult")
else:
    print("Under 18")`,"Condition অনুযায়ী সিদ্ধান্ত নিতে.",`<pre>Condition → branch</pre>`],
  ["For",`for i in range(5):
    print(i)`,"বারবার নির্দিষ্ট কাজ করতে.",`<pre>0 1 2 3 4</pre>`],
  ["List",`items=["HTML","CSS","Python"]`,"Ordered collection রাখতে.",`<pre>[HTML, CSS, Python]</pre>`],
  ["Function",`def greet(name):
    return "Hi "+name`,"Reusable logic বানাতে.",`<pre>greet("Sanjid")</pre>`]
 ]]
],
Java:[
 ["Basics",[
  ["Print",`System.out.println("Hello");`,"একটি line output দেখাতে.",`<pre>Hello</pre>`],
  ["Variable",`int age=17;
String name="Sanjid";`,"Typed value সংরক্ষণ করতে.",`<pre>age = 17</pre>`],
  ["Class",`class Main {
  public static void main(String[] args) {}
}`,"Java program-এর basic structure.",`<pre>Java class</pre>`]
 ]],
 ["Logic & OOP",[
  ["If / else",`if(age>=18){
  System.out.println("Adult");
}else{
  System.out.println("Under 18");
}`,"Condition অনুযায়ী code চালাতে.",`<pre>Condition → branch</pre>`],
  ["For",`for(int i=0;i<5;i++){
  System.out.println(i);
}`,"Counted repetition করতে.",`<pre>0 1 2 3 4</pre>`],
  ["Method",`static int add(int a,int b){
  return a+b;
}`,"Reusable behavior তৈরি করতে.",`<pre>add(2,3) → 5</pre>`],
  ["Object",`Car car=new Car();`,"Class থেকে object তৈরি করতে.",`<pre>Object created</pre>`]
 ]]
]
};
let lang="HTML";const tabs=$("#tabs"),lib=$("#library");function esc(x){return x.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function render(){tabs.innerHTML=Object.keys(D).map(x=>`<button class="${x==lang?"active":""}" data-l="${x}">${x}</button>`).join("");tabs.querySelectorAll("button").forEach(x=>x.onclick=()=>{lang=x.dataset.l;render()});lib.innerHTML=D[lang].map(g=>`<div class="group"><h3>${g[0]}</h3>${g[1].map(x=>`<article class="item"><b>${x[0]}</b><p>${x[2]}</p><pre>${esc(x[1])}</pre><div class="demo">${x[3]}</div><p>বাংলা গাইড: এই code-টি প্রয়োজন অনুযায়ী ব্যবহার করুন; attribute/property বদলে নিজের project-এর data দিন।</p></article>`).join("")}</div>`).join("")}render();

const count=Object.values(D).flat(1).length;$("#pct").textContent="0%";$("#bars").innerHTML=Object.keys(D).map(x=>`<div class="bar"><b>${x}</b><span>Ready to learn</span></div>`).join("");
$("#photoIn").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader;r.onload=()=>$("#photo").src=r.result;r.readAsDataURL(f)};$("#save").onclick=()=>{$("#gname").textContent=$("#gnameIn").value||"SANJID";localStorage.guide=$("#gname").textContent};if(localStorage.guide)$("#gname").textContent=localStorage.guide;