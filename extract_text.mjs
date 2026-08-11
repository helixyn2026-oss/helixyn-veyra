import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

async function extract() {
    let dataBuffer = fs.readFileSync('Helixyn_Official_Offer_Letter_Template.pdf');
    const data = await pdf(dataBuffer);
    console.log(data.text);
}

extract().catch(console.error);
