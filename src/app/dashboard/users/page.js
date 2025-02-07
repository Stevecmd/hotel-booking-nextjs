"use client";

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
// import { fetchAllUsers } from '@/lib/api'; // Import the fetch function
import { UserCard } from '@/components/dash/users/UserCard'; // UserCard component for displaying user info

/**
 * UsersPage component that displays user information.
 * @returns {JSX.Element} The rendered UsersPage component.
 */
const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <section className="p-4">
                <Skeleton className="h-10 w-48 mb-6" /> {/* Skeleton for title */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="p-4 space-y-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-4 w-[180px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="m-4 rounded-md border border-red-500 bg-red-50 p-4">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <section className="p-4">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
        </section>
    );
};

export default UsersPage;