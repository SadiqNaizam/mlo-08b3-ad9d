import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AppFooter from '@/components/layout/AppFooter';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"; // Assuming toast is set up for notifications
import { User, Mail, Phone, Home, ShieldAlert, KeyRound, Trash2, Edit3, Save, Briefcase } from 'lucide-react';

// Schemas for form validation
const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address.").readonly(), // Email might be non-editable
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional().or(z.literal('')),
  dob: z.string().optional().or(z.literal('')), // Date of Birth
  address: z.string().optional().or(z.literal('')),
});

const emergencyContactSchema = z.object({
  contactName: z.string().min(2, "Contact name must be at least 2 characters."),
  relationship: z.string().min(2, "Relationship must be at least 2 characters."),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits."),
});

const securitySchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
  newPassword: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters.").optional().or(z.literal('')),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

// Mock user data - in a real app, this would come from an API or auth context
const mockPatientUser = {
  fullName: "P Nobita",
  email: "nobita.n@example.com",
  phone: "123-456-7890",
  dob: "1990-08-07",
  address: "123 Anywhere St, Any City",
  avatarUrl: "https://avatar.iran.liara.run/public/boy?username=Nobita", // Generic placeholder
  emergencyContact: {
    contactName: "Doraemon",
    relationship: "Guardian Robot",
    contactPhone: "987-654-3210",
  },
  isDoctor: false, // Example flag to differentiate user types
};

const mockDoctorUser = {
  fullName: "Dr. Dekisugi Hidetoshi",
  email: "dekisugi.h@example.com",
  phone: "555-123-4567",
  dob: "1988-04-15",
  address: "Knowledge Town, Innovation Ave",
  avatarUrl: "https://avatar.iran.liara.run/public/boy?username=Dekisugi",
  emergencyContact: { // Doctors might also have emergency contacts
    contactName: "Shizuka Minamoto",
    relationship: "Friend",
    contactPhone: "555-987-6543",
  },
  isDoctor: true,
  professionalDetails: {
    specialization: "General Medicine & Advanced Robotics",
    clinicName: "Future Health Clinic",
    bio: "Dedicated to providing comprehensive healthcare with a futuristic touch. Specializing in advanced diagnostics and patient-centered care."
  }
};

