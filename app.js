(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const menu = window.CAFE_MENU;
  const cart = new Map();
  const money = n => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(n/100);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const categories = ['Breakfast','Lunch','Dinner','Desserts','Drinks'];
  const photos = {
    Breakfast:['pancakes','Pancakes, butter and blueberries','A slow morning starts here.'],
    Lunch:['diner','Red booths in an illustrative diner','Save a seat. Stay a while.'],
    Dinner:['diner','An illustrative diner with red booths','A little supper. A little catching up.'],
    Desserts:['pie','Apple pie beside green apples','Always leave a little room.'],
    Drinks:['coffee','Cups of coffee on a café table','One more cup? Of course.']
  };
  const photoCredits = {pancakes:'Tuqa Nabi',diner:'Nellie Adamyan',pie:'Annie Spratt',coffee:'Nathan Dumlao'};
  let category = 'Breakfast', giftAmount = 50, reviewIndex = 0, toastTimer;
  const count = () => [...cart.values()].reduce((a,b) => a+b,0);
  const total = () => [...cart].reduce((sum,[id,q]) => sum + menu.find(i=>i.id===id).price*q,0);
  function announce(message) {
    clearTimeout(toastTimer); const toast = $('#toast'); toast.textContent = message; toast.hidden = false;
    toastTimer = setTimeout(()=>{toast.hidden = true;},3500);
  }
  function updateCount(){
    $$('.cart-count').forEach(el => el.textContent = count());
    const lines=$('.sample-ticket-lines');
    if(count()){
      lines.innerHTML=[...cart].map(([id,q])=>{const item=menu.find(i=>i.id===id);return `<span class="ticket-entry">${q} × ${item.name} <b>${money(item.price*q)}</b></span>`;}).join('');
      $('.ticket-total').innerHTML=`Your sample subtotal <strong>${money(total())}</strong>`;
    } else {
      lines.innerHTML='<span>Buttermilk pancakes <b>$10.50</b></span><span>Bottomless coffee <b>$3.00</b></span>';
      $('.ticket-total').innerHTML='A good morning <strong>$13.50</strong>';
    }
  }
  function add(id) {
    const item=menu.find(i=>i.id===id); if(!item || item.soldOut) return;
    if((cart.get(id)||0)>=10 || count()>=30){announce('For larger gatherings, try the catering preview.');return;}
    cart.set(id,(cart.get(id)||0)+1);updateCount(); announce(`${item.name} added to your demo ticket.`);
  }
  $('.menu-tabs').innerHTML = categories.map((name,i)=>`<button type="button" role="tab" id="tab-${name.toLowerCase()}" aria-controls="menu-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-category="${name}">${name}</button>`).join('');
  function renderMenu(name) {
    category=name;
    $$('[data-category]').forEach(tab=> {const active=tab.dataset.category===name;tab.setAttribute('aria-selected',active);tab.tabIndex=active?0:-1;});
    $('#category-title').textContent=name;
    $('#menu-panel').setAttribute('aria-labelledby',`tab-${name.toLowerCase()}`);
    $('#menu-items').innerHTML=menu.filter(i=>i.category===name).map(i=>`<article class="menu-row"><div><h4>${i.name}</h4>${i.id==='pancakes'?'<span class="favorite">House favorite</span>':''}<p>${i.description}</p></div><span class="price">${money(i.price)}</span><div class="item-notes">${i.diet.map(d=>`<span class="diet ${d==='H'?'hot':d.toLowerCase()}" aria-label="${d==='V'?'Vegetarian':d==='GF'?'No gluten ingredients':'Spicy'}">${d}</span>`).join('')}<button type="button" data-allergy="${i.id}" aria-label="Ingredients and allergy notes for ${escape(i.name)}">Allergy notes</button></div><button type="button" class="add" data-add="${i.id}" ${i.soldOut?'disabled':''} aria-label="${i.soldOut?'Sold out:':'Add'} ${escape(i.name)}">${i.soldOut?'All gone':'Add +'}</button></article>`).join('');
    const [photo,alt,note]=photos[name];$('#menu-image').src=`assets/${photo}.webp`;$('#menu-image').alt=alt;
    $('#menu-photo-caption').textContent=`Illustrative photograph · ${photoCredits[photo]} / Unsplash`;
    $('#menu-photo-note').textContent=note;
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches && !document.body.classList.contains('motion-paused')) $('#menu-panel').animate([{opacity:.3,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
  }
  renderMenu(category);
  $('.menu-tabs').addEventListener('keydown', e=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault();let index=categories.indexOf(category);
    index=e.key==='Home'?0:e.key==='End'?4:(index+(e.key==='ArrowRight'?1:-1)+5)%5;
    renderMenu(categories[index]);$(`#tab-${categories[index].toLowerCase()}`).focus();
  });
  $('#nav-toggle').addEventListener('click',()=>{const open=$('#nav-toggle').getAttribute('aria-expanded')!=='true';$('#nav-toggle').setAttribute('aria-expanded',open);$('#site-nav').classList.toggle('open',open);});
  $$('#site-nav a').forEach(a=>a.addEventListener('click',()=>{$('#site-nav').classList.remove('open');$('#nav-toggle').setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#site-nav').classList.remove('open');$('#nav-toggle').setAttribute('aria-expanded','false');}});

  // Wall-clock service hours are evaluated in the café's time zone, including DST.
  const zone='America/New_York';
  const wall = date => {
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
    const obj=Object.fromEntries(parts.map(p=>[p.type,p.value]));
    return {day:`${obj.year}-${obj.month}-${obj.day}`,minutes:Number(obj.hour)*60+Number(obj.minute),weekday:new Date(`${obj.year}-${obj.month}-${obj.day}T12:00:00Z`).getUTCDay()};
  };
  const hours = day => day===1?null:day===0?[480,840]:day===5||day===6?[420,1200]:[420,840];
  function pickupSlots(now=new Date()) {
    const slots=[];
    // Scan real instants rather than adding local calendar hours across DST.
    const start=Math.ceil((now.getTime()+30*60000)/900000)*900000;
    for(let time=start;time<start+8*86400000 && slots.length<70;time+=900000){
      const date=new Date(time),local=wall(date),service=hours(local.weekday);
      if(service && local.minutes>=service[0] && local.minutes<=service[1]-15){
        slots.push({value:date.toISOString(),label:new Intl.DateTimeFormat('en-US',{timeZone:zone,weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(date)+' ET'});
      }
    }
    return slots;
  }
  const today=wall(new Date()), service=hours(today.weekday), isOpen=service && today.minutes>=service[0] && today.minutes<service[1];
  $('#open-status').textContent=isOpen?'Our fictional café is open now · Eastern time':`Our fictional café is closed now · see hours`;
  if(isOpen) $('.status-dot').style.background='#486044';
  $('#special-date').textContent=new Intl.DateTimeFormat('en-US',{timeZone:zone,weekday:'long',month:'long',day:'numeric'}).format(new Date())+' · sample specials';
  $('#board-day').textContent='A little home cooking';
  // A small pure surface for deterministic browser checks; no network or storage.
  window.CafeDemo = Object.freeze({pickupSlots, wall, hours});

  function show(dialog){if(!dialog.open)dialog.showModal();}
  function detail(title,html){$('#detail-content').innerHTML=`<div class="dialog-kicker" data-ui>Clover Bend · interactive demo</div><h2 id="detail-title">${title}</h2>${html}`;show($('#detail-dialog'));} // taste-skill-ignore: explicit demo identification in transactional preview, not decorative marketing kicker.
  function closeDialog(dialog){dialog.querySelectorAll('form').forEach(f=>f.reset());dialog.close();}
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)closeDialog(dialog);}});
    dialog.addEventListener('close',()=>{dialog.querySelectorAll('form').forEach(f=>f.reset());});
  });
  function renderOrder(){
    const subtotal=total(),tax=Math.round(subtotal*.0975);
    $('#order-content').innerHTML=`<div class="dialog-kicker" data-ui>Your demo takeout ticket</div><h2 id="order-title">A little to go.</h2><p class="dialog-intro">Build a sample order. Nothing reaches a kitchen, and there’s no payment.</p>${count()?`<div>${[...cart].map(([id,q])=>{const i=menu.find(i=>i.id===id);return `<div class="cart-row"><div><strong>${i.name}</strong><p class="small">${money(i.price)} each · ${money(i.price*q)}</p></div><div class="quantity"><button type="button" data-quantity="${id}" data-delta="-1" aria-label="Remove one ${escape(i.name)}">−</button><span aria-label="Quantity">${q}</span><button type="button" data-quantity="${id}" data-delta="1" aria-label="Add one ${escape(i.name)}" ${q>=10||count()>=30?'disabled':''}>+</button></div></div>`;}).join('')}</div><div class="totals"><p>Food &amp; drinks <span>${money(subtotal)}</span></p><p>Illustrative tax (9.75%) <span>${money(tax)}</span></p><p>Sample total <strong>${money(subtotal+tax)}</strong></p></div><form id="order-form"><div class="form-grid"><label>Your name (fictional)<input name="name" required maxlength="60" placeholder="Alex Example" autocomplete="off"></label><label>Pickup time<select name="pickup" required>${pickupSlots().map(s=>`<option value="${s.value}">${s.label}</option>`).join('')}</select></label></div><label>Phone (fictional, optional)<input name="phone" type="tel" maxlength="30" placeholder="(865) 555-0100" autocomplete="off"></label><p class="small">Times follow the sample café’s Eastern hours and allow at least 30 minutes. Breakfast all day. No phone, payment or real customer details required.</p><button class="button" type="submit">Preview my order ↗</button></form>`:'<p class="empty-ticket">Your ticket is waiting for something good.</p><button class="button" type="button" data-back-menu>Find your favorite ↗</button>'}`; // taste-skill-ignore: explicit demo identification in transactional preview, not decorative marketing kicker.
    show($('#order-dialog'));
  }
  function done(kind,number,body){return `<div class="confirmation"><div class="dialog-kicker" data-ui>${kind} · preview complete</div><h2 id="${kind==='Takeout'?'order':'detail'}-title">That’s looking good.</h2><span class="confirmation-number">${number}</span><p>${body}</p><p class="small">Demo only. Nothing stored, sent, reserved, ordered or charged.</p><button class="button" type="button" data-close>Back to the café ↗</button></div>`;} // taste-skill-ignore: explicit demo identification in transactional preview, not decorative marketing kicker.
  function openFlow(flow){
    if(flow==='catering'){
      const minDate=wall(new Date()).day;
      detail('Gather your people.',`<p class="dialog-intro">Try an inquiry for a reunion, church lunch or private gathering. Use fictional details; nothing is sent.</p><form id="catering-form"><div class="form-grid"><label>Gathering type<select name="type"><option>Family reunion</option><option>Church lunch</option><option>Birthday</option><option>Private gathering</option><option>Something else</option></select></label><label>Preferred date<input name="date" type="date" min="${minDate}" required></label><label>Guest count<input name="guests" type="number" min="8" max="150" step="1" required placeholder="24"></label><label>Menu idea<select name="menu"><option>Breakfast spread</option><option>Comfort-food supper</option><option>Dessert table</option><option>Help me decide</option></select></label></div><label>Your name (fictional)<input name="name" required maxlength="60" autocomplete="off"></label><label>Email (fictional)<input name="email" type="email" required maxlength="150" placeholder="you@example.com" autocomplete="off"></label><label>Phone (fictional, optional)<input name="phone" type="tel" maxlength="30" autocomplete="off"></label><label>A little about your gathering<textarea name="notes" maxlength="500" placeholder="A porch lunch for the whole family…"></textarea></label><p class="small">Sample service for 8–150 guests. No availability, price or booking is promised.</p><button class="button" type="submit">Preview inquiry ↗</button></form>`);
    }else if(flow==='gift'){
      detail('A little treat, on you.',`<p class="dialog-intro">Preview a $${giftAmount} gift card. No card is created, sold or delivered.</p><form id="gift-form"><label>Your name (fictional)<input name="from" maxlength="60" required autocomplete="off"></label><label>Friend’s name (fictional)<input name="to" maxlength="60" required autocomplete="off"></label><label>Friend’s email (fictional)<input name="email" type="email" maxlength="150" required placeholder="friend@example.com" autocomplete="off"></label><label>A little note<textarea name="note" maxlength="250" placeholder="Breakfast is on me."></textarea></label><p class="small">No checkout. No payment details. No email sent.</p><button class="button" type="submit">Preview $${giftAmount} gift ↗</button></form>`);
    }else if(flow==='visit')detail('Find your seat.',`<p>Clover Bend and 18 Supper Lane are invented. This map is an illustration, not driving directions.</p><p>In the concept, guests would park beside the café, use the step-free side entrance, and pick up takeout just inside the door. A real client site would use its verified address, directions and access information.</p><p class="small">Bean Station is a real East Tennessee town. There is no Clover Bend business to visit.</p>`);
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.add){add(b.dataset.add);}
    if(b.dataset.category)renderMenu(b.dataset.category);
    if(b.classList.contains('order-trigger'))renderOrder();
    if(b.hasAttribute('data-close'))closeDialog(b.closest('dialog'));
    if(b.hasAttribute('data-back-menu')){closeDialog($('#order-dialog'));$('#menu').scrollIntoView();$('#tab-'+category.toLowerCase()).focus({preventScroll:true});}
    if(b.dataset.quantity){const id=b.dataset.quantity,q=(cart.get(id)||0)+Number(b.dataset.delta);if(q<=0)cart.delete(id);else if(q<=10&&count()<30||Number(b.dataset.delta)<0)cart.set(id,q);updateCount();renderOrder();const control=$(`[data-quantity="${id}"][data-delta="${b.dataset.delta}"]`)||$('#order-title');if(control)control.focus();}
    if(b.dataset.open)openFlow(b.dataset.open);
    if(b.dataset.gift){giftAmount=Number(b.dataset.gift);$('#gift-display').textContent='$'+giftAmount;$$('[data-gift]').forEach(el=>el.setAttribute('aria-pressed',el===b));}
    if(b.dataset.allergy){const item=menu.find(i=>i.id===b.dataset.allergy);detail(item.name,`<p>${item.description}</p><p><strong>Sample common allergens:</strong> ${item.allergens}</p><p class="small">Illustrative recipe only. GF means no gluten ingredients, not an allergen-free kitchen. A real café must confirm all ingredients and preparation, including substitutions and cross-contact, before accepting an allergy-sensitive order.</p>`);}
  });
  document.addEventListener('submit',e=>{
    if(!['order-form','catering-form','gift-form','regulars-form'].includes(e.target.id))return;
    e.preventDefault();const form=e.target;if(!form.reportValidity())return;const data=new FormData(form);
    if(form.id==='order-form'){
      const pickup=new Date(data.get('pickup'));const w=wall(pickup),h=hours(w.weekday);
      if(pickup.getTime()<Date.now()+15*60000||!h||w.minutes<h[0]||w.minutes>h[1]-15){announce('That pickup time has passed. Please choose a fresh time.');renderOrder();return;}
      const label=new Intl.DateTimeFormat('en-US',{timeZone:zone,weekday:'long',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(pickup);
      $('#order-content').innerHTML=done('Takeout','#'+(100+Math.floor(Math.random()*900)),`Your sample ticket would be ready <strong>${escape(label)} ET</strong>. This is a preview, so there is no real pickup.`);cart.clear();updateCount();
    }else if(form.id==='catering-form'){
      if(String(data.get('date'))<wall(new Date()).day){announce('Please choose today or a future date.');return;}
      $('#detail-content').innerHTML=done('Catering','Good company.',`A ${escape(data.get('type').toLowerCase())} for ${escape(data.get('guests'))} guests, with a ${escape(data.get('menu').toLowerCase())}. This previews an inquiry; no request has been sent.`);
    }else if(form.id==='gift-form')$('#detail-content').innerHTML=done('Gift card','$'+giftAmount,`A little something for <strong>${escape(data.get('to'))}</strong>. This is a sample gift card; no email or payment has been processed.`);
    else {$('#regular-result').hidden=false;$('#regular-result').textContent='You’ve previewed joining the regulars. No subscription was created and your email was not saved.';form.reset();}
  });
  $('#dietary-help').addEventListener('click',()=>detail('A little clarity.',`<p><strong>V</strong> — Vegetarian sample recipe.<br><strong>GF</strong> — Sample recipe with no gluten ingredients.<br><strong>H</strong> — A little heat.</p><p>These are fictional dishes, not verified food specifications. GF does not mean an allergen-free kitchen. Ask a real restaurant about ingredients, shared equipment, substitutions and cross-contact before ordering.</p>`));
  $('.chalk-replay').addEventListener('click',()=>{const board=$('.chalkboard');board.classList.remove('replay');requestAnimationFrame(()=>requestAnimationFrame(()=>board.classList.add('replay')));});
  const reviews=[['The kind of breakfast that turns a quick stop into a slow morning.','A'],['A warm plate, a coffee refill, and nobody rushing you out the door.','B'],['The place we’d pick when the whole family finally gets together.','C']];
  function review(delta){reviewIndex=(reviewIndex+delta+3)%3;$('#review-quote').innerHTML=`“${reviews[reviewIndex][0]}”<footer>Sample diner ${reviews[reviewIndex][1]} · fictional review</footer>`;$('#review-count').textContent=`${reviewIndex+1} of 3`;}
  $('#review-prev').addEventListener('click',()=>review(-1));$('#review-next').addEventListener('click',()=>review(1));
  $('#credits-button').addEventListener('click',()=>detail('A little credit.',`<p>All photos are illustrative Unsplash images, not photographs of an actual Clover Bend restaurant.</p><ul><li><a href="https://unsplash.com/photos/VRCHSLLOGr4" target="_blank" rel="noopener">Pancakes — Tuqa Nabi</a></li><li><a href="https://unsplash.com/photos/5XZ2SyTOyvQ" target="_blank" rel="noopener">Apple pie — Annie Spratt</a></li><li><a href="https://unsplash.com/photos/YCnhqHeY6kc" target="_blank" rel="noopener">Diner — Nellie Adamyan</a></li><li><a href="https://images.unsplash.com/photo-1509042239860-f550ce710b93" target="_blank" rel="noopener">Coffee — Nathan Dumlao</a></li></ul><p>Typefaces: Imbue and Albert Sans, via Google Fonts, under the SIL Open Font License.</p><p class="small">Café name, story, food, prices, address, gift cards and reviews are fictional. Concept by Clinch Valley Digital.</p>`));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  $('#motion-toggle').addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');$('#motion-toggle').setAttribute('aria-pressed',paused);$('#motion-toggle').textContent=paused?'Resume motion':'Pause motion';});
  if(!reduced.matches && 'IntersectionObserver' in window){
    document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');if(entry.target.classList.contains('chalkboard'))entry.target.classList.add('replay');observer.unobserve(entry.target);}});},{threshold:.08});
    $$('.section>div,.section>figure,.section>h2').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  }
})();
