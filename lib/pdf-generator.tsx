import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1e293b'
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 10
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  headerAddress: {
    fontSize: 9,
    color: '#64748b',
    marginTop: 2
  },
  docTitleBlock: {
    marginBottom: 20,
    alignItems: 'center'
  },
  docTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  docSubTitle: {
    fontSize: 10,
    color: '#475569',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#f97316',
    borderBottomWidth: 1,
    borderBottomColor: '#f97316',
    paddingBottom: 4,
    marginBottom: 10,
    marginTop: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  candidateBlock: {
    marginBottom: 15
  },
  textRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  label: {
    width: 140,
    fontWeight: 'bold',
    color: '#475569'
  },
  value: {
    flex: 1,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify'
  },
  bold: {
    fontWeight: 'bold'
  },
  termsList: {
    marginBottom: 10
  },
  termItem: {
    marginBottom: 8,
    textAlign: 'justify'
  },
  signatureBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  signatureCol: {
    width: '45%'
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#94a3b8',
    paddingTop: 5,
    marginTop: 40
  },
  docControl: {
    marginTop: 40,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 10,
    fontSize: 8,
    color: '#64748b'
  }
});

interface OfferLetterData {
  userName: string;
  jobTitle: string;
  salaryBand: string;
  joiningDate: string;
  draftId?: string;
}

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.logo}>HELIXYN</Text>
    <Text style={styles.headerAddress}>Helixyn Inc.</Text>
    <Text style={styles.headerAddress}>123 Innovation Drive, Tech Park</Text>
    <Text style={styles.headerAddress}>Bengaluru, Karnataka, 560001, India</Text>
  </View>
);

const Footer = ({ pageNumber }: { pageNumber: number }) => (
  <View style={styles.footer} fixed>
    <Text>helixyn-website.vercel.app/ | helixyn2026@gmail.com</Text>
    <Text>Confidential • Official Company Document • Page {pageNumber}</Text>
  </View>
);

