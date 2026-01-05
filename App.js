const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let texts = [];
let selected = null;

document.getElementById("addText").onclick = () => {
  const text = prompt("Enter text");
  if(!text) return;
  texts.push({text, x:60, y:100, size:24});
  draw();
};

document.getElementById("download").onclick = () => {
  const link = document.createElement("a");
  link.download = "design.png";
  link.href = canvas.toDataURL();
  link.click();
};

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  texts.forEach(t=>{
    ctx.font = `${t.size}px Arial`;
    ctx.fillStyle = "#000";
    ctx.fillText(t.text, t.x, t.y);
  });
}

canvas.addEventListener("mousedown", e=>{
  const r = canvas.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;

  for(let t of texts){
    ctx.font = `${t.size}px Arial`;
    let w = ctx.measureText(t.text).width;
    if(x>t.x && x<t.x+w && y<t.y && y>t.y-t.size){
      selected = t;
    }
  }
});

canvas.addEventListener("mousemove", e=>{
  if(!selected) return;
  const r = canvas.getBoundingClientRect();
  selected.x = e.clientX - r.left;
  selected.y = e.clientY - r.top;
  draw();
});

canvas.addEventListener("mouseup", ()=> selected=null);
