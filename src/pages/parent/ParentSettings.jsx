import { useEffect, useState } from "react";
import {
  UserRound,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  LogOut,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payment", label: "Payment Settings", icon: CreditCard },
  { id: "privacy", label: "Privacy", icon: Shield },
];

const defaultProfile = {
  name: "Demo Parent",
  email: "parent@educonnect.et",
  phone: "+251 911 234 567",
  location: "Addis Ababa, Ethiopia",
  occupation: "Parent",
  bio: "I want to actively support my children's educational journey.",
};

const defaultNotifications = {
  email: true,
  sms: true,
  push: true,
  assignments: true,
  grades: true,
  attendance: true,
  payments: true,
  messages: true,
};

const defaultPrivacy = {
  showProfile: true,
  showActivity: false,
  shareProgress: true,
};

const defaultPayment = {
  method: "Telebirr",
  accountName: "Demo Parent",
  accountNumber: "",
};

function SettingToggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{label}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition ${
          checked ? "bg-brand-600" : "bg-gray-300"
        }`}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function ParentSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState(() => {
    try {
      return {
        ...defaultProfile,
        ...JSON.parse(localStorage.getItem("parent_profile") || "{}"),
      };
    } catch {
      return defaultProfile;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      return {
        ...defaultNotifications,
        ...JSON.parse(localStorage.getItem("parent_notifications") || "{}"),
      };
    } catch {
      return defaultNotifications;
    }
  });

  const [privacy, setPrivacy] = useState(() => {
    try {
      return {
        ...defaultPrivacy,
        ...JSON.parse(localStorage.getItem("parent_privacy") || "{}"),
      };
    } catch {
      return defaultPrivacy;
    }
  });

  const [payment, setPayment] = useState(() => {
    try {
      return {
        ...defaultPayment,
        ...JSON.parse(localStorage.getItem("parent_payment") || "{}"),
      };
    } catch {
      return defaultPayment;
    }
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateNotification = (field, value) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const updatePrivacy = (field, value) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));
  };

  const updatePayment = (field, value) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    const storageMap = {
      profile: ["parent_profile", profile],
      notifications: ["parent_notifications", notifications],
      payment: ["parent_payment", payment],
      privacy: ["parent_privacy", privacy],
    };

    const setting = storageMap[activeTab];

    if (setting) {
      localStorage.setItem(setting[0], JSON.stringify(setting[1]));
      setMessage("Settings saved successfully!");
    }
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.newPassword || !passwords.confirm) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    setPasswords({ current: "", newPassword: "", confirm: "" });
    setMessage(
      "Demo password validation completed. Connect backend authentication to change your real password.",
    );
  };

  const inputClass =
    "setting-input w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-gray-50 rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
          <UserRound size={38} />
        </div>

        <div className="text-center sm:text-left flex-1">
          <h3 className="font-bold text-gray-800 text-lg">{profile.name}</h3>
          <p className="text-sm text-gray-500">Parent Account</p>
          <button
            type="button"
            onClick={() =>
              setMessage("Profile photo upload will be available soon.")
            }
            className="mt-3 text-sm font-semibold text-brand-600 flex items-center gap-2 mx-auto sm:mx-0"
          >
            <Camera size={16} /> Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            className={inputClass}
            value={profile.name}
            onChange={(e) => updateProfile("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className={inputClass}
            value={profile.email}
            onChange={(e) => updateProfile("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            className={inputClass}
            value={profile.phone}
            onChange={(e) => updateProfile("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Occupation
          </label>
          <input
            className={inputClass}
            value={profile.occupation}
            onChange={(e) => updateProfile("occupation", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            className={inputClass}
            value={profile.location}
            onChange={(e) => updateProfile("location", e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            About Me
          </label>
          <textarea
            rows="4"
            className={inputClass}
            value={profile.bio}
            onChange={(e) => updateProfile("bio", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-800">Change Password</h3>
        <p className="text-sm text-gray-500 mt-1">
          Keep your account secure with a strong password.
        </p>
      </div>

      <form onSubmit={changePassword} className="space-y-5">
        {[
          {
            label: "Current Password",
            key: "current",
            visible: showPassword,
            toggle: () => setShowPassword(!showPassword),
          },
          {
            label: "New Password",
            key: "newPassword",
            visible: showNewPassword,
            toggle: () => setShowNewPassword(!showNewPassword),
          },
          {
            label: "Confirm New Password",
            key: "confirm",
            visible: showNewPassword,
            toggle: () => setShowNewPassword(!showNewPassword),
          },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.visible ? "text" : "password"}
                className={inputClass}
                value={passwords[field.key]}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
              />
              <button
                type="button"
                onClick={field.toggle}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {field.visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="px-6 py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition"
        >
          Update Password
        </button>
      </form>

      <div className="border-t border-gray-100 pt-5">
        <h3 className="font-bold text-gray-800">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add another layer of protection to your account.
        </p>
        <button
          type="button"
          onClick={() =>
            setMessage("Two-factor authentication will be available soon.")
          }
          className="mt-4 px-5 py-2.5 border border-brand-600 text-brand-600 rounded-xl text-sm font-semibold"
        >
          Enable 2FA
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-800">Notification Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Choose how you want to receive updates.
        </p>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-700">
          Notification Channels
        </h4>
        <SettingToggle
          label="Email Notifications"
          description="Receive updates through your email."
          checked={notifications.email}
          onChange={(v) => updateNotification("email", v)}
        />
        <SettingToggle
          label="SMS Notifications"
          description="Receive important updates through SMS."
          checked={notifications.sms}
          onChange={(v) => updateNotification("sms", v)}
        />
        <SettingToggle
          label="Push Notifications"
          description="Receive notifications in your browser or app."
          checked={notifications.push}
          onChange={(v) => updateNotification("push", v)}
        />
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h4 className="text-sm font-bold text-gray-700">Learning Updates</h4>
        <SettingToggle
          label="Assignment Updates"
          description="Know when your children receive new assignments."
          checked={notifications.assignments}
          onChange={(v) => updateNotification("assignments", v)}
        />
        <SettingToggle
          label="Grades and Results"
          description="Receive updates when grades are published."
          checked={notifications.grades}
          onChange={(v) => updateNotification("grades", v)}
        />
        <SettingToggle
          label="Attendance Updates"
          description="Get notified about your children's attendance."
          checked={notifications.attendance}
          onChange={(v) => updateNotification("attendance", v)}
        />
        <SettingToggle
          label="Payment Reminders"
          description="Receive payment and due-date reminders."
          checked={notifications.payments}
          onChange={(v) => updateNotification("payments", v)}
        />
        <SettingToggle
          label="New Messages"
          description="Get notified when tutors send messages."
          checked={notifications.messages}
          onChange={(v) => updateNotification("messages", v)}
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-800">Payment Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage your preferred payment method.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Preferred Payment Method
        </label>
        <select
          className={inputClass}
          value={payment.method}
          onChange={(e) => updatePayment("method", e.target.value)}
        >
          <option>Telebirr</option>
          <option>CBE Birr</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Account Holder Name
        </label>
        <input
          className={inputClass}
          value={payment.accountName}
          onChange={(e) => updatePayment("accountName", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Account Number / Phone Number
        </label>
        <input
          className={inputClass}
          placeholder="Enter your payment account"
          value={payment.accountNumber}
          onChange={(e) => updatePayment("accountNumber", e.target.value)}
        />
      </div>

      <div className="p-4 rounded-xl bg-blue-50 text-blue-700 text-sm">
        <CreditCard size={20} className="mb-2" />
        Your payment information is currently stored only in this demo browser.
        Real payment integration will be connected later.
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-800">Privacy Preferences</h3>
        <p className="text-sm text-gray-500 mt-1">
          Control how your account information is displayed.
        </p>
      </div>

      <SettingToggle
        label="Show My Profile"
        description="Allow tutors to see your parent profile."
        checked={privacy.showProfile}
        onChange={(v) => updatePrivacy("showProfile", v)}
      />

      <SettingToggle
        label="Show Learning Activity"
        description="Allow relevant tutors to see your activity."
        checked={privacy.showActivity}
        onChange={(v) => updatePrivacy("showActivity", v)}
      />

      <SettingToggle
        label="Share Children's Progress"
        description="Allow tutors to share learning reports with you."
        checked={privacy.shareProgress}
        onChange={(v) => updatePrivacy("shareProgress", v)}
      />

      <div className="border-t border-gray-100 pt-5">
        <h3 className="font-bold text-gray-800">Account Management</h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage your EduConnect parent account.
        </p>

        <button
          type="button"
          onClick={() =>
            setMessage("Please contact support to request account deletion.")
          }
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600"
        >
          <LogOut size={17} />
          Request Account Deletion
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfile();
      case "security":
        return renderSecurity();
      case "notifications":
        return renderNotifications();
      case "payment":
        return renderPayment();
      case "privacy":
        return renderPrivacy();
      default:
        return renderProfile();
    }
  };

  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      {/* Success / Error Message */}
      {message && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-50 text-green-700 text-sm">
          <CheckCircle size={18} />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3 h-fit">
          <div className="px-3 py-3 mb-2">
            <h3 className="font-bold text-gray-800">Account Settings</h3>
            <p className="text-xs text-gray-400 mt-1">Manage your account</p>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMessage("");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <Icon size={19} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5 sm:p-7">
          <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
            <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              {(() => {
                const Icon = tabs.find((tab) => tab.id === activeTab)?.icon;
                return Icon ? <Icon size={22} /> : <UserRound size={22} />;
              })()}
            </div>
            <div>
              <h2 className="font-bold text-gray-800 text-lg">{activeLabel}</h2>
              <p className="text-xs text-gray-500">
                Update your {activeLabel.toLowerCase()} information.
              </p>
            </div>
          </div>

          {renderContent()}

          {activeTab !== "security" && (
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={saveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