const OfferLetterPDF = ({ userName, jobTitle, salaryBand, joiningDate, draftId = "HEL-XXXX" }: OfferLetterData) => {
  const currentDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  const regNo = draftId.substring(0, 8).toUpperCase();
  
  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <Header />
        
        <View style={styles.docTitleBlock}>
          <Text style={styles.docTitle}>OFFER LETTER</Text>
          <Text style={styles.docSubTitle}>EMPLOYMENT / INTERNSHIP APPOINTMENT</Text>
        </View>

        <Text style={styles.sectionTitle}>CANDIDATE DETAILS</Text>
        <View style={styles.candidateBlock}>
          <Text>To</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop: 4 }}>{userName || "[Candidate Name]"}</Text>
          <Text style={{ color: '#475569', marginTop: 2 }}>[Candidate Address]</Text>
          <Text style={{ color: '#475569' }}>[City, State - PIN]</Text>
          
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>Candidate / Register No.: <Text style={styles.bold}>{regNo}</Text></Text>
            <Text>Date: <Text style={styles.bold}>{currentDate}</Text></Text>
          </View>
        </View>

        <Text style={styles.paragraph}>Dear <Text style={styles.bold}>{userName || "[Candidate Name]"}</Text>,</Text>
        <Text style={styles.paragraph}>We are pleased to offer you the position of <Text style={styles.bold}>{jobTitle || "[Job Title]"}</Text> at Helixyn. We believe your skills, potential, and enthusiasm will be a valuable addition to our team.</Text>
        <Text style={styles.paragraph}>Your engagement will commence on <Text style={styles.bold}>{joiningDate || "[Joining Date]"}</Text> and will continue until further notice, subject to the terms and conditions applicable to your role.</Text>
        <Text style={styles.paragraph}>During your tenure, you will work with the Engineering/Operations team and report to the designated Manager. Your responsibilities will include the duties assigned to your role, together with any reasonable responsibilities related to the work of the organization.</Text>

        <Text style={styles.sectionTitle}>OFFER SUMMARY</Text>
        <View style={styles.termsList}>
          <View style={styles.textRow}><Text style={styles.label}>Position</Text><Text style={styles.value}>{jobTitle || "[Job Title]"}</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Department / Team</Text><Text style={styles.value}>Engineering</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Start Date</Text><Text style={styles.value}>{joiningDate || "[Joining Date]"}</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>End Date / Duration</Text><Text style={styles.value}>Full-Time / Indefinite</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Work Arrangement</Text><Text style={styles.value}>Hybrid</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Location</Text><Text style={styles.value}>Bengaluru Office</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Compensation / Stipend</Text><Text style={styles.value}>{salaryBand || "[Salary Band]"}</Text></View>
          <View style={styles.textRow}><Text style={styles.label}>Reporting To</Text><Text style={styles.value}>Engineering Manager</Text></View>
        </View>

        <Text style={[styles.paragraph, { marginTop: 10 }]}>We look forward to having you at Helixyn and wish you a successful and rewarding professional journey with us.</Text>
        
        <Footer pageNumber={1} />
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        <Header />

        <Text style={styles.sectionTitle}>TERMS &amp; CONDITIONS</Text>
        <View style={styles.termsList}>
          <Text style={styles.termItem}><Text style={styles.bold}>1. Role &amp; Responsibilities:</Text> You are expected to perform the responsibilities associated with your position diligently and professionally and to follow reasonable instructions issued by your reporting manager or authorized representatives of Helixyn.</Text>
          <Text style={styles.termItem}><Text style={styles.bold}>2. Confidentiality:</Text> During your association with Helixyn, you may have access to confidential information, including business information, customer information, product plans, source code, credentials, documents, and other non-public materials. Such information must be kept confidential and used only for authorized work.</Text>
          <Text style={styles.termItem}><Text style={styles.bold}>3. Intellectual Property:</Text> Any work product, code, documentation, designs, inventions, or other materials created by you in the course of your engagement will be subject to the applicable agreements and policies of Helixyn.</Text>
          <Text style={styles.termItem}><Text style={styles.bold}>4. Company Policies:</Text> You agree to comply with applicable company policies, information-security requirements, acceptable-use rules, and professional standards communicated to you from time to time.</Text>
          <Text style={styles.termItem}><Text style={styles.bold}>5. Performance &amp; Continuation:</Text> Continuation of the engagement, confirmation, extension, or conversion to another role, where applicable, will depend on performance, business requirements, and the terms communicated by Helixyn.</Text>
          <Text style={styles.termItem}><Text style={styles.bold}>6. Separation / Termination:</Text> Either party may end the engagement in accordance with the applicable terms, notice requirements, and company policies communicated for the role.</Text>
        </View>

        <Text style={styles.sectionTitle}>ACCEPTANCE</Text>
        <Text style={styles.paragraph}>Please sign and return a copy of this letter as confirmation that you have read, understood, and accepted the terms stated above and any role-specific documents provided to you.</Text>

        <View style={styles.signatureBlock}>
          <View style={styles.signatureCol}>
            <Text style={[styles.bold, { marginBottom: 30 }]}>Candidate Acceptance</Text>
            <Text style={styles.signatureLine}>{userName || "[Candidate Name]"}</Text>
            <Text style={{ fontSize: 9, color: '#64748b', marginTop: 4 }}>Candidate Signature</Text>
            <Text style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Date: ___________</Text>
          </View>
          <View style={styles.signatureCol}>
            <Text style={[styles.bold, { marginBottom: 30 }]}>For Helixyn</Text>
            <Text style={styles.signatureLine}>Authorized Signatory</Text>
            <Text style={{ fontSize: 9, color: '#64748b', marginTop: 4 }}>Human Resources</Text>
            <Text style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>Date: {currentDate}</Text>
          </View>
        </View>

        <View style={styles.docControl}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>DOCUMENT CONTROL</Text>
          <Text>Document Type: Official Offer Letter  •  Version: 1.0  •  Template ID: HEL-OFFER-001</Text>
        </View>

        <Footer pageNumber={2} />
      </Page>
    </Document>
  );
};

export async function generateOfferLetterPDF(userName: string, jobTitle: string, salaryBand: string, joiningDate: string, draftId?: string): Promise<any> {
  const doc = <OfferLetterPDF userName={userName} jobTitle={jobTitle} salaryBand={salaryBand} joiningDate={joiningDate} draftId={draftId} />;
  const stream = await pdf(doc).toBuffer();
  return stream;
}
