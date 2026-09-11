import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth, googleProvider } from '../lib/firebase';
import {
  CompanyConfig,
  ServiceItem,
  FAQItem,
  AdminInquiry,
  InquiryStatus,
  AdminActivityLog,
  AdminCredentials,
} from '../types';
import { COMPANY_CONFIG } from '../data/company';
import { SERVICES_DATA } from '../data/services';
import { FAQS_DATA } from '../data/faqs';
import { INITIAL_INQUIRIES } from '../data/sampleInquiries';

export const AUTHORIZED_ADMIN_EMAIL =
  (import.meta.env.VITE_ADMIN_EMAIL as string) || 'kulkarnisu@gmail.com';

const STORAGE_KEYS = {
  AUTH: 'techstudio_admin_auth_v1',
  USER_EMAIL: 'techstudio_admin_email_v1',
  FALLBACK_CREDENTIALS: 'techstudio_admin_credentials_v2',
  FALLBACK_COMPANY: 'techstudio_company_config_v1',
  FALLBACK_SERVICES: 'techstudio_services_v1',
  FALLBACK_FAQS: 'techstudio_faqs_v1',
  FALLBACK_INQUIRIES: 'techstudio_inquiries_v1',
  FALLBACK_LOGS: 'techstudio_activity_logs_v1',
};

const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: (import.meta.env.VITE_ADMIN_USERNAME as string) || 'DevMarlow',
  passcode: (import.meta.env.VITE_ADMIN_PASSCODE as string) || '',
  lastUpdated: new Date().toISOString(),
};

const INITIAL_LOGS: AdminActivityLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    action: 'Cloud Database Connected',
    details: 'Persistent Firebase Firestore database initialized for Tech_Studio.',
    user: 'System / Firebase',
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    action: 'Inquiry Received',
    details: 'Inquiry from Sarah Jenkins (CloudScale AI)',
    user: 'System Webhook',
  },
];

interface AdminContextType {
  // Navigation & View
  isAdminView: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;

  // Cloud Status
  isFirestoreConnected: boolean;

  // Authentication & Security
  isAuthenticated: boolean;
  adminEmail: string;
  currentUserEmail: string | null;
  credentials: AdminCredentials;
  login: (usernameOrPasscode: string, passcode?: string) => boolean;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateCredentials: (newUsername: string, newPasscode: string) => Promise<{ success: boolean; message: string }>;
  resetCredentialsToDefault: () => Promise<void>;

  // Company Profile
  companyConfig: CompanyConfig;
  updateCompanyConfig: (config: CompanyConfig) => Promise<void>;

