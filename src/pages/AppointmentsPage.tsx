import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AppFooter from '@/components/layout/AppFooter';
import AppointmentCard from '@/components/AppointmentCard';

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast"; // For notifications

// Icons
import { PlusCircle, Calendar as CalendarIcon, Clock, UserMd, Stethoscope } from 'lucide-react'; // UserMd for doctor, Stethoscope for service

// Define appointment types and sample data
type AppointmentStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  consultationType: string;
  doctorName: string;
  location?: string;
}

const sampleAppointments: Appointment[] = [
  { id: '1', title: 'Follow-up with Dr. Dora', date: 'November 5, 2024', time: '10:00 AM - 10:30 AM', status: 'Confirmed', consultationType: 'General Checkup', doctorName: 'Dr. Dora', location: 'Online' },
  { id: '2', title: 'Dental Cleaning', date: 'November 10, 2024', time: '02:00 PM - 02:45 PM', status: 'Confirmed', consultationType: 'Dental', doctorName: 'Dr. Shizuka', location: 'Clinic Room 3' },
  { id: '3', title: 'Eye Exam', date: 'October 15, 2024', time: '09:00 AM - 09:30 AM', status: 'Completed', consultationType: 'Eye Care', doctorName: 'Dr. Nobita', location: 'Vision Center' },
  { id: '4', title: 'Annual Physical', date: 'September 20, 2024', time: '11:00 AM - 11:45 AM', status: 'Completed', consultationType: 'General Checkup', doctorName: 'Dr. Dora' },
  { id: '5', title: 'Specialist Consultation Request', date: 'November 8, 2024', time: 'Pending', status: 'Pending', consultationType: 'Cardiology', doctorName: 'Dr. Dekisugi' },
];

const doctors = [
  { id: 'dora', name: 'Dr. Dora (General Practice)' },
  { id: 'nobita', name: 'Dr. Nobita (Pediatrics)' },
  { id: 'shizuka', name: 'Dr. Shizuka (Dentistry)' },
  { id: 'gian', name: 'Dr. Gian (Orthopedics)' },
  { id: 'suneo', name: 'Dr. Suneo (Dermatology)' },
];

const services = [
  { id: 'general', name: 'General Checkup' },
  { id: 'dental', name: 'Dental Care' },
  { id: 'eye', name: 'Eye Examination' },
  { id: 'specialist', name: 'Specialist Consultation' },
  { id: 'vaccination', name: 'Vaccination' },
];

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

