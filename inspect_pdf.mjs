import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function run() {
  const existingPdfBytes = fs.readFileSync('Helixyn_Official_Offer_Letter_Template.pdf');
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();
  
  if (fields.length === 0) {
    console.log('No form fields found. This might be a flat PDF.');
  } else {
    fields.forEach(field => {
      console.log('Field Name:', field.getName());
    });
  }
}

run().catch(console.error);
