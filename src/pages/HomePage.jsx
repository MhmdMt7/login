import { useNavigate } from "react-router-dom";
import { userInfo } from "../store"; 
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Settings,
  LogOut,
  Activity,
  Stethoscope,
  CalendarDays,
  Sun,
  Moon,
} from "lucide-react";

export default function HomePage() {
  const value = userInfo((state) => state.value); // ✅ تصحيح هنا
  const navigate = useNavigate();
  const [active, setActive] = useState("الرئيسية");
  const [darkMode, setDarkMode] = useState(false);

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const menuItems = [
    { name: "الرئيسية", icon: LayoutDashboard },
    { name: "الأطباء", icon: Users },
    { name: "المرضى", icon: UserCircle },
    { name: "الخدمات", icon: Activity },
    { name: "الإعدادات", icon: Settings },
  ];

  const cards = [
    { title: "الأطباء", value: 24, icon: Stethoscope, color: "bg-blue-500" },
    { title: "المرضى", value: 120, icon: UserCircle, color: "bg-green-500" },
    { title: "المواعيد", value: 56, icon: CalendarDays, color: "bg-purple-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🏥 مستشفى
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex items-center w-full px-4 py-2 rounded-lg text-right transition-colors ${
                  active === item.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5 ml-2" />
                {item.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t dark:border-gray-700 space-y-2">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <LogOut className="w-5 h-5 ml-2" />
            تسجيل الخروج
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 ml-2" />
            ) : (
              <Moon className="w-5 h-5 ml-2" />
            )}
            {darkMode ? "الوضع الفاتح" : "الوضع الداكن"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {active}
          </h2>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            👤 {value?.username || "زائر"}
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              👋 مرحباً {value?.username || "زائر"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              هذه لوحة التحكم الخاصة بالمستشفى. اختر من القائمة الجانبية للانتقال إلى القسم المطلوب.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {card.title}
                    </p>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {card.value}
                    </h4>
                  </div>
                  <div
                    className={`p-4 rounded-full text-white ${card.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
