"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// join form schema using zod
export const formSchema = z
	.object({
		firstName: z.string().min(1, { message: "Must be 1 or more characters long" }),
		lastName: z.string().min(1, { message: "Must be 1 or more characters long" }),
		emailAddress: z.string().email(),
		password: z.string().min(6, { message: "Must be a minimum of 6 characters" }),
		passwordConfirm: z.string(),
		gender: z.enum(["male", "female"]),
		// New optional fields
		currentAddress: z.string().optional(),
		contactNumber: z.string().optional(),
		idType: z.enum(["National-ID", "Passport"]).optional(),
		idNumber: z.string().optional(),
		// Payment information fields
		cardholderName: z.string().optional(),
		cardNumber: z.string().optional(),
		expiryDate: z.string().optional(),
		cvv: z.string().optional(),
		billingAddress: z.string().optional(),
		city: z.string().optional(),
		postalCode: z.string().optional(),
		country: z.string().optional()
	})
	.refine(
		(data) => {
			// validates password confirmation field
			return data.password === data.passwordConfirm;
		},
		{
			message: "Passwords do not match", // custom error message if form is invalid
			path: ["passwordConfirm"], // field the error above belongs to
		},
	);

/**
 * JoinForm component that handles user registration.
 * @returns {JSX.Element} The rendered JoinForm component.
 */
const JoinForm = () => {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// form definition
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			password: "",
			passwordConfirm: "",
			gender: "",
			currentAddress: "",
			contactNumber: "",
			idType: "National-ID",
			idNumber: "",
			cardholderName: "",
			cardNumber: "",
			expiryDate: "",
			cvv: "",
			billingAddress: "",
			city: "",
			postalCode: "",
			country: ""
		},
	});

	// our submit handler
	const onSubmit = async (values) => {
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/join", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (response.ok) {
				// Redirect to dashboard or home page
				router.push("/");
			} else {
				const errorData = await response.json();
				setError(errorData.message);
			}
		} catch (error) {
			console.error("Submit Error:", error);
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="my-5 flex min-h-full flex-col items-center justify-between">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-full flex-col gap-5">
					<div className="flex flex-col gap-4 sm:flex-row">
						{/* Start of first name field */}
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="First Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* End of first name field */}

						{/* Start of last name field */}
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Last Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						{/* End of last name field */}
					</div>

					{/* Start of gender select */}
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose your gender" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="male">Male</SelectItem>
											<SelectItem value="female">Female</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of gender select */}

					{/* Start of Email address field */}
					<FormField
						control={form.control}
						name="emailAddress"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder="Email address" type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of Email address field */}

					{/* Start of password field */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of password field */}

					{/* Start of passwordConfirm field */}
					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder="Confirm Password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of passwordConfirm field */}

					{/* Start of current address field */}
					<FormField
						control={form.control}
						name="currentAddress"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Current Address</FormLabel>
									<FormControl>
										<Input placeholder="Current Address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of current address field */}

					{/* Start of contact number field */}
					<FormField
						control={form.control}
						name="contactNumber"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Contact Number</FormLabel>
									<FormControl>
										<Input placeholder="Contact Number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of contact number field */}

					{/* Start of ID type select */}
					<FormField
						control={form.control}
						name="idType"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>ID Type</FormLabel>
									<Select onValueChange={field.onChange} value={field.value || ""}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Choose your ID type" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="National-ID">National-ID</SelectItem>
											<SelectItem value="Passport">Passport</SelectItem>
										</SelectContent>
									</Select>

									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of ID type select */}

					{/* Start of ID number field */}
					<FormField
						control={form.control}
						name="idNumber"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>ID Number</FormLabel>
									<FormControl>
										<Input placeholder="ID Number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of ID number field */}

					{/* Start of cardholder name field */}
					<FormField
						control={form.control}
						name="cardholderName"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Cardholder Name</FormLabel>
									<FormControl>
										<Input placeholder="Cardholder Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of cardholder name field */}

					{/* Start of card number field */}
					<FormField
						control={form.control}
						name="cardNumber"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Card Number</FormLabel>
									<FormControl>
										<Input placeholder="Card Number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of card number field */}

					{/* Start of expiry date field */}
					<FormField
						control={form.control}
						name="expiryDate"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Expiry Date</FormLabel>
									<FormControl>
										<Input placeholder="MM/YY" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of expiry date field */}

					{/* Start of CVV field */}
					<FormField
						control={form.control}
						name="cvv"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>CVV</FormLabel>
									<FormControl>
										<Input type="password" maxLength={3} placeholder="CVV" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of CVV field */}

					{/* Start of billing address field */}
					<FormField
						control={form.control}
						name="billingAddress"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Billing Address</FormLabel>
									<FormControl>
										<Input placeholder="Billing Address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of billing address field */}

					{/* Start of city field */}
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="City" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of city field */}

					{/* Start of postal code field */}
					<FormField
						control={form.control}
						name="postalCode"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input placeholder="Postal Code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of postal code field */}

					{/* Start of country field */}
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input placeholder="Country" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* End of country field */}

					{error && <p className="rounded-md border border-red-300 bg-red-100 p-2 text-sm font-medium text-destructive">{error}</p>}

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="m-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							"Create account"
						)}
					</Button>
				</form>
			</Form>
		</main>
	);
};

export default JoinForm;
