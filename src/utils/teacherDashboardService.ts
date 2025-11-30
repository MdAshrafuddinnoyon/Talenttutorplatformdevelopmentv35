/**
 * Teacher Dashboard Service
 * Real-time functions for Teacher Dashboard
 */

export interface TeacherStats {
  totalApplications: number;
  shortlisted: number;
  hired: number;
  rating: number;
  totalEarned: number;
  pendingPayments: number;
}

export interface Application {
  id: string;
  tuitionId: string;
  title: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  proposal?: string;
  expectedSalary?: number;
}

export interface Contract {
  id: string;
  studentName: string;
  subject: string;
  startDate: string;
  salary: number;
  status: 'active' | 'completed' | 'cancelled';
}

/**
 * Get teacher statistics
 */
export function getTeacherStats(teacherId: string): TeacherStats {
  try {
    const applications = getTeacherApplications(teacherId);
    const contracts = getTeacherContracts(teacherId);
    const payments = getTeacherPayments(teacherId);
    
    const stats: TeacherStats = {
      totalApplications: applications.length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      hired: contracts.filter(c => c.status === 'active').length,
      rating: 4.8, // This would come from reviews
      totalEarned: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
      pendingPayments: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
    };
    
    console.log('✅ Teacher stats calculated:', stats);
    return stats;
  } catch (error) {
    console.error('Error getting teacher stats:', error);
    return {
      totalApplications: 0,
      shortlisted: 0,
      hired: 0,
      rating: 0,
      totalEarned: 0,
      pendingPayments: 0
    };
  }
}

/**
 * Get teacher applications
 */
