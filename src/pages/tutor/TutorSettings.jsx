import { useEffect, useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const defaultProfile = {
  name: "Demo Tutor",
  email: "tutor@educonnect.et",
  phone: "+251 912 345 678",
  location: "Addis Ababa, Ethiopia",
  specialization: "Full Stack Web Development",
  experience: "3",
  bio: "Experienced software developer passionate about teaching programming and helping students build practical skills.",
};

const defaultNotifications = {
  emailMessages: true,
  newStudents: true,
  classReminders: true,
  paymentUpdates: true,
  assignmentUpdates: true,
  platformNews: false,
};

const defaultPrivacy = {
  publicProfile: true,
  showEmail: false,
  showPhone: false,
  showCourses: true,
};

export default function TutorSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(defaultProfile);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [privacy, setPrivacy] = useState(defaultPrivacy);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [payment, setPayment] = useState({
    method: "Telebirr",
    accountName: "",
    accountNumber: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("tutor_profile"));
      const savedNotifications = JSON.parse(
        localStorage.getItem("tutor_notifications"),
      );
      const savedPrivacy = JSON.parse(localStorage.getItem("tutor_privacy"));
      const savedPayment = JSON.parse(localStorage.getItem("tutor_payment"));

      if (savedProfile) setProfile({ ...defaultProfile, ...savedProfile });
      if (savedNotifications)
        setNotifications({ ...defaultNotifications, ...savedNotifications });
      if (savedPrivacy) setPrivacy({ ...defaultPrivacy, ...savedPrivacy });
      if (savedPayment) setPayment(savedPayment);
    } catch {
      // Ignore invalid saved demo settings.
    }
  }, []);

  const showSavedMessage = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const saveProfile = () => {
    localStorage.setItem("tutor_profile", JSON.stringify(profile));
    showSavedMessage();
  };

  const saveNotifications = () => {
    localStorage.setItem("tutor_notifications", JSON.stringify(notifications));
    showSavedMessage();
  };

  const savePrivacy = () => {
    localStorage.setItem("tutor_privacy", JSON.stringify(privacy));
    showSavedMessage();
  };

  const savePayment = () => {
    localStorage.setItem("tutor_payment", JSON.stringify(payment));
    showSavedMessage();
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 8) {
      alert("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New password and confirmation do not match.");
      return;
    }

    alert(
      "Password update is a demo action. Connect authentication to NestJS to enable it.",
    );

    setPasswords({ current: "", newPassword: "", confirm: "" });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payments", label: "Payment Settings", icon: CreditCard },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your tutor profile and account preferences.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          <CheckCircle size={18} />
          Settings saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Settings navigation */}
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
          <div className="mb-3 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Settings Menu
            </p>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-brand-800 text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings content */}
        <div className="min-w-0 lg:col-span-3">
          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile details visible to students.
                  </p>
                </div>

                <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                    <GraduationCap size={42} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Profile Picture
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Profile photo upload will be available when storage is
                      connected.
                    </p>
                    <button
                      onClick={() =>
                        alert("Photo upload will be implemented later.")
                      }
                      className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Camera size={16} />
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label="Full Name" icon={User}>
                    <input
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="setting-input"
                    />
                  </FormField>

                  <FormField label="Email Address" icon={Mail}>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="setting-input"
                    />
                  </FormField>

                  <FormField label="Phone Number" icon={Phone}>
                    <input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      className="setting-input"
                    />
                  </FormField>

                  <FormField label="Location" icon={MapPin}>
                    <input
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      className="setting-input"
                    />
                  </FormField>

                  <FormField label="Specialization" icon={GraduationCap}>
                    <input
                      value={profile.specialization}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          specialization: e.target.value,
                        })
                      }
                      className="setting-input"
                    />
                  </FormField>

                  <FormField label="Years of Experience" icon={Briefcase}>
                    <input
                      type="number"
                      min="0"
                      value={profile.experience}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          experience: e.target.value,
                        })
                      }
                      className="setting-input"
                    />
                  </FormField>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    About Me
                  </label>
                  <textarea
                    rows="4"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    className="setting-input resize-none"
                    placeholder="Tell students about yourself..."
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <SaveButton onClick={saveProfile} />
                </div>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900">
                  Change Password
                </h2>
                <p className="mb-6 mt-1 text-sm text-gray-500">
                  Use a strong password to protect your account.
                </p>

                <form onSubmit={handlePasswordChange} className="space-y-5">
                  <PasswordField
                    label="Current Password"
                    value={passwords.current}
                    onChange={(value) =>
                      setPasswords({ ...passwords, current: value })
                    }
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                  />

                  <PasswordField
                    label="New Password"
                    value={passwords.newPassword}
                    onChange={(value) =>
                      setPasswords({ ...passwords, newPassword: value })
                    }
                    show={showNewPassword}
                    toggle={() => setShowNewPassword(!showNewPassword)}
                  />

                  <PasswordField
                    label="Confirm New Password"
                    value={passwords.confirm}
                    onChange={(value) =>
                      setPasswords({ ...passwords, confirm: value })
                    }
                    show={showNewPassword}
                    toggle={() => setShowNewPassword(!showNewPassword)}
                  />

                  <div className="flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    Your password should be at least 8 characters long.
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-xl bg-brand-800 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">
                  Two-Factor Authentication
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Add an extra layer of security to your tutor account.
                </p>
                <button
                  onClick={() =>
                    alert(
                      "Two-factor authentication will be implemented later.",
                    )
                  }
                  className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Notification Preferences
              </h2>
              <p className="mb-6 mt-1 text-sm text-gray-500">
                Choose which updates you want to receive.
              </p>

              <div className="divide-y divide-gray-100">
                <ToggleRow
                  title="New Messages"
                  description="Get notified when students send you messages."
                  checked={notifications.emailMessages}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      emailMessages: value,
                    })
                  }
                />

                <ToggleRow
                  title="New Student Enrollments"
                  description="Receive updates when students enroll in your courses."
                  checked={notifications.newStudents}
                  onChange={(value) =>
                    setNotifications({ ...notifications, newStudents: value })
                  }
                />

                <ToggleRow
                  title="Class Reminders"
                  description="Get reminders before your scheduled classes."
                  checked={notifications.classReminders}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      classReminders: value,
                    })
                  }
                />

                <ToggleRow
                  title="Payment Updates"
                  description="Receive notifications about payments and earnings."
                  checked={notifications.paymentUpdates}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      paymentUpdates: value,
                    })
                  }
                />

                <ToggleRow
                  title="Assignment Updates"
                  description="Know when students submit assignments."
                  checked={notifications.assignmentUpdates}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      assignmentUpdates: value,
                    })
                  }
                />

                <ToggleRow
                  title="Platform News"
                  description="Receive announcements and platform updates."
                  checked={notifications.platformNews}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      platformNews: value,
                    })
                  }
                />
              </div>

              <div className="mt-6 flex justify-end">
                <SaveButton onClick={saveNotifications} />
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {activeTab === "payments" && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Payment Information
              </h2>
              <p className="mb-6 mt-1 text-sm text-gray-500">
                Manage the account where you receive your earnings.
              </p>

              <div className="space-y-5">
                <FormField label="Payment Method" icon={CreditCard}>
                  <select
                    value={payment.method}
                    onChange={(e) =>
                      setPayment({ ...payment, method: e.target.value })
                    }
                    className="setting-input"
                  >
                    <option>Telebirr</option>
                    <option>CBE Birr</option>
                    <option>Bank Transfer</option>
                  </select>
                </FormField>

                <FormField label="Account Holder Name" icon={User}>
                  <input
                    value={payment.accountName}
                    onChange={(e) =>
                      setPayment({ ...payment, accountName: e.target.value })
                    }
                    className="setting-input"
                    placeholder="Enter account holder name"
                  />
                </FormField>

                <FormField label="Account Number / Phone" icon={CreditCard}>
                  <input
                    value={payment.accountNumber}
                    onChange={(e) =>
                      setPayment({
                        ...payment,
                        accountNumber: e.target.value,
                      })
                    }
                    className="setting-input"
                    placeholder="Enter account number or phone"
                  />
                </FormField>
              </div>

              <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
                <AlertCircle size={18} className="mb-2" />
                These are demo payment settings. Real payout verification should
                be handled securely by the backend.
              </div>

              <div className="mt-6 flex justify-end">
                <SaveButton onClick={savePayment} />
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {activeTab === "privacy" && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Privacy Settings
              </h2>
              <p className="mb-6 mt-1 text-sm text-gray-500">
                Control what students can see on your tutor profile.
              </p>

              <div className="divide-y divide-gray-100">
                <ToggleRow
                  title="Public Tutor Profile"
                  description="Allow students to discover your tutor profile."
                  checked={privacy.publicProfile}
                  onChange={(value) =>
                    setPrivacy({ ...privacy, publicProfile: value })
                  }
                />

                <ToggleRow
                  title="Show Email Address"
                  description="Display your email address on your public profile."
                  checked={privacy.showEmail}
                  onChange={(value) =>
                    setPrivacy({ ...privacy, showEmail: value })
                  }
                />

                <ToggleRow
                  title="Show Phone Number"
                  description="Allow students to view your phone number."
                  checked={privacy.showPhone}
                  onChange={(value) =>
                    setPrivacy({ ...privacy, showPhone: value })
                  }
                />

                <ToggleRow
                  title="Show My Courses"
                  description="Display your published courses on your profile."
                  checked={privacy.showCourses}
                  onChange={(value) =>
                    setPrivacy({ ...privacy, showCourses: value })
                  }
                />
              </div>

              <div className="mt-6 flex justify-end">
                <SaveButton onClick={savePrivacy} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
        {Icon && <Icon size={15} className="text-gray-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function PasswordField({ label, value, onChange, show, toggle }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="setting-input pr-12"
          placeholder={label}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-5">
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-brand-800" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SaveButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-brand-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-900"
    >
      <Save size={17} />
      Save Changes
    </button>
  );
}
