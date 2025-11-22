import { useState, useEffect } from "react";
import { DemoUsersAutoInit } from "./components/DemoUsersAutoInit";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { GuardianDashboard } from "./pages/GuardianDashboard";
import { StudentDashboard } from "./pages/StudentDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { DonorDashboard } from "./pages/DonorDashboard";
import {
  isProtectedPage,
  isPublicPage,
  canAccessPage,
} from "./utils/authGuard";
import { toast } from "sonner@2.0.3";

import { DonationPage } from "./pages/DonationPage";
import { DonationLibrary } from "./pages/DonationLibrary";
import { SingleBookPage } from "./pages/SingleBookPage";
import { CreditPurchasePage } from "./pages/CreditPurchasePage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { ShareStoryPage } from "./pages/ShareStoryPage";
import { PartnerPage } from "./pages/PartnerPage";
import { FindTeachersPage } from "./pages/FindTeachersPage";
import { AboutPage } from "./pages/AboutPage";
import { SubscriptionPage } from "./pages/SubscriptionPage";
import { TeacherProfilePage } from "./pages/TeacherProfilePage";
import { GuardianProfilePage } from "./pages/GuardianProfilePage";
import { BrowseTuitionsPage } from "./pages/BrowseTuitionsPage";
import { TeacherProfile } from "./pages/TeacherProfile";
import { GuardianProfile } from "./pages/GuardianProfile";
import { StudentProfile } from "./pages/StudentProfile";
import { AdminProfile } from "./pages/AdminProfile";
import { DonorProfile } from "./pages/DonorProfile";
import { NotificationsPage } from "./pages/NotificationsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { JobDetailsPage } from "./pages/JobDetailsPage";
import { HelpCenterPage } from "./pages/HelpCenterPage";
import { ContactPage } from "./pages/ContactPage";
import { FAQPage } from "./pages/FAQPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { TeacherGuidelinesPage } from "./pages/TeacherGuidelinesPage";
import { GuardianGuidelinesPage } from "./pages/GuardianGuidelinesPage";
import { StudentGuidelinesPage } from "./pages/StudentGuidelinesPage";
import { DonorGuidelinesPage } from "./pages/DonorGuidelinesPage";
import { PlatformUsageGuidePage } from "./pages/PlatformUsageGuidePage";
import { CommunityGuidelinesPage } from "./pages/CommunityGuidelinesPage";
import { MapsAndLocationPage } from "./pages/MapsAndLocationPage";
import { SecurityTipsPage } from "./pages/SecurityTipsPage";
import { SupportSystemPage } from "./pages/SupportSystemPage";
import { SupportChat } from "./components/SupportChat";
import { VisitorSupportChat } from "./components/VisitorSupportChat";
import { ScrollToTop } from "./components/ScrollToTop";
import { DynamicChatWidget } from "./components/DynamicChatWidget";
import { MobileNav } from "./components/MobileNav";
import { ForGuardiansPage } from "./pages/ForGuardiansPage";
import { ForTeachersPage } from "./pages/ForTeachersPage";
import { BlogManagementPage } from "./pages/BlogManagementPage";
import { AdminUserManagementPage } from "./pages/AdminUserManagementPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { AdminTestingPage } from "./pages/AdminTestingPage";
import { LoginTestingPage } from "./pages/LoginTestingPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { MaintenancePage } from "./pages/MaintenancePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  isMaintenanceModeActive,
  canBypassMaintenance,
  checkPageAccess,
  type UserRole,
} from "./utils/authGuard";

