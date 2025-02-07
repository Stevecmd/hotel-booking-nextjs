import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import JoinForm from "@/components/authForms/JoinForm";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/navbar/Logo";

/**
 * JoinPage component that displays the registration form for new users.
 * @returns {JSX.Element} The rendered JoinPage component.
 */
const JoinPage = () => {
	return (
		<div className="min-h-screen w-full lg:grid lg:grid-cols-2">
			<div className="bg-pattern-tp flex flex-col items-center justify-center py-12">
				{/* Logo begins here */}
				<div className="absolute top-0 flex items-center justify-center">
					<Logo />
				</div>
				{/* Logo ends here */}

				{/* Form Card begins here */}
				<Card className="mx-auto mt-14 max-w-2xl">
					<CardHeader>
						<CardTitle className="text-xl">Join</CardTitle>
						<CardDescription>Enter your information to create an account</CardDescription>
					</CardHeader>

					<Separator />

					{/* ActualForm begins here */}
					<CardContent>
						<JoinForm />
					</CardContent>
				</Card>
				{/* Form Card ends here */}
			</div>

			{/* Background image begins here */}
			<div className="hidden bg-muted lg:block">
				<Image
					src="https://images.unsplash.com/photo-1571061656009-1ab0330b0eca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					// src="https://via.placeholder.com/1080"
					alt="Background image"
					width="1080"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
};

export default JoinPage;
