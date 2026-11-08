import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Camera,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CheckCircle,
  Settings as SettingsIcon,
} from "lucide-react";

export default function StudentSettings() {
  const storedUser = JSON.parse(
    localStorage.getItem("educonnect_user") || "{}",
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: storedUser.name || "Demo Student",
    email: storedUser.email || "student@educonnect.et",
    phone: "+251 900 000 000",
    location: "Addis Ababa, Ethiopia",
    education: "Grade 10",
    bio: "I am a student passionate about technology and learning.",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignmentReminders: true,
    classReminders: true,
    messages: true,
    announcements: false,
    emailNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showProgress: true,
    allowMessages: true,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  const updateProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...storedUser,
      name: profile.fullName,
      email: profile.email,
    };

    localStorage.setItem("educonnect_user", JSON.stringify(updatedUser));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updatePassword = (e) => {
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
      "Password change is a demo action. Connect the NestJS authentication API to update your real password.",
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const savePreferences = () => {
    localStorage.setItem(
      "educonnect_notifications",
      JSON.stringify(notifications),
    );

    localStorage.setItem("educonnect_privacy", JSON.stringify(privacy));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const togglePrivacy = (key) => {
    setPrivacy((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const renderToggle = (checked, onChange) => (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-blue-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, security, notifications, and privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Settings Navigation */}
        <div className="h-fit rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={19} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <form
              onSubmit={updateProfile}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update your personal details and student profile.
                </p>
              </div>

              <div className="mb-7 flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                  {profile.fullName.charAt(0).toUpperCase()}
                  <button
                    type="button"
                    title="Change profile photo"
                    onClick={() =>
                      alert("Profile photo upload will be available soon.")
                    }
                    className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-blue-600 p-2 text-white"
                  >
                    <Camera size={15} />
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    Profile Photo
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Your profile picture will be visible to your tutors.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      required
                      value={profile.fullName}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      required
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          location: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Education Level
                  </label>
                  <div className="relative">
                    <GraduationCap
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      value={profile.education}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          education: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                    >
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                      <option>University</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    About Me
                  </label>
                  <textarea
                    rows="4"
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bio: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <form
              onSubmit={updatePassword}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Password & Security
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep your account secure by using a strong password.
                </p>
              </div>

              <div className="max-w-xl space-y-5">
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
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        required
                        type={field.visible ? "text" : "password"}
                        value={passwords[field.key]}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            [field.key]: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={field.toggle}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {field.visible ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                <p className="text-xs text-slate-400">
                  Use at least 8 characters for your new password.
                </p>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Lock size={17} />
                  Update Password
                </button>
              </div>
            </form>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Notification Preferences
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Choose which updates you want to receive.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    key: "courseUpdates",
                    title: "Course Updates",
                    description: "Get notified when course content changes.",
                  },
                  {
                    key: "assignmentReminders",
                    title: "Assignment Reminders",
                    description: "Receive reminders about upcoming deadlines.",
                  },
                  {
                    key: "classReminders",
                    title: "Class Reminders",
                    description: "Get notified before scheduled lessons.",
                  },
                  {
                    key: "messages",
                    title: "New Messages",
                    description:
                      "Receive notifications when tutors message you.",
                  },
                  {
                    key: "announcements",
                    title: "Announcements",
                    description: "Receive platform news and announcements.",
                  },
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    description: "Receive important updates through email.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {renderToggle(notifications[item.key], () =>
                      toggleNotification(item.key),
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  onClick={savePreferences}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 border-b border-slate-100 pb-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Privacy Settings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Control how your learning information is shared.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    key: "showProfile",
                    title: "Public Profile",
                    description:
                      "Allow other platform users to see your profile.",
                  },
                  {
                    key: "showProgress",
                    title: "Share Learning Progress",
                    description: "Allow tutors to view your learning progress.",
                  },
                  {
                    key: "allowMessages",
                    title: "Allow Messages",
                    description: "Allow tutors to send you direct messages.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {renderToggle(privacy[item.key], () =>
                      togglePrivacy(item.key),
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex justify-end">
                <button
                  onClick={savePreferences}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={17} />
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {saved && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              <CheckCircle size={18} />
              Your settings have been saved successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
