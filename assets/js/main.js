(function(){var b=document.querySelector('.menu-btn'),m=document.getElementById('menu');
if(b)b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
var f=document.getElementById('filter');if(f)f.addEventListener('input',function(){var q=f.value.toLowerCase();document.querySelectorAll('.card').forEach(function(c){c.hidden=c.textContent.toLowerCase().indexOf(q)<0})});
if(window.PRODUCTS){var k=new URLSearchParams(location.search).get('item'),p=PRODUCTS[k];if(p){document.getElementById('pname').textContent=p[0];document.getElementById('pdesc').textContent=p[1];document.getElementById('pprice').textContent='$'+p[2].toFixed(2);var i=document.getElementById('pimg');i.src='assets/images/'+k+'.svg';document.title=p[0]+' | Dope Services'}
document.getElementById('buy').addEventListener('click',function(){document.getElementById('msg').textContent='Demo store: checkout is not enabled.'})}
var c=document.getElementById('cform');if(c)c.addEventListener('submit',function(e){e.preventDefault();document.getElementById('cmsg').textContent=c.checkValidity()?'Thanks! (Demo form, nothing was sent.)':'Please fill in all fields with a valid email.'});
})();
