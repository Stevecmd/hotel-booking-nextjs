import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

/**
 * UserCard component displays user information in a card format.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.user - The user object containing user details.
 * @param {string} props.user.avatar - The URL of the user's avatar image.
 * @param {string} props.user.firstName - The user's first name.
 * @param {string} props.user.lastName - The user's last name.
 * @param {string} props.user.emailAddress - The user's email address.
 * @param {string} props.user.role - The user's role.
 * @param {string} [props.user.contactNumber] - The user's contact number (optional).
 * @param {string} [props.user.currentAddress] - The user's current address (optional).
 * @returns {JSX.Element} The UserCard component.
 */
export const UserCard = ({ user }) => {
    return (
        <Card className="hover:bg-stone-100">
            <CardHeader className="flex flex-row items-center gap-4">
                <Image
                    src={user.avatar}
                    alt={`${user.firstName}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <CardTitle className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
                <p className="text-sm text-gray-500">Email: {user.emailAddress}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
                {user.contactNumber && (
                    <p className="text-sm text-gray-500">Phone: {user.contactNumber}</p>
                )}
                {user.currentAddress && (
                    <p className="text-sm text-gray-500">Address: {user.currentAddress}</p>
                )}
            </CardContent>
        </Card>
    );
};
