// Sostituisci la vecchia funzione generaPDF con questa nel tuo codice
function generaPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const dataOggi = new Date().toLocaleDateString('it-IT');

    // --- STILE E BORDI ---
    pdf.setLineWidth(0.5);
    pdf.line(10, 35, 200, 35); // Linea superiore
    pdf.line(10, 37, 200, 37); // Doppia linea stile decreto

    // --- INTESTAZIONE ---
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("STATO DI TEXAS - CONTEA DI TRAVIS", 105, 20, { align: "center" });
    
    pdf.setFontSize(18);
    pdf.text("Contratto di Compravendita", 105, 28, { align: "center" });
    
    pdf.setFontSize(10);
    pdf.text("Dipartimento Vendite AutoNation Austin", 105, 33, { align: "center" });

    // --- DATA E PROTOCOLLO ---
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text("DATA: " + dataOggi, 190, 45, { align: "right" });
    pdf.text("DOCUMENTO N. [" + Math.floor(1000 + Math.random() * 9000) + "/2026]", 10, 45);

    // --- CORPO DEL DOCUMENTO ---
    const cliente = document.getElementById("fNome").value || "N/D";
    const auto = document.getElementById("fAuto").value || "N/D";
    const prezzo = document.getElementById("fPrezzo").value || "N/D";
    const firma = document.getElementById("fFirma").value || "____________________";

    pdf.setFont("helvetica", "bold");
    pdf.text("SPETT.LE CLIENTE: " + cliente, 10, 60);

    // Sezione Premesso
    pdf.setFontSize(11);
    pdf.text("PREMESSO CHE", 10, 75);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("In data odierna, il suddetto cliente ha espresso la volontà di procedere all'acquisto", 10, 82);
    pdf.text("del veicolo identificato nei nostri sistemi Cloud AutoNation.", 10, 87);

    // Sezione Oggetto
    pdf.setFont("helvetica", "bold");
    pdf.text("OGGETTO DEL PROVVEDIMENTO", 10, 100);
    pdf.setFont("helvetica", "normal");
    pdf.text("* Modello Veicolo: " + auto, 15, 108);
    pdf.text("* Importo Pattuito: " + prezzo, 15, 114);
    pdf.text("* Stato Veicolo: Certificato Austin Elite", 15, 120);

    // Sezione Considerato
    pdf.setFont("helvetica", "bold");
    pdf.text("CONSIDERATO CHE", 10, 135);
    pdf.setFont("helvetica", "normal");
    const motivazione = "Il veicolo è stato ispezionato e risulta conforme agli standard di sicurezza dello Stato del Texas. Il passaggio di proprietà viene registrato con effetto immediato nei database di Austin.";
    const splitMotivazione = pdf.splitTextToSize(motivazione, 180);
    pdf.text(splitMotivazione, 10, 142);

    // --- FIRME ---
    pdf.setFont("helvetica", "bold");
    pdf.text("FIRMA RESPONSABILE VENDITE", 10, 180);
    pdf.setFont("helvetica", "normal");
    pdf.text(firma, 10, 190);

    pdf.setFont("helvetica", "bold");
    pdf.text("FIRMA DEL CLIENTE", 130, 180);
    pdf.text("________________________", 130, 190);

    // --- FOOTER ---
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text("Documento generato dal sistema digitale AutoNation Austin - Powered by Pavel", 105, 285, { align: "center" });

    // --- SALVATAGGIO ---
    pdf.save("Contratto_AutoNation_" + cliente + ".pdf");
}