// For this example, let's assume we are rendering for a patient.
// In a real app, you'd fetch the user data and determine their role.
const currentUser = mockPatientUser; // or mockDoctorUser for doctor's view

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingEmergencyContact, setIsEditingEmergencyContact] = useState(false);

  const personalInfoForm = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser.phone || "",
      dob: currentUser.dob || "",
      address: currentUser.address || "",
    },
    mode: "onChange",
  });

  const emergencyContactForm = useForm<EmergencyContactFormData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      contactName: currentUser.emergencyContact.contactName,
      relationship: currentUser.emergencyContact.relationship,
      contactPhone: currentUser.emergencyContact.contactPhone,
    },
    mode: "onChange",
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onPersonalInfoSubmit = (data: PersonalInfoFormData) => {
    console.log("Personal Info Updated:", data);
    // currentUser.fullName = data.fullName; // Update mock data (in real app, API call)
    toast({ title: "Personal Information Updated", description: "Your details have been saved." });
    setIsEditingPersonalInfo(false);
  };

  const onEmergencyContactSubmit = (data: EmergencyContactFormData) => {
    console.log("Emergency Contact Updated:", data);
    toast({ title: "Emergency Contact Updated", description: "Your emergency contact details have been saved." });
    setIsEditingEmergencyContact(false);
  };

  const onSecuritySubmit = (data: SecurityFormData) => {
    console.log("Security Info Submitted:", data);
    if(data.newPassword) {
      toast({ title: "Password Changed", description: "Your password has been updated successfully." });
    } else {
      toast({ title: "Security Settings", description: "No changes made to password." });
    }
    securityForm.reset(); // Clear password fields
  };

  const handleDeleteAccount = () => {
    console.log("Account Deletion Requested");
    // Add actual account deletion logic here (API call, redirect to login, etc.)
    toast({
      title: "Account Deletion Initiated",
      description: "Your account deletion request is being processed.",
      variant: "destructive",
    });
    // For demo: simulate logout by redirecting to login
    // window.location.href = "/"; // This is a hard redirect; use react-router for SPA navigation if preferred after logout
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 ml-64"> {/* Adjust ml-64 to match AppSidebar width */}
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 shadow-lg border-blue-200">
              <CardHeader className="bg-blue-50 p-6 rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 border-2 border-blue-500">
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.fullName} />
                    <AvatarFallback className="bg-blue-500 text-white text-2xl">
                      {currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-blue-700">{currentUser.fullName}</h1>
                    <p className="text-sm text-gray-600">{currentUser.email}</p>
                    {currentUser.isDoctor && (currentUser as typeof mockDoctorUser).professionalDetails && (
                       <p className="text-sm text-blue-600 font-medium mt-1">{(currentUser as typeof mockDoctorUser).professionalDetails.specialization}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-blue-100 text-blue-700 rounded-lg p-1">
                <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <User className="mr-2 h-4 w-4" /> Personal Info
                </TabsTrigger>
                <TabsTrigger value="emergency" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <ShieldAlert className="mr-2 h-4 w-4" /> Emergency
                </TabsTrigger>
                {currentUser.isDoctor && (
                  <TabsTrigger value="professional" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                    <Briefcase className="mr-2 h-4 w-4" /> Professional
                  </TabsTrigger>
                )}
                <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md">
                  <KeyRound className="mr-2 h-4 w-4" /> Security
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card className="shadow-md">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>View and update your personal details.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingPersonalInfo(!isEditingPersonalInfo)}>
                      <Edit3 className="mr-2 h-4 w-4" /> {isEditingPersonalInfo ? 'Cancel' : 'Edit'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Form {...personalInfoForm}>
                      <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-6">
                        <FormField
                          control={personalInfoForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} disabled={!isEditingPersonalInfo} className={!isEditingPersonalInfo ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={personalInfoForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={personalInfoForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Your phone number" {...field} disabled={!isEditingPersonalInfo} className={!isEditingPersonalInfo ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={personalInfoForm.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} disabled={!isEditingPersonalInfo} className={!isEditingPersonalInfo ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={personalInfoForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Address</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Your street address" {...field} disabled={!isEditingPersonalInfo} className={!isEditingPersonalInfo ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {isEditingPersonalInfo && (
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Emergency Contact Tab */}
              <TabsContent value="emergency">
                <Card className="shadow-md">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                      <CardTitle>Emergency Contact</CardTitle>
                      <CardDescription>Manage your emergency contact information.</CardDescription>
                    </div>
                     <Button variant="outline" size="sm" onClick={() => setIsEditingEmergencyContact(!isEditingEmergencyContact)}>
                        <Edit3 className="mr-2 h-4 w-4" /> {isEditingEmergencyContact ? 'Cancel' : 'Edit'}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Form {...emergencyContactForm}>
                      <form onSubmit={emergencyContactForm.handleSubmit(onEmergencyContactSubmit)} className="space-y-6">
                        <FormField
                          control={emergencyContactForm.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Contact Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Emergency contact's name" {...field} disabled={!isEditingEmergencyContact} className={!isEditingEmergencyContact ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emergencyContactForm.control}
                          name="relationship"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Relationship</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Spouse, Parent, Friend" {...field} disabled={!isEditingEmergencyContact} className={!isEditingEmergencyContact ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emergencyContactForm.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Contact Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Emergency contact's phone" {...field} disabled={!isEditingEmergencyContact} className={!isEditingEmergencyContact ? "bg-gray-100" : ""}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {isEditingEmergencyContact && (
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        )}
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Professional Details Tab (Conditional for Doctors) */}
              {currentUser.isDoctor && (currentUser as typeof mockDoctorUser).professionalDetails && (
                <TabsContent value="professional">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>Professional Details</CardTitle>
                      <CardDescription>Manage your professional profile information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                          <Label className="text-gray-700 font-semibold">Specialization</Label>
                          <p className="text-gray-800 p-2 bg-gray-100 rounded-md">{(currentUser as typeof mockDoctorUser).professionalDetails.specialization}</p>
                        </div>
                        <div>
                          <Label className="text-gray-700 font-semibold">Clinic/Hospital Name</Label>
                           <p className="text-gray-800 p-2 bg-gray-100 rounded-md">{(currentUser as typeof mockDoctorUser).professionalDetails.clinicName}</p>
                        </div>
                        <div>
                          <Label className="text-gray-700 font-semibold">Professional Bio</Label>
                          <p className="text-gray-800 p-2 bg-gray-100 rounded-md whitespace-pre-line">{(currentUser as typeof mockDoctorUser).professionalDetails.bio}</p>
                        </div>
                        <Button variant="outline" disabled> {/* Placeholder for edit functionality */}
                            <Edit3 className="mr-2 h-4 w-4" /> Edit Professional Details (Coming Soon)
                        </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security options.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...securityForm}>
                      <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                        <FormField
                          control={securityForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter current password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={securityForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter new password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={securityForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Confirm new password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                          <Save className="mr-2 h-4 w-4" /> Update Password
                        </Button>
                      </form>
                    </Form>

                    <div className="mt-10 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete My Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Yes, delete account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default UserProfilePage;