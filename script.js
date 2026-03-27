async function generaFatturaPDF(){
    let nome=document.getElementById("fatturaNome").value.trim();
    let cognome=document.getElementById("fatturaCognome").value.trim();
    let targa=document.getElementById("fatturaTarga").value.trim();
    let auto=document.getElementById("fatturaAuto").value.trim();
    let prezzo=document.getElementById("fatturaPrezzo").value.trim();
    let firma=document.getElementById("firmaDigitale").value.trim();

    if(!nome||!cognome||!targa||!auto||!prezzo||!firma){
        alert("COMPILA TUTTI I CAMPI");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    /* LOGO SICURO */
    const logoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Car_icon_2.svg/512px-Car_icon_2.svg.png";

    const logo = await fetch(logoURL)
        .then(r => r.blob())
        .then(b => new Promise((resolve)=>{
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(b);
        }));

    /* INTESTAZIONE */
    pdf.addImage(logo, "PNG", 150, 10, 40, 40);

    pdf.setFont("courier","bold");
    pdf.setFontSize(22);
    pdf.text("FATTURA DI VENDITA", 10, 25);

    pdf.setFontSize(12);
    pdf.setFont("courier","normal");

    let y=50;
    pdf.text(`CLIENTE: ${nome} ${cognome}`,10,y); y+=8;
    pdf.text(`TARGA: ${targa}`,10,y); y+=8;
    pdf.text(`MODELLO: ${auto}`,10,y); y+=8;
    pdf.text(`PREZZO: ${prezzo}`,10,y); y+=12;

    pdf.text("FIRMA DIPENDENTE:",10,y);
    pdf.text(firma, 60, y);

    y+=20;

    /* DISCLAIMER LEGALE */
    pdf.setFontSize(10);
    pdf.text("DISCLAIMER:",10,y); y+=6;
    pdf.text("QUESTA FATTURA È GENERATA DIGITALMENTE DA AUTONATION.",10,y); y+=6;
    pdf.text("LA FIRMA DEL DIPENDENTE È UNA SOTTOSCRIZIONE DIGITALE VALIDA.",10,y); y+=6;
    pdf.text("IL DOCUMENTO È VALIDO AI FINI DI LEGGE SE ACCOMPAGNATO DA DOCUMENTO D'IDENTITÀ.",10,y);

    pdf.save(`FATTURA_${nome}_${cognome}.PDF`);

    alert("FATTURA PDF GENERATA");
}