type Page =
  | "home"
  | "maintenance"
  | "not-found"
  | "teacher-dashboard"
  | "guardian-dashboard"
  | "student-dashboard"
  | "admin-dashboard"
  | "admin-user-management"
  | "donor-dashboard"
  | "donation"
  | "donation-library"
  | "library"
  | "credit-purchase"
  | "blog"
  | "blog-detail"
  | "blog-management"
  | "share-story"
  | "partners"
  | "find-teachers"
  | "about"
  | "subscription"
  | "for-guardians"
  | "for-teachers"
  | "how-it-works"
  | "teacher-profile"
  | "teacher-profile-view"
  | "guardian-profile"
  | "guardian-profile-view"
  | "student-profile"
  | "admin-profile"
  | "donor-profile"
  | "browse-tuitions"
  | "notifications"
  | "messages"
  | "settings"
  | "job-details"
  | "help"
  | "help-center"

  | "contact"
  | "faq"
  | "privacy-policy"
  | "terms"
  | "teacher-guidelines"
  | "guardian-guidelines"
  | "student-guidelines"
  | "donor-guidelines"
  | "platform-usage-guide"
  | "community-guidelines"
  | "security-tips"
  | "support-system"
  | "admin-testing"
  | "login-testing"
  | "reset-password";
type UserType =
  | "teacher"
  | "guardian"
  | "student"
  | "admin"
  | "donor"
  | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [language, setLanguage] = useState<"bn" | "en">(() => {
    // Check localStorage for saved language preference, default to English
    const savedLang = localStorage.getItem('app_language');
    return (savedLang as "bn" | "en") || "en";
  });
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<
    string | null
  >(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<
    string | null
  >(null);
  const [selectedGuardianId, setSelectedGuardianId] = useState<
    string | null
  >(null);
  const [selectedBlogId, setSelectedBlogId] = useState<
    string | null
  >(null);
  const [announcement, setAnnouncement] = useState<{
    title: string;
    message: string;
    type: string;
  } | null>(null);

  // Current user data (for donor and other users)
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Set HTML lang attribute for font switching and save to localStorage
  useEffect(() => {
    document.documentElement.lang = language;
    document.body.lang = language;
    localStorage.setItem('app_language', language);
  }, [language]);

  // Scroll to top on page change - IMPORTANT for better UX
  useEffect(() => {
    // Scroll to top instantly when page changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [currentPage]);
  
  // Check maintenance mode on app load and when page changes
  // DISABLED: Maintenance mode system বন্ধ রাখা হয়েছে - deployment এর সময় enable করা হবে
  // useEffect(() => {
  //   if (currentPage !== 'maintenance' && isMaintenanceModeActive() && !canBypassMaintenance(userType as UserRole)) {
  //     setCurrentPage('maintenance');
  //   }
  // }, [currentPage, userType]);

  // Initialize credit system on app load
  useEffect(() => {
    try {
      // Import and initialize credit system
      const {
        initializeDefaultPackages,
      } = require("./utils/localStorageCredit");
      initializeDefaultPackages();
      console.log("Credit system initialized");
    } catch (error) {
      console.error(
        "Failed to initialize credit system:",
        error,
      );
    }
  }, []);

  // Demo users auto-initialization is handled by DemoUsersAutoInit component

  // Restore user session from localStorage on app load
  useEffect(() => {
    const restoreSession = async () => {
      const storedUser = localStorage.getItem("currentUser");
      const authToken = localStorage.getItem("auth_token");

      if (storedUser && authToken) {
        try {
          const userData = JSON.parse(storedUser);

          // Initialize user credits if not exists
          try {
            const {
              getOrCreateUserCredits,
              getCurrentBalance,
            } = require("./utils/localStorageCredit");
            const userType =
              userData.role === "teacher" ||
              userData.role === "guardian"
                ? userData.role
                : "student";
            getOrCreateUserCredits(userData.id, userType);

            // Sync credits to user object
            const balance = getCurrentBalance(userData.id);
            userData.credits = balance;
          } catch (error) {
            console.error(
              "Failed to initialize user credits:",
              error,
            );
          }

          setCurrentUser(userData);
          setUserType(userData.role);
          setIsAuthenticated(true);
          console.log(
            "Session restored:",
            userData.role,
            userData.name,
          );
        } catch (error) {
          console.error("Failed to restore session:", error);
          // Clear invalid data
          localStorage.removeItem("currentUser");
          localStorage.removeItem("auth_token");
          localStorage.removeItem("donor_user");
        }
      } else {
        // Try legacy donor_user for backward compatibility
        const storedDonorUser =
          localStorage.getItem("donor_user");
        if (storedDonorUser) {
          try {
            const donorData = JSON.parse(storedDonorUser);
            setCurrentUser(donorData);
            setUserType("donor");
            setIsAuthenticated(true);
            console.log("Legacy donor session restored");
          } catch (error) {
            console.error(
              "Failed to restore donor session:",
              error,
            );
            localStorage.removeItem("donor_user");
          }
        }
      }
    };

    restoreSession();
  }, []);

  const handleLogin = (type: UserType, userData?: any) => {
    setUserType(type);
    setIsAuthenticated(true);

    // Store user data if provided
    if (userData) {
      // Initialize user credits
      try {
        const {
          getOrCreateUserCredits,
          getCurrentBalance,
        } = require("./utils/localStorageCredit");
        const userType =
          type === "teacher" || type === "guardian"
            ? type
            : "student";
        getOrCreateUserCredits(userData.id, userType);

        // Sync credits to user object
        const balance = getCurrentBalance(userData.id);
        userData.credits = balance;
      } catch (error) {
        console.error(
          "Failed to initialize user credits:",
          error,
        );
      }

      setCurrentUser(userData);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(userData),
      );

      // For donor, also use donor_user key for backward compatibility
      if (type === "donor") {
        localStorage.setItem(
          "donor_user",
          JSON.stringify(userData),
        );
      }
    }

    // Navigate to appropriate dashboard
    if (type === "teacher") setCurrentPage("teacher-dashboard");
    else if (type === "guardian")
      setCurrentPage("guardian-dashboard");
    else if (type === "student")
      setCurrentPage("student-dashboard");
    else if (type === "admin")
      setCurrentPage("admin-dashboard");
    else if (type === "donor")
      setCurrentPage("donor-dashboard");
  };

  const handleLogout = () => {
    // Clear all stored user data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("donor_user");
    localStorage.removeItem("donor_token");
    sessionStorage.clear();

    setUserType(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentPage("home");

    toast.success(
      language === "bn"
        ? "সফলভাবে লগআউট হয়েছে"
        : "Logged out successfully",
    );
  };

  const handleDonorLogin = (donorData: any) => {
    // Store donor data in localStorage for persistence
    localStorage.setItem(
      "donor_user",
      JSON.stringify(donorData),
    );
    localStorage.setItem(
      "currentUser",
      JSON.stringify(donorData),
    );

    setCurrentUser(donorData);
    setUserType("donor");
    setIsAuthenticated(true);
    setCurrentPage("donor-dashboard");
  };

  /**
   * Protected navigation function with authentication guard
   * This prevents unauthorized access to protected pages
   */
  const navigateToPage = (page: Page) => {
    // Check maintenance mode first (admins can bypass)
    // DISABLED: Maintenance mode system বন্ধ রাখা হয়েছে - deployment এর সময় enable করা হবে
    // if (page !== 'maintenance' && isMaintenanceModeActive() && !canBypassMaintenance(userType as UserRole)) {
    //   setCurrentPage('maintenance');
    //   return;
    // }
    
    // Allow special pages without access check
    if (page === 'maintenance' || page === 'not-found' || page === 'login') {
      setCurrentPage(page);
      return;
    }
    
    // Check page access
    const accessCheck = checkPageAccess(page, userType as UserRole, isAuthenticated);
    
    if (!accessCheck.allowed) {
      // Handle different denial reasons
      if (accessCheck.reason === 'auth_required') {
        const message =
          language === "bn"
            ? "এই পেজ দেখতে আপনাকে লগইন করতে হবে"
            : "Please login to access this page";
        toast.error(message);
        setCurrentPage('login');
        return;
      }
      
      if (accessCheck.reason === 'role_mismatch') {
        const message =
          language === "bn"
            ? "আপনার এই পেজে প্রবেশের অনুমতি নেই"
            : "You do not have permission to access this page";
        toast.error(message);
        setCurrentPage('not-found');
        return;
      }
      
      if (accessCheck.reason === 'not_found') {
        setCurrentPage('not-found');
        return;
      }
    }

    // Navigation allowed
    setCurrentPage(page);
  };

  const renderPage = () => {
    // Handle dynamic blog detail pages
    if (currentPage.startsWith("blog-detail-")) {
      const blogId = currentPage.replace("blog-detail-", "");
      return (
        <BlogDetailPage
          language={language}
          setLanguage={setLanguage}
          setPage={setCurrentPage}
          blogId={blogId}
          announcement={announcement}
          onSelectBlog={(id) => {
            setCurrentPage(`blog-detail-${id}`);
          }}
          currentUser={
            currentUser ||
            (isAuthenticated && userType
              ? {
                  role: userType,
                  id: `${userType}-demo`,
                  name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                  email: `demo@${userType}.com`,
                }
              : null)
          }
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      );
    }

    // Handle dynamic book detail pages
    if (currentPage.startsWith("book-detail-")) {
      const bookId = currentPage.replace("book-detail-", "");
      return (
        <SingleBookPage
          language={language}
          setLanguage={setLanguage}
          setPage={setCurrentPage}
          announcement={announcement}
          itemId={bookId}
          currentUser={
            currentUser ||
            (isAuthenticated && userType
              ? {
                  role: userType,
                  id: `${userType}-demo`,
                  name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                  email: `demo@${userType}.com`,
                }
              : null)
          }
          setCurrentUser={setCurrentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      );
    }

    switch (currentPage) {
      case "donation":
        return (
          <DonationPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            currentUser={
              currentUser ||
              (isAuthenticated
                ? { role: userType, id: `${userType}-demo` }
                : null)
            }
            setCurrentUser={setCurrentUser}
            onDonorLogin={handleDonorLogin}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      case "library":
      case "donation-library":
        return (
          <DonationLibrary
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            currentUser={
              currentUser ||
              (isAuthenticated
                ? { role: userType, id: `${userType}-demo` }
                : null)
            }
            setCurrentUser={setCurrentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      case "credit-purchase":
        return (
          <CreditPurchasePage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            userType={
              userType === "teacher" ? "teacher" : "guardian"
            }
            currentCredits={0}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "blog":
        return (
          <BlogPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onSelectBlog={(blogId) => {
              setCurrentPage(`blog-detail-${blogId}`);
            }}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "blog-detail":
        return (
          <BlogDetailPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            blogId={selectedBlogId || undefined}
            announcement={announcement}
            onSelectBlog={(id) => {
              setCurrentPage(`blog-detail-${id}`);
            }}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    role: userType,
                    id: `${userType}-demo`,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                  }
                : null)
            }
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      case "blog-management":
        return (
          <BlogManagementPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "share-story":
        return (
          <ShareStoryPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "partners":
        return (
          <PartnerPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "find-teachers":
        return (
          <FindTeachersPage
            language={language}
            setLanguage={setLanguage}
            setPage={navigateToPage}
            announcement={announcement}
            userRole={userType}
            currentUser={currentUser as any}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onSelectTeacher={(teacherId) => {
              setSelectedTeacherId(teacherId);
              setCurrentPage("teacher-profile-view");
            }}
          />
        );
      case "about":
        return (
          <AboutPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "maps":
      case "location":
      case "maps-location":
        return (
          <MapsAndLocationPage
            language={language}
            setPage={setCurrentPage}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "subscription":
        return (
          <SubscriptionPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            userType={userType}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "for-guardians":
        return (
          <ForGuardiansPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "for-teachers":
        return (
          <ForTeachersPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "how-it-works":
        return (
          <HowItWorksPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "teacher-profile-view":
        return (
          <TeacherProfilePage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            teacherId={selectedTeacherId || undefined}
            userRole={
              userType === "guardian"
                ? "guardian"
                : userType === "teacher"
                  ? "teacher"
                  : null
            }
          />
        );
      case "teacher-profile":
        return isAuthenticated && userType === "teacher" ? (
          <TeacherProfile
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "guardian-profile":
        return isAuthenticated && userType === "guardian" ? (
          <GuardianProfile
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "guardian-profile-view":
        return (
          <GuardianProfilePage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            guardianId={selectedGuardianId || undefined}
            userRole={
              userType === "teacher"
                ? "teacher"
                : userType === "guardian"
                  ? "guardian"
                  : null
            }
          />
        );
      case "student-profile":
        return isAuthenticated && userType === "student" ? (
          <StudentProfile
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "admin-profile":
        return isAuthenticated && userType === "admin" ? (
          <AdminProfile
            language={language}
            setPage={setCurrentPage}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "donor-profile":
        return isAuthenticated && userType === "donor" ? (
          <DonorProfile
            language={language}
            setPage={setCurrentPage}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "donor-dashboard":
        return isAuthenticated && userType === "donor" ? (
          <DonorDashboard
            language={language}
            onLogout={handleLogout}
            setPage={setCurrentPage}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        ) : (
          <DonationPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            currentUser={null}
            setCurrentUser={setCurrentUser}
            onDonorLogin={handleDonorLogin}
          />
        );
      case "browse-tuitions":
        return (
          <BrowseTuitionsPage
            language={language}
            setLanguage={setLanguage}
            userRole={
              userType === "teacher" ? "teacher" : "guardian"
            }
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits:
                      userType === "teacher"
                        ? 50
                        : userType === "guardian"
                          ? 100
                          : 0,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        );
      case "notifications":
        return (
          <NotificationsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            currentUser={currentUser}
            onLogin={(user) => {
              setCurrentUser(user);
              setIsAuthenticated(true);
              setUserType(user.role as UserType);
            }}
          />
        );
      case "messages":
        return (
          <MessagesPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            onLogin={handleLogin}
          />
        );
      case "settings":
        return (
          <SettingsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            onLogin={handleLogin}
          />
        );
      case "job-details":
        return (
          <JobDetailsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onSelectGuardian={(guardianId) => {
              setSelectedGuardianId(guardianId);
              setCurrentPage("guardian-profile-view");
            }}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits:
                      userType === "teacher"
                        ? 50
                        : userType === "guardian"
                          ? 100
                          : 0,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        );
      case "help":
      case "help-center":
        return (
          <HelpCenterPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                  }
                : null)
            }
            setCurrentUser={setCurrentUser}
            onLogin={handleLogin}
          />
        );
      case "contact":
        return (
          <ContactPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            userRole={userType}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "faq":
        return (
          <FAQPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "privacy-policy":
        return (
          <PrivacyPolicyPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "terms":
        return (
          <TermsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "teacher-guidelines":
        return (
          <TeacherGuidelinesPage
            language={language}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "guardian-guidelines":
        return (
          <GuardianGuidelinesPage
            language={language}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "student-guidelines":
        return (
          <StudentGuidelinesPage
            language={language}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "donor-guidelines":
        return (
          <DonorGuidelinesPage
            language={language}
            onBack={() => setCurrentPage("home")}
          />
        );
      case "platform-usage-guide":
        return (
          <PlatformUsageGuidePage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "community-guidelines":
        return (
          <CommunityGuidelinesPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "security-tips":
        return (
          <SecurityTipsPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "support-system":
        return (
          <SupportSystemPage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case "teacher-dashboard":
        return isAuthenticated && userType === "teacher" ? (
          <TeacherDashboard
            language={language}
            onLogout={handleLogout}
            setPage={setCurrentPage}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits: userType === "teacher" ? 50 : 100,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "guardian-dashboard":
        return isAuthenticated && userType === "guardian" ? (
          <GuardianDashboard
            language={language}
            onLogout={handleLogout}
            setPage={setCurrentPage}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits: userType === "guardian" ? 100 : 50,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "student-dashboard":
        return isAuthenticated && userType === "student" ? (
          <StudentDashboard
            language={language}
            onLogout={handleLogout}
            setPage={setCurrentPage}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits: 0,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "admin-dashboard":
        return isAuthenticated && userType === "admin" ? (
          <AdminDashboard
            language={language}
            onLogout={handleLogout}
            setPage={setCurrentPage}
            setLanguage={setLanguage}
            onAnnouncement={setAnnouncement}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits: 0,
                    isVerified: true,
                  }
                : null)
            }
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "admin-user-management":
        return isAuthenticated && userType === "admin" ? (
          <AdminUserManagementPage
            language={language}
            setPage={setCurrentPage}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      case "admin-testing":
        return isAuthenticated && userType === "admin" ? (
          <AdminTestingPage
            language={language}
            setPage={setCurrentPage}
          />
        ) : (
          <LoginPage
            language={language}
            onLogin={handleLogin}
            setPage={setCurrentPage}
          />
        );
      
      case "login-testing":
        return (
          <LoginTestingPage
            language={language}
            setPage={setCurrentPage}
          />
        );
      
      case "reset-password":
        return (
          <ResetPasswordPage
            language={language}
            setPage={setCurrentPage}
          />
        );
      
      case "maintenance":
        return (
          <MaintenancePage
            language={language}
            setPage={setCurrentPage}
            estimatedTime={language === 'bn' ? 'শীঘ্রই' : 'Soon'}
          />
        );
      
      case "not-found":
        return (
          <NotFoundPage
            language={language}
            setPage={setCurrentPage}
            userRole={userType as UserRole}
            isAuthenticated={isAuthenticated}
            requestedPage={currentPage}
          />
        );

      default:
        return (
          <HomePage
            language={language}
            setLanguage={setLanguage}
            setPage={setCurrentPage}
            announcement={announcement}
            onLogin={handleLogin}
            onLogout={handleLogout}
            isAuthenticated={isAuthenticated}
            userRole={userType}
            currentUser={
              currentUser ||
              (isAuthenticated && userType
                ? {
                    id: `${userType}-demo`,
                    role: userType,
                    name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)}`,
                    email: `demo@${userType}.com`,
                    isProfileComplete: true,
                    credits:
                      userType === "guardian"
                        ? 100
                        : userType === "teacher"
                          ? 50
                          : 0,
                    isVerified: true,
                  }
                : null)
            }
          />
        );
    }
  };

  return (
    <div className={`min-h-screen relative selection:bg-emerald-100 selection:text-emerald-900 ${language === 'bn' ? 'font-noto-serif-bengali' : 'font-libre'}`}>
      {/* Global Background - As requested, applying the Hero background to the whole site */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[#F8FAFC]">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-[120px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[90px] animate-pulse mix-blend-multiply" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNSwgMTE4LCAxMTAsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-100"></div>
      </div>

      {/* Silent demo users initialization - runs in background */}
      <DemoUsersAutoInit />
      
      <div className="pb-20 lg:pb-0">
        {renderPage()}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav 
        language={language}
        setPage={setCurrentPage}
        activePage={currentPage}
        isAuthenticated={isAuthenticated}
        userRole={userType}
        onMenuClick={() => {
          // Simple toggle for now, or navigate to a menu page
          // Since Header handles the menu state locally, we might want to just scroll to top 
          // where the header is, or maybe trigger a global state later.
          // For now, let's navigate to 'settings' as a placeholder for "Menu" functionality
          // or open the sidebar if we had a global one. 
          // Given the constraints, let's scroll to top which reveals the header menu
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Dynamic Chat Widget - Changes based on authentication (Hidden for Admin) */}
      {userType !== "admin" && (
        <DynamicChatWidget
          isAuthenticated={isAuthenticated}
          userType={userType || undefined}
          userName={
            isAuthenticated
              ? userType === "teacher"
                ? "মোঃ করিম উদ্দিন"
                : userType === "guardian"
                  ? "জনাব রহমান"
                  : userType === "donor"
                    ? "আব্দুর রহমান"
                    : userType === "student"
                      ? "শিক্ষার্থী"
                      : undefined
              : undefined
          }
        />
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop isAuthenticated={isAuthenticated} />
    </div>
  );
}