// Form Schema
const appointmentFormSchema = z.object({
  doctorId: z.string().min(1, { message: "Please select a doctor." }),
  serviceId: z.string().min(1, { message: "Please select a service." }),
  date: z.date({ required_error: "Please select a date for your appointment." }),
  timeSlot: z.string().min(1, { message: "Please select a time slot." }),
  reason: z.string().max(200, { message: "Reason must be 200 characters or less." }).optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState<AppointmentFormValues | null>(null);
  
  useEffect(() => {
    console.log('AppointmentsPage loaded');
  }, []);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorId: '',
      serviceId: '',
      reason: '',
      // date will be set by calendar
      timeSlot: '',
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    console.log("Form submitted, data:", data);
    setPendingAppointment(data);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (pendingAppointment) {
      const newAppointment: Appointment = {
        id: String(appointments.length + 1),
        title: `Appointment with ${doctors.find(d => d.id === pendingAppointment.doctorId)?.name || 'Doctor'}`,
        date: pendingAppointment.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: pendingAppointment.timeSlot,
        status: 'Pending', // New appointments are initially pending confirmation
        consultationType: services.find(s => s.id === pendingAppointment.serviceId)?.name || 'Consultation',
        doctorName: doctors.find(d => d.id === pendingAppointment.doctorId)?.name || 'Doctor',
        // location can be added later or based on doctor
      };
      setAppointments(prev => [newAppointment, ...prev]);
      setIsConfirmDialogOpen(false);
      setPendingAppointment(null);
      form.reset(); 
      // Reset selected date in calendar if it's stored in form state explicitly
      // For shadcn calendar, selecting a new date will update it.
      toast({
        title: "Appointment Requested!",
        description: "Your appointment request has been submitted and is pending confirmation.",
        className: "bg-green-100 text-green-800 border-green-300",
      });
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(app => app.id === appointmentId ? {...app, status: 'Cancelled'} : app));
    toast({
        title: "Appointment Cancelled",
        description: `Appointment ID ${appointmentId} has been cancelled.`,
        variant: "destructive",
    });
  };
  
  const upcomingAppointments = appointments.filter(app => app.status === 'Confirmed' || app.status === 'Pending');
  const pastAppointments = appointments.filter(app => app.status === 'Completed' || app.status === 'Cancelled');


  return (
    <div className="flex flex-col min-h-screen bg-blue-50"> {/* Doraemon light blue background */}
      <AppHeader />
      <AppSidebar /> {/* Fixed, accounts for header height via its own pt-16 */}
      
      <div className="flex-1 flex flex-col ml-64 pt-16"> {/* Adjust for sidebar and header */}
        <ScrollArea className="flex-1">
          <main className="p-6 md:p-8">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-blue-700">
                  <CalendarIcon className="inline-block h-8 w-8 mr-2 text-yellow-500" />
                  Manage Your Appointments
                </h1>
                {/* Optional: A quick "Book New" button that switches to the tab */}
                {/* <Button onClick={() => document.querySelector('[data-radix-collection-item][value="schedule"]')?.click()}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Book New Appointment
                </Button> */}
              </div>

              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 mb-6 bg-blue-200 p-1 rounded-lg shadow">
                  <TabsTrigger value="upcoming" className="py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Upcoming</TabsTrigger>
                  <TabsTrigger value="past" className="py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">History</TabsTrigger>
                  <TabsTrigger value="schedule" className="py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">Schedule New</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming">
                  <div className="space-y-6">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map(app => (
                        <AppointmentCard 
                          key={app.id}
                          id={app.id}
                          title={app.title}
                          date={app.date}
                          time={app.time}
                          status={app.status}
                          consultationType={app.consultationType}
                          location={app.location}
                          onCancel={app.status !== 'Cancelled' && app.status !== 'Completed' ? handleCancelAppointment : undefined}
                          // onViewDetails={() => console.log("View details for", app.id)}
                          // onReschedule={() => console.log("Reschedule", app.id)}
                        />
                      ))
                    ) : (
                      <p className="text-center text-gray-600 py-8 text-lg">No upcoming appointments. Time for a break or schedule a new one!</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="past">
                  <div className="space-y-6">
                    {pastAppointments.length > 0 ? (
                      pastAppointments.map(app => (
                        <AppointmentCard 
                          key={app.id}
                          id={app.id}
                          title={app.title}
                          date={app.date}
                          time={app.time}
                          status={app.status}
                          consultationType={app.consultationType}
                          location={app.location}
                          // onViewDetails={() => console.log("View details for", app.id)}
                        />
                      ))
                    ) : (
                      <p className="text-center text-gray-600 py-8 text-lg">No past appointments found.</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="schedule">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border-2 border-blue-300">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-6">Book a New Appointment</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="doctorId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-blue-700 font-medium">Doctor</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500">
                                      <SelectValue placeholder="Select a doctor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Doctors</SelectLabel>
                                      {doctors.map(doc => (
                                        <SelectItem key={doc.id} value={doc.id}>{doc.name}</SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="serviceId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-blue-700 font-medium">Service</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500">
                                      <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Services</SelectLabel>
                                      {services.map(service => (
                                        <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-blue-700 font-medium">Appointment Date</FormLabel>
                               <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1)) } // Disable past dates
                                initialFocus
                                className="rounded-md border border-blue-300 self-start"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="timeSlot"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-700 font-medium">Available Time Slots</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!form.watch('date')}>
                                <FormControl>
                                  <SelectTrigger className="border-blue-300 focus:border-yellow-500 focus:ring-yellow-500">
                                    <SelectValue placeholder={form.watch('date') ? "Select a time slot" : "Select a date first"} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Time Slots</SelectLabel>
                                    {timeSlots.map(slot => (
                                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select a date to see available time slots.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="reason"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-700 font-medium">Reason for Visit (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Briefly describe the reason for your appointment..."
                                  className="resize-none border-blue-300 focus:border-yellow-500 focus:ring-yellow-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" size="lg" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-semibold">
                          <PlusCircle className="mr-2 h-5 w-5" />
                          Request Appointment
                        </Button>
                      </form>
                    </Form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </ScrollArea>
        <AppFooter />
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl border-blue-500">
          <DialogHeader>
            <DialogTitle className="text-blue-700 text-xl">Confirm Appointment</DialogTitle>
            <DialogDescription className="text-gray-600">
              Please review your appointment details below before confirming.
            </DialogDescription>
          </DialogHeader>
          {pendingAppointment && (
            <div className="grid gap-4 py-4 text-sm">
              <div className="flex items-center">
                <UserMd className="h-5 w-5 mr-3 text-blue-500" />
                <strong>Doctor:</strong>&nbsp;{doctors.find(d => d.id === pendingAppointment.doctorId)?.name}
              </div>
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-3 text-blue-500" />
                <strong>Service:</strong>&nbsp;{services.find(s => s.id === pendingAppointment.serviceId)?.name}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 mr-3 text-blue-500" />
                <strong>Date:</strong>&nbsp;{pendingAppointment.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-500" />
                <strong>Time:</strong>&nbsp;{pendingAppointment.timeSlot}
              </div>
              {pendingAppointment.reason && (
                 <div className="flex items-start">
                    <Info className="h-5 w-5 mr-3 text-blue-500 mt-0.5" />
                    <div>
                        <strong>Reason:</strong>
                        <p className="text-gray-700">{pendingAppointment.reason}</p>
                    </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="sm:justify-between gap-2">
            <DialogClose asChild>
                <Button type="button" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    Cancel
                </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirmBooking} className="bg-green-500 hover:bg-green-600 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsPage;