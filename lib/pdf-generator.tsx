import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 12,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f97316'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#0f172a'
  },
  content: {
    marginBottom: 20
  },
  footer: {
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    paddingTop: 10,
    fontSize: 10,
    color: '#64748b'
  }
});

interface OfferLetterData {
  userName: string;
  jobTitle: string;
  salaryBand: string;
  joiningDate: string;
}

const OfferLetterPDF = ({ userName, jobTitle, salaryBand, joiningDate }: OfferLetterData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logo}>Helixyn</Text>
        <Text>Employee Lifecycle Management Platform</Text>
      </View>
      
      <Text style={styles.title}>OFFER OF EMPLOYMENT</Text>
      
      <View style={styles.content}>
        <Text>Dear {userName},</Text>
        <Text style={{ marginTop: 10 }}></Text>
        <Text>We are delighted to offer you employment at Helixyn in the position of {jobTitle}. Your anticipated start date is {joiningDate}, and your starting compensation is set at the {salaryBand} band.</Text>
        <Text style={{ marginTop: 10 }}></Text>
        <Text>Your onboarding checklist is ready inside the ELMS system, and access to all corporate tools (GitHub, Slack, Jira) will be automatically provisioned upon your review and signature.</Text>
        <Text style={{ marginTop: 20 }}></Text>
        <Text>Sincerely,</Text>
        <Text style={{ fontWeight: 'bold' }}>Helixyn Executive Management Team</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>© 2026 Helixyn Inc. Confidential Document.</Text>
      </View>
    </Page>
  </Document>
);

export async function generateOfferLetterPDF(userName: string, jobTitle: string, salaryBand: string, joiningDate: string): Promise<any> {
  const doc = <OfferLetterPDF userName={userName} jobTitle={jobTitle} salaryBand={salaryBand} joiningDate={joiningDate} />;
  const stream = await pdf(doc).toBuffer();
  return stream;
}
