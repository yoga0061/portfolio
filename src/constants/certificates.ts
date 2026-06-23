import ibmCybersecurity from '../assets/certificates/ibm-cybersecurity.pdf';
import tataCybersecurity from '../assets/certificates/tata-cybersecurity.pdf';
import oracleFoundation from '../assets/certificates/oracle-foundation.pdf';
import keralaBlockchainAcademy from '../assets/certificates/kerala-blockchain-academy.pdf';
import edunetInternship from '../assets/certificates/Edunet internship certificate.pdf';
import ibmAi from '../assets/certificates/ibm-ai.pdf';
import infosysCybersecurity from '../assets/certificates/infosys-cybersecurity.pdf';
import infosysCloud from '../assets/certificates/infosys-cloud.pdf';
import scalerPython from '../assets/certificates/scaler-python.png';
import mastercardCertificate from '../assets/certificates/mastercardcertificate.pdf';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate?: string;
  skills: string[];
  category: string;
  certificateFile: string;
  thumbnail?: string;
  downloadName: string;
}

export const CERTIFICATIONS_LIST: Certification[] = [
  {
    id: 'ibm-cybersecurity',
    title: 'IBM Cybersecurity Analyst Professional',
    issuer: 'IBM',
    issueDate: 'October 2025',
    skills: ['Network Security', 'Threat Intelligence', 'Penetration Testing', 'Incident Response'],
    category: 'Cybersecurity',
    certificateFile: ibmCybersecurity,
    downloadName: 'IBM_Cybersecurity_Certificate.pdf',
  },
  {
    id: 'tata-cybersecurity',
    title: 'Tata Cybersecurity Analyst Internship',
    issuer: 'Tata',
    issueDate: 'September 2025',
    skills: ['Vulnerability Mitigation', 'Log analysis', 'Corporate Security Auditing'],
    category: 'Cybersecurity',
    certificateFile: tataCybersecurity,
    downloadName: 'Tata_Cybersecurity_Analyst_Certificate.pdf',
  },
  {
    id: 'oracle-foundation',
    title: 'Oracle Certified Foundations Associate',
    issuer: 'Oracle',
    skills: ['Java Standard Edition', 'Object-Oriented Programming', 'Software Engineering'],
    category: 'Software Engineering',
    certificateFile: oracleFoundation,
    downloadName: 'Oracle_Foundation_Associate_Certificate.pdf',
  },
  {
    id: 'kerala-blockchain-academy',
    title: 'Certified Blockchain Foundation',
    issuer: 'KBA',
    issueDate: 'December 2025',
    skills: ['Blockchain Architecture', 'Smart Contracts', 'Distributed Ledger'],
    category: 'Blockchain',
    certificateFile: keralaBlockchainAcademy,
    downloadName: 'KBA_Blockchain_Certificate.pdf',
  },
  {
    id: 'edunet-internship',
    title: 'Edunet Internship Certificate',
    issuer: 'Edunet',
    issueDate: 'January 2026',
    skills: ['Technical Skills', 'Software Development', 'Professional Experience'],
    category: 'Internship',
    certificateFile: edunetInternship,
    downloadName: 'Edunet_Internship_Certificate.pdf',
  },
  {
    id: 'ibm-ai',
    title: 'IBM Artificial Intelligence Developer',
    issuer: 'IBM',
    issueDate: 'November 2025',
    skills: ['Machine Learning', 'Generative AI', 'Deep Learning', 'Python AI APIs'],
    category: 'AI & Data Science',
    certificateFile: ibmAi,
    downloadName: 'IBM_Artificial_Intelligence_Certificate.pdf',
  },
  {
    id: 'infosys-cybersecurity',
    title: 'Infosys Cyber Security Specialist',
    issuer: 'Infosys',
    issueDate: 'January 2026',
    skills: ['IT Security Core', 'Cryptography Protocols', 'Network Defense'],
    category: 'Cybersecurity',
    certificateFile: infosysCybersecurity,
    downloadName: 'Infosys_Cybersecurity_Certificate.pdf',
  },
  {
    id: 'infosys-cloud',
    title: 'Infosys Cloud Technologies Associate',
    issuer: 'Infosys',
    issueDate: 'March 2026',
    skills: ['Cloud Infrastructure Basics', 'Identity Access Management', 'Secure Storage'],
    category: 'Cloud',
    certificateFile: infosysCloud,
    downloadName: 'Infosys_Cloud_Technologies_Certificate.pdf',
  },
  {
    id: 'scaler-python',
    title: 'Scaler Python Programming Certificate',
    issuer: 'Scaler',
    issueDate: 'August 2025',
    skills: ['Python Core scripting', 'Data structures implementation', 'Algorithm scripting'],
    category: 'Programming',
    certificateFile: scalerPython,
    downloadName: 'Scaler_Python_Certificate.png',
  },
  {
    id: 'mastercard-cybersecurity',
    title: 'Mastercard Cybersecurity Virtual Experience',
    issuer: 'Mastercard',
    issueDate: 'November 2025',
    skills: ['Phishing Identification', 'Vulnerability Assessment', 'Security Awareness'],
    category: 'Cybersecurity',
    certificateFile: mastercardCertificate,
    downloadName: 'Mastercard_Cybersecurity_Certificate.pdf',
  },
];
