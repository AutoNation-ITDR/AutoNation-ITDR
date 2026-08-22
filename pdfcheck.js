const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  page.on('console', msg => console.log('BROWSER LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('dialog', async dialog => { console.log('DIALOG:', dialog.type(), dialog.message()); await dialog.accept(); });

  await page.goto('http://localhost:8000/', { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => {
    document.getElementById('sales-auth').classList.add('hidden');
    document.getElementById('sales-panel').classList.remove('hidden');
    const car = document.getElementById('s-car');
    car.innerHTML = '<option value="Ferrari 488">Ferrari 488</option>';
    car.value = 'Ferrari 488';
    document.getElementById('s-client').value = 'Mario Rossi';
    document.getElementById('s-agent').value = 'Marco';
    document.getElementById('s-signature').value = 'Mario Rossi';
    document.getElementById('s-price').value = '120000';
    document.getElementById('s-method').value = 'Contanti';
    document.getElementById('s-notes').value = 'Test';
  });

  const before = await page.evaluate(() => ({
    hasJSPDF: !!window.jspdf,
    hasJsPdfCtor: !!(window.jspdf && window.jspdf.jsPDF),
    hasFinalizeSale: typeof window.finalizeSale === 'function',
    sPrice: document.getElementById('s-price').value,
    sCar: document.getElementById('s-car').value,
    salesPanelVisible: !document.getElementById('sales-panel').classList.contains('hidden')
  }));
  console.log('BEFORE', before);

  await page.evaluate(async () => {
    try {
      await window.finalizeSale();
      window.__pdfResult = 'OK';
    } catch (e) {
      window.__pdfResult = 'ERR:' + e.message;
    }
  });

  await page.waitForTimeout(5000);
  const result = await page.evaluate(() => ({
    pdfResult: window.__pdfResult || 'noresult'
  }));
  console.log('RESULT', result);
  await browser.close();
})();
