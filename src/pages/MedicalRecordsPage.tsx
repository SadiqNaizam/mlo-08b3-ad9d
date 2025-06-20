import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import AppFooter from '@/components/layout/AppFooter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Filter, FileText, Eye, Stethoscope, FlaskConical, Pill, ClipboardList } from 'lucide-react';

interface MedicalRecord {
  id: string;
  date: string;
  type: 'Visit Summary' | 'Lab Result' | 'Prescription' | 'Vaccination';
  title: string;
  source: string; // Doctor, Lab, Clinic
  details?: string; // Short summary or key info
  status?: 'Normal' | 'Abnormal' | 'Completed' | 'Pending'; // For lab results or prescriptions
}

const sampleRecords: MedicalRecord[] = [
  { id: 'vs1', date: '2024-07-15', type: 'Visit Summary', title: 'Annual Physical Exam', source: 'Dr. Doraemon', details: 'Routine check-up, overall health is good. Advised regular exercise.' },
  { id: 'lr1', date: '2024-06-20', type: 'Lab Result', title: 'Complete Blood Count (CBC)', source: 'Noby Nobita Labs', details: 'All parameters within normal range.', status: 'Normal' },
  { id: 'pr1', date: '2024-06-01', type: 'Prescription', title: 'Vitamin D Supplements', source: 'Dr. Doraemon', details: '1000 IU daily for 3 months.', status: 'Completed' },
  { id: 'vs2', date: '2023-11-10', type: 'Visit Summary', title: 'Flu Vaccination & Consultation', source: 'Shizuka Clinic', details: 'Administered flu vaccine. Minor cough discussed.' },
  { id: 'lr2', date: '2023-10-05', type: 'Lab Result', title: 'Lipid Panel', source: 'Noby Nobita Labs', details: 'Cholesterol slightly elevated.', status: 'Abnormal' },
  { id: 'pr2', date: '2023-09-15', type: 'Prescription', title: 'Antibiotics for Infection', source: 'Dr. Dorami', details: 'Course completed.', status: 'Completed' },
  { id: 'vc1', date: '2023-05-05', type: 'Vaccination', title: 'Tetanus Booster', source: 'Community Health Center', details: 'Administered as per schedule.' },
];

const MedicalRecordsPage: React.FC = () => {
  console.log('MedicalRecordsPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = sampleRecords.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeClass = (type: MedicalRecord['type'] | MedicalRecord['status']) => {
    switch (type) {
      case 'Visit Summary': return 'border-blue-400 bg-blue-100 text-blue-700';
      case 'Lab Result': return 'border-green-400 bg-green-100 text-green-700';
      case 'Prescription': return 'border-yellow-400 bg-yellow-100 text-yellow-700';
      case 'Vaccination': return 'border-purple-400 bg-purple-100 text-purple-700';
      case 'Normal': return 'border-green-400 bg-green-100 text-green-700';
      case 'Abnormal': return 'border-red-400 bg-red-100 text-red-700';
      case 'Completed': return 'border-gray-400 bg-gray-100 text-gray-700';
      case 'Pending': return 'border-orange-400 bg-orange-100 text-orange-700';
      default: return 'border-gray-300 bg-gray-100 text-gray-600';
    }
  };
  
  const recordsByType = (type: MedicalRecord['type'] | MedicalRecord['type'][]) => {
    const typesArray = Array.isArray(type) ? type : [type];
    return filteredRecords.filter(record => typesArray.includes(record.type));
  };

  const renderRecordsTable = (records: MedicalRecord[], caption: string) => (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Source/Doctor</TableHead>
          <TableHead>Details/Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.length > 0 ? records.map(record => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.date}</TableCell>
            <TableCell>
              <Badge variant="outline" className={getBadgeClass(record.type)}>{record.type}</Badge>
            </TableCell>
            <TableCell>{record.title}</TableCell>
            <TableCell>{record.source}</TableCell>
            <TableCell>
              {record.details}
              {record.status && (
                <Badge variant="outline" className={`ml-2 ${getBadgeClass(record.status)}`}>{record.status}</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <Eye className="mr-1 h-4 w-4" /> View
              </Button>
            </TableCell>
          </TableRow>
        )) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500 py-4">No records found for this category.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-slate-900">
      <AppHeader />
      <div className="flex flex-1 pt-16"> {/* pt-16 for fixed AppHeader */}
        <AppSidebar /> {/* Sidebar is fixed, width w-64 */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-64 overflow-y-auto"> {/* ml-64 for fixed AppSidebar */}
          <Card className="shadow-xl rounded-2xl border-2 border-blue-200 bg-white dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="border-b border-blue-200 dark:border-slate-700 bg-blue-100 dark:bg-slate-700/50 rounded-t-xl p-4 sm:p-6">
              <div className="flex items-center">
                <FileText className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300">
                    Medical Records
                  </CardTitle>
                  <CardDescription className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    View your health history, lab results, and prescriptions.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search records..."
                    className="pl-10 w-full bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Records
                </Button>
              </div>

              <ScrollArea className="w-full" style={{ height: 'calc(100vh - 22rem)' }}> 
              {/* Adjust height based on header/search bar. Consider max-height instead for more flexibility */}
                <Accordion type="multiple" defaultValue={['visits', 'labs', 'prescriptions']} className="w-full">
                  <AccordionItem value="visits">
                    <AccordionTrigger className="text-lg font-semibold text-blue-700 dark:text-blue-400 hover:no-underline hover:bg-blue-50 dark:hover:bg-slate-700/50 px-4 py-3 rounded-lg">
                      <div className="flex items-center">
                        <Stethoscope className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-400" /> Visit Summaries
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-2 px-2">
                      {renderRecordsTable(recordsByType('Visit Summary'), 'Recent doctor visits and consultations.')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="labs">
                    <AccordionTrigger className="text-lg font-semibold text-blue-700 dark:text-blue-400 hover:no-underline hover:bg-blue-50 dark:hover:bg-slate-700/50 px-4 py-3 rounded-lg">
                      <div className="flex items-center">
                        <FlaskConical className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" /> Lab Results
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-2 px-2">
                      {renderRecordsTable(recordsByType('Lab Result'), 'Blood tests, imaging results, and other diagnostics.')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="prescriptions">
                    <AccordionTrigger className="text-lg font-semibold text-blue-700 dark:text-blue-400 hover:no-underline hover:bg-blue-50 dark:hover:bg-slate-700/50 px-4 py-3 rounded-lg">
                      <div className="flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-yellow-500 dark:text-yellow-400" /> Prescriptions
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-2 px-2">
                      {renderRecordsTable(recordsByType('Prescription'), 'Medications prescribed by your doctors.')}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="vaccinations">
                    <AccordionTrigger className="text-lg font-semibold text-blue-700 dark:text-blue-400 hover:no-underline hover:bg-blue-50 dark:hover:bg-slate-700/50 px-4 py-3 rounded-lg">
                      <div className="flex items-center">
                        <ClipboardList className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" /> Vaccinations
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-2 px-2">
                      {renderRecordsTable(recordsByType('Vaccination'), 'Immunization records.')}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
      <AppFooter />
    </div>
  );
};

export default MedicalRecordsPage;