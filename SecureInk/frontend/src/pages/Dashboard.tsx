import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your documents.
        </p>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-500">Total Documents</h3>

            <p className="text-4xl font-bold mt-3">12</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-500">Pending Signatures</h3>

            <p className="text-4xl font-bold mt-3">3</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-500">Signed Documents</h3>

            <p className="text-4xl font-bold mt-3">9</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="text-slate-500">Audit Events</h3>

            <p className="text-4xl font-bold mt-3">27</p>
          </div>
        </div>

        {/* Recent Documents */}

        <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Recent Documents</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span>Employment_Agreement.pdf</span>

              <span className="text-yellow-600">Pending</span>
            </div>

            <div className="flex justify-between border-b pb-4">
              <span>NDA.pdf</span>

              <span className="text-green-600">Signed</span>
            </div>

            <div className="flex justify-between">
              <span>Vendor_Contract.pdf</span>

              <span className="text-green-600">Signed</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
