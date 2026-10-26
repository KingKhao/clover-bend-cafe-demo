async page => {
  const results=[];
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://127.0.0.1:43829/');
  await page.waitForTimeout(1100);
  const separated=await page.evaluate(()=>{
    const credit=document.querySelector('.hero-caption').getBoundingClientRect();
    const title=document.querySelector('h1').getBoundingClientRect();
    return credit.bottom<title.top || credit.top>title.bottom;
  });
  if(!separated)throw new Error('Mobile photo credit overlaps title');
  results.push('Mobile photo credit does not overlap headline');
  await page.screenshot({path:'C:/Users/WKBon/Documents/Codex/outputs/clover-mobile-final.png'});
  await page.locator('#tab-breakfast').scrollIntoViewIfNeeded();
  await page.locator('[data-add=pancakes]').click();
  const ticket=await page.locator('.sample-ticket-lines').textContent();
  if(!ticket.includes('1 × Buttermilk pancakes'))throw new Error('Live ticket did not update');
  results.push('Printed ticket updates when adding dishes');
  await page.locator('.mobile-dock .order-trigger').click();
  await page.waitForTimeout(500);
  await page.screenshot({path:'C:/Users/WKBon/Documents/Codex/outputs/clover-order-mobile.png'});
  await page.keyboard.press('Escape');
  await page.goto('file:///C:/Users/WKBon/Documents/Codex/clover-bend-cafe-demo/index.html');
  await page.getByRole('tab',{name:'Drinks',exact:true}).click();
  if(await page.locator('#category-title').textContent()!=='Drinks')throw new Error('File preview failed');
  results.push('Runs from a directly opened HTML file');
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw new Error('Page overflow at '+width);
    results.push('No horizontal overflow at '+width+'px');
  }
  await page.goto('http://127.0.0.1:43829/');
  await page.waitForTimeout(1100);
  await page.screenshot({path:'C:/Users/WKBon/Documents/Codex/outputs/clover-desktop-final.png'});
  return {passed:results.length,results};
}
