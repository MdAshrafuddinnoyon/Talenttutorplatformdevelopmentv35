/**
 * PDF Generation Utility
 * Uses jsPDF library to generate professional PDF documents
 * Supports: Contracts, Receipts, Reports, Certificates
 */

import { jsPDF } from 'jspdf@2.5.2';

// Custom font support for Bengali (if needed)
export interface PDFOptions {
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'letter';
  title?: string;
  author?: string;
  subject?: string;
}

export interface ContractData {
  contractNumber: string;
  createdDate: string;
  status: 'active' | 'completed' | 'cancelled';
  teacherName: string;
  guardianName: string;
  studentName: string;
  subject: string;
  schedule: string;
  duration: string;
  startDate: string;
  endDate: string;
  rate: number;
  rateType: string;
  platformCommission: number;
  specialTerms?: string;
}

export interface ReceiptData {
  receiptNumber: string;
  date: string;
  payerName: string;
  amount: number;
  paymentMethod: string;
  purpose: string;
  transactionId?: string;
}

export interface ReportData {
  title: string;
  studentName: string;
  subject: string;
  teacher: string;
  period: string;
  attendance: string;
  performance: string;
  remarks: string;
  generatedDate: string;
}

/**
 * Generate Contract PDF
 */
export async function generateContractPDF(
  contract: ContractData,
  language: 'bn' | 'en' = 'bn'
): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Helper function to add text with auto line wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.35);
  };

  // Helper to draw line
  const drawLine = (y: number) => {
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // ===== HEADER =====
  doc.setFillColor(16, 185, 129); // Emerald
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('TALENT TUTOR', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  const title = language === 'bn' ? 'টিউশন চুক্তিনামা' : 'Tuition Agreement Contract';
  doc.text(title, pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(10);
  doc.text(`Contract #${contract.contractNumber}`, pageWidth / 2, 32, { align: 'center' });

  yPos = 50;
  doc.setTextColor(0, 0, 0);

  // ===== CONTRACT INFO =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const netAmount = contract.rate - contract.platformCommission;

  // Contract Details Box
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 30);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 7;

  doc.text(`Date: ${contract.createdDate}`, margin + 5, yPos);
  doc.text(
    `Status: ${
      contract.status === 'active' ? 'Active' :
      contract.status === 'completed' ? 'Completed' : 'Cancelled'
    }`,
    pageWidth - margin - 40,
    yPos
  );

  yPos += 7;
  doc.text(`Start: ${contract.startDate}`, margin + 5, yPos);
  doc.text(`End: ${contract.endDate}`, pageWidth - margin - 40, yPos);

  yPos += 7;
  doc.text(`Subject: ${contract.subject}`, margin + 5, yPos);
  doc.text(`Duration: ${contract.duration}`, pageWidth - margin - 40, yPos);

  yPos += 15;

  // ===== PARTIES =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('PARTIES INVOLVED', margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  // Teacher
  doc.setFont('helvetica', 'bold');
  doc.text('1. Teacher (Service Provider):', margin + 5, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  doc.text(`Name: ${contract.teacherName}`, margin + 10, yPos);
  yPos += 10;

  // Guardian
  doc.setFont('helvetica', 'bold');
  doc.text('2. Guardian (Service Recipient):', margin + 5, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  doc.text(`Name: ${contract.guardianName}`, margin + 10, yPos);
  yPos += 10;

  // Student
  doc.setFont('helvetica', 'bold');
  doc.text('3. Student:', margin + 5, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  doc.text(`Name: ${contract.studentName}`, margin + 10, yPos);
  yPos += 12;

  // ===== SCHEDULE =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('SCHEDULE & DETAILS', margin, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  const scheduleLines = contract.schedule.split('\n');
  scheduleLines.forEach(line => {
    yPos += 5;
    doc.text(line, margin + 5, yPos);
  });

  yPos += 12;

  // ===== FINANCIAL TERMS =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('FINANCIAL TERMS', margin, yPos);
  yPos += 10;

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos - 3, pageWidth - 2 * margin, 25, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  doc.text(`Tuition Fee (${getRateTypeText(contract.rateType)}):`, margin + 5, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(`৳${contract.rate.toLocaleString()}`, pageWidth - margin - 5, yPos, { align: 'right' });
  doc.setFont('helvetica', 'normal');

  yPos += 7;
  doc.text('Platform Commission (10%):', margin + 5, yPos);
  doc.text(`৳${contract.platformCommission.toLocaleString()}`, pageWidth - margin - 5, yPos, { align: 'right' });

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text("Teacher's Net Earnings:", margin + 5, yPos);
  doc.text(`৳${netAmount.toLocaleString()}`, pageWidth - margin - 5, yPos, { align: 'right' });
  doc.setFont('helvetica', 'normal');

  yPos += 12;

  // Check if we need a new page
  if (yPos > pageHeight - 80) {
    doc.addPage();
    yPos = margin;
  }

  // ===== TERMS & CONDITIONS =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('TERMS & CONDITIONS', margin, yPos);
  yPos += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  const terms = [
    {
      title: '1. Payment Terms:',
      items: [
        '• Monthly payment must be made between 1st-7th of each month',
        '• All payments through Talent Tutor platform only',
        '• Platform retains 10% service fee',
      ],
    },
    {
      title: '2. Class Management:',
      items: [
        '• Classes must follow the agreed schedule',
        '• Prior notice required for missed classes',
        '• Makeup classes must be arranged',
      ],
    },
    {
      title: '3. Cancellation Policy:',
      items: [
        '• 15 days notice required for cancellation',
        '• Contract may be terminated for policy violations',
      ],
    },
    {
      title: '4. Responsibilities:',
      items: [
        '• Teacher: Provide quality education',
        '• Guardian: Timely payment',
        '• Both parties: Follow platform policies',
      ],
    },
  ];

  terms.forEach(section => {
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFont('helvetica', 'bold');
    yPos += 5;
    doc.text(section.title, margin + 5, yPos);
    doc.setFont('helvetica', 'normal');

    section.items.forEach(item => {
      yPos += 5;
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = margin;
      }
      doc.text(item, margin + 8, yPos);
    });

    yPos += 3;
  });

  // Special Terms
  if (contract.specialTerms) {
    yPos += 8;
    if (yPos > pageHeight - 40) {
      doc.addPage();
      yPos = margin;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('Special Terms:', margin + 5, yPos);
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    yPos = addText(contract.specialTerms, margin + 8, yPos, pageWidth - 2 * margin - 8, 9);
  }

  // ===== SIGNATURES =====
  yPos += 15;
  if (yPos > pageHeight - 50) {
    doc.addPage();
    yPos = margin;
  }

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('SIGNATURES', margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  const signatureWidth = (pageWidth - 3 * margin) / 2;

  // Teacher Signature
  doc.text('Teacher:', margin, yPos);
  doc.text(`Name: ${contract.teacherName}`, margin, yPos + 6);
  doc.line(margin, yPos + 15, margin + signatureWidth, yPos + 15);
  doc.text('Signature', margin, yPos + 20);
  doc.text(`Date: ${contract.createdDate}`, margin, yPos + 26);

  // Guardian Signature
  const guardianX = pageWidth / 2 + 5;
  doc.text('Guardian:', guardianX, yPos);
  doc.text(`Name: ${contract.guardianName}`, guardianX, yPos + 6);
  doc.line(guardianX, yPos + 15, guardianX + signatureWidth, yPos + 15);
  doc.text('Signature', guardianX, yPos + 20);
  doc.text(`Date: ${contract.createdDate}`, guardianX, yPos + 26);

  // ===== FOOTER =====
  const footerY = pageHeight - 20;
  drawLine(footerY - 5);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This contract is electronically generated via Talent Tutor Platform', pageWidth / 2, footerY, {
    align: 'center',
  });
  doc.text('Website: www.talenttutor.com | Support: support@talenttutor.com | Phone: +88 01712-345678', pageWidth / 2, footerY + 4, {
    align: 'center',
  });

  // Return as Blob
  return doc.output('blob');
}

/**
 * Generate Receipt PDF
 */
export async function generateReceiptPDF(receipt: ReceiptData, language: 'bn' | 'en' = 'bn'): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TALENT TUTOR', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(14);
  doc.text(language === 'bn' ? 'পেমেন্ট রসিদ' : 'Payment Receipt', pageWidth / 2, 25, { align: 'center' });

  yPos = 50;
  doc.setTextColor(0, 0, 0);

  // Receipt Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt #${receipt.receiptNumber}`, pageWidth / 2, yPos, { align: 'center' });

  yPos += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${receipt.date}`, pageWidth / 2, yPos, { align: 'center' });

  yPos += 20;

  // Details
  const details = [
    ['Payer Name:', receipt.payerName],
    ['Amount:', `৳${receipt.amount.toLocaleString()}`],
    ['Payment Method:', receipt.paymentMethod],
    ['Purpose:', receipt.purpose],
  ];

  if (receipt.transactionId) {
    details.push(['Transaction ID:', receipt.transactionId]);
  }

  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 30, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 80, yPos);
    yPos += 8;
  });

  // Amount Box
  yPos += 10;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(1);
  doc.rect(30, yPos, pageWidth - 60, 20, 'FD');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('Total Amount:', 35, yPos + 10);
  doc.text(`৳${receipt.amount.toLocaleString()}`, pageWidth - 35, yPos + 10, { align: 'right' });

  // Footer
  yPos += 40;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for using Talent Tutor!', pageWidth / 2, yPos, { align: 'center' });

  return doc.output('blob');
}

/**
 * Generate Progress Report PDF
 */
export async function generateProgressReportPDF(report: ReportData, language: 'bn' | 'en' = 'bn'): Promise<Blob> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header
  doc.setFillColor(59, 130, 246); // Blue
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TALENT TUTOR', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(16);
  doc.text(language === 'bn' ? 'প্রগ্রেস রিপোর্ট' : 'Progress Report', pageWidth / 2, 27, { align: 'center' });

  yPos = 55;
  doc.setTextColor(0, 0, 0);

  // Student Info
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(report.title, pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;
  doc.setFontSize(11);

  const info = [
    ['Student:', report.studentName],
    ['Subject:', report.subject],
    ['Teacher:', report.teacher],
    ['Period:', report.period],
    ['Generated:', report.generatedDate],
  ];

  info.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 25, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 65, yPos);
    yPos += 7;
  });

  yPos += 10;

  // Attendance
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246);
  doc.text('ATTENDANCE', 25, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  const attendanceLines = doc.splitTextToSize(report.attendance, pageWidth - 50);
  doc.text(attendanceLines, 25, yPos);
  yPos += attendanceLines.length * 5 + 10;

  // Performance
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246);
  doc.text('PERFORMANCE', 25, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  const performanceLines = doc.splitTextToSize(report.performance, pageWidth - 50);
  doc.text(performanceLines, 25, yPos);
  yPos += performanceLines.length * 5 + 10;

  // Remarks
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246);
  doc.text('TEACHER REMARKS', 25, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  const remarksLines = doc.splitTextToSize(report.remarks, pageWidth - 50);
  doc.text(remarksLines, 25, yPos);

  return doc.output('blob');
}

/**
 * Download PDF file
 */
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Helper Functions
 */
function getRateTypeText(rateType: string): string {
  const rateTypes: Record<string, string> = {
    perMonth: 'Per Month',
    perHour: 'Per Hour',
    perSession: 'Per Session',
  };
  return rateTypes[rateType] || rateType;
}
