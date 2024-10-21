export const HomeworkView = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">Total Users</h3>
                <p className="text-2xl">1,234</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">Active Sessions</h3>
                <p className="text-2xl">56</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
                <h3 className="font-semibold">Revenue</h3>
                <p className="text-2xl">$45,678</p>
            </div>
        </div>
    </div>
);