  // Services
  services: ServiceItem[];
  updateServices: (services: ServiceItem[]) => Promise<void>;
  addService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // FAQs
  faqs: FAQItem[];
  updateFaqs: (faqs: FAQItem[]) => Promise<void>;
  addFaq: (faq: Omit<FAQItem, 'id'>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  // Inquiries / Leads
  inquiries: AdminInquiry[];
  addInquiry: (data: Omit<AdminInquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: InquiryStatus) => Promise<void>;
  updateInquiryNotes: (id: string, notes: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;

  // Activity Logs
  activityLogs: AdminActivityLog[];
  logAction: (action: string, details: string) => Promise<void>;

  // Reset to Factory
  resetToDefaults: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminView, setIsAdminView] = useState(() => window.location.hash === '#admin');
  const [isFirestoreConnected, setIsFirestoreConnected] = useState(true);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.USER_EMAIL) || null;
  });

  // Listen to Firebase Auth state for authorized administrator
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setIsAuthenticated(true);
        setCurrentUserEmail(user.email);
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        sessionStorage.setItem(STORAGE_KEYS.USER_EMAIL, user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Keyboard shortcut listener for Administrator access (Ctrl+Shift+A / Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        openAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Data States (initialized from local cache or defaults for zero-delay SSR / initial render)
  const [credentials, setCredentials] = useState<AdminCredentials>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_CREDENTIALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_CREDENTIALS;
  });

  const [companyConfig, setCompanyConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_COMPANY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return COMPANY_CONFIG;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_SERVICES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SERVICES_DATA;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_FAQS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return FAQS_DATA;
  });

  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_INQUIRIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_INQUIRIES;
  });

  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FALLBACK_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LOGS;
  });

  // Track initial seeding status
  const isInitializedRef = useRef(false);

  // Synchronize hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // -------------------------------------------------------------
  // FIRESTORE REAL-TIME SUBSCRIPTIONS & SEEDING
  // -------------------------------------------------------------
  useEffect(() => {
    let unsubscribeInquiries: (() => void) | undefined;
    let unsubscribeLogs: (() => void) | undefined;

    const setupSubscriptions = async () => {
      try {
        if (!db) {
          setIsFirestoreConnected(false);
          return;
        }

        // 1. Company Config document subscription
        const companyDocRef = doc(db, 'companyConfig', 'profile');
        const companySnap = await getDoc(companyDocRef);
        if (companySnap.exists()) {
          const remoteData = companySnap.data() as CompanyConfig;
          setCompanyConfig(remoteData);
          localStorage.setItem(STORAGE_KEYS.FALLBACK_COMPANY, JSON.stringify(remoteData));
        } else {
          // Seed defaults to Firestore
          await setDoc(companyDocRef, COMPANY_CONFIG);
        }

        // 2. Admin Security Credentials document subscription
        const credsDocRef = doc(db, 'adminSettings', 'credentials');
        const credsSnap = await getDoc(credsDocRef);
        if (credsSnap.exists()) {
          const remoteCreds = credsSnap.data() as AdminCredentials;
          setCredentials(remoteCreds);
          localStorage.setItem(STORAGE_KEYS.FALLBACK_CREDENTIALS, JSON.stringify(remoteCreds));
        } else {
          await setDoc(credsDocRef, DEFAULT_CREDENTIALS);
        }

        // 3. Realtime Inquiries listener
        const inquiriesColRef = collection(db, 'inquiries');
        unsubscribeInquiries = onSnapshot(
          inquiriesColRef,
          (snapshot) => {
            if (!snapshot.empty) {
              const remoteList: AdminInquiry[] = [];
              snapshot.forEach((d) => {
                remoteList.push({ id: d.id, ...(d.data() as Omit<AdminInquiry, 'id'>) });
              });
              // Sort newest first
              remoteList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setInquiries(remoteList);
              localStorage.setItem(STORAGE_KEYS.FALLBACK_INQUIRIES, JSON.stringify(remoteList));
            } else if (!isInitializedRef.current) {
              // Seed sample inquiries on initial empty collection
              INITIAL_INQUIRIES.forEach(async (inq) => {
                await setDoc(doc(db, 'inquiries', inq.id), {
                  name: inq.name,
                  email: inq.email,
                  company: inq.company,
                  serviceInterest: inq.serviceInterest,
                  message: inq.message,
                  createdAt: inq.createdAt,
                  status: inq.status,
                  notes: inq.notes || '',
                  source: inq.source,
                });
              });
            }
          },
          (err) => {
            console.error('Inquiries snapshot listener error:', err);
            setIsFirestoreConnected(false);
          }
        );

        // 4. Realtime Activity Logs listener
        const logsColRef = collection(db, 'activityLogs');
        const logsQuery = query(logsColRef, orderBy('timestamp', 'desc'), limit(50));
        unsubscribeLogs = onSnapshot(
          logsQuery,
          (snapshot) => {
            if (!snapshot.empty) {
              const remoteLogs: AdminActivityLog[] = [];
              snapshot.forEach((d) => {
                remoteLogs.push({ id: d.id, ...(d.data() as Omit<AdminActivityLog, 'id'>) });
              });
              setActivityLogs(remoteLogs);
              localStorage.setItem(STORAGE_KEYS.FALLBACK_LOGS, JSON.stringify(remoteLogs));
            } else if (!isInitializedRef.current) {
              INITIAL_LOGS.forEach(async (lg) => {
                await setDoc(doc(db, 'activityLogs', lg.id), {
                  timestamp: lg.timestamp,
                  action: lg.action,
                  details: lg.details,
                  user: lg.user,
                });
              });
            }
          },
          (err) => {
            console.error('Activity logs snapshot error:', err);
          }
        );

        isInitializedRef.current = true;
        setIsFirestoreConnected(true);
      } catch (err) {
        console.error('Firestore connection initialization error:', err);
        setIsFirestoreConnected(false);
      }
    };

    setupSubscriptions();

    return () => {
      if (unsubscribeInquiries) unsubscribeInquiries();
      if (unsubscribeLogs) unsubscribeLogs();
    };
  }, []);

  // -------------------------------------------------------------
  // ACTIONS & LOGGING
  // -------------------------------------------------------------
  const logAction = async (action: string, details: string) => {
    const newLogId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newLog: AdminActivityLog = {
      id: newLogId,
      timestamp: new Date().toISOString(),
      action,
      details,
      user: credentials.username || 'Dev Marlow / Sharad',
    };

    // Optimistic local update
    setActivityLogs((prev) => [newLog, ...prev].slice(0, 50));
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_LOGS, JSON.stringify([newLog, ...activityLogs].slice(0, 50)));
      if (db) {
        await setDoc(doc(db, 'activityLogs', newLogId), {
          timestamp: newLog.timestamp,
          action: newLog.action,
          details: newLog.details,
          user: newLog.user,
        });
      }
    } catch (err) {
      console.warn('Could not persist log to Firestore:', err);
    }
  };

  const openAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // AUTHENTICATION
  // -------------------------------------------------------------
  const login = (usernameOrPasscode: string, optionalPasscode?: string): boolean => {
    let inputUser = '';
    let inputPass = '';

    if (optionalPasscode !== undefined) {
      inputUser = usernameOrPasscode.trim();
      inputPass = optionalPasscode.trim();
    } else {
      inputPass = usernameOrPasscode.trim();
    }

    const matchesCurrent =
      optionalPasscode !== undefined
        ? inputUser.toLowerCase() === credentials.username.toLowerCase() && inputPass === credentials.passcode
        : inputPass === credentials.passcode;

    const matchesDefault =
      (inputUser.toLowerCase() === DEFAULT_CREDENTIALS.username.toLowerCase() || !inputUser) &&
      inputPass === DEFAULT_CREDENTIALS.passcode;

    if (matchesCurrent || matchesDefault) {
      setIsAuthenticated(true);
      setCurrentUserEmail(AUTHORIZED_ADMIN_EMAIL);
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      sessionStorage.setItem(STORAGE_KEYS.USER_EMAIL, AUTHORIZED_ADMIN_EMAIL);
      logAction('Admin Logged In', `Authenticated as "${inputUser || credentials.username}".`);
      return true;
    }

    logAction('Login Failed', `Failed sign-in attempt for username "${inputUser || 'anonymous'}".`);
    return false;
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; message: string }> => {
    if (!auth) {
      return {
        success: false,
        message: 'Firebase Authentication is not available. Please verify Firebase configuration or use Admin Credentials.',
      };
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email?.toLowerCase();

      if (email === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setIsAuthenticated(true);
        setCurrentUserEmail(user.email || AUTHORIZED_ADMIN_EMAIL);
        sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        sessionStorage.setItem(STORAGE_KEYS.USER_EMAIL, user.email || AUTHORIZED_ADMIN_EMAIL);
        await logAction('Admin Google Auth', `Authorized sign-in by owner: ${user.email}`);
        return {
          success: true,
          message: `Access granted! Welcome, ${user.displayName || user.email}.`,
        };
      } else {
        await signOut(auth);
        setIsAuthenticated(false);
        setCurrentUserEmail(null);
        sessionStorage.removeItem(STORAGE_KEYS.AUTH);
        sessionStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
        await logAction(
          'Unauthorized Auth Rejected',
          `Rejected Google sign-in attempt from unauthorized account: ${user.email}`
        );
        return {
          success: false,
          message: `Access Denied: The account "${user.email}" is not authorized. The Admin Console is restricted exclusively to ${AUTHORIZED_ADMIN_EMAIL}.`,
        };
      }
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      return {
        success: false,
        message: err.message || 'Failed to authenticate with Google.',
      };
    }
  };

  const updateCredentials = async (
    newUsername: string,
    newPasscode: string
  ): Promise<{ success: boolean; message: string }> => {
    const trimmedUser = newUsername.trim();
    const trimmedPass = newPasscode.trim();

    if (!trimmedUser || trimmedUser.length < 2) {
      return { success: false, message: 'Username must be at least 2 characters long.' };
    }
    if (!trimmedPass || trimmedPass.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters long.' };
    }

    const updated: AdminCredentials = {
      username: trimmedUser,
      passcode: trimmedPass,
      lastUpdated: new Date().toISOString(),
    };

    setCredentials(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_CREDENTIALS, JSON.stringify(updated));
      if (db) {
        await setDoc(doc(db, 'adminSettings', 'credentials'), updated);
      }
    } catch (err) {
      console.warn('Failed to persist credentials to Firestore:', err);
    }

    await logAction('Credentials Updated', `Admin username set to "${trimmedUser}" and synced to Firestore.`);
    return { success: true, message: 'Admin credentials updated and synced to Firestore.' };
  };

  const resetCredentialsToDefault = async () => {
    setCredentials(DEFAULT_CREDENTIALS);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_CREDENTIALS, JSON.stringify(DEFAULT_CREDENTIALS));
      if (db) {
        await setDoc(doc(db, 'adminSettings', 'credentials'), DEFAULT_CREDENTIALS);
      }
    } catch (err) {
      console.warn('Failed to reset credentials in Firestore:', err);
    }
    await logAction(
      'Credentials Reset',
      `Admin username and password reset to configured defaults (Username: ${DEFAULT_CREDENTIALS.username}).`
    );
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setCurrentUserEmail(null);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
    if (auth && auth.currentUser) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    await logAction('Admin Logged Out', 'Session terminated by user.');
  };

  // -------------------------------------------------------------
  // COMPANY CONFIG
  // -------------------------------------------------------------
  const updateCompanyConfig = async (newConfig: CompanyConfig) => {
    setCompanyConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_COMPANY, JSON.stringify(newConfig));
      if (db) {
        await setDoc(doc(db, 'companyConfig', 'profile'), newConfig);
      }
    } catch (err) {
      console.warn('Failed to persist companyConfig to Firestore:', err);
    }
    await logAction('Company Config Updated', `Updated company profile details in Firestore.`);
  };

  // -------------------------------------------------------------
  // SERVICES
  // -------------------------------------------------------------
  const updateServices = async (newServices: ServiceItem[]) => {
    setServices(newServices);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_SERVICES, JSON.stringify(newServices));
      if (db) {
        for (const item of newServices) {
          await setDoc(doc(db, 'services', item.id), item);
        }
      }
    } catch (err) {
      console.warn('Failed to update services in Firestore:', err);
    }
    await logAction('Services Updated', `Saved ${newServices.length} services to Firestore.`);
  };

  const addService = async (newService: ServiceItem) => {
    const updated = [...services, newService];
    setServices(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_SERVICES, JSON.stringify(updated));
      if (db) {
        await setDoc(doc(db, 'services', newService.id), newService);
      }
    } catch (err) {
      console.warn('Failed to add service to Firestore:', err);
    }
    await logAction('Service Added', `Created service: "${newService.title}".`);
  };

  const deleteService = async (id: string) => {
    const target = services.find((s) => s.id === id);
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_SERVICES, JSON.stringify(updated));
      if (db) {
        await deleteDoc(doc(db, 'services', id));
      }
    } catch (err) {
      console.warn('Failed to delete service from Firestore:', err);
    }
    await logAction('Service Deleted', `Deleted service "${target?.title || id}".`);
  };

  // -------------------------------------------------------------
  // FAQS
  // -------------------------------------------------------------
  const updateFaqs = async (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_FAQS, JSON.stringify(newFaqs));
      if (db) {
        for (const item of newFaqs) {
          await setDoc(doc(db, 'faqs', item.id), item);
        }
      }
    } catch (err) {
      console.warn('Failed to update FAQs in Firestore:', err);
    }
    await logAction('FAQs Updated', `Updated FAQ entries (${newFaqs.length} items).`);
  };

  const addFaq = async (newFaq: Omit<FAQItem, 'id'>) => {
    const createdId = `faq-${Date.now()}`;
    const created: FAQItem = {
      ...newFaq,
      id: createdId,
    };
    const updated = [created, ...faqs];
    setFaqs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_FAQS, JSON.stringify(updated));
      if (db) {
        await setDoc(doc(db, 'faqs', createdId), created);
      }
    } catch (err) {
      console.warn('Failed to add FAQ in Firestore:', err);
    }
    await logAction('FAQ Added', `Added FAQ: "${newFaq.question.substring(0, 40)}..."`);
  };

  const deleteFaq = async (id: string) => {
    const target = faqs.find((f) => f.id === id);
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_FAQS, JSON.stringify(updated));
      if (db) {
        await deleteDoc(doc(db, 'faqs', id));
      }
    } catch (err) {
      console.warn('Failed to delete FAQ from Firestore:', err);
    }
    await logAction('FAQ Deleted', `Deleted FAQ: "${target?.question.substring(0, 40) || id}..."`);
  };

  // -------------------------------------------------------------
  // INQUIRIES / LEADS (CLIENT QUOTES & MESSAGES)
  // -------------------------------------------------------------
  const addInquiry = async (data: Omit<AdminInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiryId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newInquiry: AdminInquiry = {
      ...data,
      id: newInquiryId,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    // Optimistic UI update
    setInquiries((prev) => [newInquiry, ...prev]);
    try {
      localStorage.setItem(STORAGE_KEYS.FALLBACK_INQUIRIES, JSON.stringify([newInquiry, ...inquiries]));
      if (db) {
        await setDoc(doc(db, 'inquiries', newInquiryId), {
          name: newInquiry.name,
          email: newInquiry.email,
          company: newInquiry.company,
          serviceInterest: newInquiry.serviceInterest,
          message: newInquiry.message,
          createdAt: newInquiry.createdAt,
          status: newInquiry.status,
          notes: newInquiry.notes || '',
          source: newInquiry.source,
        });
      }
    } catch (err) {
      console.warn('Failed to write inquiry to Firestore:', err);
    }

    await logAction(
      'Inquiry Received',
      `New inquiry from ${data.name} (${data.company || 'Individual'}) regarding ${data.serviceInterest}`
    );
  };

  const updateInquiryStatus = async (id: string, status: InquiryStatus) => {
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    try {
      if (db) {
        await setDoc(doc(db, 'inquiries', id), { status }, { merge: true });
      }
    } catch (err) {
      console.warn('Failed to update inquiry status in Firestore:', err);
    }
    await logAction('Inquiry Status Changed', `Marked inquiry ${id} as "${status.toUpperCase()}".`);
  };

  const updateInquiryNotes = async (id: string, notes: string) => {
    setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, notes } : item)));
    try {
      if (db) {
        await setDoc(doc(db, 'inquiries', id), { notes }, { merge: true });
      }
    } catch (err) {
      console.warn('Failed to update inquiry notes in Firestore:', err);
    }
    await logAction('Inquiry Notes Updated', `Updated notes for inquiry ${id}.`);
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    try {
      if (db) {
        await deleteDoc(doc(db, 'inquiries', id));
      }
    } catch (err) {
      console.warn('Failed to delete inquiry in Firestore:', err);
    }
    await logAction('Inquiry Deleted', `Removed inquiry record ${id}.`);
  };

  // -------------------------------------------------------------
  // FACTORY RESET
  // -------------------------------------------------------------
  const resetToDefaults = async () => {
    setCompanyConfig(COMPANY_CONFIG);
    setServices(SERVICES_DATA);
    setFaqs(FAQS_DATA);
    setInquiries(INITIAL_INQUIRIES);
    setActivityLogs(INITIAL_LOGS);
    setCredentials(DEFAULT_CREDENTIALS);

    try {
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_COMPANY);
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_SERVICES);
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_FAQS);
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_INQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_LOGS);
      localStorage.removeItem(STORAGE_KEYS.FALLBACK_CREDENTIALS);

      // Reset in Firestore
      if (db) {
        await setDoc(doc(db, 'companyConfig', 'profile'), COMPANY_CONFIG);
        await setDoc(doc(db, 'adminSettings', 'credentials'), DEFAULT_CREDENTIALS);
      }
    } catch (err) {
      console.warn('Factory reset Firestore sync error:', err);
    }
    await logAction('Factory Reset', 'Settings, credentials, and content reset to defaults in Firestore.');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminView,
        openAdmin,
        closeAdmin,
        isFirestoreConnected,
        isAuthenticated,
        adminEmail: AUTHORIZED_ADMIN_EMAIL,
        currentUserEmail,
        credentials,
        login,
        loginWithGoogle,
        logout,
        updateCredentials,
        resetCredentialsToDefault,
        companyConfig,
        updateCompanyConfig,
        services,
        updateServices,
        addService,
        deleteService,
        faqs,
        updateFaqs,
        addFaq,
        deleteFaq,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        activityLogs,
        logAction,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
export default AdminContext;
