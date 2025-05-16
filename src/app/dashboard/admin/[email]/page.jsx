'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { email } = useParams();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [withdraws, setWithdraws] = useState([]);
  const { data: session } = useSession()
  const getEmail = decodeURIComponent(email)
  const [userSearch, setUserSearch] = useState('');
  const [withdrawSearch, setWithdrawSearch] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (err) {
        console.error('Error fetching users:');
      }
    };

    const fetchWithdraws = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'withdrawRequests'));
        const withdrawData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setWithdraws(withdrawData);
      } catch (err) {
        console.error('Error fetching withdraw requests:');
      }
    };

    fetchUsers();
    fetchWithdraws();
  }, []);
  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredWithdraws = withdraws.filter(req =>
    req.nogadNumber?.toString().includes(withdrawSearch)
  );
  if (session?.user?.email !== getEmail || session?.user?.role !== "power") return null
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4 break-all">Welcome, {getEmail}</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('users')}
        >
          All Users {users.length}
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'withdraws' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('withdraws')}
        >
          Withdraw Requests {withdraws.length}
        </button>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="overflow-x-auto">
          <input
            type="text"
            placeholder="Search by email..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            className="mb-3 p-2 border rounded w-full"
          />
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Earn</th>
                <th className="border p-2">Create</th>
                <th className="border p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="text-center">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.earn ?? 0}</td>
                  <td className="border p-2">{user?.creatAt?.toDate().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  }</td>
                  <td className="border p-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Withdraws Table */}
      {activeTab === 'withdraws' && (
        <div className="overflow-x-auto">
          <input
            type="text"
            placeholder="Search by Nagad number..."
            value={withdrawSearch}
            onChange={e => setWithdrawSearch(e.target.value)}
            className="mb-3 p-2 border rounded w-full"
          />
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">User Email</th>
                <th className="border p-2">Point</th>
                <th className="border p-2">A/P</th>
                <th className="border p-2">Nagad Number</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdraws.map(req => (
                <tr key={req.id} className="text-center">
                  <td className="border p-2">{req.email}</td>
                  <td className="border p-2">{req.earn}</td>
                  <td className="border p-2">
                    {(req.earn && typeof req.earn === 'number') ? (req.earn / 1000) : '0.00'}
                  </td>
                  <td className="border p-2">{req.nogadNumber}</td>
                  <td className="border p-2 break-all">{req.description || '-'}</td>
                  <td className="border p-2">
                    {req.createdAt?.toDate
                      ? req.createdAt.toDate().toLocaleString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Page;