export function getTeacherApplications(teacherId: string): Application[] {
  try {
    const key = `teacher_applications_${teacherId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting applications:', error);
    return [];
  }
}

/**
 * Save teacher application
 */
export function saveTeacherApplication(teacherId: string, application: Application): void {
  try {
    const applications = getTeacherApplications(teacherId);
    applications.push(application);
    
    const key = `teacher_applications_${teacherId}`;
    localStorage.setItem(key, JSON.stringify(applications));
    
    // Dispatch event for real-time update
    window.dispatchEvent(new Event('applicationsUpdated'));
    console.log('✅ Application saved:', application);
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
}

/**
 * Get teacher contracts
 */
export function getTeacherContracts(teacherId: string): Contract[] {
  try {
    const key = `teacher_contracts_${teacherId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting contracts:', error);
    return [];
  }
}

/**
 * Get teacher payments
 */
export function getTeacherPayments(teacherId: string): any[] {
  try {
    const key = `teacher_payments_${teacherId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting payments:', error);
    return [];
  }
}

/**
 * Apply to tuition (real-time)
 */
export function applyToTuitionRealtime(
  teacherId: string,
  tuitionId: string,
  proposal: string,
  expectedSalary: number,
  language: 'bn' | 'en'
): { success: boolean; message: string } {
  try {
    // Check if already applied
    const applications = getTeacherApplications(teacherId);
    const alreadyApplied = applications.some(app => app.tuitionId === tuitionId);
    
    if (alreadyApplied) {
      return {
        success: false,
        message: language === 'bn' 
          ? 'আপনি ইতিমধ্যে এই টিউশনে আবেদন করেছেন।'
          : 'You have already applied to this tuition.'
      };
    }
    
    // Create application
    const application: Application = {
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      tuitionId: tuitionId,
      title: 'টিউশন আবেদন',
      location: 'ঢাকা',
      appliedDate: new Date().toLocaleDateString('bn-BD'),
      status: 'pending',
      proposal: proposal,
      expectedSalary: expectedSalary
    };
    
    // Save application
    saveTeacherApplication(teacherId, application);
    
    return {
      success: true,
      message: language === 'bn'
        ? 'আবেদন সফলভাবে জমা হয়েছে!'
        : 'Application submitted successfully!'
    };
  } catch (error) {
    console.error('Error applying to tuition:', error);
    return {
      success: false,
      message: language === 'bn'
        ? 'আবেদনে সমস্যা হয়েছে।'
        : 'Failed to submit application.'
    };
  }
}

/**
 * Update application status
 */
export function updateApplicationStatus(
  teacherId: string,
  applicationId: string,
  newStatus: Application['status']
): void {
  try {
    const applications = getTeacherApplications(teacherId);
    const index = applications.findIndex(app => app.id === applicationId);
    
    if (index !== -1) {
      applications[index].status = newStatus;
      
      const key = `teacher_applications_${teacherId}`;
      localStorage.setItem(key, JSON.stringify(applications));
      
      // Dispatch event
      window.dispatchEvent(new Event('applicationsUpdated'));
      console.log('✅ Application status updated:', applicationId, newStatus);
    }
  } catch (error) {
    console.error('Error updating application status:', error);
  }
}

/**
 * Save student progress report
 */
export function saveProgressReport(
  teacherId: string,
  studentId: string,
  report: {
    performance: string;
    comments: string;
    date: string;
  }
): void {
  try {
    const key = `progress_reports_${teacherId}_${studentId}`;
    const reports = JSON.parse(localStorage.getItem(key) || '[]');
    
    reports.push({
      id: `report-${Date.now()}`,
      ...report
    });
    
    localStorage.setItem(key, JSON.stringify(reports));
    
    console.log('✅ Progress report saved:', report);
  } catch (error) {
    console.error('Error saving progress report:', error);
    throw error;
  }
}

/**
 * Get student progress reports
 */
export function getProgressReports(teacherId: string, studentId: string): any[] {
  try {
    const key = `progress_reports_${teacherId}_${studentId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting progress reports:', error);
    return [];
  }
}

/**
 * Initialize demo data for teacher
 */
export function initializeDemoData(teacherId: string): void {
  try {
    // Check if already initialized
    const key = `teacher_demo_initialized_${teacherId}`;
    if (localStorage.getItem(key)) {
      console.log('Demo data already initialized');
      return;
    }
    
    // Add some demo applications
    const demoApplications: Application[] = [
      {
        id: 'app-demo-1',
        tuitionId: 'tuition-1',
        title: 'গণিত শিক্ষক - ক্লাস ৯',
        location: 'বনানী, ঢাকা',
        appliedDate: '২ দিন আগে',
        status: 'shortlisted'
      },
      {
        id: 'app-demo-2',
        tuitionId: 'tuition-2',
        title: 'বিজ্ঞান টিউটর - ক্লাস ৭',
        location: 'উত্তরা, ঢাকা',
        appliedDate: '৫ দিন আগে',
        status: 'pending'
      }
    ];
    
    localStorage.setItem(`teacher_applications_${teacherId}`, JSON.stringify(demoApplications));
    
    // Add demo contracts
    const demoContracts: Contract[] = [
      {
        id: 'contract-1',
        studentName: 'রাফি আহমেদ',
        subject: 'গণিত',
        startDate: '০১/০১/২০২৫',
        salary: 8000,
        status: 'active'
      }
    ];
    
    localStorage.setItem(`teacher_contracts_${teacherId}`, JSON.stringify(demoContracts));
    
    // Add demo payments
    const demoPayments = [
      {
        id: 1,
        student: 'রাফি আহমেদ',
        guardian: 'মিসেস রহিমা খাতুন',
        amount: 8000,
        month: 'জানুয়ারি ২০২৫',
        status: 'paid',
        date: '০৫/০১/২০২৫'
      },
      {
        id: 2,
        student: 'রাফি আহমেদ',
        guardian: 'মিসেস রহিমা খাতুন',
        amount: 8000,
        month: 'ফেব্রুয়ারি ২০২৫',
        status: 'pending',
        date: '-'
      }
    ];
    
    localStorage.setItem(`teacher_payments_${teacherId}`, JSON.stringify(demoPayments));
    
    // Mark as initialized
    localStorage.setItem(key, 'true');
    console.log('✅ Demo data initialized for teacher:', teacherId);
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
}
