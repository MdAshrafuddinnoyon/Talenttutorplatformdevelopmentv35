import { Card } from './ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BookOpen, 
  Star,
  Eye,
  MessageCircle,
  Calendar,
  Award
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl">{value}</p>
    </Card>
  );
}

interface AnalyticsDashboardProps {
  userType: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
}

export function AnalyticsDashboard({ userType }: AnalyticsDashboardProps) {
  // Sample data for charts
  const monthlyData = [
    { month: 'জানুয়ারি', value: 12, earnings: 15000 },
    { month: 'ফেব্রুয়ারি', value: 19, earnings: 22000 },
    { month: 'মার্চ', value: 15, earnings: 18000 },
    { month: 'এপ্রিল', value: 25, earnings: 28000 },
    { month: 'মে', value: 22, earnings: 25000 },
    { month: 'জুন', value: 30, earnings: 35000 },
  ];

  const subjectData = [
    { name: 'গণিত', value: 35, color: '#10b981' },
    { name: 'ইংরেজি', value: 25, color: '#3b82f6' },
    { name: 'পদার্থবিজ্ঞান', value: 20, color: '#f59e0b' },
    { name: 'রসায়ন', value: 15, color: '#ef4444' },
    { name: 'অন্যান্য', value: 5, color: '#8b5cf6' },
  ];

  const performanceData = [
    { week: 'সপ্তাহ ১', applications: 8, interviews: 5, hired: 3 },
    { week: 'সপ্তাহ ২', applications: 12, interviews: 8, hired: 5 },
    { week: 'সপ্তাহ ৩', applications: 10, interviews: 7, hired: 4 },
    { week: 'সপ্তাহ ৪', applications: 15, interviews: 10, hired: 6 },
  ];

  const renderTeacherStats = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="মোট জব আবেদন"
          value={45}
          change={12}
          icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="গৃহীত জব"
          value={18}
          change={8}
          icon={<Award className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="মাসিক আয়"
          value="৳২৫,০০০"
          change={15}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="গড় রেটিং"
          value="4.8"
          change={5}
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            মাসিক আয়ের ধারা
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#10b981" fill="#10b98120" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            বিষয় অনুযায়ী জব
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-600" />
          সাপ্তাহিক পারফরম্যান্স
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" style={{ fontSize: '12px' }} />
            <YAxis style={{ fontSize: '12px' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#10b981" name="আবেদন" />
            <Bar dataKey="interviews" fill="#3b82f6" name="ইন্টারভিউ" />
            <Bar dataKey="hired" fill="#f59e0b" name="নির্বাচিত" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );

  const renderGuardianStats = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="মোট জব পোস্ট"
          value={12}
          change={20}
          icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="মোট আবেদন"
          value={48}
          change={15}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="নিয়োগকৃত শিক্ষক"
          value={5}
          change={25}
          icon={<Award className="w-6 h-6 text-teal-600" />}
          color="bg-teal-50"
        />
        <StatCard
          title="মাসিক খরচ"
          value="৳১৮,০০০"
          change={-5}
          icon={<DollarSign className="w-6 h-6 text-orange-600" />}
          color="bg-orange-50"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            মাসিক আবেদন ধারা
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="আবেদন" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            বিষয় বণ্টন
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const renderAdminStats = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="মোট ইউজার"
          value="2,458"
          change={18}
          icon={<Users className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="সক্রিয় জব"
          value={342}
          change={12}
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="মোট দান"
          value="৳৫,৪৫,০০০"
          change={25}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="গড় রেটিং"
          value="4.6"
          change={8}
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            মাসিক বৃদ্ধি
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b98120" name="নতুন ইউজার" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            ইউজার টাইপ বণ্টন
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'শিক্ষক', value: 45, color: '#10b981' },
                  { name: 'অভিভাবক', value: 35, color: '#3b82f6' },
                  { name: 'শিক্ষার্থী', value: 15, color: '#f59e0b' },
                  { name: 'দাতা', value: 5, color: '#ef4444' },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { color: '#10b981' },
                  { color: '#3b82f6' },
                  { color: '#f59e0b' },
                  { color: '#ef4444' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const renderDonorStats = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="মোট দান"
          value="৳৫৫,০০০"
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="সাহায্যপ্রাপ্ত শিক্ষার্থী"
          value={28}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="দান করা বই"
          value={45}
          icon={<BookOpen className="w-6 h-6 text-teal-600" />}
          color="bg-teal-50"
        />
        <StatCard
          title="প্রভাব স্কোর"
          value="9.2"
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-50"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            দান ইতিহাস
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Area type="monotone" dataKey="earnings" stroke="#10b981" fill="#10b98120" name="দান (টাকা)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            দানের ধরন
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'নগদ', value: 60, color: '#10b981' },
                  { name: 'বই', value: 25, color: '#3b82f6' },
                  { name: 'স্টেশনারি', value: 15, color: '#f59e0b' },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { color: '#10b981' },
                  { color: '#3b82f6' },
                  { color: '#f59e0b' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );

  const renderStudentStats = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="মোট ক্লাস"
          value={45}
          icon={<BookOpen className="w-6 h-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="উপস্থিতি"
          value="92%"
          icon={<Award className="w-6 h-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="গৃহীত সাহায্য"
          value="৳১২,০০০"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="পাওয়া বই"
          value={12}
          icon={<BookOpen className="w-6 h-6 text-teal-600" />}
          color="bg-teal-50"
        />
      </div>

      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          মাসিক অগ্রগতি
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" style={{ fontSize: '12px' }} />
            <YAxis style={{ fontSize: '12px' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="ক্লাস" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );

  return (
    <div>
      {userType === 'teacher' && renderTeacherStats()}
      {userType === 'guardian' && renderGuardianStats()}
      {userType === 'admin' && renderAdminStats()}
      {userType === 'donor' && renderDonorStats()}
      {userType === 'student' && renderStudentStats()}
    </div>
  );
}
