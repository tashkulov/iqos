import StatCard from "../components/StatCard.tsx";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid
} from "recharts";
import MainLayout from "../components/MainLayout.tsx";
import dau from '../assets/icon/dau.svg';
import mau from '../assets/icon/mau.svg';
import retenshn from '../assets/icon/retenshn.svg';

const dashboardData = {
    dau: 2250,
    mau: 9250,
    retention: "50%",
    usersByDay: [
        { name: "ПН", value: 180 },
        { name: "ВТ", value: 250 },
        { name: "СР", value: 300 },
        { name: "ЧТ", value: 320 },
        { name: "ПТ", value: 400 },
        { name: "СБ", value: 280 },
        { name: "ВС", value: 210 },
    ],
    trafficStats: [
        { month: "Jan", users: 400, t1: 240, t2: 240 },
        { month: "Feb", users: 300, t1: 139, t2: 221 },
        { month: "Mar", users: 500, t1: 380, t2: 229 },
        { month: "Apr", users: 700, t1: 490, t2: 200 },
        { month: "May", users: 1000, t1: 800, t2: 400 },
        { month: "Jun", users: 1200, t1: 850, t2: 500 },
        { month: "Jul", users: 1100, t1: 870, t2: 600 },
        { month: "Aug", users: 950, t1: 800, t2: 650 },
        { month: "Sep", users: 870, t1: 750, t2: 700 },
    ],
};

const DashboardPage = () => {
    return (
        <MainLayout>

        <div className="flex h-screen bg-[#f0ffff]">
            <div className="flex-1 p-6 space-y-6 overflow-auto">
                <div>
                    <h2 className="text-2xl font-semibold">Добрый день, Алексей!</h2>
                    <p className="text-sm text-gray-500">Вот ваш обзор</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="DAU" value={dashboardData.dau} delta="+8.5%" icon={dau}/>
                    <StatCard title="MAU" value={dashboardData.mau} delta="-1.5%" icon={mau}/>
                    <StatCard title="Ретеншн" value={dashboardData.retention} delta="-15%" icon={retenshn}/>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <p className="font-semibold mb-2">Общая статистика</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={dashboardData.trafficStats}>
                                <XAxis dataKey="month"/>
                                <YAxis/>
                                <Tooltip/>
                                <Line type="monotone" dataKey="users" stroke="#00C865"/>
                                <Line type="monotone" dataKey="t1" stroke="#00C8B3"/>
                                <Line type="monotone" dataKey="t2" stroke="#8884d8"/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                        <p className="font-semibold mb-2">Новые посетители</p>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={dashboardData.usersByDay}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Bar dataKey="value" fill="#00C8B3"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
        </MainLayout>
    );
};

export default DashboardPage;
