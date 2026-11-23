import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Layers,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Eye,
  X,
  BookOpen,
  GraduationCap,
  Code,
  Briefcase,
  Calculator,
  Palette,
} from "lucide-react";

const initialCategories = [
  {
    id: 1,
    name: "Web Development",
    description: "Learn frontend and backend web development technologies.",
    courses: 12,
    status: "Active",
    icon: "Code",
    createdAt: "2026-01-12",
  },
  {
    id: 2,
    name: "Programming",
    description: "Programming fundamentals and software development.",
    courses: 18,
    status: "Active",
    icon: "BookOpen",
    createdAt: "2026-02-05",
  },
  {
    id: 3,
    name: "Mathematics",
    description: "Mathematics courses for different academic levels.",
    courses: 8,
    status: "Active",
    icon: "Calculator",
    createdAt: "2026-03-10",
  },
  {
    id: 4,
    name: "Business",
    description: "Business management, entrepreneurship, and finance.",
    courses: 6,
    status: "Inactive",
    icon: "Briefcase",
    createdAt: "2026-04-15",
  },
  {
    id: 5,
    name: "Design",
    description: "Graphic design and user interface design.",
    courses: 9,
    status: "Active",
    icon: "Palette",
    createdAt: "2026-05-20",
  },
];

const iconOptions = [
  { name: "Code", icon: Code },
  { name: "BookOpen", icon: BookOpen },
  { name: "Calculator", icon: Calculator },
  { name: "Briefcase", icon: Briefcase },
  { name: "Palette", icon: Palette },
  { name: "GraduationCap", icon: GraduationCap },
];

const getCategoryIcon = (iconName) => {
  const found = iconOptions.find((item) => item.name === iconName);
  return found?.icon || Layers;
};

function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "BookOpen",
    status: "Active",
  });

  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: Layers,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Categories",
      value: categories.filter((c) => c.status === "Active").length,
      icon: CheckCircle,
      color: "from-emerald-500 to-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Inactive Categories",
      value: categories.filter((c) => c.status === "Inactive").length,
      icon: XCircle,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
    },
    {
      title: "Total Courses",
      value: categories.reduce((sum, c) => sum + c.courses, 0),
      icon: BookOpen,
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-50",
    },
  ];

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, statusFilter]);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      icon: "BookOpen",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      status: category.status,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();

    if (!trimmedName) return;

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === trimmedName.toLowerCase() &&
        category.id !== editingCategory?.id,
    );

    if (duplicate) {
      alert("A category with this name already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...formData, name: trimmedName }
            : category,
        ),
      );
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        name: trimmedName,
        courses: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setCategories((prev) => [newCategory, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      setCategories((prev) => prev.filter((item) => item.id !== category.id));
    }
  };

  const toggleStatus = (category) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === category.id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item,
      ),
    );
  };

  return (
    <div className="min-h-screen space-y-7 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Category Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize and manage learning categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-800">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-2xl ${stat.bg} p-3`}>
                  <Icon className="text-slate-700" size={26} />
                </div>
              </div>

              <div
                className={`mt-4 h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
              />
            </div>
          );
        })}
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Categories</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage all categories available on the platform.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Courses</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCategories.map((category) => {
                const Icon = getCategoryIcon(category.icon);

                return (
                  <tr
                    key={category.id}
                    className="transition hover:bg-blue-50/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                          <Icon size={21} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {category.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            ID: {category.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-xs px-6 py-4 text-sm text-slate-500">
                      <p className="line-clamp-2">
                        {category.description || "No description"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-700">
                        {category.courses} courses
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {category.createdAt}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(category)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          category.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {category.status}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowDetails(true);
                          }}
                          title="View"
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openEditModal(category)}
                          title="Edit"
                          className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(category)}
                          title="Delete"
                          className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the category information below.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Web Development"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe this category..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  {iconOptions.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-lg"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Details Modal */}
      {showDetails && selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-800">
                Category Details
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                  {(() => {
                    const Icon = getCategoryIcon(selectedCategory.icon);
                    return <Icon size={30} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {selectedCategory.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold ${
                      selectedCategory.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedCategory.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Description
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedCategory.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-slate-500">Courses</p>
                  <p className="mt-1 text-2xl font-bold text-blue-700">
                    {selectedCategory.courses}
                  </p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs text-slate-500">Category ID</p>
                  <p className="mt-1 text-2xl font-bold text-purple-700">
                    {selectedCategory.id}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Created Date
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {selectedCategory.createdAt}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 p-5 text-right">
              <button
                onClick={() => setShowDetails(false)}
                className="rounded-xl bg-slate-100 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesPage;
