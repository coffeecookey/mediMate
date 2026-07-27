import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, FileText, Pill, Activity, User, Menu } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Smith', specialty: 'Cardiology', date: '2024-09-10', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', specialty: 'Dermatology', date: '2024-09-15', time: '2:30 PM' },
    { id: 3, doctor: 'Dr. Williams', specialty: 'General Medicine', date: '2024-09-20', time: '11:15 AM' }
  ])

  const [prescriptions] = useState([
    { id: 1, medicine: 'Lisinopril 10mg', dosage: '1 tablet daily', doctor: 'Dr. Smith', date: '2024-08-28' },
    { id: 2, medicine: 'Metformin 500mg', dosage: '2 tablets daily', doctor: 'Dr. Johnson', date: '2024-08-25' },
    { id: 3, medicine: 'Vitamin D3', dosage: '1 capsule daily', doctor: 'Dr. Williams', date: '2024-08-20' }
  ])

  const [testReports] = useState([
    { id: 1, testName: 'Blood Work Panel', date: '2024-08-30', status: 'Available', doctor: 'Dr. Smith' },
    { id: 2, testName: 'Chest X-Ray', date: '2024-08-25', status: 'Available', doctor: 'Dr. Johnson' },
    { id: 3, testName: 'ECG Report', date: '2024-08-22', status: 'Pending', doctor: 'Dr. Smith' }
  ])

  return (
    <div className="py-20 min-h-screen bg-gradient-to-br from-primary to-teal-700">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r-2 border-teal-200 p-6">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
            <User className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Name</h2>
            <p className="text-sm text-gray-600">Patient</p>
          </div>
        </div>

        <nav className="space-y-4">
          <div className="p-3 bg-teal-50 rounded-lg border-l-4 border-teal-600">
            <h3 className="font-semibold text-teal-700">General Info</h3>
          </div>
          <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => navigate("/chatbot")}>
            <h3 className="font-semibold text-teal-700">Chat with Miffy</h3>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-0.5">Medical Dashboard</h1>
          <p className="text-gray-200">Welcome back! Here's your health overview.</p>
        </div>

        {/* Top Section - Upcoming Appointments */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-6 h-64">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-teal-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
            </div>
            <div className="space-y-3 overflow-y-auto h-44">
              {appointments.map((apt) => (
                <div key={apt.id} className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.doctor}</p>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{apt.date}</p>
                    <p className="text-sm text-gray-600">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Prescriptions */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-6">
            <div className="flex items-center mb-4">
              <Pill className="w-6 h-6 text-teal-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Prescriptions</h2>
            </div>
            
            <div className="space-y-3">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <input type="checkbox" className="mr-2" />
                        <span className="font-semibold text-gray-800">{prescription.medicine}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{prescription.dosage}</p>
                      <p className="text-xs text-gray-500 ml-6">by {prescription.doctor}</p>
                    </div>
                    <div className="w-8 h-6 bg-teal-100 rounded border border-teal-200 flex items-center justify-center">
                      <FileText className="w-3 h-3 text-teal-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Test Reports */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-teal-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Activity className="w-6 h-6 text-teal-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Test Reports</h2>
              </div>
            </div>

            <div className="space-y-3">
              {testReports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border border-gray-400 rounded mr-3"></div>
                      <span className="font-semibold text-gray-800">{report.testName}</span>
                    </div>
                    <div className="w-8 h-6 bg-teal-100 rounded border border-teal-200 flex items-center justify-center">
                      <FileText className="w-3 h-3 text-teal-600" />
                    </div>
                  </div>
                  <div className="ml-7 text-sm text-gray-600">
                    <p>Date: {report.date}</p>
                    <p>Status: <span className={report.status === 'Available' ? 'text-green-600' : 'text-orange-600'}>{report.status}</span></p>
                    <p>by {report.doctor}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard